import "css/base.css";

import Router from 'js/router.js';
import tmpl_manage from 'template/manage.js';
import tmpl_view from 'template/view.js';

var router = new Router('#app');
router.route('manage', tmpl_manage);
router.route('view', tmpl_view);
router.init();
