requirejs.config({
  baseUrl: 'js',
  paths: {
    "ajax": "common/ajax",
    "helper": "common/helper",
    "request": "common/request",
    "render": "common/render",
    "router": "common/router",
    "tmpl_manage": "template/manage",
    "tmpl_view": "template/view",
  }
});
requirejs(['router', 'tmpl_manage', 'tmpl_view'], function(Router, tmpl_manage, tmpl_view){
  var router = new Router('#app');
  router.route('manage', tmpl_manage);
  router.route('view', tmpl_view);
  router.init();
});
