
const category = {
  'psy': '心理',
  'tech': '技术',
  'read': '读书',
  'travel': '旅行',
}

function map(key) {
  return category[key];
}
function formatQuery(param) {
  param =  param || {};
  var couples = [];
  for(var key in param) {
    couples.push(key + '=' + param[key]);
  }
  if(couples.length > 0) {
    return '?' + couples.join('&');
  } else {
    return '';
  }
}

function CNode(dom) {
  this.dom = dom;
}
function Query(a, create = false) {
  if (create) {
    return new CNode(document.createElement(a));
  } else if(typeof a === 'string') {
    return new CNode(document.querySelector(a));
  } else {
    return new CNode(a)
  }
}

function format(date) {
  var d = new Date(date);
  var date = d.getDate();
  var month = d.getMonth() + 1; 
  var year = d.getFullYear();
  month = month < 10 ? ('0' + month) : month;
  year = year < 10 ? ('0' + year) : year;
  return year + "-" + month + "-" + date
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
  removeClass: function (a) { this.dom.classList.remove(a); return this; },
  text: function (a) { this.dom.innerText = a; return this; },
  append: function (a) { this.dom.append((a instanceof CNode) ? a.get(0) : a); return this;},
  data: function(a,c) {this.dom.dataset[a] = c; return this;},
  next: function() {return this.dom.nextElementSibling ? new CNode(this.dom.nextElementSibling): null},
  prev: function() {return this.dom.previousElementSibling ? new CNode(this.dom.previousElementSibling) : null},
  
}

export default {
  format,
  $: Query,
  CNode, CNode ,
  map,
  formatQuery
}