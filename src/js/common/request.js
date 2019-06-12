


import ajax from './ajax.js';
import Utils from './utils.js';

export default {
  Auth: {
    login(data, callback){
      return ajax.postJson('/login', data, callback);
    }
  },
  Admin: {
    delArticle(id, callback) {
      return ajax.postJson('/manage/article/del', {id}, callback);
    },
  },
  saveArticle(data, callback) {
    return ajax.postJson('/article', data, callback);
  },
  getArticle(id, callback) {
    return ajax.get(`/article/${id}`, callback);
  },
  getArticles(param, callback){
    var query = Utils.formatQuery(param);
    return ajax.get(`/articles${query}`, callback);
  }
}

