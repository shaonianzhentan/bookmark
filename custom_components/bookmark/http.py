"""收藏数据的存储读写与 HTTP 接口。

实际数据文件：``<config>/.storage/bookmark.html``，内容就是浏览器通用的
标准 Netscape Bookmark HTML（与 Edge 导出的 ``favorites_2026_11_9.html`` 同格式）。

Python 在读取时把 HTML 转换成标准收藏树、写入时再序列化回 HTML；
前端始终只接触标准树，不解析任何收藏文件。所有转换都在 ``convert.py``。
"""
from __future__ import annotations

import asyncio
import logging
import os
from http import HTTPStatus
from typing import Any
from urllib.parse import urlparse

from aiohttp import ClientError, ClientTimeout, web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.storage import STORAGE_DIR

from .const import API_NAME, API_URL, DOMAIN
from .convert import (
    apply_import,
    empty_document,
    import_document,
    normalize_document,
    parse_netscape_html,
    to_bookmarks_json,
    to_netscape_html,
)

_LOGGER = logging.getLogger(__name__)

STORAGE_FILE = f"{STORAGE_DIR}/bookmark.html"


def _read_text(path: str) -> str:
    with open(path, encoding="utf-8") as file:
        return file.read()


def _write_text(path: str, text: str) -> None:
    """原子写入，避免写到一半留下损坏的标准收藏文件。"""
    tmp = f"{path}.tmp"
    # 固定 LF，避免 Windows 文本模式把标准收藏 HTML 写成 CRLF
    with open(tmp, "w", encoding="utf-8", newline="\n") as file:
        file.write(text)
    os.replace(tmp, path)


def load_document(hass: HomeAssistant) -> dict[str, Any]:
    """读取标准收藏 HTML 并转换成标准收藏树；文件不存在时返回空收藏夹。"""
    html_path = hass.config.path(STORAGE_FILE)
    try:
        return parse_netscape_html(_read_text(html_path))
    except FileNotFoundError:
        return empty_document()
    except OSError as err:
        _LOGGER.warning("无法读取收藏文件 %s：%s", html_path, err)
        return empty_document()


def save_document(hass: HomeAssistant, doc: dict[str, Any]) -> None:
    """把标准收藏树序列化回标准收藏 HTML 后落盘。"""
    _write_text(hass.config.path(STORAGE_FILE), to_netscape_html(doc))


class BookmarkView(HomeAssistantView):
    """收藏数据：GET 读取整份文档，POST 保存整份文档。"""

    url = API_URL
    name = API_NAME
    cors_allowed = True

    async def get(self, request):
        hass = request.app["hass"]
        doc = await hass.async_add_executor_job(load_document, hass)
        return self.json(doc)

    async def post(self, request):
        hass = request.app["hass"]
        try:
            payload = await request.json()
        except (ValueError, TypeError):
            return self.json_message("Invalid JSON", HTTPStatus.BAD_REQUEST)

        doc = normalize_document(payload)
        if doc is None:
            return self.json_message("Invalid bookmark document", HTTPStatus.BAD_REQUEST)

        await hass.async_add_executor_job(save_document, hass, doc)
        return self.json(doc)


class BookmarkImportView(HomeAssistantView):
    """导入标准收藏数据：Python 侧完成格式识别、转换与合并/覆盖。"""

    url = f"{API_URL}/import"
    name = f"api:{DOMAIN}:import"
    cors_allowed = True

    async def post(self, request):
        hass = request.app["hass"]
        try:
            payload = await request.json()
        except (ValueError, TypeError):
            return self.json_message("Invalid JSON", HTTPStatus.BAD_REQUEST)
        if not isinstance(payload, dict):
            return self.json_message("Invalid JSON", HTTPStatus.BAD_REQUEST)

        try:
            incoming = import_document(
                payload.get("content", ""), payload.get("filename", "")
            )
        except (ValueError, TypeError) as err:
            return self.json_message(str(err), HTTPStatus.BAD_REQUEST)

        # mode 缺省或非法值时由 apply_import 回退到「合并」
        mode = payload.get("mode", "merge")
        current = await hass.async_add_executor_job(load_document, hass)
        doc, count = apply_import(current, incoming, mode)
        await hass.async_add_executor_job(save_document, hass, doc)
        return self.json({"doc": doc, "count": count, "mode": (
            "replace" if str(mode or "merge").lower() == "replace" else "merge"
        )})


class BookmarkExportView(HomeAssistantView):
    """导出标准收藏数据：format=html（默认）或 format=json。

    html 分支输出的就是 ``bookmark.html`` 所使用的标准 Netscape Bookmark HTML。
    """

    url = f"{API_URL}/export"
    name = f"api:{DOMAIN}:export"
    cors_allowed = True

    async def get(self, request):
        hass = request.app["hass"]
        fmt = request.query.get("format", "html")
        doc = await hass.async_add_executor_job(load_document, hass)
        if fmt == "json":
            return web.Response(
                body=to_bookmarks_json(doc).encode("utf-8"),
                headers={"Content-Type": "application/json; charset=utf-8"},
            )
        return web.Response(
            body=to_netscape_html(doc).encode("utf-8"),
            headers={"Content-Type": "text/html; charset=utf-8"},
        )


# 抓取的 favicon 体积上限：超过即视为异常，直接放弃
_MAX_FAVICON_BYTES = 256 * 1024


class BookmarkFaviconView(HomeAssistantView):
    """代理抓取网站 favicon，绕过前端直接请求 http 站点导致的混合内容/跨域问题。

    HA 面板本身跑在 https 上，而部分书签站点是 http，浏览器会拦截
    ``http://.../favicon.ico`` 这样的混合内容请求。改为由 HA 后端服务端去抓取，
    前端只请求同源的 ``/api/bookmark/favicon?url=...``，就不会被浏览器拦截。
    """

    url = f"{API_URL}/favicon"
    name = f"api:{DOMAIN}:favicon"
    cors_allowed = True

    async def get(self, request):
        hass = request.app["hass"]
        target = request.query.get("url", "")
        if not target:
            return self.json_message("Missing url", HTTPStatus.BAD_REQUEST)

        parsed = urlparse(target)
        # 只允许 http/https，且禁止在 URL 里夹带用户凭证，限制其作为通用代理的能力
        if parsed.scheme not in ("http", "https") or not parsed.netloc:
            return self.json_message("Invalid url", HTTPStatus.BAD_REQUEST)
        if parsed.username is not None or parsed.password is not None:
            return self.json_message("Invalid url", HTTPStatus.BAD_REQUEST)

        session = async_get_clientsession(hass)
        try:
            async with session.get(
                target,
                timeout=ClientTimeout(total=8),
                headers={
                    "User-Agent": (
                        "Mozilla/5.0 (compatible; BookmarkFaviconBot/1.0)"
                    )
                },
                allow_redirects=True,
            ) as resp:
                if resp.status != HTTPStatus.OK:
                    return web.Response(status=HTTPStatus.NOT_FOUND)
                ctype = resp.headers.get("Content-Type", "")
                if not ctype.startswith("image/"):
                    return web.Response(status=HTTPStatus.NOT_FOUND)

                # 分块读取并限制体积，避免把异常大的响应整个吃进内存
                data = b""
                async for chunk in resp.content.iter_chunked(8192):
                    data += chunk
                    if len(data) > _MAX_FAVICON_BYTES:
                        return web.Response(status=HTTPStatus.NOT_FOUND)
        except (asyncio.TimeoutError, ClientError) as err:
            _LOGGER.debug("获取 favicon 失败 %s: %s", target, err)
            return web.Response(status=HTTPStatus.NOT_FOUND)

        return web.Response(
            body=data,
            content_type=ctype or "image/x-icon",
            headers={"Cache-Control": "public, max-age=86400"},
        )
