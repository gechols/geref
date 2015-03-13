// This is a web worker file

onmessage = function(event) {
  console.log("LOOK: webworker received message event:", event);
  // This is where we do something that takes a long time to execute
  setTimeout(function() {
    postMessage({result: "Done"});
  }, 3000);
}

onerror = function(errorEvent) {
  console.log("ERROR: webworker encountered an error, message=", errorEvent.message,
      ", filename=", errorEvent.filename, ", lineno=", errorEvent.lineno);
}
