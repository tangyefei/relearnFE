!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=/^<(\w+)/,i=/^\s*(\/)?>/,u=/^\s*((\w+)="(\w*)")/,o=/^\s*<\/\w+\>\s*/,a=function(t,e){return t.substr(e)};function s(t){var e=t.match(r);if(e){let r=e[1];var n;let s;t=a(t,e[0].length);for(var o={tagName:r,attrs:[]};!(s=t.match(i))&&(n=t.match(u));)o.attrs.push([n[1],n[2],n[3]]),t=a(t,n[0].length);return s&&(o.unarySlash=s[1],t=a(t,s[0].length)),[o,t]}return[]}function c(t){var e;return(e=t.match(o))&&(t=a(t,e[0].length)),[e,t]}function l(t){return 2!=t.type&&(t.type,!0)}function f(t){const e=function(t){if(t.attrs){let e={};for(let n of t.attrs)e[n[1]]=n[2];return JSON.stringify(e)}return}(t),n=function(t){const e=t.children;if(e&&e.length)return`[${e.map(t=>function(t){return 1==t.type?f(t):function(t){return`_t(${2==t.type?t.expression:JSON.stringify(t.text)})`}(t)}(t)).join(",")}]`}(t);return`_e("${t.tag}"${e?`,${e}`:""}${n?`,${n}`:""})`}var h=f;let p,d,g=[];!function(t,e){for(;t;){var n,r=t.indexOf("<");if(r<0){n=t,t="",e.chars(n);break}r>0&&(n=t.substr(0,r),t=a(t,n.length),e.chars(n));let[i,u]=s(t);i&&(e.start(i.tagName,i.attrs,"/"===i.unarySlash),t=u);let[o,l]=c(t);o&&(e.end(),t=l)}}('<div id="app" class="container">hell {{name}}</div>',{start(t,e,n){var r={type:1,tag:t,attrs:e,unary:n,parent:d,children:[]};d&&d.children&&d.children.push(r),0==g.length&&(r.isRoot=!0,p=r),r.unary||(g.push(r),d=r)},end(){d=d.parent,g.pop()},chars(t){var e;d&&d.children&&((e=function(t){if(t=t.trim()){var e=/\{\{\w+\}\}/g;if(e.test(t)){var n;e.lastIndex=0;for(var r=[],i=0;null!=(n=e.exec(t));)n.index>0&&r.push('"'+t.substring(i,n.index)+'"'),r.push("_v("+n[0].substring(2,n[0].length-2)+")"),i=e.lastIndex;return i<t.length&&r.push('"'+t.substring(i)+'"'),r.join("+")}}}(t))?d.children.push({type:2,text:t,parent:d,expression:e}):d.children.push({type:3,text:t,parent:d}))}}),function(t){t&&(!function t(e){if(e.static=l(e),1==e.type&&e.children)for(let n=0;n<e.children.length;n++){const r=e.children[n];r.static=l(r),t(r),r.static||(e.static=!1)}}(t),function t(e){if(e.static)e.staticRoot=!0;else if(e.staticRoot=!1,e.children)for(let n=0;n<e.children.length;n++){t(e.children[n])}}(t))}(p);const y=h(p);console.log(y)}]);