
function render(artcList) {
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

Request.get(function(resp) {
  if(resp.code == 1) {
    // alert(resp.body);
    render(resp.body);
  }
})
