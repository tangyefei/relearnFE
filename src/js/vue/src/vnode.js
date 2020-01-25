export default class VNode {
  constructor(tag, data, children, text) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
  }
}

export const createTextNode = (text) => {
  return new VNode(null, null, null, text);
}

export const createElementNode = (tag, data, children) => {
  let vnode = new VNode(tag, data, children);
  if(children && children.length) {
    vnode.children = children.map(child => {
      if(child.type == 1) {
        return createElementNode(child);
      } else {
        return createTextNode(child.text);
      }
    });
  }
  return vnode;
}

export const toString = function(val) {
  return val;
}

export {
  createTextNode as _t,
  createElementNode as _e,
  toString as _v
};