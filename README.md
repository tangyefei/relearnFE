# relearnFE

> 这个repo从最简单的html开始，逐步搭建成一个完整的blog，在搭建的过程中不断提出新的问题，然后寻找技术手段予以解决，其中陆续会包含的有CSS，DOM查询，Ajax请求，压缩，JS的模块化，CSS的预编译，路由，采用何种前端框架，如何发布等。

## Story #1

> 搭建一个最简单的博客页面吧，包含个人介绍和几个简单的栏目，还能显示发布的历史文章，最好还能支持在手机端也可以查看。

## Story #2

> 历史文章每多一篇都要重复拷贝一端HTML代码，能不能有一个数据结构，通过JavaScript来动态插入历史文章的内容呢。

## Story #3

> 假定我们现在有了自己的API（${host}/api/articles）可以调用得到历史文章了，并且支持跨域前台封装一个ajax的代码调用后台接口吧。
> 考虑到跨域问题的两种情况：
（1）直接index.html调用ajax会有跨域问题，于是我们装一个http-server来在项目目录启动一个web服务器。
（2）如果前后端部署在不同的服务器后者端口也会有跨域问题，我们需要在服务器端配置白名单，以支持跨域。

## Story #4

> script加载的顺序如果错乱会导致变量引用不到，如果某一个请求太慢了后面的先加载了怎么办？尝试使用AMD的模块加载处理下吧，结构会更清楚一点。

## Story #5

> 我们需要一个后台管理界面，可以看到所有的文章，并进行 增、改、删的操作。假定后台的接口都定义好了，在调用这些管理接口的时候会验证登陆权限成功。尝试用最直观的方法，多页面来实现它。