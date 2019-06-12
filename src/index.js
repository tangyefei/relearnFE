
import Request from 'js/request';
import Render from 'js/render';
import $ from 'js/dquery';
import "css/base.css";
import "css/home.css";
import Vue from 'vue/index.js';

function getArticle(param) {
  var sufix = location.hash;
  var hash = sufix && sufix.split('#')[1];
  var param = hash ? {type: hash} : {};

  Request.getArticles(param, function (resp) {
    if (resp.code == 1) {
      // console.log(Vue)
      new Vue({
        root: '#app',
        data: {
          articleList: resp.body
        } 
      })
      // Render.renderList(resp.body);
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

