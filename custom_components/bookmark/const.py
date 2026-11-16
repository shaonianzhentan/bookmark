"""网页收藏集成常量。"""
from __future__ import annotations

DOMAIN = "bookmark"

API_URL = f"/api/{DOMAIN}"
API_NAME = f"api:{DOMAIN}"

# 前端模块缓存版本号：取改动当天的日期 YYYY.MM.DD，同日再次改动追加 .N，发版时同步更新 manifest.json
VERSION = "2026.11.16.1"

# 静态资源挂载路径与面板模块。版本号带在路径中，入口与子模块的相对 import
# 一起换 URL，避免浏览器把旧子模块与新入口错配缓存。
WWW_PATH = f"/{DOMAIN}-www/{VERSION}"
PANEL_ELEMENT = "bookmark-panel"
MODULE_URL = f"{WWW_PATH}/bookmark-panel.js"
