var MongoClient = require('mongodb').MongoClient;

[
	"data",
	"users"
].forEach(function (path) {
  	var module = require('./' + path);
  	for (var i in module) {
  		exports[i] = module[i];
    }