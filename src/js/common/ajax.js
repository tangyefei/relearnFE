function createXHR() {
  if(window.XMLHttpRequest != undefined) {
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

export default {
  host: '',//'http://localhost:8000',
  postJson(url, data, callback) {
    return this.ajax(url, {method: "POST", data}, callback);
  },
  get(url, callback) {
    return this.ajax(url, {method: "GET"}, callback)  
  },
  ajax(url, param, callback) {
    var self = this;
    var xhr = createXHR();
    xhr.onreadystatechange = function() {
      if (xhr.readyState==4)  {
        let resp = JSON.parse(xhr.response);
        if(xhr.status==200 && resp.code == 1) {
          callback(JSON.parse(xhr.response))
        } else if(xhr.status == 401) {
          alert('您暂未登陆，即将跳转到界面')
          setTimeout(() => {
            window.location.href = '/login.html';
          }, 5000)
        } else if(resp.body && resp.body.msg) {
          alert(resp.body.msg);
        } else {
          alert("未知错误");
        }
      }
    };
    xhr.open(param.method, self.host + url, true);
    if(param.method === 'POST') {
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.send(JSON.stringify(param.data) || null);
  }
} ;
