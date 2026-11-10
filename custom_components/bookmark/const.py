"""网页收藏集成常量。"""
from __future__ import annotations

DOMAIN = "bookmark"

API_URL = f"/api/{DOMAIN}"
API_NAME = f"api:{DOMAIN}"

# 前端模块缓存版本号：取改动当天的日期 YYYY.MM.DD，发版时同步更新 manifest.json
VERSION = "2026.11.11"

# 静态资源挂载路径与面板模块
WWW_PATH = f"/{DOMAIN}-www"
PANEL_ELEMENT = "bookmark-panel"
MODULE_URL = f"{WWW_PATH}/bookmark-panel.js?ver={VERSION}"
