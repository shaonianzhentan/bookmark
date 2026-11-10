/**
 * 收藏树的 UI 辅助（纯 ES 模块，无框架依赖）。
 *
 * 注意：标准收藏数据格式与所有格式转换（Netscape HTML / Bookmarks JSON /
 * 旧版扁平数据）都由 Python 侧的 convert.py 提供；这里只做页面需要的树操作，
 * 新增节点的 date_added / guid 由后端 normalize_document 统一补全。
 */

export const ROOT_KEYS = ['bookmark_bar', 'other', 'synced'];

const ROOT_META = {
  bookmark_bar: { id: '1', name: '收藏夹栏' },
  other: { id: '2', name: '其他收藏夹' },
  synced: { id: '3', name: '移动设备收藏夹' },
};

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function emptyDocument() {
  const roots = {};
  for (const key of ROOT_KEYS) {
    roots[key] = {
      children: [],
      id: ROOT_META[key].id,
      name: ROOT_META[key].name,
      type: 'folder',
    };
  }
  return { version: 1, roots };
}

/** 后端返回的文档已是标准结构，这里只做最小防御 */
export function ensureDocument(raw) {
  if (!raw || !raw.roots) return emptyDocument();
  for (const key of ROOT_KEYS) {
    const root = raw.roots[key];
    if (!root || !Array.isArray(root.children)) return emptyDocument();
  }
  return raw;
}

/** 遍历所有节点（含三个根），回调 (node, parentFolder, ancestors) */
export function walkNodes(doc, visitor) {
  const recurse = (node, parent, ancestors) => {
    visitor(node, parent, ancestors);
    if (node.type === 'folder' && Array.isArray(node.children)) {
      const next = ancestors.concat(node);
      for (const child of node.children) recurse(child, node, next);
    }
  };
  for (const key of ROOT_KEYS) {
    const root = doc?.roots?.[key];
    if (root) recurse(root, null, []);
  }
}

export function findNode(doc, id) {
  let found = null;
  walkNodes(doc, (node, parent, ancestors) => {
    if (found || node.id !== id) return;
    found = {
      node,
      parent,
      ancestors,
      index: parent && Array.isArray(parent.children) ? parent.children.indexOf(node) : -1,
    };
  });
  return found;
}

export function nextId(doc) {
  let max = 3;
  walkNodes(doc, (node) => {
    const value = Number(node.id);
    if (Number.isFinite(value) && value > max) max = value;
  });
  return String(max + 1);
}

export function addNode(doc, parentId, node, index = -1) {
  const target = findNode(doc, parentId);
  if (!target || target.node.type !== 'folder') return null;

  const copy = { ...node, id: nextId(doc) };
  if (copy.type === 'folder') copy.children = copy.children || [];
  const list = target.node.children;
  if (index >= 0 && index <= list.length) list.splice(index, 0, copy);
  else list.push(copy);
  return copy;
}

export function updateNode(doc, id, patch) {
  const found = findNode(doc, id);
  if (!found) return false;
  Object.assign(found.node, patch);
  return true;
}

export function removeNode(doc, id) {
  const found = findNode(doc, id);
  if (!found || !found.parent || found.index < 0) return false;
  found.parent.children.splice(found.index, 1);
  return true;
}

export function moveNode(doc, id, parentId, index = -1) {
  if (id === parentId) return false;
  const found = findNode(doc, id);
  const target = findNode(doc, parentId);
  if (!found || !target || !found.parent || target.node.type !== 'folder') return false;
  // 禁止把文件夹移进自己的后代
  if (found.node.type === 'folder'
    && [...target.ancestors, target.node].some((item) => item.id === id)) {
    return false;
  }

  found.parent.children.splice(found.index, 1);
  const list = target.node.children;
  if (index >= 0 && index <= list.length) list.splice(index, 0, found.node);
  else list.push(found.node);
  return true;
}

export function searchAll(doc, keyword) {
  const query = String(keyword || '').trim().toLowerCase();
  const out = [];
  if (!query) return out;
  walkNodes(doc, (node, parent, ancestors) => {
    if (node.type !== 'url') return;
    if (
      String(node.name).toLowerCase().includes(query)
      || String(node.url).toLowerCase().includes(query)
    ) {
      out.push({ node, path: ancestors.map((item) => item.name) });
    }
  });
  return out;
}

/** 只返回排序后的副本，不改变真实顺序（与 Edge 的排序视图一致） */
export function sortNodes(children, mode) {
  const list = (children || []).slice();
  if (mode === 'name') {
    list.sort((a, b) => String(a.name).localeCompare(String(b.name), 'zh-CN'));
  } else if (mode === 'date') {
    const stamp = (node) => {
      try {
        return BigInt(String(node.date_added || '0'));
      } catch {
        return 0n;
      }
    };
    list.sort((a, b) => {
      const left = stamp(a);
      const right = stamp(b);
      return right > left ? 1 : (right < left ? -1 : 0);
    });
  }
  return list;
}
