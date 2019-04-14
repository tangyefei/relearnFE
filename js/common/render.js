define(['helper'], function(helper){
  var $ = helper.$;
  function renderList(artcList) {
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
  }
  function renderManageList(artcList) {
    var $container = $('.article-container');
    artcList.forEach(artc => {
      var $artc = $('li', true).addClass('item').text(artc.title).data('id', artc.id);
      var $del = $('span', true).addClass('btn').addClass('del-btn').text('delete');
      var $view = $('span', true).addClass('btn').addClass('view-btn').text('view');
      $artc.append($del.get(0)).append($view.get(0));
      $container.append($artc.get());
    });
    var $add = $('span', true).addClass('btn').addClass('add-btn').text('add');
    $container.append($add.get(0))
  }
  function clear() {

  }
  return {list: renderList, mlist: renderManageList};
})
