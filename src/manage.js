// requirejs.config({
//   baseUrl: 'js',
//   paths: {
//     "ajax": "common/ajax",
//     "helper": "common/helper",
//     "request": "common/request",
//     "render": "common/render",
//     "router": "common/router",
//     "tmpl_manage": "template/manage",
//     "tmpl_view": "template/view",
//   }
// });

import "./css/base.css";
import "./css/style.css";

// import Request from './js/common/request.js';
// import Render from './js/common/render.js';

// requirejs(['router', 'tmpl_manage', 'tmpl_view'], function(Router, tmpl_manage, tmpl_view){
// });

import Router from './js/common/router.js';
import tmpl_manage from './js/template/manage.js';
import tmpl_view from './js/template/view.js';

var router = new Router('#app');
router.route('manage', tmpl_manage);
router.route('view', tmpl_view);
router.init();
