var mongoose   = require('mongoose');

var SchoolSchema   = new mongoose.Schema({
    name: {type: String, required:true, unique: true},
    url: String,
    address: String,
    latitude: String,
    longitude: String,
    logo: String,
    street: String,
    city: String,
    state: String,
    country: String,
    county:String,
    zip: String,
    coordinates: String
});

SchoolSchema.methods.find


// Keep this at bottom?
var School = mongoose.model('School', SchoolSchema);

module.exports = School;