module.exports = {

  isStyleSupported: function (style, value){
    var el = window.document.createElement('div'),
        camelRe = /-([a-z]|[0-9])/ig,
        cache = {},
        support,
        camel,
        key;

    value = arguments.length === 2 ? value : 'inherit';
    if('CSS' in window && 'supports' in window.CSS){
      return window.CSS.supports(style, value);
    }
    if('supportsCSS' in window){
      return window.supportsCSS(style, value);
    }
    key = style + ':' + value;
    if(key in cache){
      return cache[key];
    }
    support = false;
    camel = style.replace(camelRe, function(all, letter){
      return (letter + '').toUpperCase();
    });
    support = (typeof el.style[camel] === 'string');
    el.style.cssText = style+':'+value;
    support = support && (el.style[camel] !== '');
    return cache[key] = support;
  },

  whichStyleSupported: function (list) {
    for (var i = 0; i < list.length; i++) {
      if (module.exports.isStyleSupported(list[i])) {
        console.log("Found supported style:", list[i]);
        return list[i];
      }
    }
    return null;
  }

}
