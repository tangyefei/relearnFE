requirejs.config({
  baseUrl: 'js/common',
  paths: {
    "ajax": "ajax",
    "helper": "helper",
    "request": "request",
    "render": "render"
  }
});

requirejs(['request', 'render', 'helper'], function (Request, Render, Helper) {
  var $ = Helper.$;

  function initEvents(){
    $('.manage-page').on('click', '.btn', function(evt){
      if(evt.target.classList.contains('add-btn')) {
        window.location.href = '/view.html';
      } else if(evt.target.classList.contains('view-btn')) {
        window.location.href = '/view.html?id=' + evt.target.parentElement.dataset.id;
      } else if(evt.target.classList.contains('del-btn')) {
        if(window.confirm("确定要删除吗？")) {
          delArticle(evt.target.parentElement.dataset.id);
        }
      }
    });
  }

  function getArticles(){
    Request.Admin.get(function (resp) {
      if (resp.code == 1) {
        Render.mlist(resp.body);
        // initEvents();
      }
    })
  }

  function delArticle(id){
    Request.Admin.delArticle(id, function (resp) {
      if (resp.code == 1) {
        Render.clear();
        Render.mlist(resp.body);
      }
    })
  }

  getArticles();
  initEvents();
});
