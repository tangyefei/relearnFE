define(['request', 'render', 'helper'], function (Request, Render, Helper) {
  var $ = Helper.$;
  var template = 
    '<div class="page manage-page">' + 
    '  <h1>后台管理</h1>' + 
    '  <div class="article-container"> </div>' + 
    '</div>';
    
  var instance = {
    template: null,
    getArticles: function(){
      var self = this;
      Request.Admin.get(function (resp) {
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
    insertStyle: function(){
      var cssId = 'manage-template-css'; 
      if (!document.getElementById(cssId)) {
          var head  = document.getElementsByTagName('head')[0];
          var link  = document.createElement('link');
          link.id   = cssId;
          link.rel  = 'stylesheet';
          link.type = 'text/css';
          link.href = 'js/template/manage.css';
          head.appendChild(link);
      }
    },
    render: function(){
      this.template = document.createRange().createContextualFragment(template);
      this.getArticles();
      this.bindEvents();
      this.insertStyle();
      return this.template;
    }
  }

  return instance;
})