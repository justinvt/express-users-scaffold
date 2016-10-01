var mongoose     = require('mongoose');


var UserSchema   = new mongoose.Schema({
		id: String,
		name:  String,
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});	

module.exports = mongoose.model('User', UserSchema);