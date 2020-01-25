const e = document.createElement.bind(document);
const t = document.createTextNode.bind(document);

function createDOM(vnode) {
  let dom = vnode.tag ? e(vnode.tag) : t(vnode.text);
  if(vnode.children && vnode.children.length) {
    vnode.children.forEach(child => {
      dom.appendChild(createDOM(child))
    });
  }
  return dom;
}

export default {
  createDOM
}