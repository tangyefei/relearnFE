  import Request from "../common/request.js"
  import Render from "../common/render.js"
  import $ from "../common/dquery.js"
  import 'template/manage.css';

  var template = 
    '<div class="page manage-page">' + 
    '  <h3>后台管理</h1>' + 
    '  <div class="article-container"> </div>' + 
    '  <footer> © Copyright 2019 Yefei Tang </footer>' +
    '</div>';
    
  var instance = {
    template: null,
    getArticles: function(){
      var self = this;
      Request.getArticles({}, function (resp) {
        if (resp.code == 1) {
          Render.mlist(resp.body, self.template);
        }
      })
    },
    delArticle: function(){
      var self = this;
      Request.Admin.delArticle(id, function (resp) {
        if (resp.code == 1) {
          Render.clear();
          Render.mlist(resp.body, self.template);
        }
      })
    },
    bindEvents: function(){
      var self = this;
      var $page = $(this.template.querySelector('.manage-page'));
      $page.on('click', '.btn', function(evt){
        if(evt.target.classList.contains('add-btn')) {
          window.location.href = '/manage.html#view';
        } else if(evt.target.classList.contains('view-btn')) {
          window.location.href = '/manage.html#view?id=' + evt.target.parentElement.dataset.id;
        } else if(evt.target.classList.contains('del-btn')) {
          if(window.confirm("确定要删除吗？")) {
            self.delArticle(evt.target.parentElement.dataset.id);
          }
        }
      });
    },
    render: function(){
      this.template = document.createRange().createContextualFragment(template);
      this.getArticles();
      this.bindEvents();
      return this.template;
    }
  }

  export default instance;