// var template = `<div id="container" class="emphisis"><img /><h3>{{owner}}'s blog</h3><p>Look down fate, then you'd get better control on life</p></div>`;
var template = `<div id="app" class="container">hell {{name}}</div>`

var startTagOpen = /^<(\w+)/;
var startTagClose = /^\s*(\/)?>/;
var attrTag = /^\s*((\w+)="(\w*)")/;
var endTag = /^\s*<\/\w+\>\s*/;

var advance = function(template, n) {
  return template.substr(n);
}

function  parseStartTag(template){
  var start = template.match(startTagOpen);
  
  if(start) {
    let tagName = start[1];
    var attr;
    let end;
    template = advance(template, start[0].length)
  
    var node = {
      tagName,
      attrs: []
    }
  
    while(!(end = template.match(startTagClose)) && (attr = template.match(attrTag))) {
      node.attrs.push([attr[1],attr[2],attr[3]]);
      template = advance(template, attr[0].length)
    }
    if(end) {
      node.unarySlash = end[1];
      template = advance(template, end[0].length);
    }
    return [node, template];
  }
  return [];
}

function parseEndTag(template) {
  var end;
  if(end = template.match(endTag)) {
    template = advance(template, end[0].length);
  }
  return [end, template];
}

// let matchStartTag = parseStartTag();

// var textEndPos = template.indexOf('<');
// if(textEndPos > 0) {
//   text = template.substr(0, textEndPos);
//   advance(text.length);
// } else {
//   text = template;
//   html = '';
// }
// console.log(text);


// parseEndTag();

function parseHTML(template, options) {
  while(template) {
    var textEndPos = template.indexOf('<');
    if(textEndPos < 0) {
      text = template;
      template = '';
      options.chars(text);
      break;
    }

    if(textEndPos > 0) {
      text = template.substr(0, textEndPos);
      template = advance(template, text.length);
      options.chars(text);
    }

    let [matchStartTag, newTemplate1] = parseStartTag(template);
    if(matchStartTag) {
      options.start(matchStartTag.tagName, matchStartTag.attrs, matchStartTag.unarySlash==='/')
      template = newTemplate1;
    }

    let [matchEndTag, newTemplate2] = parseEndTag(template);
    if(matchEndTag) {
      options.end();
      template = newTemplate2;
    }
  }
}


let root;
let parent;
const stack = [];


parseHTML(template, {
  start(tag, attrs, unary) {
    var node = { type: 1, tag, attrs, unary, parent, children:[] };
    if(parent && parent.children) {
      parent.children.push(node);
    }
    if(stack.length == 0) {
      node.isRoot = true;
      root = node;
    }
    if(!node.unary) {
      stack.push(node);
      parent =  node;
    }
  },
  end() {
    parent = parent.parent;
    stack.pop();
  },
  chars(text) {
    if(parent && parent.children) {
      // var node = { type: 3, text, parent };
      var expression;
      if(expression=parseText(text)) {
        parent.children.push({ type: 2, text, parent, expression })
      } else {
        parent.children.push({ type: 3, text, parent })
      }
    }
  }
})


function parseText(text) {
  text = text.trim();

  if(!text) return;

  var re = /\{\{\w+\}\}/g;
  
  if(re.test(text)) {
    re.lastIndex = 0;
    var match;
    var tokens = [];
    var lastIndex = 0;
  
    while((match = re.exec(text)) != null) {
      if(match.index > 0) tokens.push('"' + text.substring(lastIndex, match.index)  + '"');
      tokens.push('_v(' + match[0].substring(2,match[0].length-2) + ')')
      lastIndex = re.lastIndex;
      // console.log(lastIndex);
    }
    if(lastIndex < text.length) {
      tokens.push('"' + text.substring(lastIndex) + '"');
    }
    // console.log(tokens);
    return tokens.join('+')
  }

}
// console.log(parseText('haha {{name}} receive offer worth {{amount}}'));
// console.log(parseText("{{owner}}'s blog"));


function isStatic(node) {
  if(node.type == 2) {
    return false;
  } else if(node.type == 3) {
    return true;
  } else {
    // node.type == 1 需要区分普通个元素还是有 v-if v-pre 等各种directive的元素，这里先都统一返回为true，因为还没实现directive
    return true;
  }
}

function markStatic(parent) {
  parent.static = isStatic(parent);
  if(parent.type == 1 && parent.children) {
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      child.static = isStatic(child);
      markStatic(child);
      if(!child.static) {
        parent.static = false;
      }
    }
  }
}

function markRootStatic(parent) {
  if(parent.static) {
    parent.staticRoot = true;
    return;
  } else {
    parent.staticRoot = false;
  }
  if(parent.children) {
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      markRootStatic(child);
    }
  }
}

function optimize(root) {
  if(!root) return;

  markStatic(root);
  markRootStatic(root);
}

optimize(root);

console.log('after optimize')
console.log(root);

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
    return `[${children.map(c => genNode(c)).join(',')}]`
  }
}
const code = generateElement(root);
console.log(code);


