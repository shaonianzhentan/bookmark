/** Edge 网页收藏管理器风格样式（作用域在自定义元素的 Shadow DOM 内） */
export const STYLES = `
:host {
  --bm-text: var(--primary-text-color, #1b1b1f);
  --bm-sub: var(--secondary-text-color, #616169);
  --bm-bg: var(--primary-background-color, #f3f3f6);
  --bm-surface: var(--card-background-color, #ffffff);
  --bm-sidebar: var(--card-background-color, #fbfbfc);
  --bm-line: var(--divider-color, #e3e3e8);
  --bm-hover: rgba(125, 125, 135, .11);
  --bm-selected: #e8f1fb;
  --bm-selected-text: #0f4c8a;
  --bm-accent: #0f6cbd;
  --bm-accent-hover: #115ea3;
  --bm-danger: #c42b1c;
  --bm-shadow: 0 8px 24px rgba(0, 0, 0, .16), 0 1px 3px rgba(0, 0, 0, .10);
  --bm-font: "Segoe UI Variable", "Segoe UI", "Microsoft YaHei UI", "Microsoft YaHei", system-ui, -apple-system, sans-serif;

  display: block;
  height: 100%;
  min-height: 360px;
  color: var(--bm-text);
  font-family: var(--bm-font);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-color-scheme: dark) {
  :host {
    --bm-text: var(--primary-text-color, #f2f2f4);
    --bm-sub: var(--secondary-text-color, #a6a6ad);
    --bm-bg: var(--primary-background-color, #202124);
    --bm-surface: var(--card-background-color, #292a2d);
    --bm-sidebar: var(--card-background-color, #252629);
    --bm-line: var(--divider-color, #3c3d41);
    --bm-selected: rgba(79, 156, 249, .20);
    --bm-selected-text: #9ccbff;
    --bm-accent: #4f9cf9;
    --bm-accent-hover: #68aafb;
  }
}

* { box-sizing: border-box; }
button, input, select { font: inherit; color: inherit; }
button { cursor: pointer; }
svg { display: block; width: 16px; height: 16px; flex: none; }

.bm-app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 360px;
  background: var(--bm-bg);
  overflow: hidden;
}

/* ------------------------------------------------------------ 顶部工具栏 */
.bm-topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 60px;
  padding: 10px 20px;
  background: var(--bm-surface);
  border-bottom: 1px solid var(--bm-line);
  flex: none;
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
  max-width: 460px;
  height: 34px;
  padding: 0 10px;
  gap: 8px;
  border: 1px solid var(--bm-line);
  border-radius: 6px;
  background: var(--bm-bg);
  transition: border-color .12s, box-shadow .12s;
}
.bm-search:focus-within { border-color: var(--bm-accent); box-shadow: 0 0 0 1px var(--bm-accent); }
.bm-search > svg { color: var(--bm-sub); width: 15px; height: 15px; }
.bm-search-input {
  flex: 1; min-width: 0; border: 0; outline: 0; background: transparent;
  font-size: 13px;
}
.bm-search-input::-webkit-search-cancel-button { display: none; }
.bm-search-clear {
  border: 0; background: transparent; color: var(--bm-sub);
  font-size: 18px; line-height: 1; padding: 0 2px;
}
.bm-search-clear[hidden] { display: none; }

.bm-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.bm-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  min-height: 32px; padding: 0 12px;
  border: 1px solid var(--bm-line); border-radius: 6px;
  background: var(--bm-surface); color: var(--bm-text);
  font-size: 12.5px; white-space: nowrap;
  transition: background .12s, border-color .12s;
}
.bm-btn:hover { background: var(--bm-hover); }
.bm-btn-primary {
  background: var(--bm-accent); border-color: var(--bm-accent); color: #fff;
}
.bm-btn-primary:hover { background: var(--bm-accent-hover); border-color: var(--bm-accent-hover); }
.bm-btn-danger { background: var(--bm-danger); border-color: var(--bm-danger); color: #fff; }
.bm-btn-danger:hover { filter: brightness(.92); background: var(--bm-danger); }
.bm-btn svg { width: 14px; height: 14px; }
.bm-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; flex: none;
  border: 0; border-radius: 6px; background: transparent; color: var(--bm-text);
}
.bm-icon-btn:hover { background: var(--bm-hover); }
.bm-icon-btn svg { width: 17px; height: 17px; }

/* ------------------------------------------------------------ 主体布局 */
.bm-body { display: flex; flex: 1; min-height: 0; }
.bm-sidebar {
  display: flex; flex-direction: column;
  width: 272px; flex: none;
  background: var(--bm-sidebar);
  border-right: 1px solid var(--bm-line);
  transition: width .16s;
  overflow: hidden;
}
.bm-app.sidebar-collapsed .bm-sidebar { width: 0; border-right: 0; }
.bm-sidebar-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px 8px; flex: none;
  color: var(--bm-sub); font-size: 12px; font-weight: 600; letter-spacing: .4px;
}
.bm-link { border: 0; background: transparent; color: var(--bm-accent); font-size: 12px; padding: 2px 4px; }
.bm-link:hover { text-decoration: underline; }
.bm-tree { flex: 1; overflow: auto; padding: 2px 8px 16px; }
.bm-sidebar-foot {
  flex: none; padding: 12px 16px; border-top: 1px solid var(--bm-line);
  color: var(--bm-sub); font-size: 11.5px; line-height: 1.5;
}

.bm-tree-row {
  display: flex; align-items: center; gap: 6px;
  height: 32px; margin: 1px 0; padding-right: 8px;
  border-radius: 6px; cursor: pointer; user-select: none;
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
.bm-tree-ico { color: var(--bm-accent); flex: none; }
.bm-tree-ico svg { width: 15px; height: 15px; }
.bm-tree-label { overflow: hidden; text-overflow: ellipsis; flex: 1; }
.bm-tree-count { color: var(--bm-sub); font-size: 11px; font-weight: 400; }

.bm-main { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.bm-crumbs {
  display: flex; align-items: center; gap: 2px; flex-wrap: wrap;
  min-height: 42px; padding: 8px 24px 0; flex: none;
  color: var(--bm-sub); font-size: 12px;
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
.bm-list-title h2 { margin: 0; font-size: 20px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bm-list-title span { color: var(--bm-sub); font-size: 12px; white-space: nowrap; }
.bm-list-tools { display: flex; gap: 2px; }

.bm-list {
  flex: 1; min-height: 0; overflow: auto;
  margin: 0 24px 20px;
  padding: 6px;
  background: var(--bm-surface);
  border: 1px solid var(--bm-line);
  border-radius: 8px;
}
.bm-row {
  display: flex; align-items: center; gap: 12px;
  height: 48px; padding: 0 10px;
  border-radius: 6px; cursor: pointer; user-select: none;
}
.bm-row:hover { background: var(--bm-hover); }
.bm-row.dragging { opacity: .45; }
.bm-row.drop-target { outline: 2px solid var(--bm-accent); outline-offset: -2px; }
.bm-fav {
  width: 22px; height: 22px; flex: none; object-fit: contain;
  border-radius: 4px;
}
.bm-fav-folder { display: inline-flex; align-items: center; justify-content: center; color: var(--bm-accent); }
.bm-fav-folder svg { width: 20px; height: 20px; }
.bm-row-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.bm-row-name { font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bm-row-url {
  color: var(--bm-sub); font-size: 11.5px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.bm-row-more {
  width: 28px; height: 28px; flex: none;
  border: 0; border-radius: 5px; background: transparent; color: var(--bm-text);
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
  border: 1px solid var(--bm-line); border-radius: 8px;
  box-shadow: var(--bm-shadow);
  pointer-events: auto;
}
.bm-menu-item {
  display: flex; align-items: center; gap: 10px; width: 100%;
  min-height: 32px; padding: 0 10px;
  border: 0; border-radius: 5px; background: transparent; text-align: left;
  font-size: 12.5px;
}
.bm-menu-item:hover { background: var(--bm-hover); }
.bm-menu-item.danger { color: var(--bm-danger); }
.bm-menu-item svg { width: 15px; height: 15px; color: var(--bm-sub); }
.bm-menu-item.danger svg { color: var(--bm-danger); }
.bm-menu-item > span:not(.bm-menu-spacer) { flex: 1; }
.bm-menu-item small { color: var(--bm-accent); font-size: 12px; min-width: 14px; text-align: center; }
.bm-menu-spacer { width: 15px; height: 15px; flex: none; }
.bm-menu-sep { height: 1px; margin: 5px 6px; background: var(--bm-line); }
.bm-menu-check { color: var(--bm-accent); font-size: 13px; }

/* ------------------------------------------------------------ 对话框 */
.bm-overlay {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(0, 0, 0, .32); pointer-events: auto;
}
.bm-dialog {
  width: min(420px, calc(100% - 32px));
  padding: 22px 24px 18px;
  background: var(--bm-surface); color: var(--bm-text);
  border: 1px solid var(--bm-line); border-radius: 10px;
  box-shadow: var(--bm-shadow);
}
.bm-dialog h3 { margin: 0 0 6px; font-size: 17px; font-weight: 600; }
.bm-dialog-text { margin: 0 0 12px; color: var(--bm-sub); font-size: 12.5px; line-height: 1.6; }
.bm-dialog-body { display: flex; flex-direction: column; gap: 12px; margin: 14px 0 20px; }
.bm-field { display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; }
.bm-field > span { color: var(--bm-sub); }
.bm-field input, .bm-field select {
  height: 34px; padding: 0 10px;
  border: 1px solid var(--bm-line); border-radius: 6px;
  background: var(--bm-bg); color: var(--bm-text); outline: 0;
}
.bm-field select option { background: var(--bm-surface); color: var(--bm-text); }
.bm-field input:focus, .bm-field select:focus { border-color: var(--bm-accent); box-shadow: 0 0 0 1px var(--bm-accent); }
.bm-field input[type="file"] { height: auto; min-height: 34px; padding: 6px 8px; font-size: 12px; }
.bm-field input[type="file"]::file-selector-button {
  margin-right: 10px; padding: 4px 10px;
  border: 1px solid var(--bm-line); border-radius: 5px;
  background: var(--bm-surface); color: var(--bm-text); cursor: pointer;
}
.bm-field-hint { margin: 0; color: var(--bm-sub); font-size: 11.5px; line-height: 1.6; }
.bm-dialog-foot { display: flex; justify-content: flex-end; gap: 8px; }

/* ------------------------------------------------------------ 提示条 */
.bm-toast {
  position: absolute; left: 50%; bottom: 24px; transform: translate(-50%, 12px);
  min-width: 180px; max-width: 80%; padding: 10px 16px;
  background: #323130; color: #fff; border-radius: 6px;
  box-shadow: var(--bm-shadow); font-size: 12.5px; text-align: center;
  opacity: 0; pointer-events: none; transition: opacity .18s, transform .18s;
  z-index: 40;
}
.bm-toast.show { opacity: 1; transform: translate(-50%, 0); }
.bm-toast.error { background: var(--bm-danger); }

/* ------------------------------------------------------------ 响应式 */
:host(.narrow) .bm-sidebar { position: absolute; top: 60px; bottom: 0; left: 0; z-index: 10; width: min(272px, 84vw); box-shadow: var(--bm-shadow); }
:host(.narrow) .bm-app.sidebar-collapsed .bm-sidebar { width: 0; border-right: 0; box-shadow: none; }
:host(.narrow) .bm-topbar { padding: 10px 12px; gap: 10px; }
:host(.narrow) .bm-btn span.bm-btn-label { display: none; }
:host(.narrow) .bm-btn { padding: 0 8px; }
:host(.narrow) .bm-list { margin: 0 12px 12px; }
:host(.narrow) .bm-list-head, :host(.narrow) .bm-crumbs { padding-left: 12px; padding-right: 12px; }
:host(.narrow) .bm-menu { max-width: calc(100vw - 24px); }
`;
