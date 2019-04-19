
function Router(id){
  this.el = document.querySelector(id);
  this.routes = {};
}
Router.prototype.init = function(){
  var self = this;
  
  window.onhashchange = Router.render.bind(self);
  Router.render.call(self, window.location);
}
Router.prototype.route = function(name, template){
  this.routes[name] = template;
}

Router.render = function(location) {
  var sufix = location.hash || location.newURL;
  var hash = sufix && sufix.split('#')[1]  || 'manage';
  if(hash.indexOf('?') != -1) hash = hash.substr(0, hash.indexOf('?'));
  var temp = this.routes[hash];
  if(temp) {
    if(this.el.firstElementChild)
      this.el.firstElementChild.remove();
    this.el.append(temp.render());
  }
};
export default Router;