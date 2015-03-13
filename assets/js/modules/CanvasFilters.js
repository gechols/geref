function CanvasFilters(el, config) {

  if (typeof config.srcCanvasId === 'undefined'){
    throw "ERROR: srcCanvasId not specified";
  }

  if (typeof config.targetCanvasId === 'undefined'){
    throw "ERROR: targetCanvasId not specified";
  }

  var srcCanvas = $("#" + config.srcCanvasId)[0];
  var targetCanvas = $("#" + config.targetCanvasId)[0];
  var img;

  Filters = {};

  Filters.getPixels = function(img) {
    var ctx = srcCanvas.getContext('2d');
    return ctx.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
  };

  Filters.filterImage = function(filter, image, var_args) {
    var args = [this.getPixels(image)];
    for (var i = 2; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    return filter.apply(null, args);
  };

  Filters.grayscale = function(pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      // CIE luminance for the RGB
      // The human eye is bad at seeing red and blue, so we de-emphasize them.
      var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      d[i] = d[i + 1] = d[i + 2] = v
    }
    return pixels;
  };

  Filters.brightness = function(pixels, adjustment) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      d[i] += adjustment;
      d[i + 1] += adjustment;
      d[i + 2] += adjustment;
    }
    return pixels;
  };

  Filters.threshold = function(pixels, threshold) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
      var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255 : 0;
      d[i] = d[i + 1] = d[i + 2] = v
    }
    return pixels;
  };

  Filters.tmpCanvas = document.createElement('canvas');
  Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

  Filters.createImageData = function(w,h) {
    return this.tmpCtx.createImageData(w,h);
  };

  Filters.convolute = function(pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = Filters.createImageData(w, h);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = (scy*sw+scx)*4;
              var wt = weights[cy*side+cx];
              r += src[srcOff] * wt;
              g += src[srcOff+1] * wt;
              b += src[srcOff+2] * wt;
              a += src[srcOff+3] * wt;
            }
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a + alphaFac*(255-a);
      }
    }
    return output;
  };

  Filters.convoluteFloat32 = function(pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);

    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;

    var w = sw;
    var h = sh;
    var output = {
      width: w, height: h, data: new Float32Array(w*h*4)
    };
    var dst = output.data;

    var alphaFac = opaque ? 1 : 0;

    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = Math.min(sh-1, Math.max(0, sy + cy - halfSide));
            var scx = Math.min(sw-1, Math.max(0, sx + cx - halfSide));
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a + alphaFac*(255-a);
      }
    }
    return output;
  };

  Filters.sobel = function(pixels, args) {
    var grayscale = Filters.filterImage(Filters.grayscale, img);
    // Note that ImageData values are clamped between 0 and 255, so we need
    // to use a Float32Array for the gradient values because they
    // range between -255 and 255.
    var vertical = Filters.convoluteFloat32(grayscale,
        [ -1, 0, 1,
          -2, 0, 2,
          -1, 0, 1 ]);
    var horizontal = Filters.convoluteFloat32(grayscale,
        [ -1, -2, -1,
          0,  0,  0,
          1,  2,  1 ]);
    var final_image = Filters.createImageData(vertical.width, vertical.height);
    for (var i=0; i<final_image.data.length; i+=4) {
      // make the vertical gradient red
      var v = Math.abs(vertical.data[i]);
      final_image.data[i] = v;
      // make the horizontal gradient green
      var h = Math.abs(horizontal.data[i]);
      final_image.data[i+1] = h;
      // and mix in some blue for aesthetics
      final_image.data[i+2] = (v+h)/4;
      final_image.data[i+3] = 255; // opaque alpha
    }
    return final_image;
  }

  function runFilter(srcCanvas, targetCanvas, filter, arg1, arg2, arg3) {
    var idata = Filters.filterImage(filter, img, arg1, arg2, arg3);
    var targetCtx = targetCanvas.getContext('2d');
    targetCtx.putImageData(idata, 0, 0);
  }

  $(".grayscale").on("click", function() {
    runFilter(srcCanvas, targetCanvas, Filters.grayscale);
  });
  $(".brighten").on("click", function() {
    runFilter(srcCanvas, targetCanvas, Filters.brightness, 40);
  });
  $(".threshold").on("click", function() {
    runFilter(srcCanvas, targetCanvas, Filters.threshold, 80);
  });
  $(".sharpen").on("click", function() {
    runFilter(srcCanvas, targetCanvas, Filters.convolute,
        [  0, -1,  0,
          -1,  5, -1,
           0, -1,  0]);
  });
  $(".blur").on("click", function() {
    runFilter(srcCanvas, targetCanvas, Filters.convolute,
        [ 1/9, 1/9, 1/9,
          1/9, 1/9, 1/9,
          1/9, 1/9, 1/9 ]
    );
  });
  $(".custom").on("click", function() {
    runFilter(srcCanvas, targetCanvas, Filters.convolute,
        [ 1, 1, 1,
          1, 0.7, -1,
          -1, -1, -1 ]
    );
  });
  $(".sobel").on("click", function() {
    runFilter(srcCanvas, targetCanvas, Filters.sobel);
  });

  var webWorker = null;
  $(".webworker").on("click", function() {
    if (!webWorker) {
      webWorker = new Worker(FS.File.js("webworker.js"));
      webWorker.onmessage = function(event) {
        var targetCtx = targetCanvas.getContext('2d');
        targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        targetCtx.fillText("Worker Thread Complete", 10, 10);
      }
    }
    webWorker.postMessage("Hey there good lookin");
  });

  $(document).on("imageLoaded", function(event) {
    img = event.img;
  });

  $(document).on("ControlsReady", function() {
    console.log("Filters are ready");
  });

}

module.exports = function (config) {
  return new CanvasFilters(config.container, config);
};
