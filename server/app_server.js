//Run locally, serving static files or whatever, for testing purposes
var app = require('http').createServer(handler),
    fs = require('fs'),io = require('socket.io').listen(app);

var port = 5000;
app.listen(port);



function handler (req, res) {
  fs.readFile('./templates/video/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      console.log('Error loading index.html');
      console.log(err);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}