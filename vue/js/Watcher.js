function parsePath(exp) {
  const segments = exp.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      const key = segments[i];
      if(!obj) return;
      obj = obj[key];
    }
    return obj;
  }
}

class Watcher {
  constructor(vm, exp, obj) {
    this.vm = vm;
    this.obj = obj;
    this.getter = parsePath(exp);
    this.value = this.get();
    this.render();
  }

  get() {
    window.target = this;
    let value = this.getter.call(this.vm, this.obj);
    return value;
  }

  render() {
    this.vm.innerHTML = this.value;
  }

  update() {
    // const oldValue = this.value;
    this.value = this.get();
    this.render();
  }
}