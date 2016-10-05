var mongoose   = require('mongoose');
var cheerio    = require('cheerio');
var request = require('request');
var Schema = mongoose.Schema;


var schoolSchema   = new Schema({
    name: String,
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
    coordinates: String,
    pop: String
});


schoolSchema.virtual('wikipedia_url').get(function(){
    return 'https://en.wikipedia.org/wiki/' + this.name.replace(/[^a-zA-Z0-9]/,"_")
})


schoolSchema.methods.tidify = function(cb) {
    var w = 'https://en.wikipedia.org/wiki/' + this.name.replace(/[ ]+/,'_')

    console.log(w)
    
    request( w , function(error, response, html){
        console.log("Made request")
        if(error)
            console.log(error)
        console.log("Still working")

          var $ = cheerio.load(html);
 
          
          this.latitude  =  $(".latitude").first().text()
          this.longitude =  $(".longitude").first().text()
          this.logo      =  $(".infobox img").first().attr("src")

          //this.save()
          console.log("tidy ver" + this.logo)

        }, cb)

};


schoolSchema.statics.findValid = function(cb){
    return this.find(
    {
        logo:  {
            $exists: true,
            $not: /Wikidata/
        },
        zip: { $exists: true }
    }, 

    cb);
}


var School = mongoose.model('School', schoolSchema);




module.exports = School;