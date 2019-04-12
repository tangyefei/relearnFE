


define(['ajax'], function (ajax){
  const host = 'http://localhost:8000'
  return {
    get(callback){
      return ajax.get(host + '/api/admin/rate', callback);
    }
  }
});

