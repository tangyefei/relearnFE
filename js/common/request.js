


define(['ajax'], function (ajax){
  const host = 'http://localhost:8000'
  return {
    Auth: {
      login(data, callback){
        return ajax.postJson(host + '/api/login', data, callback);
      }
    },
    Admin: {
      get(callback){
        return ajax.get(host + '/api/manage/articles', callback);
      },
      delArticle(id, callback) {
        return ajax.postJson(host + '/api/manage/article/del', {id}, callback);
      },
      saveArticle(data, callback) {
        return ajax.postJson(host + '/api/manage/article/add', data, callback);
      },
      getArticle(id, callback) {
        return ajax.get(host + '/api/manage/article', {id}, callback);
      }
    },
    get(callback){
      return ajax.get(host + '/api/articles', callback);
    }
  }
});

