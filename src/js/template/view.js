import Request from "js/request.js"
import $ from "js/dquery.js"
import Utils from "js/utils.js"
import showdown  from "showdown";
import 'template/view.css';

var markdown = new showdown.Converter();

var template = 
  '<div class="page view-page">' + 
  '    <h3></h3>' + 
  '    <form>' + 
  '        <div><input type="hidden" name="id"/></div>' + 
  '        <div><label for="token">token：</label><input type="text" name="token" placeolder="编辑仅管理员可见请输入token"/></div>' + 
  '        <div><label for="title">标题：</label><input type="text" name="title"/></div>' + 
  '        <div><label for="tags">类型：</label>' + 
  '           <select name="type">' + 
  '             <option value="psy">心理</option>' + 
  '             <option value="tech">技术</option>' + 
  '             <option value="read">读书</option>' + 
  '             <option value="travel">旅行</option>' + 
  '           </select>' + 
  '        </div>' + 
  '        <div><label for="title">日期：</label><input type="date" name="created_at"/></div>' + 
  '        <div><label for="overview">概述：</label><input type="text" name="overview"/></div>' + 
  '        <div><label for="tags">标签：</label><input type="text" name="tags"/></div>' + 
  '        <div>' + 
  '          <div class="form-content">' + 
  '            <textarea class="markdown-editor" name="content" cols="30" rows="10"></textarea>' + 
  '            <div class="preview-panel"></div>' + 
  '          </div>' + 
  '        </div>' + 
  '        <div><input type="button" class="btn submit-btn" value="submit"/></div>' + 
  '    </form>' + 
  '    <footer> © Copyright 2019 Yefei Tang </footer>' +
  '  </div>';


var formatDate = Utils.format;
var instance = {
  template: null,
  getArticle(id) {
    var self = this;
    Request.getArticle(id, function (resp) {
      if (resp.code == 1) {
        var form = document.forms[0];
        var $preview = $(document.querySelector('.preview-panel'));
        form.id.value = resp.body.id;
        form.title.value = resp.body.title;
        console.log(formatDate(resp.body.created_at));
        form.created_at.value = formatDate(resp.body.created_at);
        form.type.value = resp.body.type;
        form.tags.value = resp.body.tags;
        form.overview.value = resp.body.overview;
        form.content.value = resp.body.content;
        $preview.html(markdown.makeHtml(resp.body.content));
        setTimeout(() => {
          Prism.highlightAll();
        },200)
      }
    })
  },
  saveArticle() {
    var form = document.forms[0]
    var data = {
      id: form.id.value,
      token: form.token.value,
      title: form.title.value,
      created_at: form.created_at.value,
      type: form.type.value,
      tags: form.tags.value,
      overview: form.overview.value,
      content: form.content.value,
    };
    for(var key in data) {
      if(key !== 'id' && !data[key]) {
        return alert("有数据为填写完整:" + key);
      }
    }
    Request.saveArticle(data, function(resp){
      if(resp.code ==1 && resp.body) {
        alert(data.id ? '修改成功' : '新增成功') ;
        window.location.href = '/detail.html?id=' + (data.id||resp.body);
      }
    })
  },
  loadDetail: function(){
    var matches = window.location.hash.match(/id=.+/g);
    var $title = $(this.template.querySelector('.view-page h3'));
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

    var $preview = $(this.template.querySelector('.preview-panel'));
    $page.on('input', '.markdown-editor', function(evt) {
      $preview.html(markdown.makeHtml(evt.target.value));
      setTimeout(() => {
        Prism.highlightAll();
      },200)
    });
  },
  render: function(){
    this.template = document.createRange().createContextualFragment(template);
    this.loadDetail();
    this.bindEvents();

    return this.template;
  }
}
export default instance;