"""标准收藏数据的转换层（全部在 Python 侧完成）。

「原数据」采用浏览器通用的标准收藏格式，前端不参与任何解析：

* 落盘文件：``<config>/.storage/bookmark.html``，内容是标准 Netscape Bookmark HTML
  （与 Edge 导出的 ``favorites_2026_11_9.html`` 同格式）。
* 内存 / 接口数据：标准收藏文档
  ``{version, roots: [ <folder>, ... ]}``，``roots`` 是一个**顶层根目录列表**，
  每个根目录都是一个 ``type=folder`` 节点，其下可再嵌套文件夹与网址。
  根目录由用户自己创建或从导入产生，组件**不再预置**「收藏夹栏 / 其他收藏 / 移动设备收藏」。
  ``date_added`` / ``date_modified`` 为 Chrome 纪元（1601-01-01 起微秒数，字符串）。
* 可导入格式：Netscape Bookmark HTML、Chrome / Edge Bookmarks JSON、
  以及旧版扁平数组 ``[{url, name, category, time}]``（仅为导入兼容，不做自动迁移）。
* 可导出格式：标准 Netscape Bookmark HTML、标准 Bookmarks JSON（即本模块的文档结构）。

``bookmark.html`` 不存在时按空收藏夹处理；需要导入既有数据时由用户在界面上
使用「导入收藏夹」功能自行导入，本模块不自动读取或改动任何其它文件。

注意：标准 HTML 不含节点 id / guid，所以每次从文件读入时会重新生成 id 与 guid；
这不影响 UI（每次加载都以后端返回的树为准），时间精度由微秒降到秒。
"""
from __future__ import annotations

import copy
import html
import json
import re
import time
import uuid
from typing import Any, Iterator

# Chrome 纪元与 Unix 纪元相差 11644473600 秒
CHROME_EPOCH_OFFSET = 11644473600000000

_ATTR_RE = re.compile(
    r"([A-Za-z_:][\w:.-]*)\s*=\s*(?:\"([^\"]*)\"|'([^']*)'|([^\s>]+))"
)
# 线性标记扫描：Netscape 格式里 <DT> 不闭合、<DL> 可能是 <DT> 的兄弟或子节点，
# 用 DOM 解析不可靠。H3 / A 的闭合标签写成显式分支，避免大小写混杂时漏匹配。
_TOKEN_RE = re.compile(
    r"<(/DL|DL|DT)\b[^>]*>"
    r"|<H3\b([^>]*)>([\s\S]*?)</H3\s*>"
    r"|<A\b([^>]*)>([\s\S]*?)</A\s*>",
    re.IGNORECASE,
)


# ---------------------------------------------------------------- 时间

def chrome_now() -> str:
    return str(int(time.time() * 1_000_000) + CHROME_EPOCH_OFFSET)


def ms_to_chrome(value: Any) -> str:
    """Unix 毫秒时间戳 -> Chrome 纪元字符串。"""
    try:
        ms = int(value)
        if ms <= 0:
            raise ValueError
        return str(ms * 1000 + CHROME_EPOCH_OFFSET)
    except (TypeError, ValueError):
        return chrome_now()


def chrome_to_ms(value: Any) -> int:
    """Chrome 纪元字符串 -> Unix 毫秒时间戳。"""
    try:
        return max(0, (int(value) - CHROME_EPOCH_OFFSET) // 1000)
    except (TypeError, ValueError):
        return 0


def _chrome_to_unix_seconds(value: Any) -> str:
    ms = chrome_to_ms(value)
    return str((ms if ms > 0 else int(time.time() * 1000)) // 1000)


def _guid() -> str:
    return str(uuid.uuid4())


# ---------------------------------------------------------------- 文档

def empty_document() -> dict[str, Any]:
    """一份空的标准收藏文档（没有默认根目录，根目录由用户自行创建或导入产生）。"""
    return {"roots": [], "version": 1}


def _take_id(used: set[str], counter: list[int]) -> str:
    while str(counter[0]) in used:
        counter[0] += 1
    node_id = str(counter[0])
    counter[0] += 1
    return node_id


def _clean_node(
    raw: Any, used: set[str], counter: list[int]
) -> dict[str, Any] | None:
    """清洗单个节点（url 或 folder），补全字段（含时间 / guid）并保证 id 全局唯一。"""
    if not isinstance(raw, dict) or raw.get("type") not in ("url", "folder"):
        return None

    node_id = str(raw.get("id") or "")
    if not node_id or node_id in used:
        node_id = _take_id(used, counter)
    used.add(node_id)
    if node_id.isdigit():
        counter[0] = max(counter[0], int(node_id) + 1)

    node: dict[str, Any] = {
        "date_added": str(raw.get("date_added") or chrome_now()),
        "guid": str(raw.get("guid") or _guid()),
        "id": node_id,
        "name": str(raw.get("name") or "未命名"),
        "type": raw["type"],
    }
    if raw["type"] == "url":
        url = raw.get("url")
        if not isinstance(url, str) or not url:
            return None
        node["url"] = url
        icon = raw.get("icon")
        if isinstance(icon, str) and icon:
            node["icon"] = icon
    else:
        node["date_modified"] = str(raw.get("date_modified") or node["date_added"])
        children = raw.get("children")
        node["children"] = (
            [c for c in (_clean_node(c, used, counter) for c in children) if c]
            if isinstance(children, list)
            else []
        )
    return node


def walk_nodes(doc: dict) -> Iterator[tuple[dict, dict | None, list[dict]]]:
    """遍历所有节点（含所有根目录），产出 (node, parent_folder, ancestors)。

    根目录的 parent 为 None，ancestors 为空列表。
    """
    roots = (doc.get("roots") or []) if isinstance(doc, dict) else []

    def recurse(node: dict, parent: dict | None, ancestors: list[dict]):
        yield node, parent, ancestors
        if node.get("type") == "folder" and isinstance(node.get("children"), list):
            chain = ancestors + [node]
            for child in node["children"]:
                yield from recurse(child, node, chain)

    for root in roots:
        if isinstance(root, dict):
            yield from recurse(root, None, [])


def count_urls(doc: dict) -> int:
    return sum(1 for node, _, _ in walk_nodes(doc) if node.get("type") == "url")


def normalize_document(data: Any) -> dict[str, Any] | None:
    """校验并规整标准收藏文档，非法时返回 None。

    接受两种 ``roots`` 形式：

    * 列表 ``[<folder>, ...]``（本模块的标准结构）；
    * 字典 ``{bookmark_bar, other, synced}``（Chrome / Edge Bookmarks JSON 风格），
      此时按值逐个规整为根目录。

    前端新增的节点在这里补齐时间与 guid、并保证 id 全局唯一。
    """
    if not isinstance(data, dict):
        return None

    roots_raw = data.get("roots")
    if not isinstance(roots_raw, (list, dict)):
        return None

    doc = empty_document()
    used: set[str] = set()
    counter = [4]

    if isinstance(roots_raw, dict):
        for source in roots_raw.values():
            if not isinstance(source, dict) or source.get("type") != "folder":
                continue
            node = _clean_node(source, used, counter)
            if node:
                doc["roots"].append(node)
    else:
        for source in roots_raw:
            node = _clean_node(source, used, counter)
            if node and node.get("type") == "folder":
                doc["roots"].append(node)

    return doc


def from_legacy(items: list[Any]) -> dict[str, Any]:
    """旧版扁平数组 -> 标准收藏树：category 中的 '/' 视为层级分隔符，

    第一段成为根目录（一级分类），后续段依次嵌套；无 category 的条目归入
    「其他收藏夹」根目录。
    """
    doc = empty_document()
    roots = doc["roots"]
    path_map: dict[tuple[str, ...], dict[str, Any]] = {}

    for item in items:
        if not isinstance(item, dict):
            continue
        url = item.get("url")
        if not isinstance(url, str) or not url:
            continue

        node = {
            "type": "url",
            "name": str(item.get("name") or url),
            "url": url,
            "date_added": ms_to_chrome(item.get("time")),
        }

        category = item.get("category")
        if isinstance(category, str) and category.strip():
            parts = [p for p in category.strip("/").split("/") if p]
            if not parts:
                roots.append({
                    "type": "folder",
                    "name": "其他收藏夹",
                    "children": [node],
                })
                continue
            parent_children = roots
            chain: tuple[str, ...] = ()
            for part in parts:
                chain = chain + (part,)
                folder = path_map.get(chain)
                if folder is None:
                    folder = {"type": "folder", "name": part, "children": []}
                    parent_children.append(folder)
                    path_map[chain] = folder
                parent_children = folder["children"]
            parent_children.append(node)
        else:
            roots.append({
                "type": "folder",
                "name": "其他收藏夹",
                "children": [node],
            })

    return normalize_document(doc) or doc


def merge_documents(current: dict, incoming: dict) -> tuple[dict, int]:
    """把导入的标准文档按根合并进现有数据（不覆盖），返回 (doc, 导入条数)。"""
    doc = normalize_document(current) or empty_document()
    count = count_urls(incoming)
    for root in (incoming.get("roots") or []):
        if isinstance(root, dict) and root.get("type") == "folder":
            doc["roots"].append(copy.deepcopy(root))
    return normalize_document(doc) or doc, count


def replace_document(incoming: dict) -> tuple[dict, int]:
    """覆盖导入：用外部浏览器导出的标准收藏文档整体替换现有数据。"""
    doc = normalize_document(incoming) or empty_document()
    return doc, count_urls(doc)


def apply_import(current: dict, incoming: dict, mode: str = "merge") -> tuple[dict, int]:
    """按导入模式生成最终文档，返回 (doc, 导入条数)。

    * ``merge``（默认）：把外部导出的收藏作为根目录合并进现有数据，保留已有收藏。
    * ``replace``：清空现有数据，只保留导入文件的内容。

    任何未知 / 缺失的 mode 都回退到「合并」，避免误删数据。
    """
    if str(mode or "merge").lower() == "replace":
        return replace_document(incoming)
    return merge_documents(current, incoming)


# ---------------------------------------------------------------- HTML

def _parse_attrs(text: str) -> dict[str, str]:
    attrs: dict[str, str] = {}
    for match in _ATTR_RE.finditer(text or ""):
        value = next((group for group in match.groups()[1:] if group is not None), "")
        attrs[match.group(1).upper()] = value
    if re.search(r"PERSONAL_TOOLBAR_FOLDER", text or "", re.IGNORECASE):
        attrs.setdefault("PERSONAL_TOOLBAR_FOLDER", "true")
    return attrs


def _strip_tags(text: str) -> str:
    return html.unescape(re.sub(r"<[^>]*>", "", text or "")).strip()


def _attr_date(seconds: Any) -> str:
    try:
        value = int(seconds)
        if value <= 0:
            raise ValueError
        return str(value * 1_000_000 + CHROME_EPOCH_OFFSET)
    except (TypeError, ValueError):
        return chrome_now()


def parse_netscape_html(text: str) -> dict[str, Any]:
    """解析浏览器导出的 Netscape Bookmark HTML -> 标准收藏树。

    顶层 ``<H3>`` 文件夹直接成为根目录（保留其自身名称）；顶层散落的网址归入
    「其他收藏夹」根目录。不再强制映射到固定的三个根。
    """
    source = str(text or "")
    top: list[dict] = []
    current = top
    stack: list[dict] = []
    pending_folder: dict | None = None

    for match in _TOKEN_RE.finditer(source):
        if match.group(1):
            tag = match.group(1).upper()
            if tag == "/DL":
                if stack:
                    frame = stack.pop()
                    if frame["folder"] is not None:
                        frame["folder"]["children"] = frame["list"]
                    else:
                        frame["parent"].extend(frame["list"])
                    current = frame["parent"]
            elif tag == "DL":
                stack.append({"list": [], "parent": current, "folder": pending_folder})
                current = stack[-1]["list"]
                pending_folder = None
            # <DT> 只是分隔符
            continue

        if match.group(2) is not None:
            attrs = _parse_attrs(match.group(2))
            folder = {
                "children": [],
                "date_added": _attr_date(attrs.get("ADD_DATE")),
                "date_modified": _attr_date(attrs.get("LAST_MODIFIED") or attrs.get("ADD_DATE")),
                "guid": _guid(),
                "id": "",
                "name": _strip_tags(match.group(3)) or "未命名",
                "type": "folder",
            }
            current.append(folder)
            pending_folder = folder
        else:
            attrs = _parse_attrs(match.group(4))
            pending_folder = None
            href = html.unescape(attrs.get("HREF") or "")
            if not href:
                continue
            node = {
                "date_added": _attr_date(attrs.get("ADD_DATE")),
                "guid": _guid(),
                "id": "",
                "name": _strip_tags(match.group(5)) or href,
                "type": "url",
                "url": href,
            }
            icon = attrs.get("ICON") or attrs.get("ICON_URI")
            if icon:
                node["icon"] = html.unescape(icon)
            current.append(node)

    doc = empty_document()
    loose_urls: list[dict] = []
    for node in top:
        if node.get("type") != "folder":
            loose_urls.append(node)
            continue
        doc["roots"].append(node)

    if loose_urls:
        now = chrome_now()
        doc["roots"].append({
            "children": loose_urls,
            "date_added": now,
            "date_modified": now,
            "guid": _guid(),
            "id": "",
            "name": "其他收藏夹",
            "type": "folder",
        })

    return normalize_document(doc) or doc


def _node_lines(children: list[dict], indent: int) -> str:
    """渲染 children 列表为 HTML 片段（不含外层的 H3 / DL）。"""
    pad = " " * indent
    lines = []
    for node in children or []:
        if node.get("type") == "folder":
            lines.append(
                f'{pad}<DT><H3 ADD_DATE="{_chrome_to_unix_seconds(node.get("date_added"))}" '
                f'LAST_MODIFIED="{_chrome_to_unix_seconds(node.get("date_modified"))}">'
                f'{html.escape(str(node.get("name", "")), quote=True)}</H3>'
            )
            lines.append(f"{pad}<DL><p>")
            lines.append(_node_lines(node.get("children") or [], indent + 4).rstrip("\n"))
            lines.append(f"{pad}</DL><p>")
        else:
            icon = node.get("icon")
            icon_attr = f' ICON="{html.escape(str(icon), quote=True)}"' if icon else ""
            lines.append(
                f'{pad}<DT><A HREF="{html.escape(str(node.get("url", "")), quote=True)}" '
                f'ADD_DATE="{_chrome_to_unix_seconds(node.get("date_added"))}"{icon_attr}>'
                f'{html.escape(str(node.get("name", "")), quote=True)}</A>'
            )
    return "\n".join(lines) + ("\n" if lines else "")


def _root_folder_lines(node: dict, indent: int) -> str:
    """渲染一个根目录（含自身的 H3 + DL 包裹）。"""
    pad = " " * indent
    lines = [
        f'{pad}<DT><H3 ADD_DATE="{_chrome_to_unix_seconds(node.get("date_added"))}" '
        f'LAST_MODIFIED="{_chrome_to_unix_seconds(node.get("date_modified"))}">'
        f'{html.escape(str(node.get("name", "")), quote=True)}</H3>',
        f"{pad}<DL><p>",
    ]
    children = _node_lines(node.get("children") or [], indent + 4)
    if children:
        lines.append(children.rstrip("\n"))
    lines.append(f"{pad}</DL><p>")
    return "\n".join(lines)


def to_netscape_html(doc: dict) -> str:
    """标准收藏树 -> 浏览器可直接导入的 Netscape Bookmark HTML。

    每个根目录都作为顶层 ``<H3>`` 输出，不再包裹固定的三个根文件夹。
    """
    lines = [
        "<!DOCTYPE NETSCAPE-Bookmark-file-1>",
        "<!-- This is an automatically generated file.",
        "     It will be read and overwritten.",
        "     DO NOT EDIT! -->",
        '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
        "<TITLE>Bookmarks</TITLE>",
        "<H1>Bookmarks</H1>",
        "<DL><p>",
    ]
    for root in (doc.get("roots") or []):
        lines.append(_root_folder_lines(root, 4).rstrip("\n"))
    lines.append("</DL><p>")
    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------- JSON

def parse_bookmarks_json(text: str) -> dict[str, Any]:
    """Chrome / Edge Bookmarks JSON（或旧版扁平数组）-> 标准收藏树。"""
    data = json.loads(str(text))
    if isinstance(data, list):
        return from_legacy(data)
    if not isinstance(data, dict):
        raise ValueError("不是有效的收藏数据")

    if "roots" in data:
        return normalize_document(data) or empty_document()
    if isinstance(data.get("children"), list):
        doc = empty_document()
        now = chrome_now()
        doc["roots"].append({
            "children": data["children"],
            "date_added": now,
            "date_modified": now,
            "guid": _guid(),
            "id": "",
            "name": "其他收藏夹",
            "type": "folder",
        })
        return normalize_document(doc) or doc
    raise ValueError("缺少 roots 字段")


def to_bookmarks_json(doc: dict) -> str:
    return json.dumps(doc, ensure_ascii=False, indent=2)


def import_document(text: str, filename: str = "") -> dict[str, Any]:
    """按内容自动识别标准格式并转换成标准收藏树。"""
    value = str(text or "").strip()
    if not value:
        raise ValueError("文件为空")
    if value.startswith("{") or value.startswith("["):
        return parse_bookmarks_json(value)
    if (
        re.search(r"NETSCAPE-Bookmark-file", value, re.IGNORECASE)
        or re.search(r"<DL>", value, re.IGNORECASE)
        or re.search(r"\.html?$", filename or "", re.IGNORECASE)
    ):
        return parse_netscape_html(value)
    raise ValueError("无法识别的收藏文件格式")
