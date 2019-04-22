
import Request from './js/common/request.js';
import Render from './js/common/render.js';
import Helper from './js/common/helper.js';
import "./css/base.css";
import "./css/home.css";

function getArticle(param) {
  var sufix = location.hash;
  var hash = sufix && sufix.split('#')[1];
  var param = hash ? {type: hash} : {};
  Request.getArticles(param, function (resp) {
    if (resp.code == 1) {
      Render.renderList(resp.body);
    }
  })
}

window.onhashchange = function() {
  getArticle(); 
};

var $ = Helper.$;

$('.menus').on('click', 'a', function(evt) {
  // add active class
  var $li = $(evt.target.parentElement);
  $li.addClass('active');
  
  //  remove siblings class
  var $it = $li;
  while($it.next()) { $it = $it.next(); $it.removeClass("active"); }
  $it = $li;
  while($it.prev()) { $it = $it.prev(); $it.removeClass("active"); }
})



getArticle();

