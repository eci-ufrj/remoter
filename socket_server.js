//Entry point for Remoter service
var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
//Google 
var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;
var https = require('https');
//Database
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect("mongodb://localhost:27017/remoter", function(err, database) {
  if(err) { 
    console.log(err)
  }else{
    db = database;
    
  }
});

function find_user (user_id,callback) {
  db.collection("users",{strict:true},function(err, collection) {
    if (!err){
      collection.find({google_id:user_id}).toArray(function(err, items) {
          if (err){
            args = err;
            console.log("Mongo <toArray> error: "+ err);
          }else{
            args = items;
            console.log("Mongo response");
          }
          callback.call(this,args);
        });
    }else{
      console.log("Mongo collection error: " + err);
    }
    });
}

var API_KEY = "AIzaSyAMxUzSAD5px7rO_-LBIKEbjVVDx3q6hEw";

//Google


server.listen(process.env.PORT || 5000);

var clients = {mobile:[]}


app.use("/",express.static(__dirname+"/client/templates/"));
app.use("/css",express.static(__dirname+"/client/css/"));
app.use("/js",express.static(__dirname+"/client/js/"));
app.use("/libs",express.static(__dirname+"/client/js/bower_components/"));

//waits for remote controler (a.k.a. mobile app) for interactions
//controller 'get' fallback
app.get('/control/:control', function (req, res) {
  if (clients.app!==undefined){
    clients.app.emit("interaction",{type:req.params.control});
    res.status(200).send("ok");
  }
});

//listen for webapp connection
io.of("/app").on('connection', function (socket) {
  console.log("App connection!!");
  clients["app"] = socket;

});

//listen for mobile app connection
io.of("/mobile").on('connection', function (socket) {
  
  console.log("Mobile connection!!");
  clients["mobile"].push(socket);
  
  socket.on("interaction",function(interaction) {
  	if (clients.app !== undefined){
  		clients.app.emit("interaction",interaction);
  	}	
  		
  })
});

app.get("/auth/:token",function (req,res) {
  var auth_token = req.params.token;
  console.log("Token: "+auth_token);
  var req_options = build_googleapi_tokeninfo(auth_token,API_KEY);
  var result;
  retrieve_user_id(req_options,function(info){
    if (info.error_description){
      console.log(info.error_description);
      }else{
        console.log("Google user id: " + info.user_id);
        find_user(info.user_id,function(args) {
        console.log("args: " + args);
        result = args;
        console.log("boy size is "+result.length);
        if ( result instanceof Array){
          if (result.length > 0){
              console.log("user id: " + result[0].google_id);
              res.send({user_id:result[0].google_id});
            }else{
              console.log("little boy");
            //TODO: create user
              }
          }else{
            res.send({error:args});
            }       
          });
        }
  });

});

app.get("/checkuser/:user_id",function(req,res){
  var user_id = req.params.user_id;
  check_user(user_id,function(found){
    if (found) {
      res.send({ok : 1});
    }else{
      res.send({error : err});
    }
  });
});

function build_googleapi_tokeninfo(access_token , api_key) {
  var options = {host:"www.googleapis.com"};
  var path = "/oauth2/v2/tokeninfo?access_token=" + access_token + "&key=" + api_key;
  options['path'] = path;
  return options;
}

function retrieve_user_id (req_options,callback) {
  var req = https.request(req_options,function(res){
  var body = '';
  res.on('data', function(chunk) {
    body += chunk;
    });
  res.on('end', function() {
    info = JSON.parse(body);
    callback.call(this,info);
    });
  });
  req.end();
}

function check_user (user_id,callback) {
  var found;
  db.collection("users",{strict:true},function(err, collection) {
    if (!err){
      collection.find({google_id:user_id}).toArray(function(err, items) {
          if (err){
            found =false;
            args = err;
          }else{
            found = true;
            args = items;
          }
          callback.call(this,found);
        });
    }
    }); 
}

// var req_options = build_googleapi_tokeninfo("ya29.KACgnx1yuSTOBSAAAAAGHQmHnp6S3x65FqubbwHEuU0Jy4MQwcmF1yB-qeIAfw",API_KEY);
// retrieve_user_id(req_options,function(info){
//   if (info.error_description){
//     console.log(info.error_description);
//   }else{
//     console.log(info.user_id);
//   }
// });

 