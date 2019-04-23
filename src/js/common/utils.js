
const dict = {
  ARTICLE_CATEGORY: {
    'psy': '心理',
    'tech': '技术',
    'read': '读书',
    'travel': '旅行',
  }
} 
export default  {
  map: function(dictName, key) {
    return dict[dictName][key];
  },
  format: function(date) {
    var d = new Date(date);
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();
    month = month < 10 ? ('0' + month) : month;
    year = year < 10 ? ('0' + year) : year;
    return year + "-" + month + "-" + date
  },
  isArray(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array';
  },
  formatQuery: function(param) {
    param =  param || {};
    var couples = [];
    for(var key in param) {
      couples.push(key + '=' + param[key]);
    }
    if(couples.length > 0) {
      return '?' + couples.join('&');
    } else {
      return '';
    }
  }
}