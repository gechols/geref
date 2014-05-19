function PromiseControl (el, config) {
  var Q = require("q");
  var $el = $(el);

  $el.find(".promiseButton").on("click", function(evt) {
    evt.preventDefault();

    if ($(evt.target).attr("data-promisetype") === "parallel") {
      getTimeoutPromise(".promise1", 5000).then(success, failure);
      getTimeoutPromise(".promise2", 8000).then(success, failure);
      getTimeoutPromise(".promise3", 10000).then(success, failure);
    }
    else {
      getTimeoutPromise(".promise1", 5000).then(function(sel) {
        success(sel);
        getTimeoutPromise(".promise2", 8000).then(function(sel) {
          success(sel);
          getTimeoutPromise(".promise3", 10000).then(success);
        });
      });
    }
  });

  $el.find(".resetButton").on("click", function(evt) {
    $el.find(".promiseText").text("No current promise");
  });

  function getTimeoutPromise(sel, delayMS) {
    $(sel).text("Starting promise");
    var deferred = Q.defer();
    setTimeout(function() {deferred.resolve(sel);}, delayMS);
    return deferred.promise;
  }

  function success(sel) {
    $(sel).text("Completed");
  }

  function failure(error) {
    console.log("LOOK: failure called:", error);
  }

//  var promise1 = new Q.Promise(function(success, failure) {
//    $(".promise1").text("Active");
//    window.setTimeout(function() {
//      $(".promise1").text("Done");
//      success();
//    }, 3000);
//  });

//  var promise2 = new Promise(function(success, failure) {
//    $(".promise2").text("Active");
//    window.setTimeout(function() {
//      $(".promise2").text("Done");
//      success();
//    }, 2000);
//  });
//
//  var promise3 = new Promise(function(success, failure) {
//    $(".promise3").text("Active");
//    window.setTimeout(function() {
//      $(".promise3").text("Done");
//      success();
//    }, 6000);
//  });
//
//  promise1.then(promise2.resolve());

}

module.exports = function (config) {
  return new PromiseControl(config.container, config);
};

