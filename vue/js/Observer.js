
var arrayMethods = Object.create(Array.prototype);

['push', 'pop','shift', 'unshift'].forEach(d => {
  var method = arrayMethods[d];
  Object.defineProperty(arrayMethods, d, {
    value: function(...args) {
      const ob = this.__ob__;
      method.call(this, ...args);
      ob.dep.notify();
    }
  });
});

function defineReactive(data, key, val){
  let childOb;
  let dep = new Dep();

  if(typeof val === 'object') {
    if(val.__ob__ && val.__ob__ instanceof Observer) {
      childOb = val.__ob__;
    } else {
      childOb = new Observer(val);
    }
  }

  Object.defineProperty(data, key, {
    get: function(){
      dep.depend();

      if(childOb) {
        childOb.dep.depend();
      }
      console.log('get:' + val);
      return val;
    },
    set: function(newval){
      if(newval != val) {
        console.log('change happen from:`' + val + '` to `' + newval + '`');
        val = newval;
        ob.dep.notify();
      }
    }
  })
}

class Observer {
  constructor(value) {
    this.dep = new Dep();

    value.__ob__ = this;

    if(Array.isArray(value)) {
      value.__proto__ = arrayMethods;
    } else if(typeof value == 'object'){
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let key of keys) {
      if(key!='__ob__') {
        defineReactive(obj, key, obj[key]) 
      }
    }
  }
}
