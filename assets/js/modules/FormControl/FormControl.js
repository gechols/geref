function FormControl (el, config, lang) {
  var $el = $(el);

  // Make sure we are being loaded on the form control itself
  if ($el.prop("tagName") !== "FORM") {
    alert("FormControl requires a FORM element not:" + $el.prop("outerHTML"));
    return;
  }

  var validations = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ssn: /\d{3}-\d{2}-\d{4}/,
    phone: /\d{3}-\d{2}-\d{4}/
  }

  $el.find(":input").on("blur", function(evt) {
    var $target = $(evt.target);
    var val = $target.val();
    var validation = $target.attr("data-validation");
    if (!isEmptyStr(val) && validation && validations[validation]) {
      var $parent = $target.parent(".control-group");
      var validationExp = new RegExp(validations[validation]);
      if (!validationExp.test(val)) {
        $parent.addClass("error");
      }
      else {
        $parent.removeClass("error");
      }
    }
  });

  function isEmptyStr(obj) {
    if (obj && typeof obj === "string" && obj.trim() !== "") {
      return false;
    }
    return true;
  }

}

module.exports = function (config) {
  return new FormControl(config.container, config, lang);
};
