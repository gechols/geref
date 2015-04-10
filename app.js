/**
 * Module dependencies
 */
var woodruff = require("woodruff");
var themeEngage = require("theme-engage");

/**
 * Expose the app
 */
var app = module.exports = woodruff(__dirname, themeEngage);

var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8001});
console.log("WebSocket server loaded");

wss.on('connection', function(conn) {

  console.log("Server web socket connection opened");

  conn.on('message', function(message) {
    console.log('Client sent:', message);
    conn.send(message + " - received");
  });
});

