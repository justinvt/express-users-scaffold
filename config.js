var express = require("express");
var app = express();
var config = {};


config.justin = "Thibault";
config.twitter = {};
config.redis = {};
config.web = {};
config.zillow  = {
	zwsid: "X1-ZWz1ffhguxhz4b_axb7v"
}
//mongoose.connect('mongodb://justinvt:asdfg@:35806/godbutt'); // connect to our database

config.mongo = {
	development: {
		username: "justinvt",
		password: "asdfg",
		location: "ds035806.mlab.com",
		port:35806,
		database: "godbutt"
	},
	production:{
		username: "justinvt",
		password: "asdfg",
		location: "ds035806.mlab.com",
		database: "godbutt"
	},
	test:{

	}
}

// firebase.initializeApp(config);

config.firebase = {
   apiKey: "AIzaSyCmqUT0N3aIU1oSMbb23a5wKhkAUF6wTZE",
   authDomain: "loddg-b26c3.firebaseapp.com",
   databaseURL: "https://loddg-b26c3.firebaseio.com",
   storageBucket: "loddg-b26c3.appspot.com",
   messagingSenderId: "24217476754"
 };
 //firebase.in

config.mongo.env = config.mongo[app.get('env')]
config.mongo.connection = "mongodb://" + 
	[
		[  config.mongo.env.username, config.mongo.env.password ].join(":"),
			config.mongo.env.location
	].join("@") + ":" + config.mongo.env.port + "/" + config.mongo.env.database

	


module.exports = config;