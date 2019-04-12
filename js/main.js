requirejs.config({
  baseUrl: 'common',
  paths: {
    "ajax": "ajax",
    "helper": "helper",
    "request": "request",
    "render": "render"
  }
});

requirejs(['request', 'render'], function (Request, render) {
  Request.get(function (resp) {
    if (resp.code == 1) {
      render(resp.body);
    }
  })
});