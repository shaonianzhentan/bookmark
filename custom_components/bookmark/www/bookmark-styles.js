/**
 * 「网页收藏」面板样式（Shadow DOM 作用域）：全量适配 Home Assistant 主题。
 *
 * HA 把主题变量（--primary-color / --card-background-color / --ha-card-* …）
 * 写在 document 根节点上，CSS 自定义属性会继承穿透 Shadow DOM，所以这里只做
 * 「别名 + 兜底」：
 *   - 在 HA 里完全跟随当前主题（内置/自定义主题、浅色/深色切换即时生效，无需重绘逻辑）；
 *   - 在预览页 / 扩展独立页里没有 HA 变量时，用 --bm-f-* 兜底并跟随系统外观。
 * 视觉语言对齐 HA：ha-card 卡片、ha-button 按钮、ha-icon-button 圆形图标按钮、
 * ha-dialog 对话框、ha-menu 菜单，以及 HA 的排版令牌与滚动条。
 */
export const STYLES = `
:host {
  /* ---------------- 兜底值：仅在没有 HA 主题变量时生效 ---------------- */
  --bm-f-text: #212121;
  --bm-f-sub: #727272;
  --bm-f-bg: #fafafa;
  --bm-f-surface: #ffffff;
  --bm-f-line: #e0e0e0;
  --bm-f-primary: #03a9f4;
  --bm-f-primary-dark: #0288d1;
  --bm-f-danger: #db4437;
  --bm-f-hover: rgba(0, 0, 0, .06);
  --bm-f-scrim: rgba(0, 0, 0, .32);

  /* ---------------- 主题别名：HA 注入的变量优先 ---------------- */
  --bm-text: var(--primary-text-color, var(--bm-f-text));
  --bm-sub: var(--secondary-text-color, var(--bm-f-sub));
  --bm-bg: var(--primary-background-color, var(--bm-f-bg));
  --bm-surface: var(--ha-card-background, var(--card-background-color, var(--bm-f-surface)));
  --bm-sidebar: var(--sidebar-background-color, var(--bm-surface));
  --bm-sidebar-text: var(--sidebar-text-color, var(--bm-text));
  --bm-line: var(--divider-color, var(--bm-f-line));
  --bm-accent: var(--primary-color, var(--bm-f-primary));
  --bm-accent-hover: var(--dark-primary-color, var(--bm-f-primary-dark));
  --bm-on-accent: var(--text-primary-color, #ffffff);
  --bm-danger: var(--error-color, var(--bm-f-danger));
  --bm-on-danger: #ffffff;
  --bm-icon: var(--state-icon-color, var(--sidebar-icon-color, var(--bm-sub)));
  --bm-selected-text: var(--sidebar-selected-icon-color, var(--bm-accent));

  /* 叠加色：优先用 color-mix 跟随任意主题色；旧浏览器退到 HA 生成的 --rgb-primary-color */
  --bm-hover: var(--bm-f-hover);
  --bm-hover: var(--secondary-background-color, var(--bm-f-hover));
  --bm-hover: color-mix(in srgb, var(--bm-text) 9%, transparent);
  --bm-selected: rgba(var(--rgb-primary-color, 3, 169, 244), .14);
  --bm-selected: color-mix(in srgb, var(--bm-accent) 14%, transparent);

  /* ---------------- HA 设计令牌 ---------------- */
  --bm-font: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, "Roboto", "Noto Sans", "Segoe UI", "Microsoft YaHei UI", "Microsoft YaHei", system-ui, sans-serif));
  --bm-font-size: var(--ha-font-size-m, 14px);
  --bm-radius-card: var(--ha-card-border-radius, var(--ha-border-radius-lg, 12px));
  --bm-radius-control: var(--mdc-shape-small, var(--ha-border-radius-sm, 8px));
  --bm-radius-dialog: var(--ha-dialog-border-radius, var(--ha-border-radius-3xl, 28px));
  --bm-card-border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, var(--bm-f-line)));
  --bm-card-shadow: var(--ha-card-box-shadow, none);
  --bm-elevation: var(--dialog-box-shadow, var(--wa-shadow-l, 0 2px 8px rgba(0, 0, 0, .20)));
  --bm-scrim: var(--mdc-dialog-scrim-color, var(--bm-f-scrim));
  --bm-scrollbar: var(--scrollbar-thumb-color, var(--bm-f-line));

  display: block;
  height: 100%;
  min-height: 360px;
  color: var(--bm-text);
  font-family: var(--bm-font);
  font-size: var(--bm-font-size);
  line-height: var(--ha-line-height-normal, 1.5);
  -webkit-font-smoothing: var(--ha-font-smoothing, antialiased);
  /* 原生控件（select / 输入框 / 滚动条）配色：HA 内由 hass.themes.darkMode 显式覆盖 */
  color-scheme: light dark;
  accent-color: var(--bm-accent);
}

/* 只在 HA 变量不存在时让兜底值跟随系统外观。
   HA 里始终有主题变量，因此手动选择的主题不会被系统外观覆盖。 */
@media (prefers-color-scheme: dark) {
  :host {
    --bm-f-text: #e1e1e1;
    --bm-f-sub: #9b9b9b;
    --bm-f-bg: #111111;
    --bm-f-surface: #1c1c1c;
    --bm-f-line: rgba(255, 255, 255, .14);
    --bm-f-primary: #03a9f4;
    --bm-f-primary-dark: #4fc3f7;
    --bm-f-danger: #ef5350;
    --bm-f-hover: rgba(255, 255, 255, .08);
    --bm-f-scrim: rgba(0, 0, 0, .58);
  }
}

* { box-sizing: border-box; }
button, input, select { font: inherit; color: inherit; }
button { cursor: pointer; }
svg { display: block; width: 16px; height: 16px; flex: none; }

/* HA 风格的细滚动条，颜色跟随主题 */
.bm-tree, .bm-list {
  scrollbar-width: thin;
  scrollbar-color: var(--bm-scrollbar) transparent;
  /* 列表滚到头不要带动整个 HA 页面橡皮筋 */
  overscroll-behavior: contain;
}
.bm-tree::-webkit-scrollbar, .bm-list::-webkit-scrollbar { width: 8px; height: 8px; }
.bm-tree::-webkit-scrollbar-track, .bm-list::-webkit-scrollbar-track { background: transparent; }
.bm-tree::-webkit-scrollbar-thumb, .bm-list::-webkit-scrollbar-thumb {
  background: var(--bm-scrollbar);
  border-radius: 4px;
}

.bm-app {
  position: relative;
  display: flex;
  flex-direction: column;
  /* 父容器有确定高度（HA 面板 / 预览舞台）时精确铺满；父容器高度不确定时
     （页面整体滚动的 iframe / popup），百分比 min/max-height 退化为 none，
     由视口高度兜底。两种情况下 .bm-app 都有确定高度，因此顶栏固定、
     左右两栏各自内部滚动，不会变成整页滚动。 */
  height: 100vh;
  height: 100dvh;
  min-height: max(360px, 100%);
  max-height: 100%;
  background: var(--bm-bg);
  overflow: hidden;
}
/* clip 不建立滚动容器：外层真发生滚动时顶栏的 sticky 才会生效 */
@supports (overflow: clip) {
  .bm-app { overflow: clip; }
}

/* ------------------------------------------------------------ 顶部工具栏 */
.bm-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  /* 与 HA 顶栏 / 侧边栏头部同高（--header-height 由 HA 注入，含安全区外的高度），
     box-sizing 让那 1px 分隔线计入高度，确保和 HA 的下划线精确对齐 */
  height: var(--header-height, 56px);
  box-sizing: border-box;
  padding: 0 16px;
  /* 与 HA 自带 app-header 同底色 / 前景色，读起来像 HA 的二级工具栏 */
  background: var(--app-header-background-color, var(--bm-surface));
  color: var(--app-header-text-color, var(--bm-text));
  border-bottom: 1px solid var(--divider-color, var(--bm-line));
  flex: none;
  /* 列表/树内部滚动时顶栏本就不动；外层偶尔滚动时也钉在顶部 */
  position: sticky;
  top: 0;
  z-index: 15;
}
/* 面板顶栏只是工具栏：标题与 HA 侧边栏入口由 HA 自带的 app bar 提供 */
.bm-brand { display: flex; align-items: center; flex: none; }
.bm-brand .bm-folder-toggle { color: var(--bm-accent); }
.bm-app:not(.sidebar-collapsed) .bm-brand .bm-folder-toggle { background: var(--bm-hover); }

.bm-search {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  /* 允许收缩到 0：否则 input 的固有宽度会把右侧添加按钮挤出窄屏顶栏 */
  min-width: 0;
  max-width: 460px;
  height: 36px;
  padding: 0 10px;
  gap: 8px;
  border: 1px solid var(--bm-line);
  border-radius: var(--bm-radius-control);
  background: var(--input-fill-color, var(--bm-bg));
  transition: border-color .12s, box-shadow .12s;
}
.bm-search:focus-within { border-color: var(--bm-accent); box-shadow: 0 0 0 1px var(--bm-accent); }
.bm-search > svg { color: var(--bm-sub); width: 15px; height: 15px; }
.bm-search-input {
  flex: 1; min-width: 0; border: 0; outline: 0; background: transparent;
  font-size: var(--ha-font-size-m, 14px);
}
.bm-search-input::-webkit-search-cancel-button { display: none; }
.bm-search-clear {
  border: 0; background: transparent; color: var(--bm-sub);
  font-size: 18px; line-height: 1; padding: 0 2px;
}
.bm-search-clear[hidden] { display: none; }

/* 添加 / 更多按钮不参与收缩，窄屏只压缩搜索框 */
.bm-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; flex: none; }
.bm-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  min-height: 36px; padding: 0 14px;
  border: 1px solid var(--bm-line); border-radius: var(--bm-radius-control);
  background: transparent; color: var(--bm-accent);
  font-size: var(--ha-font-size-s, 13px);
  font-weight: var(--ha-font-weight-medium, 500);
  white-space: nowrap;
  transition: background .12s, border-color .12s;
}
.bm-btn:hover { background: var(--bm-hover); }
.bm-btn-primary {
  background: var(--bm-accent); border-color: transparent; color: var(--bm-on-accent);
}
.bm-btn-primary:hover { background: var(--bm-accent-hover); border-color: transparent; }
.bm-btn-danger { background: var(--bm-danger); border-color: transparent; color: var(--bm-on-danger); }
.bm-btn-danger:hover { filter: brightness(.92); background: var(--bm-danger); }
.bm-btn svg { width: 14px; height: 14px; }
.bm-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; flex: none;
  border: 0; border-radius: 50%; background: transparent; color: var(--bm-text);
  transition: background .12s;
}
.bm-icon-btn:hover { background: var(--bm-hover); }
/* 触屏没有 hover：用 :active 给行、按钮、菜单项补点击反馈 */
.bm-row:active, .bm-tree-row:active, .bm-menu-item:active { background: var(--bm-hover); }
.bm-btn:active, .bm-icon-btn:active { background: var(--bm-hover); }
.bm-icon-btn svg { width: 18px; height: 18px; }

/* 顶栏与 HA app-header 融合：控件用中性叠加色，任何 header 底色（浅/深/彩色）都能读 */
.bm-topbar .bm-btn {
  background: transparent;
  border-color: var(--divider-color, var(--bm-line));
  color: inherit;
}
.bm-topbar .bm-btn:hover { background: rgba(127, 127, 127, .16); background: color-mix(in srgb, currentColor 12%, transparent); }
.bm-topbar .bm-btn-primary {
  background: rgba(127, 127, 127, .16);
  border-color: transparent;
  color: inherit;
  font-weight: 600;
}
.bm-topbar .bm-btn-primary:hover { background: rgba(127, 127, 127, .24); }
.bm-topbar .bm-icon-btn { color: inherit; }
.bm-topbar .bm-icon-btn:hover { background: rgba(127, 127, 127, .16); background: color-mix(in srgb, currentColor 12%, transparent); }
.bm-topbar .bm-brand .bm-folder-toggle { color: inherit; }
.bm-topbar .bm-search {
  background: rgba(127, 127, 127, .14);
  border-color: transparent;
  color: inherit;
}
.bm-topbar .bm-search:focus-within {
  border-color: var(--primary-color, var(--bm-accent));
  box-shadow: 0 0 0 1px var(--primary-color, var(--bm-accent));
}
.bm-topbar .bm-search > svg { color: inherit; opacity: .7; }
.bm-topbar .bm-search-input { color: inherit; }
.bm-topbar .bm-search-input::placeholder { color: inherit; opacity: .6; }
.bm-topbar .bm-search-clear { color: inherit; opacity: .7; }

/* ------------------------------------------------------------ 主体布局 */
.bm-body { display: flex; flex: 1; min-height: 0; }
.bm-sidebar {
  display: flex; flex-direction: column;
  width: 272px; flex: none; min-height: 0;
  background: var(--bm-sidebar);
  color: var(--bm-sidebar-text);
  border-right: 1px solid var(--bm-line);
  transition: width .16s;
  overflow: hidden;
}
.bm-app.sidebar-collapsed .bm-sidebar { width: 0; border-right: 0; }
.bm-sidebar-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px 8px; flex: none;
  color: var(--bm-sub); font-size: var(--ha-font-size-xs, 12px);
  font-weight: var(--ha-font-weight-medium, 500); letter-spacing: .4px;
}
.bm-link { border: 0; background: transparent; color: var(--bm-accent); font-size: var(--ha-font-size-xs, 12px); padding: 2px 4px; }
.bm-link:hover { text-decoration: underline; }
.bm-tree { flex: 1; min-height: 0; overflow: auto; padding: 2px 8px 16px; }
.bm-sidebar-foot {
  flex: none; padding: 12px 16px; border-top: 1px solid var(--bm-line);
  color: var(--bm-sub); font-size: var(--ha-font-size-xs, 12px); line-height: 1.5;
}
.bm-hint-touch { display: none; }

/* 窄屏抽屉打开时，右侧盖一层遮罩：点遮罩即可关闭抽屉，避免误触主列表。
   左侧抽屉区域不盖，仍可正常点选文件夹。 */
.bm-drawer-scrim { display: none; }
:host(.narrow) .bm-app:not(.sidebar-collapsed) .bm-drawer-scrim {
  display: block; position: absolute; top: 0; bottom: 0; right: 0;
  left: min(272px, 84vw); z-index: 9;
  background: var(--bm-scrim);
}

.bm-tree-row {
  display: flex; align-items: center; gap: 6px;
  height: 34px; margin: 1px 0; padding-right: 8px;
  border-radius: var(--bm-radius-control); cursor: pointer; user-select: none;
  white-space: nowrap;
}
.bm-tree-row:hover { background: var(--bm-hover); }
.bm-tree-row.selected { background: var(--bm-selected); color: var(--bm-selected-text); font-weight: 600; }
.bm-tree-row.drop-target { outline: 2px solid var(--bm-accent); outline-offset: -2px; }
.bm-chevron {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; flex: none;
  border: 0; background: transparent; color: var(--bm-sub); border-radius: 4px;
  transition: transform .12s;
}
.bm-chevron svg { width: 12px; height: 12px; }
.bm-chevron.open { transform: rotate(90deg); }
.bm-chevron.empty { visibility: hidden; }
.bm-tree-ico { color: var(--bm-icon); flex: none; }
.bm-tree-row.selected .bm-tree-ico { color: var(--bm-selected-text); }
.bm-tree-ico svg { width: 16px; height: 16px; }
.bm-tree-label { overflow: hidden; text-overflow: ellipsis; flex: 1; }
.bm-tree-count { color: var(--bm-sub); font-size: var(--ha-font-size-xs, 12px); font-weight: 400; }

.bm-main { display: flex; flex-direction: column; flex: 1; min-width: 0; min-height: 0; }
.bm-crumbs {
  display: flex; align-items: center; gap: 2px; flex-wrap: wrap;
  min-height: 42px; padding: 8px 24px 0; flex: none;
  color: var(--bm-sub); font-size: var(--ha-font-size-xs, 12px);
}
.bm-crumb { border: 0; background: transparent; color: var(--bm-sub); padding: 2px 4px; border-radius: 4px; }
.bm-crumb:hover { color: var(--bm-accent); text-decoration: underline; }
.bm-crumb.current { color: var(--bm-text); font-weight: 600; }
.bm-crumb-static { padding: 2px 4px; }
.bm-crumb-sep { color: var(--bm-sub); opacity: .65; }
.bm-list-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4px 24px 12px; flex: none; gap: 12px;
}
.bm-list-title { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.bm-list-title h2 {
  margin: 0;
  font-size: var(--ha-font-size-xl, 20px);
  font-weight: var(--ha-font-weight-medium, 500);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.bm-list-title span { color: var(--bm-sub); font-size: var(--ha-font-size-xs, 12px); white-space: nowrap; }
.bm-list-tools { display: flex; gap: 2px; }

/* 与 ha-card 同款：主题背景、1px divider 边框、12px 圆角、主题阴影 */
.bm-list {
  flex: 1; min-height: 0; overflow: auto;
  margin: 0 24px 20px;
  padding: 6px;
  background: var(--bm-surface);
  border: var(--bm-card-border);
  border-radius: var(--bm-radius-card);
  box-shadow: var(--bm-card-shadow);
}
.bm-row {
  display: flex; align-items: center; gap: 12px;
  height: 48px; padding: 0 10px;
  border-radius: var(--bm-radius-control); cursor: pointer; user-select: none;
}
.bm-row:hover { background: var(--bm-hover); }
.bm-row.dragging { opacity: .45; }
.bm-row.drop-target { outline: 2px solid var(--bm-accent); outline-offset: -2px; }
.bm-fav {
  width: 22px; height: 22px; flex: none; object-fit: contain;
  border-radius: 4px;
}
.bm-fav-folder { display: inline-flex; align-items: center; justify-content: center; color: var(--bm-icon); }
.bm-fav-folder svg { width: 20px; height: 20px; }
.bm-row-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.bm-row-name { font-size: var(--ha-font-size-m, 14px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bm-row-url {
  color: var(--bm-sub); font-size: var(--ha-font-size-xs, 12px);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.bm-row-more {
  width: 32px; height: 32px; flex: none;
  border: 0; border-radius: 50%; background: transparent; color: var(--bm-text);
  display: inline-flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity .1s;
}
.bm-row:hover .bm-row-more, .bm-row-more:focus { opacity: 1; }
.bm-row-more:hover { background: var(--bm-hover); }

.bm-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; min-height: 260px; color: var(--bm-sub); text-align: center;
}
.bm-empty svg { width: 44px; height: 44px; opacity: .45; }
.bm-empty p { margin: 0; }
.bm-error { color: var(--bm-danger); }

/* ------------------------------------------------------------ 弹出菜单 */
.bm-menu-layer, .bm-dialog-layer { position: absolute; inset: 0; pointer-events: none; display: none; }
.bm-menu-layer.show, .bm-dialog-layer.show { display: block; }
.bm-menu-layer { z-index: 20; }
.bm-dialog-layer { z-index: 30; }
.bm-menu-layer.show, .bm-dialog-layer.show { pointer-events: none; }
.bm-menu {
  position: absolute; min-width: 210px; padding: 5px; white-space: nowrap;
  background: var(--bm-surface); color: var(--bm-text);
  border: var(--bm-card-border); border-radius: var(--bm-radius-control);
  box-shadow: var(--bm-elevation);
  pointer-events: auto;
}
.bm-menu-item {
  display: flex; align-items: center; gap: 10px; width: 100%;
  min-height: 36px; padding: 0 10px;
  border: 0; border-radius: var(--bm-radius-control); background: transparent; text-align: left;
  font-size: var(--ha-font-size-s, 13px);
}
.bm-menu-item:hover { background: var(--bm-hover); }
.bm-menu-item.danger { color: var(--bm-danger); }
.bm-menu-item svg { width: 16px; height: 16px; color: var(--bm-sub); }
.bm-menu-item.danger svg { color: var(--bm-danger); }
.bm-menu-item > span:not(.bm-menu-spacer) { flex: 1; }
.bm-menu-item small { color: var(--bm-accent); font-size: 12px; min-width: 14px; text-align: center; }
.bm-menu-spacer { width: 15px; height: 15px; flex: none; }
.bm-menu-sep { height: 1px; margin: 5px 6px; background: var(--bm-line); }
.bm-menu-check { color: var(--bm-accent); font-size: 13px; }

/* ------------------------------------------------------------ 对话框（ha-dialog 观感） */
.bm-overlay {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: var(--bm-scrim); pointer-events: auto;
}
.bm-dialog {
  width: min(560px, calc(100% - 32px));
  padding: 24px;
  background: var(--ha-dialog-surface-background, var(--bm-surface)); color: var(--bm-text);
  border-radius: var(--bm-radius-dialog);
  box-shadow: var(--bm-elevation);
}
.bm-dialog h3 {
  margin: 0 0 6px;
  font-size: var(--ha-dialog-header-title-font-size, var(--ha-font-size-2xl, 24px));
  font-weight: var(--ha-dialog-header-title-font-weight, var(--ha-font-weight-normal, 400));
  line-height: var(--ha-line-height-condensed, 1.2);
}
.bm-dialog-text { margin: 0 0 12px; color: var(--bm-sub); font-size: var(--ha-font-size-s, 13px); line-height: 1.6; }
.bm-dialog-body { display: flex; flex-direction: column; gap: 12px; margin: 16px 0 24px; }
.bm-field { display: flex; flex-direction: column; gap: 5px; font-size: var(--ha-font-size-s, 13px); }
.bm-field > span { color: var(--bm-sub); }
/* 与 ha-textfield 同款：描边输入框、主题焦点色 */
.bm-field input, .bm-field select {
  min-height: 40px; padding: 0 12px;
  border: 1px solid var(--input-idle-line-color, var(--bm-line)); border-radius: var(--bm-radius-control);
  background: var(--input-fill-color, transparent); color: var(--bm-text); outline: 0;
}
.bm-field select option { background: var(--bm-surface); color: var(--bm-text); }
.bm-field input:focus, .bm-field select:focus { border-color: var(--bm-accent); box-shadow: 0 0 0 1px var(--bm-accent); }
.bm-field input[type="file"] { height: auto; min-height: 40px; padding: 6px 8px; font-size: 12px; }
.bm-field input[type="file"]::file-selector-button {
  margin-right: 10px; padding: 4px 10px;
  border: 1px solid var(--bm-line); border-radius: var(--bm-radius-control);
  background: var(--bm-surface); color: var(--bm-text); cursor: pointer;
}
.bm-field-hint { margin: 0; color: var(--bm-sub); font-size: var(--ha-font-size-xs, 12px); line-height: 1.6; }
.bm-dialog-foot { display: flex; justify-content: flex-end; gap: 8px; }

/* ------------------------------------------------------------ 提示条 */
.bm-toast {
  position: absolute; left: 50%; bottom: 24px; transform: translate(-50%, 12px);
  min-width: 180px; max-width: 80%; padding: 10px 16px;
  background: var(--ha-toast-background-color, #323232); color: #fff;
  border-radius: var(--bm-radius-control);
  box-shadow: var(--bm-elevation); font-size: var(--ha-font-size-s, 13px); text-align: center;
  opacity: 0; pointer-events: none; transition: opacity .18s, transform .18s;
  z-index: 40;
}
.bm-toast.show { opacity: 1; transform: translate(-50%, 0); }
.bm-toast.error { background: var(--bm-danger); color: var(--bm-on-danger); }

/* ------------------------------------------------------------ 响应式 */
/* 触屏没有 hover，行尾的 ··· 必须常显；侧栏提示也换成触屏可用的操作路径 */
@media (hover: none) {
  .bm-row-more { opacity: 1; width: 32px; height: 32px; }
  .bm-hint-desktop { display: none; }
  .bm-hint-touch { display: inline; }
  /* iOS WebView 中输入框字号 < 16px 会在聚焦时放大整页，提到 16px 规避 */
  .bm-search-input { font-size: 16px; }
  .bm-field input, .bm-field select { font-size: 16px; }
}
:host(.narrow) .bm-sidebar { position: absolute; top: var(--header-height, 56px); bottom: 0; left: 0; z-index: 10; width: min(272px, 84vw); box-shadow: var(--bm-elevation); }
:host(.narrow) .bm-app.sidebar-collapsed .bm-sidebar { width: 0; border-right: 0; box-shadow: none; }
/* 窄屏只留图标：省下的空间全让给搜索框，保证「添加收藏 / 添加文件夹 / 更多」不被裁切 */
:host(.narrow) .bm-topbar { padding: 10px; gap: 8px; }
:host(.narrow) .bm-btn span.bm-btn-label { display: none; }
:host(.narrow) .bm-btn { padding: 0 8px; min-width: 36px; }
:host(.narrow) .bm-search { padding: 0 8px; gap: 6px; }
:host(.narrow) .bm-actions { gap: 6px; }
/* 搜索获得焦点时临时收起右侧操作，把宽度全让给搜索框；失焦后自动还原 */
:host(.narrow) .bm-search:focus-within { max-width: none; }
:host(.narrow) .bm-search:focus-within ~ .bm-actions { display: none; }
:host(.narrow) .bm-list { margin: 0 12px 12px; }
:host(.narrow) .bm-list-head, :host(.narrow) .bm-crumbs { padding-left: 12px; padding-right: 12px; }
:host(.narrow) .bm-menu { max-width: calc(100vw - 24px); }
:host(.narrow) .bm-row-more { opacity: 1; width: 32px; height: 32px; }
:host(.narrow) .bm-hint-desktop { display: none; }
:host(.narrow) .bm-hint-touch { display: inline; }

@media (prefers-reduced-motion: reduce) {
  .bm-app *, .bm-app *::before, .bm-app *::after { transition-duration: 0s; animation-duration: 0s; }
}
`;
