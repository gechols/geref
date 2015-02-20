function FileDropCanvas(el, config) {

  if (typeof config.canvasId === 'undefined'){
    throw "ERROR: canvasId not specified";
  }

  var canvas = $("#" + config.canvasId)[0];
  var context = canvas.getContext("2d");
  var img = document.createElement("img");

  var clearCanvas = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // When the image gets loaded, draw it onto the canvas
  img.addEventListener("load", function () {
    clearCanvas();
    context.drawImage(img, 0, 0);
    $.event.trigger({type: "imageLoaded", img: img});
  }, false);

  // Enable drag and drop
  canvas.addEventListener("dragover", function (event) {
    event.preventDefault();
  }, false);

  // Handle dropped image file (Firefox and Chrome)
  canvas.addEventListener("drop", function (dropEvent) {
    var files = dropEvent.dataTransfer.files;
    if (files.length > 0) {
      var file = files[0];
      if (typeof FileReader !== "undefined" && file.type.indexOf("image") !== -1) {
        var reader = new FileReader();
        reader.onload = function (fileEvent) {
          img.src = fileEvent.target.result;
        }
        reader.readAsDataURL(file);
      }
    }
    dropEvent.preventDefault();
  }, false);

  $(document).on("ControlsReady", function() {
    context.fillText("Drop an image onto the canvas", 10, 10);
  });

}

module.exports = function (config) {
  return new FileDropCanvas(config.container, config);
};
