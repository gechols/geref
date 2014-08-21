function InitDiscovery (el, params) {
  for (var i = 0; i < params.length; i++) {
    $(el).find(".params").append("<li><pre>" + params[i] + "</pre></li>");
  }
}

module.exports = function () {
  var params = [];
  for (var i = 0; i < arguments.length; i++) {
    params.push("Param[" + i + "]=" + JSON.stringify(arguments[i]));
  }
  return new InitDiscovery(arguments[0].container, params);
};
