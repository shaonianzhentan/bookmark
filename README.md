# bookmark

Home Assistant 里的「收藏夹」面板。参考 Microsoft Edge 收藏夹管理器复刻，支持文件夹树、搜索、拖放移动、编辑/删除，以及浏览器标准收藏数据的导入导出。

[![hacs_badge](https://img.shields.io/badge/Home-Assistant-%23049cdb)](https://www.home-assistant.io/)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
![visit](https://visitor-badge.laobi.icu/badge?page_id=shaonianzhentan.bookmark&left_text=visit)

https://github.com/shaonianzhentan/ha-extension

[![Edge Add-on](https://img.shields.io/badge/Edge扩展-点击安装-%23049cdb?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI1NDYxNTI3NTY0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0MTQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQ2NCA2NTZxLTQ4LTUyLTU2LTExNi0yMCAzMC4wMTYtMzIgNjQtMTguMDE2IDU4LjAxNi00Ljk5MiAxMjAuOTkydDUyLjk5MiAxMTQuMDE2IDk4LjAxNiA3MS4wMDhxNjggMjQgMTUyLTggNzAuMDE2LTI2LjAxNiAxMzQuMDE2LTgyLjAxNmwxNC4wMTYtMTZxMzItMzQuMDE2IDQyLjAxNi01MC4wMTYgMjAtMzItMi4wMTYtMzYtOTguMDE2IDUyLTIxMiAzNS4wMDhUNDY0LjAzMiA2NTZ6IG0yNC0yNDhxMjQgMCAyMC45OTItNi4wMTZ0LTIwLjk5Mi0xNmwtMTYtMTAuMDE2cS02Ni4wMTYtMzYtMTQ4LTM2dC0xNDQgMzQuMDE2VDk2IDQ2OHEtMjQgNjQgMi4wMTYgMTQ2LjAxNiAzMC4wMTYgMTI2LjAxNiAxMjguOTkyIDIxNS4wMDh0MjI0Ljk5MiAxMDQuOTkycS02Ni4wMTYtNDAtMTAzLjAwOC0xMTEuMDA4VDMxMiA2NzQuMDE2cTIuMDE2LTg2LjAxNiA1MC4wMTYtMTYyLjAxNiA1MC4wMTYtODIuMDE2IDEyNi4wMTYtMTA0ek0xMTguMDE2IDM1MnE2NC00OCAxNDgtNjAuOTkydDE2NC45OTIgMTEuMDA4IDEzNS4wMDggODIuMDE2cTM2IDQwIDQ4IDkwLjAxNiAxNC4wMTYgNTYtMTQuMDE2IDk2LTM0LjAxNiAzNiA0IDYwIDI4IDE2IDkwLjAxNiAyMi4wMTYgNTYgNCA4Mi4wMTYtMi4wMTYgNzYtMTYgMTIwLTc2IDQwLTU0LjAxNiA0Mi4wMTYtMTI4Ljk5MnQtMzYtMTM5LjAwOHEtNTQuMDE2LTEwNi4wMTYtMTY0LTE2Ni4wMTYtMTA0LTU2LTIyOC01NC4wMTYtMTI4LTIuMDE2LTIzNiA3MS4wMDh0LTE1NiAxOTUuMDA4eiIgcC1pZD0iMjQxNSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==)](https://microsoftedge.microsoft.com/addons/detail/hbagofhaigojgcjmonkaljffiebdkkdn)

## 安装

### 方式一：Marketplace / HACS（推荐）

1. 在 Home Assistant 的 **Marketplace**（或 HACS）中搜索 `bookmark`。
2. 点击「下载 / 安装」，等待完成后**重启 Home Assistant**。
3. 刷新页面，进入「设置 → 设备与服务 → 添加集成」，搜索 `bookmark` 并完成配置。

### 方式二：一键添加

点击下方按钮，会自动跳转并在你的 HA 中打开集成添加流程：

[![Add Integration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start?domain=bookmark)

### 方式三：手动安装

1. 下载本仓库，将 `custom_components/bookmark` 目录放到你的 HA 配置目录（即 `configuration.yaml` 所在目录）下。
2. **重启 Home Assistant**，再按方式一第 3 步添加集成。

> 集成添加后，侧边栏会出现「收藏夹」入口（勾选「仅管理员可见」时只对管理员显示）。

## 使用

- 顶部：`搜索收藏`、`添加收藏`、`添加文件夹`、以及 `···` 更多菜单（导入 / 导出 / 排序 / 展开折叠）。顶栏固定不随列表滚动，左侧文件夹树铺满可用高度并独立滚动。
- `添加收藏` / `添加文件夹` 都可在对话框里选择「分类」（显示完整路径，默认当前文件夹），添加后自动跳到所选分类；`添加文件夹` 选择「（顶层根目录）」、或还没有任何文件夹（分类为空）时，会直接创建为顶层根目录。
- 左侧是文件夹树，**根目录完全由用户自己创建（或从导入产生），不再预置固定的「收藏夹栏 / 其他收藏夹 / 移动设备收藏夹」**，可展开折叠。
- 条目行尾的 `···`：打开、复制链接、编辑、移动到…、删除；桌面端也可以右键行呼出同一菜单，移动端请用常显的 `···`。
- 桌面端拖动条目到文件夹行的中间可移入该文件夹；拖到文件夹行的上/下边缘可调整文件夹顺序（树和列表都支持，也支持跨父级重排），按名称/日期排序时会切回「自定义顺序」显示结果。移动端用 `···` →「移动到…」。

## 导入 / 导出

收藏数据采用浏览器通用的标准格式，可直接被浏览器导入或导出。

- **导入**：`···` 更多菜单 →「导入收藏…」，选择浏览器导出的文件后可选两种导入方式，**默认「合并导入」**：
  - **合并导入**：把外部浏览器导出的收藏按顶层根目录整体追加，HA 里已有的收藏保持不变——适合把外部浏览器导出的收藏汇入 HA。
  - **覆盖导入**：清空现有全部收藏，只保留文件中的内容（界面上会二次确认）。
  - 支持 Netscape Bookmark HTML（Edge / Chrome / Firefox 导出的 `favorites_*.html`）、Chrome / Edge Bookmarks JSON，以及旧版扁平 JSON 数组（仅导入兼容）。
- **导出**：可导出为标准书签 HTML（浏览器可直接导入）或 `Bookmarks.json`。
- **不做自动迁移**：首次使用按空收藏夹启动，已有数据请先整理成标准书签文件，再用上面的「导入收藏」导入。

## 预览

![pic](https://github.com/shaonianzhentan/image/raw/main/bookmark/1.png)

![pic](https://github.com/shaonianzhentan/image/raw/main/bookmark/2.png)


安装扩展插件后，可以快速收藏网页

![pic](https://github.com/shaonianzhentan/image/raw/main/bookmark/3.png)

## 如果这个项目对你有帮助，请我喝杯<del style="font-size: 14px;">咖啡</del>奶茶吧😘
|  |支付宝|微信|
|---|---|---|
| 奶茶= | <img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/alipay.png" align="left" height="160" width="160" alt="支付宝" title="支付宝">  |  <img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/wechat.png" height="160" width="160" alt="微信支付" title="微信">

## 关注我的微信订阅号，了解更多HomeAssistant相关知识
<img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/wechat-channel.png" height="160" alt="HomeAssistant家庭助理" title="HomeAssistant家庭助理">