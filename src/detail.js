import Request from 'js/request.js';
import Render from 'js/render.js';
import "css/base.css";
import "css/detail.css";

var s = window.location.search;
var matches = s.match(/id=.+/g);
if(matches && matches.length) {
  Request.getArticle(s.slice(1).split('=')[1], function (resp) {
    if (resp.code == 1) {
      Render.renderDetail(resp.body);
    }
  })
} else {
  alert("id not found")
}
