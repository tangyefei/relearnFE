function createXHR() {
  if(window.XMLHttpRequest != undefined) {
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

function tip(msg) {alert(msg);}

export default {
  host: '',//'http://localhost:8000',
  postJson(url, data, callback) {
    return this.ajax(url, {method: "POST", data}, callback);
  },
  get(url, callback) {
    return this.ajax(url, {method: "GET"}, callback)  
  },
  ajax(url, param, callback) {
    url = this.host + url;
    var xhr = createXHR();
    xhr.onreadystatechange = function() {
      if (xhr.readyState==4)  {
        let resp = JSON.parse(xhr.responseText);
        if(xhr.status==200) {
          if(resp.code == 1) {
            callback(resp);
          } else {
            tip((resp.body && resp.body.msg) || "未知错误")
          }
        } else if(xhr.status==401) {
          tip("登陆未授权");
          setTimeout(function(){window.location.href = '/login.html';}, 2000);
        } else if(xhr.status==500) {
          tip("后台错误");
        } else if(xhr.status==504) {
          tip("后台超时");
        } else {
          tip("未知错误");
        }
      }
    };
    xhr.open(param.method, url, true);
    
    if(param.method === 'POST') {
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.send(JSON.stringify(param.data) || null);
  }
} ;
