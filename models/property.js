var mongoose   = require('mongoose');



var PropertySchema   = new mongoose.Schema({
    street: {type: String, required:true, unique: true},
    citystatezip: String,
    zip: String,
    state: String,
    city: String,
    owner: String,
    address: String,
    logo: String,
    zpid: String
})


module.exports = mongoose.model('Property', PropertySchema);


