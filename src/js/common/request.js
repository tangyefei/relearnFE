


import ajax from './ajax.js';
import Utils from './utils.js';

export default {
  Auth: {
    login(data, callback){
      return ajax.postJson('/api/login', data, callback);
    }
  },
  Admin: {
    delArticle(id, callback) {
      return ajax.postJson('/api/manage/article/del', {id}, callback);
    },
  },
  saveArticle(data, callback) {
    return ajax.postJson('/api/article', data, callback);
  },
  getArticle(id, callback) {
    return ajax.get(`/api/article/${id}`, callback);
  },
  getArticles(param, callback){
    var query = Utils.formatQuery(param);
    return ajax.get(`/api/articles${query}`, callback);
  }
}

