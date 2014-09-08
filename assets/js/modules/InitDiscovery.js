function InitDiscovery (el, params) {
  // JQuery is already included by the layout (e.g. theme-engage)
  for (var i = 0; i < params.length; i++) {
    $(el).find(".output").append("<li><pre>" + params[i] + "</pre></li>");
  }
}

module.exports = function () {
  var params = [];
  for (var i = 0; i < arguments.length; i++) {
    params.push("Param[" + i + "]=" + JSON.stringify(arguments[i]));
  }
  return new InitDiscovery(arguments[0].container, params);
};
