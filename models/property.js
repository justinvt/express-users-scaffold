var mongoose   = require('mongoose');

var PropertySchema   = new mongoose.Schema({
    address: {type: String, required:true, unique: true},
    owner: String,
    address: String,
    logo: String
});


module.exports = mongoose.model('School', SchoolSchema);