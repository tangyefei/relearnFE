import "./css/base.css";
// import "./css/style.css";

import Router from './js/common/router.js';
import tmpl_manage from './js/template/manage.js';
import tmpl_view from './js/template/view.js';

var router = new Router('#app');
router.route('manage', tmpl_manage);
router.route('view', tmpl_view);
router.init();
