var mongoose     = require('mongoose');

var UserSchema   = new mongoose.Schema({
    name: String,
    last_name: String
});

module.exports = mongoose.model('User', UserSchema);