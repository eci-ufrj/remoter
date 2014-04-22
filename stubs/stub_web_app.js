//Run locally, serving static files or whatever, for testing purposes
var express = require('express');
var app = express();

app.use("/components",express.static(__dirname+"/bower_components"));
app.use("/js",express.static(__dirname+"/static/js"));
app.use("/",express.static(__dirname+"/templates/video/"))




app.listen(3000);