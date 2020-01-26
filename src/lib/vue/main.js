import Vue from './index';

new Vue({
  el: "#app",
  data: {
    articles: [{
      "id": 20,
      "type": "tech", 
      "title": "扎实前端系列：JavaScript实现继承", 
      "created_at": "2019-12-19T16:00:00.000Z", 
      "tags": "JavaScript, 继承", 
      "overview": "本篇将介绍在JavaScript中如何实现继承",
      "showTitle": true,
    },{
      "id": 21,
      "type": "tech", 
      "title": "扎实前端系列：JavaScript实现继承", 
      "created_at": "2019-12-19T16:00:00.000Z", 
      "tags": "JavaScript, 继承", 
      "overview": "本篇将介绍在JavaScript中如何实现继承",
      "showTitle": true,
    }]
  }
})
