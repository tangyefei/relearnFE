import Utils from './utils.js';

function CNode(dom) {
  this.dom = dom;
}
CNode.prototype = {
  constructor: CNode,
  on: function(event, selector, handler) {
    this.dom.addEventListener(event, function(evt){
      var $target = new CNode(evt.target);
      var nodelist = document.querySelectorAll(selector);
      var node = Array.prototype.find.call(nodelist, function(e){
        return e == evt.target || $target.parentIs(e);
      });
      if(node) {
        handler(evt);
      }
    })
    return this;
  },
  parentIs(dom) {
    // only support class right now
    let parent = this.dom.parentElement;
    while(parent && parent.nodeName != 'HTML') {
      if(parent === dom) return true;
      parent = parent.parentElement;
    }
    return false;
  },
  siblings: function() {
    var self = this;
    var children = self.dom.parentElement.children;
    return new CNode(Array.prototype.filter.call(children, function(ele) {
      return (ele !== self.dom)
    }))
  },
  get: function () { return this.dom; },
  hasClass: function (a) { this.dom.classList.contains(a); return this; },
  remove: function (a) { return this.dom.remove(a); },
  addClass: function (a) { this.dom.classList.add(a); return this; },
  removeClass: function (a) { 
    if(Utils.isArray(this.dom)) {
      this.dom.forEach(d => {
        (new CNode(d)).removeClass(a)
      } )
     } else {
      this.dom.classList.remove(a); 
     }
    return this; 
  },
  text: function (a) { this.dom.innerText = a; return this; },
  html: function (a) { this.dom.innerHTML = a; return this; },
  append: function (a) { this.dom.append((a instanceof CNode) ? a.get(0) : a); return this;},
  data: function(a,c) {this.dom.dataset[a] = c; return this;},
  next: function() {return this.dom.nextElementSibling ? new CNode(this.dom.nextElementSibling): null},
  prev: function() {return this.dom.previousElementSibling ? new CNode(this.dom.previousElementSibling) : null},
  
}

function $(a, create = false) {
  if (create) {
    return new CNode(document.createElement(a));
  } else if(typeof a === 'string') {
    return new CNode(document.querySelector(a));
  } else {
    return new CNode(a)
  }
}


export default $;