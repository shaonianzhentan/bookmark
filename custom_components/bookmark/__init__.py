"""网页收藏集成：注册 REST 接口、静态 JS 模块与 HA 原生自定义面板。"""
from __future__ import annotations

import inspect

from homeassistant.components.frontend import async_remove_panel
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.panel_custom import async_register_panel
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, MODULE_URL, PANEL_ELEMENT, WWW_PATH
from .http import (
    BookmarkExportView,
    BookmarkFaviconView,
    BookmarkImportView,
    BookmarkView,
)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data.setdefault(DOMAIN, {})

    # HTTP 视图与静态路径没有对应的注销 API，整个 HA 进程只需注册一次，
    # 避免集成重载 / 配置更新时重复注册报错。
    if not data.get("view_registered"):
        for view in (BookmarkView, BookmarkImportView, BookmarkExportView, BookmarkFaviconView):
            hass.http.register_view(view)
        data["view_registered"] = True

    if not data.get("static_registered"):
        await hass.http.async_register_static_paths(
            [
                StaticPathConfig(
                    WWW_PATH,
                    hass.config.path(f"custom_components/{DOMAIN}/www"),
                    False,
                )
            ]
        )
        data["static_registered"] = True

    # 旧版把 require_admin 存在 entry.data 里，却从 options 读取，导致该选项失效
    require_admin = entry.data.get(
        "require_admin", entry.options.get("require_admin", False)
    )

    result = async_register_panel(
        hass,
        frontend_url_path=DOMAIN,
        webcomponent_name=PANEL_ELEMENT,
        module_url=MODULE_URL,
        sidebar_title="网页收藏",
        sidebar_icon="mdi:bookmark",
        require_admin=require_admin,
    )
    # 不同 HA 版本中该助手可能是普通函数，也可能是协程
    if inspect.isawaitable(result):
        await result

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    async_remove_panel(hass, DOMAIN)
    return True
