var MongoClient = require('mongodb').MongoClient;

function Data (db_address,db_name) {
	this.address = db_address;
	this.db_name = db_name;
	this._connect();

}

Data.prototype =  {

	db:null,
		
	_connect:function(){
		MongoClient.connect(this.address+this.db_name, function(err, db) {
		  if(!err) {
		    console.log("We are connected");
		    this.db = db;
		  }
		});
	},
	get_collection:function(name){
		collection
		this.db.collection(name, {strict:true}, function(err, collection) {});
	},
	create_collection:function(){

	}


}

