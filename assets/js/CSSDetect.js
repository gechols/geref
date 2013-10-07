(function(win){
  "use strict";

  var el = win.document.createElement('div'),
    camelRe = /-([a-z]|[0-9])/ig,
    cache = {},
    support,
    camel,
    key;

  win.isStyleSupported = function(style, value){
    value = arguments.length === 2 ? value : 'inherit';
    if('CSS' in win && 'supports' in win.CSS){
      return win.CSS.supports(style, value);
    }
    if('supportsCSS' in win){
      return win.supportsCSS(style, value);
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
  };

  win.whichStyleSupported = function(list) {
    for (var i = 0; i < list.length; i++) {
      if (isStyleSupported(list[i])) {
        console.log("Found supported style:", list[i]);
        return list[i];
      }
    }
    return null;
  }

})(this);
