  import "./css/base.css";
  import "./css/style.css";
  
  import Request from './js/common/request.js';
  import Render from './js/common/render.js';

  Request.get(function (resp) {
    if (resp.code == 1) {
      Render.list(resp.body);
    }
  })
  // Render.list([{"id": 1, "title": "[\u7f6e\u9876]\u4ece2018\u5e74\u8d77\uff0c\u6bcf\u5468\u9605\u8bfb\u4e00\u672c\u4e66", "created": "2019-04-10", "tags": "\u8bfb\u4e66", "overview": "\u6bcf\u5468\u8bfb\u4e00\u672c\u4e66"}, {"id": 2, "title": "[\u539f\u521b]\u4ef7\u503c\u5224\u65ad\u600e\u4e48\u7834\u574f\u4f60\u7684\u751f\u6d3b?", "created": "2019-03-26", "tags": "\u5fc3\u7406,\u793e\u4ea4", "overview": "\u4e3a\u4ec0\u4e48\u6709\u7684\u4eba\u5f88\u96be\u6309\u7167\u81ea\u5df1\u6240\u60f3\u53bb\u751f\u6d3b\uff0c\u5e76\u4e14\u5728\u793e\u4ea4\u751f\u6d3b\u4e2d\u8868\u73b0\u7684\u96be\u4ee5\u5408\u7fa4\u3002"}, {"id": 3, "title": "[\u8bd1]Flask Web Development (\u66f4\u65b0\u5230\u7b2c\u516b\u7ae0\uff09", "created": "2015-07-08", "tags": "Flask,Python", "overview": "\u56e0\u4e3a\u5f00\u53d1\u4f7f\u7528\u7684\u7f18\u6545\uff0c\u63d0\u4f9b\u8be5\u56fe\u4e66\u7684\u82f1\u6587\u7248\u7684\u7b80\u660e\u627c\u8981\u7684\u7ffb\u8bd1\u3002"}])