var connection = new WebSocket("ws://localhost:8080");
connection.onmessage = function(event) {
  console.log("Client received response:", event.data);
  $("#response").val(event.data);
}

$("#message").on("change", function(evt) {
  console.log("LOOK: message=", evt.target.value);
  connection.send("From Client:" + evt.target.value);
});
