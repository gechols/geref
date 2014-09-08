function Bold(el) {
  $(el).css("font-weight","Bold");
}

module.exports = function (config) {
  return new Bold(config.container);
};
