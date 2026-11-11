# bookmark

Home Assistant 里的「收藏夹」面板。参考 Microsoft Edge 收藏夹管理器复刻，支持文件夹树、搜索、拖放移动、编辑/删除、以及浏览器标准收藏数据的导入导出。

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

## 标准收藏数据（原数据）

原数据直接采用浏览器通用的标准收藏格式，**所有格式转换都在 Python 侧 `convert.py` 完成**，前端 JS 不解析任何收藏文件，只负责展示与交互。

**落盘文件**：`<HA 配置目录>/.storage/bookmark.html`，内容就是标准的 Netscape Bookmark HTML，和 Edge 导出的 `favorites_2026_11_9.html` 是同一种格式，可直接被浏览器导入：

```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="..." LAST_MODIFIED="...">常用工具</H3>
    <DL><p>
        <DT><A HREF="https://example.com" ADD_DATE="...">示例</A>
    </DL><p>
    <DT><H3 ...>新闻</H3><DL><p></DL><p>
</DL><p>
```

顶层 `<H3>` 即根目录，数量不限、名称任意。`parse_netscape_html` 会把每个顶层文件夹转成标准收藏树里的一个根目录（`roots` 是文件夹节点数组，节点 `type=url|folder`）；顶层散落的网址会归入「其他收藏夹」根目录。写文件时用 `to_netscape_html` 把所有根目录序列化回 HTML。这个树只存在于内存和 REST 接口里，前端拿到的就是它。

标准 HTML 没有节点 id / guid 字段，因此每次从文件读入会重新生成 id 与 guid，`ADD_DATE` 的时间精度为秒；这不影响使用（UI 每次都以后端返回的树为准）。

- **导入**：`···` 更多菜单 →「导入收藏…」，选择浏览器导出的文件后可选两种导入方式，**默认「合并导入」**：
  - **合并导入**：把外部浏览器导出的收藏按顶层根目录整体追加（不再强制映射到固定根），HA 里已有的收藏保持不变——适合把外部浏览器导出的收藏汇入 HA。
  - **覆盖导入**：清空现有全部收藏，只保留文件中的内容（界面上会二次确认）。
  支持 Netscape Bookmark HTML（Edge / Chrome / Firefox 导出的 `favorites_*.html`）、Chrome / Edge Bookmarks JSON，以及旧版扁平 JSON 数组（仅导入兼容）。前端只把文件内容原样提交，识别、转换、合并/覆盖、落盘都在 Python 完成。
- **导出**：由 Python 生成 `favorites_2026_11_9.html`（与落盘文件同样的标准 HTML，浏览器可直接导入）或 `Bookmarks.json`。
- **不做自动迁移**：`.storage/bookmark.html` 不存在时按空收藏夹启动，组件不会读取或改动任何其它文件。已有数据请先整理成标准书签文件，再用上面的「导入收藏」导入。

### 接口

| 方法与路径 | 说明 |
| --- | --- |
| `GET /api/bookmark` | 读取整份标准收藏文档 |
| `POST /api/bookmark` | 保存整份标准收藏文档（Python 负责补全 id / guid / 时间并规整） |
| `POST /api/bookmark/import` | body `{filename, content, mode}`，`mode=merge`（默认）/ `replace`；Python 转换 + 合并或覆盖 + 落盘，返回 `{doc, count, mode}` |
| `GET /api/bookmark/export?format=html\|json` | 返回由 Python 生成的标准书签 HTML（默认，与 `bookmark.html` 同格式）或 `Bookmarks.json` 文本 |

## 开发说明

本项目**没有独立前端工程，也不需要构建**。面板是 HA 原生自定义面板（`panel_custom` 的 `module_url`）。

Python 侧：

| 文件 | 职责 |
| --- | --- |
| `convert.py` | 标准数据模型与全部转换：HTML ↔ 树、JSON ↔ 树、节点规整、合并/覆盖导入、导出序列化 |
| `http.py` | 读写 `.storage/bookmark.html`（读时转树、写时转 HTML）+ 上面四个 REST 接口 |
| `__init__.py` / `config_flow.py` / `const.py` | 面板注册、配置流、常量 |

前端只是 `custom_components/bookmark/www/` 下的 3 个原生 ES 模块：

| 文件 | 职责 |
| --- | --- |
| `bookmark-model.js` | UI 所需的树操作（查找、增删改移动、搜索、排序）与 HTML 转义 |
| `bookmark-styles.js` | 面板样式（Shadow DOM 作用域，全量适配 HA 主题变量与 HA 组件观感） |
| `bookmark-panel.js` | `<bookmark-panel>` 自定义元素与页面交互 |

修改 JS 后刷新浏览器即可生效；发布新版本时请同步 `const.py` 与 `manifest.json` 里的 `VERSION`，用于刷新模块缓存。

### 主题

面板不写死任何颜色：文字/背景/分隔线/主色/错误色、卡片圆角与边框、对话框与按钮，全部映射到 HA 注入的 CSS 变量（`--primary-color`、`--primary-text-color`、`--card-background-color`、`--ha-card-*`、`--ha-dialog-*`、`--error-color`、HA 字体与字号令牌等）。这些变量会继承穿透 Shadow DOM，因此内置主题、自定义主题、浅色/深色切换都会即时生效；原生控件配色由面板按 `hass.themes.darkMode` 设置 `color-scheme`。在 HA 之外（预览页 / 独立页）没有这些变量时才回退到内置浅/深色值，并跟随系统外观。`preview.html` 会内联同一份 STYLES，勾选「HA 深色主题」即可验证主题切换。

## 如果这个项目对你有帮助，请我喝杯<del style="font-size: 14px;">咖啡</del>奶茶吧😘
|  |支付宝|微信|
|---|---|---|
| 奶茶= | <img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/alipay.png" align="left" height="160" width="160" alt="支付宝" title="支付宝">  |  <img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/wechat.png" height="160" width="160" alt="微信支付" title="微信">

## 关注我的微信订阅号，了解更多HomeAssistant相关知识
<img src="https://cdn.jsdelivr.net/gh/shaonianzhentan/ha-docs@master/docs/img/wechat-channel.png" height="160" alt="HomeAssistant家庭助理" title="HomeAssistant家庭助理">

---
**在使用的过程之中，如果遇到无法解决的问题，付费咨询请加Q`635147515`**
