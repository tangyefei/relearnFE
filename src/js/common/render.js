import $ from './dquery.js';
import Utils from './utils.js';
import showdown  from "showdown";

var markdown = new showdown.Converter();

function renderList(artcList) {
  var $container = $('.article-list-container');

  if($container.get(0).childElementCount > 0) {
    Array.prototype.forEach.call($container.get(0).children, function(c) {c.remove();});
  }

  artcList.forEach(artc => {
    var $artc = $('div', true).addClass('article').data('id', artc.id);;
    var $title = $('h3', true).text(artc.title);
    var $meta = $('p', true).addClass('meta');
    var $overview = $('div', true).addClass('overview').text(artc.overview);

    var $meta_date = $('span', true).addClass('created-date').text(Utils.format(artc.created_at));
    var $meta_tag = $('span', true).addClass('tag').text(Utils.map('ARTICLE_CATEGORY', artc.type) + '(' + artc.tags + ')');
    $meta.append($meta_date).append($meta_tag);

    $artc.append($title).append($meta).append($overview);
    $container.append($artc);
  });
  $container.on('click', '.article h3', function(evt) {
    let id = evt.target.parentElement.dataset.id;
    if(id){
      // ${window.origin}
      window.open(`/detail.html?id=${id}`, '_blank');
    }
  })
}

function renderManageList(artcList) {
  var $container = $('.article-container');
  artcList.forEach(artc => {
    var $artc = $('li', true).addClass('item').text(artc.title).data('id', artc.id);
    var $del = $('span', true).addClass('btn').addClass('del-btn').text('delete');
    var $view = $('span', true).addClass('btn').addClass('view-btn').text('view');
    $artc.append($del.get(0)).append($view.get(0));
    $container.append($artc);
  });
  var $add = $('span', true).addClass('btn').addClass('add-btn').text('add');
  $container.append($add.get(0))
}

function renderDetail(data) {
  var $banner = $('div',true).addClass('banner');
  var $title = $('h2', true).text(data.title);
  var $desc = $('div', true).addClass('desc').text(Utils.format(data.created_at)).append($('span', true).text(Utils.map('ARTICLE_CATEGORY', data.type) + '(' + data.tags + ')'))
  
  $banner.append($title).append($desc);
  var $content = $('div', true).addClass('content').html(markdown.makeHtml(data.content));

  $('.article-container').append($banner).append($content);
}
export default {renderList, list: renderList, mlist: renderManageList, renderDetail};
