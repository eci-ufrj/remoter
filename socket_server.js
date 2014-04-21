//Entry point for Remoter service
var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT || 5000);
var app_socket;
//waits for remote controler (a.k.a. mobile app) for interactions
app.get('/control/:control', function (req, res) {
  if (app_socket!==undefined){
    app_socket.emit("interaction",{type:req.params.control});
    res.status(200).send("ok");
  }
});

//listen for webapp connection
io.sockets.on('connection', function (socket) {
  console.log("App connection!!");
  app_socket = socket;
});