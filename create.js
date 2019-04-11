var artcList = [
  {
    name: 'books',
    title: '[置顶]从2018年起，每周阅读一本书',
    created: '2019-04-10',
    tags: '读书',
    overview: '每周读一本书'
  },{
    type: 'article',
    title: '[原创]价值判断怎么破坏你的生活?',
    created: '2019-03-26',
    tags: '心理,社交',
    overview: '为什么有的人很难按照自己所想去生活，并且在社交生活中表现的难以合群。'
  }, {
    title: '[译]Flask Web Development (更新到第八章）',
    created: '2015-07-08',
    tags: 'Flask,Python',
    overview: '因为开发使用的缘故，提供该图书的英文版的简明扼要的翻译。'
  }
];
var $container = $('.article-container');

artcList.forEach(artc => {
  var $artc = $('div', true).addClass('article');
  var $title = $('h3', true).text(artc.title);
  var $meta = $('p', true).addClass('meta');
  var $overview = $('div', true).addClass('overview').text(artc.overview);

  var $meta_date = $('span', true).addClass('created-date').text(artc.created);
  var $meta_tag = $('span', true).addClass('tag').text(artc.tags);
  $meta.append($meta_date.get()).append($meta_tag.get());

  $artc.append($title.get()).append($meta.get()).append($overview.get());
  $container.append($artc.get());
});