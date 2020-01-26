

// 生成虚拟的元素节点
function createElement() {}
// 生成虚拟的文本节点
function createTextNode() {}


// 生成元素节点代码
function generateElement(node) {
  const data = genData(node);
  const children = genChildren(node);
  let code = `_e("${node.tag}"${data ? `,${data}` : ""}${children ? `,${children}` : ""})`
  return code;
}
// 生成文本节点代码
function generateText(node) {
  return `_t(${node.type==2 ? node.expression : JSON.stringify(node.text)})`
}
function genData(node) {
  if(node.attrs) {
    let hash = {};
    for (let attr of node.attrs) {
      hash[attr[1]] = attr[2];
    }
    return JSON.stringify(hash);
  }
  return;
}
// 生成节点代码
function genNode(node) {
  if(node.type==1) {
    return generateElement(node);
  } else {
    return generateText(node);
  }
}
// 递归生成子节点的代码（子节点可能是元素，也可能是文本）
function genChildren(node) {
  const children = node.children;
  if(children && children.length) {
    console.log(children);
    return `[${children.map(c => genNode(c)).join(',')}]`
  }
}

export default generateElement
