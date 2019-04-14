requirejs.config({
  baseUrl: 'js/common',
  paths: {
    "ajax": "ajax",
    "helper": "helper",
    "request": "request",
    "render": "render"
  }
});

requirejs(['request', 'helper'], function (Request, helper) {
  var $ = helper.$;
  var $btn = $('.submit-btn').get(0);
  var $username = $('input[name="username"]').get(0)
  var $password = $('input[name="password"]').get(0)
  $btn.addEventListener('click', function(){
    var username = $username.value;
    var password = $password.value;
    if(username.trim() && password.trim()) {
      Request.Auth.login({ username, password }, function(resp) {
        if(resp.code == 1) {
          alert("login redirect")
          // window.location.href = '/manage.html';
        }
      })
    }
  });
  // Request.Auth.login(function (resp) {
  //   if (resp.code == 1) {
  //     render(resp.body);
  //   }
  // })
});