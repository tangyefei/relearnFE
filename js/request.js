
// your api host
const host = 'http://localhost:8000'

window.Request = {
  get(callback){
    // your api define router
    return ajax.get(host + '/api/articles', callback);
  }
}

