/**
 * @param el The UL containing the list items to be put into multiple columns.
 * @param config The configuration parameters.
 */
function MultiColumnList (el, config) {

  var cssDetect;
  require.ensure(["CSSDetect"], function(require) {
    cssDetect = require("CSSDetect");
    init();
  });

  var configDefaults = {
    numColumns: 4,
    numRows: 0,         // 0 means no limit
    containerType: "<span>",
    useCss3: true       // false means not to use column-count even if supported
  };

  // This is built using the 12 column layouts from Bootstrap
  var validNumColumns = [2, 3, 4, 6, 12];
  // This array corresponds to the values in the validNumColumns
  var spanClasses = ["span6", "span4", "span3", "span2", "span1"];
  var columnIdx = -1;

  var newConfig = {};
  $.extend(newConfig, configDefaults, config);
  config = newConfig;

  function init() {
    columnIdx = validNumColumns.indexOf(config.numColumns);
    if (columnIdx === -1) {
      alert("Unsupported number of columns:" + config.numColumns);
      return;
    }

    var style = null;
    if (config.useCss3 && (style = cssDetect.whichStyleSupported(["-moz-column-count", "-webkit-column-count", "column-count"]))) {
      $(el).css(style, config.numColumns.toString());
      return;
    }

    var listItems = $(el).children('li');

    if (config.numRows && config.numRows > 0) {
      var maxItems = config.numColumns * config.numRows;
      if (listItems.length > maxItems) {
        for (var i = listItems.length - 1; i >= maxItems; i--) {
          $(listItems[i]).remove();
          listItems.splice(i, 1);
        }
      }
    }

    var itemsPerColumn = Math.floor(listItems.length / config.numColumns);
    var modItemsPerColumn = listItems.length % config.numColumns;

    for (var colIdx = 0; colIdx < config.numColumns; colIdx++) {
      var columnEl = $(config.containerType);
      columnEl.addClass(spanClasses[columnIdx]);
      var spanItemsCount = itemsPerColumn;
      if (modItemsPerColumn) {
        spanItemsCount++;
        modItemsPerColumn--;
      }

      for (var rowIdx = 0; rowIdx < spanItemsCount; rowIdx++) {
        var listItemEl = listItems.splice(0, 1);
        $(listItemEl).appendTo(columnEl);
      }

      $(el).append(columnEl);
    }
  }

}

module.exports = function (config) {
  return new MultiColumnList(config.container, config);
};
