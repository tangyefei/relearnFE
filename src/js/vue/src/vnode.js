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
  return new VNode(tag, data, children);
}

export const toString = function(val) {
  return val;
}

export {
  createTextNode as _t,
  createElementNode as _e,
  toString as _v
};