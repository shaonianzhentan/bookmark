# bookmark

Home Assistant 里的「收藏夹」面板。参考 Microsoft Edge 收藏夹管理器复刻，支持文件夹树、搜索、拖放移动、编辑/删除，以及浏览器标准收藏数据的导入导出。

[![hacs_badge](https://img.shields.io/badge/Home-Assistant-%23049cdb)](https://www.home-assistant.io/)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![visit](https://visitor-badge.laobi.icu/badge?page_id=shaonianzhentan.bookmark&left_text=visit)

[![badge](https://img.shields.io/badge/QQ群-64185969-76beff?logo=tencentqq&style=for-the-badge)](https://qm.qq.com/cgi-bin/qm/qr?k=m4uDQuuAJCnCll6PuQZUnnJ0zEy7zuk2&jump_from=webapi&authKey=WTxRChNkBUDdVsTcYHeO8yb98Uu8WGJC3hxw53Il4PB7RgBTQ6StHa43MwZJtN5w)

## 安装

安装完成重启 HA，刷新一下页面，在集成里搜索 `bookmark` 即可。

[![Add Integration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start?domain=bookmark)

集成添加后，侧边栏会出现「收藏夹」入口（勾选「仅管理员可见」时只对管理员显示）。

## 使用

- 顶部：`搜索收藏`、`添加收藏`、`添加文件夹`、以及 `···` 更多菜单（导入 / 导出 / 排序 / 展开折叠）。顶栏固定不随列表滚动，左侧文件夹树铺满可用高度并独立滚动。
- `添加收藏` / `添加文件夹` 都可在对话框里选择「分类」（显示完整路径，默认当前文件夹），添加后自动跳到所选分类；`添加文件夹` 选择「（顶层根目录）」、或还没有任何文件夹（分类为空）时，会直接创建为顶层根目录。
- 左侧是文件夹树，**根目录完全由用户自己创建（或从导入产生），不再预置固定的「收藏夹栏 / 其他收藏夹 / 移动设备收藏夹」**，可展开折叠。
- 条目行尾的 `···`：打开、复制链接、编辑、移动到…、删除；桌面端也可以右键行呼出同一菜单，移动端请用常显的 `···`。
- 拖动任意条目到左侧文件夹或列表中的文件夹即可移动（桌面端拖放；移动端用 `···` →「移动到…」）。

## 导入 / 导出

收藏数据采用浏览器通用的标准格式，可直接被浏览器导入或导出。

- **导入**：`···` 更多菜单 →「导入收藏…」，选择浏览器导出的文件后可选两种导入方式，**默认「合并导入」**：
  - **合并导入**：把外部浏览器导出的收藏按顶层根目录整体追加，HA 里已有的收藏保持不变——适合把外部浏览器导出的收藏汇入 HA。
  - **覆盖导入**：清空现有全部收藏，只保留文件中的内容（界面上会二次确认）。
  - 支持 Netscape Bookmark HTML（Edge / Chrome / Firefox 导出的 `favorites_*.html`）、Chrome / Edge Bookmarks JSON，以及旧版扁平 JSON 数组（仅导入兼容）。
- **导出**：可导出为标准书签 HTML（浏览器可直接导入）或 `Bookmarks.json`。
- **不做自动迁移**：首次使用按空收藏夹启动，已有数据请先整理成标准书签文件，再用上面的「导入收藏」导入。

## 如果这个项目对你有帮助，请我喝杯<del style="font-size: 14px;">咖啡</del>奶茶吧😘
|  |支付宝|微信|
|---|---|---|
| 奶茶= | <img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/alipay.png" align="left" height="160" width="160" alt="支付宝" title="支付宝">  |  <img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/wechat.png" height="160" width="160" alt="微信支付" title="微信">

## 关注我的微信订阅号，了解更多HomeAssistant相关知识
<img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/wechat-channel.png" height="160" alt="HomeAssistant家庭助理" title="HomeAssistant家庭助理">

---
**在使用的过程之中，如果遇到无法解决的问题，付费咨询请加Q`635147515`**
