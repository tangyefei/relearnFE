
import Request from 'js/request.js';
import Render from 'js/render.js';
import $ from 'js/dquery.js';
import "css/base.css";
import "css/home.css";

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

$('.menus').on('click', 'a', function(evt) {
  $(evt.target.parentElement).addClass('active').siblings().removeClass('active');
})

getArticle();

