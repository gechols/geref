function TooltipBS (el, config) {
  $(el).tooltip();
}

module.exports = function (config) {
  return new TooltipBS(config.container, config);
};
