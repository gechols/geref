function Dependency (el, config) {
  // JQuery is already included by the layout (e.g. theme-engage)
  var tooltip = require("TooltipBS");

  var configDefaults = {
    "targetSel": ".tip-needed",
    "tooltipText": "This might be difficult"
  };

  var newConfig = {};
  $.extend(newConfig, configDefaults, config);
  config = newConfig;

  $(el).find(config.targetSel).attr("title", config.tooltipText).tooltip();
}

module.exports = function (config) {
  var params = [];
  for (var i = 0; i < arguments.length; i++) {
    params.push("Param[" + i + "]=" + JSON.stringify(arguments[i]));
  }
  return new Dependency(config.container, config);
};
