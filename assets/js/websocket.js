var host = location.origin.replace(/^https/, 'ws').replace(/^http/, 'ws').replace(":5000", "");
console.log("LOOK: host=", host);
var connection = new WebSocket(host + ":8001");
connection.onmessage = function(event) {
  console.log("Client received response:", event.data);
  $("#response").val(event.data);
}

$("#message").on("change", function(evt) {
  console.log("LOOK: message=", evt.target.value);
  connection.send("From Client:" + evt.target.value);
});
