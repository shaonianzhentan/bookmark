/**
 * HA 原生自定义面板：Edge 浏览器「收藏」管理器页面复刻
 *
 * 由 panel_custom 的 module_url 以 ES 模块方式加载；
 * 元素标签为 bookmark-panel，HA 会把 hass / narrow / route / panel 赋到实例上。
 * 数据读写走 /api/bookmark，标准收藏数据的转换全部由 Python 侧 convert.py 完成。
 */
import { STYLES } from './bookmark-styles.js';
import {
  addNode,
  addRoot,
  emptyDocument,
  ensureDocument,
  escapeHtml,
  findNode,
  moveNode,
  removeNode,
  searchAll,
  sortNodes,
  updateNode,
  walkNodes,
} from './bookmark-model.js';

const svg = (body) => `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">${body}</svg>`;

const ICONS = {
  brand: svg('<path d="M4 1.4h8a1.1 1.1 0 0 1 1.1 1.1v12L8 11.6 2.9 14.5v-12A1.1 1.1 0 0 1 4 1.4Z"/>'),
  menu: svg('<path d="M2 3.4h12v1.3H2zm0 3.9h12v1.3H2zm0 3.9h12v1.3H2z"/>'),
  search: svg('<path d="M6.8 1.8a5 5 0 1 0 3.06 8.95l3.2 3.2.92-.92-3.2-3.2A5 5 0 0 0 6.8 1.8Zm0 1.3a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4Z"/>'),
  plus: svg('<path d="M7.1 2.2h1.8v4.9h4.9v1.8H8.9v4.9H7.1V8.9H2.2V7.1h4.9z"/>'),
  folderPlus: svg('<path d="M1.5 3.6A1.6 1.6 0 0 1 3.1 2h3l1.4 1.5h6.4A1.6 1.6 0 0 1 15.5 5v7.4a1.6 1.6 0 0 1-1.6 1.6H3.1a1.6 1.6 0 0 1-1.6-1.6V3.6Zm1.3 0v8.8c0 .17.13.3.3.3h10.8a.3.3 0 0 0 .3-.3V5a.3.3 0 0 0-.3-.3H7L5.6 3.2H3.1a.3.3 0 0 0-.3.4Z"/><path d="M7.35 6.3h1.3V8.5h2.2v1.3H8.65v2.2h-1.3V9.8h-2.2V8.5h2.2z"/>'),
  folder: svg('<path d="M1.5 3.6A1.6 1.6 0 0 1 3.1 2h3l1.4 1.5h6.4A1.6 1.6 0 0 1 15.5 5v7.4a1.6 1.6 0 0 1-1.6 1.6H3.1a1.6 1.6 0 0 1-1.6-1.6V3.6Zm1.3 0v8.8c0 .17.13.3.3.3h10.8a.3.3 0 0 0 .3-.3V5a.3.3 0 0 0-.3-.3H7L5.6 3.2H3.1a.3.3 0 0 0-.3.4Z"/>'),
  chevron: svg('<path d="M5.7 2.8 10.6 8l-4.9 5.2-.95-.9L8.7 8 4.75 3.7z"/>'),
  more: svg('<circle cx="3" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="13" cy="8" r="1.25"/>'),
  ha: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.018 2.018a1.7 1.7 0 0 0-1.206.498l-8.296 8.296a1.7 1.7 0 0 0-.498 1.206v7.696c0 .94.766 1.705 1.705 1.705h6.396v-6.397h3.397v6.397h6.396a1.7 1.7 0 0 0 1.705-1.705v-7.696a1.7 1.7 0 0 0-.498-1.206l-8.296-8.296a1.7 1.7 0 0 0-1.187-.5z"/></svg>',
  sort: svg('<path d="M2 3.4h12v1.3H2zm0 3.9h9v1.3H2zm0 3.9h6v1.3H2z"/>'),
  open: svg('<path d="M8.5 2H14v5.5h-1.3V4.35L8.1 9l-.92-.92 4.65-4.65H8.5zM12.5 9.5v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3V2h-3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3z"/>'),
  copy: svg('<path d="M5.5 1.5h7a1 1 0 0 1 1 1v9h-1.3V2.8H5.5zM3.5 4h7a1 1 0 0 1 1 1v9.5H3.5zM4.8 5.3v8h5.4v-8z"/>'),
  edit: svg('<path d="M12.7 1.6a1 1 0 0 1 1.4 0l.3.3a1 1 0 0 1 0 1.4l-1.3 1.3-2-2 1.6-1Zm-1.5 4.1-2-2-7 7-.4 2.7 2.7-.4 6.7-7.3Z"/>'),
  trash: svg('<path d="M6 2h4l.4 1H13v1.2H3V3h2.6L6 2ZM4.2 5.3h7.6l-.6 8.2a1 1 0 0 1-1 .9H5.8a1 1 0 0 1-1-.9l-.6-8.2Zm2 1.2.4 6.4h.9l-.4-6.4H6.2Zm2.8 0-.4 6.4h.9l.4-6.4H9z"/>'),
  move: svg('<path d="M1.5 3.6A1.6 1.6 0 0 1 3.1 2h3l1.4 1.5h6.4a1.6 1.6 0 0 1 1.6 1.6v2.2h-1.3V5a.3.3 0 0 0-.3-.3H7L5.6 3.2H3.1a.3.3 0 0 0-.3.3v7.9c0 .17.13.3.3.3H6v1.3H3.1a1.6 1.6 0 0 1-1.6-1.6V3.6Z"/><path d="M8.8 7h5.4l-1.5-1.5.9-.9 3 3-3 3-.9-.9 1.5-1.5H8.8z"/>'),
  upload: svg('<path d="m8 1.5 4.2 4.2-1.1 1.1L8.8 4.5v6.8H7.2V4.5L4.9 6.8 3.8 5.7 8 1.5ZM2.5 12h11v2.5h-11z"/>'),
  download: svg('<path d="M7.2 1.5h1.6v6.8l2.3-2.3 1.1 1.1L8 11.3 3.8 7.1l1.1-1.1 2.3 2.3V1.5ZM2.5 12h11v2.5h-11z"/>'),
};

// 与浏览器扩展（ha-extension）约定的通信协议：
// 面板在扩展的 iframe 内时，扩展会把「当前活动标签页」的标题/网址推过来，
// 用于预填“添加收藏夹”对话框；直接在 HA 中使用时不会触发。
const EXT_MSG = {
  HELLO: 'HA_EXT_HELLO',
  READY: 'HA_EXT_READY',
  REQUEST: 'HA_EXT_CURRENT_TAB_REQUEST',
  CURRENT_TAB: 'HA_EXT_CURRENT_TAB',
};

const DEFAULT_FAVICON = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">'
  + '<circle cx="8" cy="8" r="6.4" fill="none" stroke="#8a8886" stroke-width="1.2"/>'
  + '<path d="M1.6 8h12.8M8 1.6c2.1 2.1 2.1 10.7 0 12.8M8 1.6c-2.1 2.1-2.1 10.7 0 12.8" fill="none" stroke="#8a8886" stroke-width="1"/>'
  + '</svg>'
);

const TEMPLATE = `
<div class="bm-app">
  <header class="bm-topbar">
    <button class="bm-icon-btn bm-ha-menu" data-act="ha-menu" title="显示/隐藏 Home Assistant 侧边栏">${ICONS.ha}</button>
    <div class="bm-brand">
      <button class="bm-btn bm-folder-toggle" data-act="toggle-sidebar" title="显示/隐藏文件夹列表">${ICONS.folder}<span class="bm-btn-label">文件夹</span></button>
    </div>
    <div class="bm-search">
      ${ICONS.search}
      <input class="bm-search-input" type="search" placeholder="搜索收藏夹" autocomplete="off" spellcheck="false" />
      <button class="bm-search-clear" data-act="clear-search" title="清除搜索" hidden>&times;</button>
    </div>
    <div class="bm-actions">
      <button class="bm-btn" data-act="add-url" title="添加收藏夹">${ICONS.plus}<span class="bm-btn-label">添加收藏夹</span></button>
      <button class="bm-btn" data-act="add-folder" title="添加文件夹">${ICONS.folderPlus}<span class="bm-btn-label">添加文件夹</span></button>
      <button class="bm-icon-btn" data-act="more" title="更多选项">${ICONS.more}</button>
    </div>
  </header>

  <div class="bm-body">
    <aside class="bm-sidebar">
      <div class="bm-sidebar-head"><span>文件夹</span><button class="bm-link" data-act="collapse-all">全部折叠</button></div>
      <div class="bm-tree" id="tree"></div>
      <div class="bm-sidebar-foot">
        <span class="bm-hint-desktop">拖动条目到文件夹即可移动；点行尾 ··· 查看更多操作。</span>
        <span class="bm-hint-touch">点行尾 ··· 可编辑、用「移动到…」调整分类或删除。</span>
      </div>
    </aside>

    <main class="bm-main">
      <div class="bm-crumbs" id="crumbs"></div>
      <div class="bm-list-head">
        <div class="bm-list-title"><h2 id="folderTitle"></h2><span id="folderCount"></span></div>
        <div class="bm-list-tools">
          <button class="bm-icon-btn" data-act="sort" title="排序方式">${ICONS.sort}</button>
          <button class="bm-icon-btn" data-act="more" title="更多选项">${ICONS.more}</button>
        </div>
      </div>
      <div class="bm-list" id="list"></div>
    </main>
  </div>

  <div class="bm-menu-layer" id="menuLayer"></div>
  <div class="bm-dialog-layer" id="dialogLayer"></div>
  <div class="bm-toast" id="toast"></div>
</div>
`;

class BookmarkPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${STYLES}</style>${TEMPLATE}`;

    this.doc = emptyDocument();
    this.currentId = null;
    this.expanded = new Set();
    this.query = '';
    this.sortMode = 'custom';
    this.error = '';
    this.dragId = null;
    this._dropTarget = null;
    this._dialog = null;
    this._hass = null;
    this._toastTimer = null;
    this._extTabInfo = null;

    this._docClick = (ev) => {
      if (ev.composedPath && ev.composedPath().includes(this)) return;
      this._closeMenu();
    };

    this._bind();
    this._render();
  }

  set hass(value) {
    const first = !this._hass;
    this._hass = value;
    if (first && value) this._load();
  }

  get hass() {
    return this._hass;
  }

  // 切换 Home Assistant 自带的侧边栏（移动端开抽屉、桌面端切停靠）。
  // home-assistant-main 监听 hass-toggle-menu；必须 bubbles + composed 才能穿透 shadow DOM 到达。
  _toggleHaSidebar() {
    if (!this._hass) return; // 仅当确实运行在 HA 内才触发，避免扩展 / 独立页无意义派发
    this.dispatchEvent(new CustomEvent('hass-toggle-menu', { bubbles: true, composed: true }));
  }

  set narrow(value) {
    const wasNarrow = this.classList.contains('narrow');
    const narrow = !!value;
    this.classList.toggle('narrow', narrow);
    // HA 在窄屏注入 narrow：断点切换时给抽屉一个默认收起状态，之后交由汉堡按钮控制
    if (narrow !== wasNarrow) {
      const app = this.$('.bm-app');
      if (app) app.classList.toggle('sidebar-collapsed', narrow);
    }
  }

  connectedCallback() {
    document.addEventListener('click', this._docClick);
    // 与浏览器扩展通信：仅在确实嵌在父窗口（iframe）中时启用，
    // 直接嵌在 HA 里时 window.parent === window，下面整段不触发。
    if (window.parent && window.parent !== window) {
      if (!this._onExtMessage) {
        this._onExtMessage = (event) => {
          if (event.source !== window.parent) return; // 只认直接父窗口
          const data = event.data || {};
          if (data.type === EXT_MSG.HELLO) {
            window.parent.postMessage({ type: EXT_MSG.READY }, '*');
          } else if (data.type === EXT_MSG.CURRENT_TAB && data.payload) {
            this._extTabInfo = {
              title: String(data.payload.title || '').trim(),
              url: String(data.payload.url || '').trim(),
            };
            this._fillTabInfoIntoAddDialog();
          }
        };
      }
      window.addEventListener('message', this._onExtMessage);
      window.parent.postMessage({ type: EXT_MSG.READY }, '*'); // 触发扩展推送一次当前标签页
    }
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._docClick);
    if (this._onExtMessage) window.removeEventListener('message', this._onExtMessage);
  }

  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  /* ------------------------------------------------------------ 数据 */

  async _load() {
    try {
      const res = await this.hass.fetchWithAuth('/api/bookmark');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.doc = ensureDocument(await res.json());
      this.error = '';
    } catch (err) {
      this.error = `无法加载收藏数据：${err.message}`;
    }
    this._render();
  }

  async _save() {
    if (!this.hass) {
      this._toast('尚未连接 Home Assistant', true);
      return;
    }
    try {
      const res = await this.hass.fetchWithAuth('/api/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.doc),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.doc = ensureDocument(await res.json());
    } catch (err) {
      this._toast(`保存失败：${err.message}`, true);
    }
  }

  async _commit() {
    await this._save();
    this._render();
  }

  _activeFolderId() {
    const found = findNode(this.doc, this.currentId);
    if (found && found.node.type === 'folder') return this.currentId;
    // 没有选中文件夹时，默认用第一个根目录
    const firstRoot = (this.doc.roots || []).find((item) => item.type === 'folder');
    return firstRoot ? firstRoot.id : null;
  }

  /* ------------------------------------------------------------ 渲染 */

  _render() {
    this._renderTree();
    this._renderContent();
    const clear = this.$('.bm-search-clear');
    if (clear) clear.hidden = !this.query;
  }

  _renderTree() {
    this.$('#tree').innerHTML = (this.doc.roots || [])
      .map((root) => this._treeFolder(root, 0))
      .join('');
  }

  _treeFolder(folder, depth) {
    const children = folder.children || [];
    const subFolders = children.filter((item) => item.type === 'folder');
    const open = this.expanded.has(folder.id);
    const selected = !this.query && folder.id === this.currentId;
    const id = escapeHtml(folder.id);
    let html = `<div class="bm-tree-row${selected ? ' selected' : ''}" data-act="select-folder" data-drop="folder" data-id="${id}" style="padding-left:${6 + depth * 16}px" draggable="true" title="${escapeHtml(folder.name)}">
      <button class="bm-chevron${open ? ' open' : ''}${subFolders.length ? '' : ' empty'}" data-act="toggle-folder" data-id="${id}" title="展开/折叠">${ICONS.chevron}</button>
      <span class="bm-tree-ico">${ICONS.folder}</span>
      <span class="bm-tree-label">${escapeHtml(folder.name)}</span>
      <span class="bm-tree-count">${children.length}</span>
    </div>`;
    if (open) {
      html += subFolders.map((child) => this._treeFolder(child, depth + 1)).join('');
    }
    return html;
  }

  _renderContent() {
    const crumbs = this.$('#crumbs');
    const title = this.$('#folderTitle');
    const count = this.$('#folderCount');
    const list = this.$('#list');

    if (this.error) {
      crumbs.innerHTML = '';
      title.textContent = '无法加载';
      count.textContent = '';
      list.innerHTML = `<div class="bm-empty bm-error"><p>${escapeHtml(this.error)}</p><button class="bm-btn" data-act="retry">重试</button></div>`;
      return;
    }

    if (this.query) {
      const results = searchAll(this.doc, this.query);
      crumbs.innerHTML = '<span class="bm-crumb-static">搜索结果</span>';
      title.textContent = `“${this.query}” 的搜索结果`;
      count.textContent = `${results.length} 项`;
      list.innerHTML = results.length
        ? results.map((item) => this._urlRow(item.node, item.path.join(' / '))).join('')
        : this._empty('没有找到匹配的收藏', '试试其他关键词');
      return;
    }

    let found = findNode(this.doc, this.currentId);
    if (!found || found.node.type !== 'folder') {
      // 没有任何根目录：展示创建引导
      if (!this.doc.roots || !this.doc.roots.length) {
        crumbs.innerHTML = '';
        title.textContent = '网页收藏';
        count.textContent = '';
        list.innerHTML = this._empty(
          '还没有任何收藏',
          '点击上方「添加文件夹」可创建根目录，或从「更多」导入浏览器收藏夹文件',
        );
        return;
      }
      this.currentId = this._activeFolderId();
      found = findNode(this.doc, this.currentId);
      if (!found || found.node.type !== 'folder') return;
    }
    const folder = found.node;
    const chain = found.ancestors.concat(folder);
    crumbs.innerHTML = chain.map((item, index) => {
      const sep = index > 0 ? '<span class="bm-crumb-sep">/</span>' : '';
      const cls = index === chain.length - 1 ? 'bm-crumb current' : 'bm-crumb';
      return `${sep}<button class="${cls}" data-act="select-folder" data-id="${escapeHtml(item.id)}">${escapeHtml(item.name)}</button>`;
    }).join('');

    title.textContent = folder.name;
    const children = folder.children || [];
    count.textContent = `${children.length} 项`;
    const folders = sortNodes(children.filter((item) => item.type === 'folder'), this.sortMode);
    const urls = sortNodes(children.filter((item) => item.type === 'url'), this.sortMode);
    list.innerHTML = (folders.length || urls.length)
      ? folders.map((item) => this._folderRow(item)).join('')
        + urls.map((item) => this._urlRow(item)).join('')
      : this._empty('此文件夹为空', '点击上方按钮添加收藏夹或文件夹，或从浏览器导入收藏夹文件');
  }

  _folderRow(folder) {
    const id = escapeHtml(folder.id);
    const size = (folder.children || []).length;
    return `<div class="bm-row" data-act="open-folder" data-drop="folder" data-id="${id}" draggable="true">
      <span class="bm-fav bm-fav-folder">${ICONS.folder}</span>
      <div class="bm-row-main">
        <div class="bm-row-name">${escapeHtml(folder.name)}</div>
        <div class="bm-row-url">文件夹 · ${size} 项</div>
      </div>
      <button class="bm-row-more" data-act="row-menu" data-id="${id}" title="更多">${ICONS.more}</button>
    </div>`;
  }

  _urlRow(node, pathText) {
    const id = escapeHtml(node.id);
    const sub = pathText || this._hostOf(node.url);
    return `<div class="bm-row" data-act="open-url" data-id="${id}" draggable="true">
      <img class="bm-fav" src="${escapeHtml(this._favicon(node))}" alt="" loading="lazy" />
      <div class="bm-row-main">
        <div class="bm-row-name">${escapeHtml(node.name)}</div>
        <div class="bm-row-url" title="${escapeHtml(node.url)}">${escapeHtml(sub)}</div>
      </div>
      <button class="bm-row-more" data-act="row-menu" data-id="${id}" title="更多">${ICONS.more}</button>
    </div>`;
  }

  _empty(title, hint) {
    return `<div class="bm-empty">${ICONS.folder}<p><strong>${escapeHtml(title)}</strong></p><p>${escapeHtml(hint)}</p></div>`;
  }

  _hostOf(url) {
    try {
      return new URL(url).host || url;
    } catch {
      return url;
    }
  }

  _favicon(node) {
    if (node.icon) return node.icon;
    try {
      return `${new URL(node.url).origin}/favicon.ico`;
    } catch {
      return DEFAULT_FAVICON;
    }
  }

  /* ------------------------------------------------------------ 菜单 */

  _openMenu(ev, anchor, items) {
    const rect = this.getBoundingClientRect();
    let x = ev.clientX - rect.left;
    let y = ev.clientY - rect.top;
    if ((!x && !y) || ev.detail === 0) {
      const box = anchor.getBoundingClientRect();
      x = box.left - rect.left;
      y = box.bottom - rect.top + 4;
    }
    const layer = this.$('#menuLayer');
    layer.innerHTML = `<div class="bm-menu">${items.map((item) => {
      if (item.sep) return '<div class="bm-menu-sep"></div>';
      return `<button class="bm-menu-item${item.danger ? ' danger' : ''}" data-act="${escapeHtml(item.act)}" data-id="${escapeHtml(item.id || '')}" data-value="${escapeHtml(item.value || '')}">
        ${item.icon || '<span class="bm-menu-spacer"></span>'}
        <span>${escapeHtml(item.label)}</span><small>${item.check ? '✓' : ''}</small>
      </button>`;
    }).join('')}</div>`;
    layer.classList.add('show');
    // 菜单宽度随文案自适应（nowrap），渲染后实测再夹紧，避免溢出视口
    const menu = layer.querySelector('.bm-menu');
    const menuWidth = menu.offsetWidth || 224;
    const menuHeight = menu.offsetHeight || 340;
    x = Math.max(8, Math.min(x, Math.max(8, rect.width - menuWidth - 8)));
    y = Math.max(8, Math.min(y, Math.max(8, rect.height - menuHeight - 8)));
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
  }

  _closeMenu() {
    const layer = this.$('#menuLayer');
    layer.classList.remove('show');
    layer.innerHTML = '';
  }

  _moreItems() {
    return [
      { act: 'import', label: '导入收藏夹…（默认合并）', icon: ICONS.upload },
      { act: 'export-html', label: '导出收藏夹 (HTML)', icon: ICONS.download },
      { act: 'export-json', label: '导出标准 JSON', icon: ICONS.download },
      { sep: true },
      { act: 'sort-set', value: 'custom', label: '自定义顺序', check: this.sortMode === 'custom' },
      { act: 'sort-set', value: 'name', label: '按名称排序', check: this.sortMode === 'name' },
      { act: 'sort-set', value: 'date', label: '按添加日期排序', check: this.sortMode === 'date' },
      { sep: true },
      { act: 'expand-all', label: '展开所有文件夹', icon: ICONS.chevron },
      { act: 'collapse-all', label: '折叠所有文件夹', icon: ICONS.chevron },
    ];
  }

  _sortItems() {
    return [
      { act: 'sort-set', value: 'custom', label: '自定义顺序', check: this.sortMode === 'custom' },
      { act: 'sort-set', value: 'name', label: '按名称排序', check: this.sortMode === 'name' },
      { act: 'sort-set', value: 'date', label: '按添加日期排序', check: this.sortMode === 'date' },
    ];
  }

  _rowMenuItems(id) {
    const found = findNode(this.doc, id);
    if (found && found.node.type === 'folder') {
      return [
        { act: 'open-folder', id, label: '打开文件夹', icon: ICONS.folder },
        { act: 'rename', id, label: '重命名', icon: ICONS.edit },
        { act: 'move-pick', id, label: '移动到…', icon: ICONS.move },
        { sep: true },
        { act: 'delete', id, label: '删除', icon: ICONS.trash, danger: true },
      ];
    }
    return [
      { act: 'open-url', id, label: '在新标签页打开', icon: ICONS.open },
      { act: 'copy-url', id, label: '复制链接', icon: ICONS.copy },
      { sep: true },
      { act: 'rename', id, label: '编辑', icon: ICONS.edit },
      { act: 'move-pick', id, label: '移动到…', icon: ICONS.move },
      { sep: true },
      { act: 'delete', id, label: '删除', icon: ICONS.trash, danger: true },
    ];
  }

  /* ------------------------------------------------------------ 对话框 */

  _openDialog(options) {
    this._dialog = options;
    const fields = (options.fields || []).map((field) => {
      if (field.type === 'select') {
        const opts = field.options.map((item) => `<option value="${escapeHtml(item.value)}"${item.value === field.value ? ' selected' : ''}>${escapeHtml(item.label)}</option>`).join('');
        return `<label class="bm-field"><span>${escapeHtml(field.label)}</span><select data-field="${escapeHtml(field.name)}">${opts}</select></label>`;
      }
      if (field.type === 'file') {
        return `<label class="bm-field"><span>${escapeHtml(field.label)}</span><input data-field="${escapeHtml(field.name)}" type="file" accept="${escapeHtml(field.accept || '.html,.htm,.json,text/html,application/json')}" /></label>`;
      }
      return `<label class="bm-field"><span>${escapeHtml(field.label)}</span><input data-field="${escapeHtml(field.name)}" type="text" value="${escapeHtml(field.value || '')}" placeholder="${escapeHtml(field.placeholder || '')}" /></label>`;
    }).join('');

    const layer = this.$('#dialogLayer');
    layer.innerHTML = `<div class="bm-overlay"><div class="bm-dialog" role="dialog" aria-modal="true">
      <h3>${escapeHtml(options.title)}</h3>
      ${options.text ? `<p class="bm-dialog-text">${escapeHtml(options.text)}</p>` : ''}
      <div class="bm-dialog-body">${fields}${options.hint ? `<p class="bm-field-hint">${escapeHtml(options.hint)}</p>` : ''}</div>
      <div class="bm-dialog-foot">
        <button class="bm-btn" data-act="dialog-cancel">取消</button>
        <button class="bm-btn ${options.danger ? 'bm-btn-danger' : 'bm-btn-primary'}" data-act="dialog-ok">${escapeHtml(options.confirmText || '确定')}</button>
      </div>
    </div></div>`;
    layer.classList.add('show');
    const first = layer.querySelector('[data-field]');
    if (first) setTimeout(() => { first.focus(); if (first.select) first.select(); }, 0);
  }

  _closeDialog() {
    const layer = this.$('#dialogLayer');
    layer.classList.remove('show');
    layer.innerHTML = '';
    this._dialog = null;
  }

  _onDialogOk() {
    const values = {};
    this.$('#dialogLayer').querySelectorAll('[data-field]').forEach((el) => {
      values[el.dataset.field] = el.type === 'file'
        ? (el.files && el.files[0]) || null
        : el.value;
    });
    const options = this._dialog;
    this._closeDialog();
    if (options && options.onOk) options.onOk(values);
  }

  // 若当前正开着“添加收藏夹”对话框，把扩展回传的标签页信息填进名称/网址；
  // 仅当字段尚为空时才填，避免覆盖用户已输入的内容。
  _fillTabInfoIntoAddDialog() {
    const info = this._extTabInfo;
    if (!info) return;
    const layer = this.$('#dialogLayer');
    if (!layer || !layer.classList.contains('show')) return;
    if (!this._dialog || this._dialog.title !== '添加收藏夹') return;
    const nameEl = layer.querySelector('[data-field="name"]');
    const urlEl = layer.querySelector('[data-field="url"]');
    if (nameEl && !nameEl.value) nameEl.value = info.title || '';
    if (urlEl && !urlEl.value) urlEl.value = info.url || '';
  }

  /** 收集所有文件夹作为下拉选项（value=id，label=完整路径） */
  _folderOptions(selectedId) {
    const options = [];
    walkNodes(this.doc, (node, parent, ancestors) => {
      if (node.type !== 'folder') return;
      options.push({
        value: node.id,
        label: ancestors.concat(node).map((item) => item.name).join(' / '),
      });
    });
    if (selectedId) {
      const exists = options.some((item) => item.value === selectedId);
      if (!exists && options.length) selectedId = options[0].value;
    }
    return { options, selectedId };
  }

  _addUrlDialog() {
    const ext = this._extTabInfo || {};
    // 默认分类 = 当前所在文件夹（可在对话框里改成其它分类）
    const activeId = this._activeFolderId();
    if (!activeId) {
      this._toast('请先创建根目录或文件夹', true);
      return;
    }
    const { options, selectedId } = this._folderOptions(activeId);
    this._openDialog({
      title: '添加收藏夹',
      confirmText: '添加',
      fields: [
        { name: 'name', label: '名称', placeholder: '例如：Home Assistant', value: ext.title || '' },
        { name: 'url', label: '网址', placeholder: 'https://', value: ext.url || '' },
        {
          name: 'category', label: '分类', type: 'select',
          value: selectedId, options,
        },
      ],
      onOk: async (values) => {
        let url = String(values.url || '').trim();
        if (!url) {
          this._toast('请输入网址', true);
          return;
        }
        if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) url = `https://${url}`;
        addNode(this.doc, values.category || activeId, {
          name: String(values.name || '').trim() || url,
          type: 'url',
          url,
        });
        // 添加后跳到所选分类，便于确认落点
        this.currentId = values.category || activeId;
        this.expanded.add(this.currentId);
        await this._commit();
        this._toast('已添加收藏夹');
      },
    });
    // 在扩展内时，点击即向扩展请求“当前”活动标签页，覆盖为最新页面
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: EXT_MSG.REQUEST }, '*');
    }
  }

  _addFolderDialog() {
    const activeId = this._activeFolderId();
    const { options, selectedId } = this._folderOptions(activeId);
    // 空分类 = 创建为顶层根目录；还没有任何文件夹时下拉里只有这一项
    options.unshift({ value: '', label: '（顶层根目录）' });
    this._openDialog({
      title: '添加文件夹',
      confirmText: '添加',
      hint: '分类留空时，会在根目录下新建一个顶层文件夹',
      fields: [
        { name: 'name', label: '文件夹名称', placeholder: '新文件夹' },
        {
          name: 'category', label: '分类', type: 'select',
          value: selectedId || '', options,
        },
      ],
      onOk: async (values) => {
        const name = String(values.name || '').trim();
        if (!name) {
          this._toast('请输入文件夹名称', true);
          return;
        }
        const parentId = values.category || '';
        let node = parentId ? addNode(this.doc, parentId, { name, type: 'folder' }) : null;
        // 分类为空（或目标分类已不存在）时，直接创建为顶层根目录
        const asRoot = !node;
        if (asRoot) node = addRoot(this.doc, { name, type: 'folder' });
        if (!node) {
          this._toast('添加文件夹失败', true);
          return;
        }
        // 停留在所选分类，便于确认新文件夹的落点
        this.currentId = asRoot ? node.id : parentId;
        this.expanded.add(this.currentId);
        this.expanded.add(node.id);
        await this._commit();
        this._toast(asRoot ? '已创建根目录' : '已添加文件夹');
      },
    });
  }

  _renameDialog(id) {
    const found = findNode(this.doc, id);
    if (!found) return;
    const isFolder = found.node.type === 'folder';
    this._openDialog({
      title: isFolder ? '重命名文件夹' : '编辑收藏夹',
      confirmText: '保存',
      fields: [
        { name: 'name', label: '名称', value: found.node.name },
        ...(isFolder ? [] : [{ name: 'url', label: '网址', value: found.node.url }]),
      ],
      onOk: async (values) => {
        const name = String(values.name || '').trim();
        if (!name) {
          this._toast('名称不能为空', true);
          return;
        }
        const patch = { name };
        if (!isFolder) {
          let url = String(values.url || '').trim();
          if (!url) {
            this._toast('网址不能为空', true);
            return;
          }
          if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) url = `https://${url}`;
          patch.url = url;
        }
        updateNode(this.doc, id, patch);
        await this._commit();
        this._toast('已保存');
      },
    });
  }

  _moveDialog(id) {
    const found = findNode(this.doc, id);
    if (!found) return;
    const { options } = this._folderOptions(found.parent ? found.parent.id : '');
    // 文件夹可以移动到顶层根目录
    if (found.node.type === 'folder') {
      options.unshift({ value: '', label: '（移动到根目录）' });
    }
    const selectedId = found.parent ? found.parent.id : '';
    this._openDialog({
      title: '移动到',
      confirmText: '移动',
      fields: [{
        name: 'parent', label: '目标文件夹', type: 'select',
        value: selectedId, options,
      }],
      onOk: async (values) => {
        if (moveNode(this.doc, id, values.parent)) {
          await this._commit();
          this._toast('已移动');
        } else {
          this._toast('无法移动到该位置', true);
        }
      },
    });
  }

  _deleteDialog(id) {
    const found = findNode(this.doc, id);
    if (!found) return;
    const isFolder = found.node.type === 'folder';
    this._openDialog({
      title: isFolder ? '删除文件夹' : '删除收藏夹',
      text: `确定要删除“${found.node.name}”吗？${isFolder ? '其中的所有内容也会一并删除。' : ''}`,
      confirmText: '删除',
      danger: true,
      onOk: async () => {
        if (this.currentId === id) {
          this.currentId = found.parent
            ? found.parent.id
            : ((this.doc.roots || []).find((r) => r.id !== id && r.type === 'folder') || {}).id || null;
        }
        if (removeNode(this.doc, id)) {
          await this._commit();
          this._toast('已删除');
        }
      },
    });
  }

  /* ------------------------------------------------------------ 操作 */

  _openUrl(id) {
    const found = findNode(this.doc, id);
    if (!found || found.node.type !== 'url') return;
    window.open(found.node.url, '_blank', 'noopener,noreferrer');
  }

  async _copyUrl(id) {
    const found = findNode(this.doc, id);
    if (!found || found.node.type !== 'url') return;
    try {
      await navigator.clipboard.writeText(found.node.url);
    } catch {
      const area = document.createElement('textarea');
      area.value = found.node.url;
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    this._toast('已复制链接');
  }

  async _export(format, filename, mime) {
    try {
      // 标准文件的生成与序列化由 Python 侧的 /api/bookmark/export 完成
      const res = await this.hass.fetchWithAuth(`/api/bookmark/export?format=${format}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._download(filename, await res.text(), mime);
      this._toast(`已导出 ${format === 'json' ? '标准 JSON' : '收藏 HTML'}`);
    } catch (err) {
      this._toast(`导出失败：${err.message}`, true);
    }
  }

  _exportHtml() {
    // 与 Edge 导出的收藏夹文件保持同样的命名：favorites_2026_11_9.html
    const now = new Date();
    const name = `favorites_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}.html`;
    this._export('html', name, 'text/html;charset=utf-8');
  }

  _exportJson() {
    this._export('json', 'Bookmarks.json', 'application/json;charset=utf-8');
  }

  _download(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  /** 导入对话框：选择外部浏览器导出的标准收藏夹文件，并选择导入方式（默认合并） */
  _importDialog() {
    this._openDialog({
      title: '导入收藏夹',
      confirmText: '导入',
      text: '支持 Edge / Chrome / Firefox 导出的收藏 HTML，以及 Chrome / Edge 的 Bookmarks JSON。',
      hint: '合并导入：把外部浏览器的收藏按根追加进来，HA 里已有的收藏保持不变。覆盖导入：清空现有全部收藏，只保留文件中的内容。',
      fields: [
        { name: 'file', label: '收藏夹文件', type: 'file' },
        {
          name: 'mode', label: '导入方式', type: 'select', value: 'merge',
          options: [
            { value: 'merge', label: '合并导入（保留现有收藏，默认）' },
            { value: 'replace', label: '覆盖导入（清空现有收藏）' },
          ],
        },
      ],
      onOk: (values) => this._submitImport(values),
    });
  }

  _submitImport(values) {
    const file = values.file;
    if (!file) {
      this._toast('请选择收藏夹文件', true);
      return;
    }
    const mode = values.mode === 'replace' ? 'replace' : 'merge';

    const run = async () => {
      try {
        // 原样把标准收藏夹文件发给 Python，格式识别、转换、合并/覆盖、落盘都在后端
        const res = await this.hass.fetchWithAuth('/api/bookmark/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            content: await file.text(),
            mode,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();
        this.doc = ensureDocument(result.doc);
        this.currentId = (this.doc.roots || []).find((r) => r.type === 'folder')?.id || null;
        this.query = '';
        const search = this.$('.bm-search-input');
        if (search) search.value = '';
        this._render();
        this._toast(mode === 'replace'
          ? `已覆盖导入 ${result.count} 项收藏`
          : `已合并导入 ${result.count} 项收藏`);
      } catch (err) {
        this._toast(`导入失败：${err.message}`, true);
      }
    };

    if (mode === 'replace') {
      this._openDialog({
        title: '确认覆盖导入',
        text: '覆盖导入会清空 HA 中现有的全部收藏，只保留所选文件中的内容。此操作不可撤销。',
        confirmText: '确认覆盖',
        danger: true,
        onOk: run,
      });
    } else {
      run();
    }
  }

  _toast(message, isError = false) {
    const el = this.$('#toast');
    el.textContent = message;
    el.className = `bm-toast show${isError ? ' error' : ''}`;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { el.className = 'bm-toast'; }, 2600);
  }

  /* ------------------------------------------------------------ 事件 */

  _bind() {
    const root = this.shadowRoot;
    root.addEventListener('click', (ev) => this._onClick(ev));
    root.addEventListener('contextmenu', (ev) => this._onContextMenu(ev));
    root.addEventListener('input', (ev) => {
      if (!ev.target.classList.contains('bm-search-input')) return;
      this.query = ev.target.value.trim();
      this._renderContent();
      const clear = this.$('.bm-search-clear');
      if (clear) clear.hidden = !this.query;
    });
    root.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        this._closeMenu();
        this._closeDialog();
      } else if (ev.key === 'Enter' && ev.target.tagName === 'INPUT'
        && ev.target.type !== 'file'
        && this.$('#dialogLayer').classList.contains('show')) {
        ev.preventDefault();
        this._onDialogOk();
      }
    });
    root.addEventListener('error', (ev) => {
      const target = ev.target;
      if (target && target.tagName === 'IMG' && target.classList.contains('bm-fav')
        && target.src !== DEFAULT_FAVICON) {
        target.src = DEFAULT_FAVICON;
      }
    }, true);

    root.addEventListener('dragstart', (ev) => {
      const row = ev.target.closest('[draggable="true"]');
      if (!row || !row.dataset.id) return;
      this.dragId = row.dataset.id;
      ev.dataTransfer.effectAllowed = 'move';
      try { ev.dataTransfer.setData('text/plain', this.dragId); } catch { /* noop */ }
      row.classList.add('dragging');
    });
    root.addEventListener('dragover', (ev) => {
      if (!this.dragId) return;
      const drop = ev.target.closest('[data-drop="folder"]');
      if (!drop || drop.dataset.id === this.dragId) return;
      ev.preventDefault();
      ev.dataTransfer.dropEffect = 'move';
      this._clearDropTarget();
      drop.classList.add('drop-target');
      this._dropTarget = drop;
    });
    root.addEventListener('drop', async (ev) => {
      if (!this.dragId) return;
      const drop = ev.target.closest('[data-drop="folder"]');
      if (!drop) return;
      ev.preventDefault();
      const source = this.dragId;
      this.dragId = null;
      this._clearDropTarget();
      if (moveNode(this.doc, source, drop.dataset.id)) {
        await this._commit();
        this._toast('已移动');
      }
    });
    root.addEventListener('dragend', () => {
      this.dragId = null;
      this._clearDropTarget();
      root.querySelectorAll('.dragging').forEach((el) => el.classList.remove('dragging'));
    });
  }

  _clearDropTarget() {
    this.shadowRoot.querySelectorAll('.drop-target').forEach((el) => el.classList.remove('drop-target'));
    this._dropTarget = null;
  }

  _onContextMenu(ev) {
    const row = ev.target.closest('.bm-row');
    if (!row || !row.dataset.id) return;
    ev.preventDefault();
    this._openMenu(ev, row, this._rowMenuItems(row.dataset.id));
  }

  _onClick(ev) {
    const menuLayer = this.$('#menuLayer');
    const fromMenu = !!ev.target.closest('.bm-menu');
    if (menuLayer.classList.contains('show') && !fromMenu) {
      this._closeMenu();
    }
    if (ev.target.classList && ev.target.classList.contains('bm-overlay')) {
      this._closeDialog();
      return;
    }
    const target = ev.target.closest('[data-act]');
    if (!target) return;
    const act = target.dataset.act;
    const id = target.dataset.id || '';

    switch (act) {
      case 'toggle-sidebar':
        this.$('.bm-app').classList.toggle('sidebar-collapsed');
        break;
      case 'ha-menu':
        this._toggleHaSidebar();
        break;
      case 'clear-search': {
        const input = this.$('.bm-search-input');
        input.value = '';
        this.query = '';
        this._render();
        input.focus();
        break;
      }
      case 'retry':
        this.error = '';
        this._load();
        break;
      case 'select-folder':
        this.currentId = id;
        // 窄屏下从抽屉选完文件夹后自动收起，避免遮挡内容
        if (this.classList.contains('narrow')) this.$('.bm-app').classList.add('sidebar-collapsed');
        this._render();
        break;
      case 'toggle-folder':
        if (this.expanded.has(id)) this.expanded.delete(id);
        else this.expanded.add(id);
        this._renderTree();
        break;
      case 'open-folder':
        this.currentId = id;
        this.expanded.add(id);
        this._render();
        break;
      case 'open-url':
        this._openUrl(id);
        break;
      case 'copy-url':
        this._copyUrl(id);
        break;
      case 'add-url':
        this._addUrlDialog();
        break;
      case 'add-folder':
        this._addFolderDialog();
        break;
      case 'rename':
        this._renameDialog(id);
        break;
      case 'move-pick':
        this._moveDialog(id);
        break;
      case 'delete':
        this._deleteDialog(id);
        break;
      case 'more':
        this._openMenu(ev, target, this._moreItems());
        break;
      case 'sort':
        this._openMenu(ev, target, this._sortItems());
        break;
      case 'sort-set':
        this.sortMode = target.dataset.value || 'custom';
        this._renderContent();
        break;
      case 'row-menu':
        this._openMenu(ev, target, this._rowMenuItems(id));
        break;
      case 'import':
        this._importDialog();
        break;
      case 'export-html':
        this._exportHtml();
        break;
      case 'export-json':
        this._exportJson();
        break;
      case 'expand-all': {
        const ids = [];
        walkNodes(this.doc, (node) => { if (node.type === 'folder') ids.push(node.id); });
        this.expanded = new Set(ids);
        this._renderTree();
        break;
      }
      case 'collapse-all':
        this.expanded = new Set();
        this._renderTree();
        break;
      case 'dialog-ok':
        this._onDialogOk();
        break;
      case 'dialog-cancel':
        this._closeDialog();
        break;
      default:
        break;
    }

    if (fromMenu) this._closeMenu();
  }
}

customElements.define('bookmark-panel', BookmarkPanel);
