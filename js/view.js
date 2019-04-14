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
  function getArticle(id){
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
  }
  function saveArticle() {
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
  }

  function initEvents(){
    var $page = $('.view-page').on('click', '.submit-bnt', function(evt){
      saveArticle();
      return false;
    });
  }
  function loadDetail(){
    var matches = window.location.search.match(/id=.+/g);
    if(matches && matches.length) {
      getArticle(matches[0].split('=')[1]);
      $('.view-page h1').text("编辑文章");
    } else {
      $('.view-page h1').text("新增文章");
    }
  }

  loadDetail();
  initEvents();
});
