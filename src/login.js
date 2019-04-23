import "css/base.css";
import "css/login.css";
import Request from 'js/request.js';
import $ from 'js/dquery.js';

var $username = $('input[name="username"]').get(0)
var $password = $('input[name="password"]').get(0)

$btn.addEventListener('click', function(){
  var username = $username.value;
  var password = $password.value;
  if(username.trim() && password.trim()) {
    Request.Auth.login({ username, password }, function(resp) {
      if(resp.code == 1) {
        alert("login redirect")
      }
    })
  }
});