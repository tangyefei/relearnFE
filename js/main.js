requirejs.config({
  baseUrl: 'js/common',
  paths: {
    "ajax": "ajax",
    "helper": "helper",
    "request": "request",
    "render": "render"
  }
});

requirejs(['request', 'render'], function (Request, Render) {
  Request.get(function (resp) {
    if (resp.code == 1) {
      Render.list(resp.body);
    }
  })
});