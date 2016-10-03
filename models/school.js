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


SchoolSchema.important = {
      logo:  {
        $exists: true,
        $not: /Wikidata/
       },
      zip:{
        $exists: true
      }
  }


// Keep this at bottom?
var School = mongoose.model('School', SchoolSchema);
School.findLegit = School.find(School.schema.important)

module.exports = School;