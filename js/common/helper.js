define(function (){
  function CNode(dom) {
    this.dom = dom;
  }
  function Query(a, create = false) {
    if (create) {
      return new CNode(document.createElement(a));
    } else {
      return new CNode(document.querySelector(a));
    }
  }

  CNode.prototype = {
    constructor: CNode,
    on: function(event, selector, handler) {
      this.dom.addEventListener(event, function(evt){
        var nodelist = document.querySelectorAll(selector);
        var node = Array.prototype.find.call(nodelist, function(e){
          return e == evt.target;
        });
        if(node) {
          handler(evt);
        }
      })
      return this;
    },
    get: function () { return this.dom; },
    hasClass: function (a) { this.dom.classList.contains(a); return this; },
    remove: function (a) { return this.dom.remove(a); },
    addClass: function (a) { this.dom.classList.add(a); return this; },
    text: function (a) { this.dom.innerText = a; return this; },
    append: function (a) { this.dom.append(a); return this;},
    data: function(a,c) {this.dom.dataset[a] = c; return this;}
  }

  return {
    $: Query,
    CNode, CNode,
    delegate: function(){console.log('error')}
  }
});