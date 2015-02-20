(function() {

  var filter = function(imageData, iterations) {
    var data = imageData.data;
    for (var iters = 0; iters < iterations; iters++) {
      for (var i = 0; i < data.length; i += 4) {
        var num = Math.round(0.21 * data[i] + 0.71 * data[i+1] + 0.07 * data[i+2]);
        data[i] = num;
        data[i+1] = num;
        data[i+2] = num;
        data[i+3] = 205 + Math.random() * 50;
      }
    }
  }

  //document.addEventListener("DOMContentLoaded", function() {
  //  var originalCanvas = document.getElementById("originalRecordCanvas");
  //  var adjustedCanvas = document.getElementById("adjustedRecordCanvas");
  //  var sharpenButton = document.getElementById("sharpenFilter");
  //
  //  var HEIGHT = originalCanvas.height;
  //  var WIDTH = originalCanvas.width;
  //
  //  var origCtx = originalCanvas.getContext("2d");
  //  var adjCtx = adjustedCanvas.getContext("2d");
  //
  //  originalCanvas.addEventListener("dragover", function() {
  //    originalCanvas.classList.add("over");
  //  }, false);
  //
  //  originalCanvas.addEventListener("dragleave", function() {
  //    originalCanvas.classList.remove("over");
  //  }, false);
  //
  //  originalCanvas.addEventListener("drop", function(event) {
  //    e.preventDefault();
  //    var reader = new FileReader();
  //    reader.onload = function(e) {
  //      var dataURL = e.target.result;
  //      var i = new Image();
  //      i.onload = function() {
  //        origCtx.drawImage(i, 0, 0, WIDTH, HEIGHT);
  //      }
  //      i.src = dataURL;
  //    }
  //    reader.readAsDataURL(event.dataTransfer.files[0]);
  //  }, false);
  //
  //  var handler = function() {
  //    var imageData = origCtx.getImageData(0, 0, WIDTH, HEIGHT);
  //    var iterations = 20;
  //    filter(imageData, iterations);
  //    adjCtx.putImageData(imageData, 0, 0);
  //  }
  //
  //  sharpenButton.addEventListener("click", handler, false);
  //
  //  console.log("WebWorker init complete");
  //});

})();
