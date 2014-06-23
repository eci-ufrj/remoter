//Run locally, serving static files or whatever, for testing purposes
var express = require('express');
var app = express();
var PORT = 3000;
console.log("Running on port "+PORT);


app.use("/components",express.static(__dirname+"/bower_components"));
app.use("/js",express.static(__dirname+"/static/js"));
app.use("/",express.static(__dirname+"/templates/video/"))




app.listen(PORT);