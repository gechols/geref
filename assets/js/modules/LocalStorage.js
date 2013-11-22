/**
 * @param el The element within which local storage will be used.
 * @param config The configuration parameters.
 */
function MultiColumnList (el, config) {
  var $el = $(el);

  $el.on("blur", function(evt) {
    localStorage.setItem($el.attr("id"), $el.html());
  });

  $(document).on("ControlsReady", function () {
    if (localStorage.getItem($el.attr("id"))) {
      $el.html(localStorage.getItem($el.attr("id")));
    }
  });
}

module.exports = function (config) {
  return new MultiColumnList(config.container, config);
};