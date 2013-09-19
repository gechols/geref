var template = "<span>This is rendered from the <%- platform %></span>";

$(document).ready(function () {
  var html = ejs.render(template, {platform: "client"});

  $("#clientEJS").append(html);
});
