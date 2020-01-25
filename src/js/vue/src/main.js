import {parseHTML, parseText} from './parser';
import optimize from './optimizer';
import generate from './generator'

// `<div id="container" class="emphisis"><img /><h3>{{owner}}'s blog</h3><p>Look down fate, then you'd get better control on life</p></div>`;


let template = `<div id="app" class="container">hell {{name}}</div>`

let root, parent, stack = [];

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

optimize(root);

// console.log('after optimize')
// console.log(root);

const code = generate(root);
console.log(code);

