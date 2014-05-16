function PromiseControl (el, config) {
  var Q = require("q");
  var $el = $(el);

  $el.find(".promiseButton").on("click", function(evt) {
    evt.preventDefault();
    $el.find(".promiseText").text("Starting promise");
    console.log("Starting promise1 Q=", Q);
//    promise1.resolve();
  });

  $el.find(".resetButton").on("click", function(evt) {
    $el.find(".promiseText").text("No current promise");
  });

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

