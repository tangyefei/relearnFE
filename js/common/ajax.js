define(function (){
  function createXHR() {
    if(window.XMLHttpRequest != undefined) {
      return new XMLHttpRequest();
    } else {
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  return {
    get(url, callback) {
      var xhr = createXHR();
      xhr.onreadystatechange = function() {
        if (xhr.readyState==4 && xhr.status==200) {
          callback(JSON.parse(xhr.response))
        }
      };
      xhr.open("GET", url, true);
      xhr.send(null);
    }
  }
});
