import Request from "../common/request.js"
// import Render from "../common/render.js"
import Helper from "../common/Helper.js"
import './view.css';
// define(['request', 'render', 'helper'], function (Request, Render, Helper) {
var template = 
  '<div class="page view-page">' + 
  '    <h1></h1>' + 
  '    <form>' + 
  '        <div><input type="hidden" name="id"/></div>' + 
  '        <div><label for="title">标题：</label><input type="text" name="title"/></div>' + 
  '        <div><label for="tags">标签：</label><input type="text" name="tags"/></div>' + 
  '        <div><label for="description">概述：</label><input type="text" name="description"/></div>' + 
  '        <div><label for="contnet">内容：</label><textarea name="content" id="" cols="30" rows="10"></textarea></div>' + 
  '        <div><input type="button" class="btn submit-btn" value="submit"/></div>' + 
  '    </form>' + 
  '    <footer> © Copyright 2019 Yefei Tang </footer>' + 
  '  </div>';

var $ = Helper.$;
var instance = {
  template: null,
  insertStyle: function(){
    // var cssId = 'view-template-css';  // you could encode the css path itself to generate id..
    // if (!document.getElementById(cssId)) {
    //     var head  = document.getElementsByTagName('head')[0];
    //     var link  = document.createElement('link');
    //     link.id   = cssId;
    //     link.rel  = 'stylesheet';
    //     link.type = 'text/css';
    //     link.href = 'js/template/view.css';
    //     head.appendChild(link);
    // }
  },
  getArticle(id) {
    Request.Admin.getArticle(id, function (resp) {
      if (resp.code == 1) {
        var form = document.forms[0];
        form.title.id = resp.body.id;
        form.title.value = resp.body.title;
        form.tags.value = resp.body.tags;
        form.description.value = resp.body.description;
        form.content.value = resp.body.content;
      }
    })
  },
  saveArticle() {
    var form = document.forms[0]
    Request.Admin.saveArticle({
      id: form.title.id,
      title: form.title.value,
      tags: form.tags.value,
      description: form.description.value,
      content: form.content.value,
    }, function(resp){
      if(resp.code ==1 && resp.body) {
        alert('新增成功');
        window.location.href = '/manage.html';
      }
    })
  },
  loadDetail: function(){
    var matches = window.location.hash.match(/id=.+/g);
    var $title = $(this.template.querySelector('.view-page h1'));
    if(matches && matches.length) {
      this.getArticle(matches[0].split('=')[1]);
      $title.text("编辑文章");
    } else {
      $title.text("新增文章");
    }
  },
  bindEvents: function(){
    var self = this;
    var $page = $(this.template.querySelector('.view-page'));
    $page.on('click', '.submit-btn', function(evt){
      self.saveArticle();
      return false;
    });
  },
  render: function(){
    this.template = document.createRange().createContextualFragment(template);
    this.loadDetail();
    this.bindEvents();
    this.insertStyle();
    return this.template;
  }
}
export default instance;
// })