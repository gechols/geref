console.log("clientEjs.js");

var template = "Hello world";

$(document).ready(function () {
  console.log("Document.ready()");
  console.log("Constructing EJS");
//  var ejs = new EJS({});
  console.log("Rendering template");
  var html = ejs.render(template, {platform: "client"});
  console.log("Adding HTML:", html);
  $("#clientEJS").append(html);
});
