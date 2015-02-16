var mongoose= require('mongoose');
var config = require('./config');

function getConnection(){
	//Connect to MongoDB
    var dbHost = config.mongo.host;
    var dbPort = config.mongo.port;
    var dbName = config.mongo.db;
    var dbUser = config.mongo.username;
    var dbPass = config.mongo.password;
    var dbURI = 'mongodb://' + dbUser + ':'+ dbPass +'@'+ dbHost + ':' + dbPort + '/' + dbName;
    mongoose.connect(dbURI, function(err) {
		if (err) {
		  console.error('Failed to connect to mongo on startup', err);
		}
	});
    return mongoose;
}

function getBookModel() {
	//Create Book Schema
    var Schema = getConnection().Schema;  
    var BookSchema = new Schema({  
    	bookId: { type: Number, required: true },  
        bookName: { type: String, required: true },  
        bookAuther: { type: String, required: true }
    });
    return mongoose.model('Book',BookSchema); 
}

exports.getBookModel = getBookModel;