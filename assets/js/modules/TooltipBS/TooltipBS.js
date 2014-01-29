function TooltipBS (el, config) {
  console.log("LOOK: TooltipBS initializing on:", el);
  $(el).tooltip();
}

module.exports = function (config) {
  return new TooltipBS(config.container, config);
};
