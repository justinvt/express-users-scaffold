var config = require('../../config');

// Zillow Stuff
var Zillow = require('node-zillow');
var zillow = new Zillow(config.zillow.zwsid);

module.exports.digest_zillow = function(req, res, next){
   zillow
    .get('GetSearchResults', {  address:        req.query['street'] || "1675 bow tree drive", 
                                citystatezip:   req.query['citystatezip'] || "19380"  })
    .then(function(results){
      if(results.message.code != 0)
        req.zillow_match = results
      else{
        req.zillow_response = results.response.results.result[0]
        req.zillow_match    = {  zpid:         req.zillow_response.zpid[0],
                                 address:      req.zillow_response.address[0],
                                 street:       req.zillow_response.address[0].street[0],
                                 citystatezip: req.zillow_response.address[0].zipcode[0]  }
       for (var key in  req.zillow_match) {
           req.zillow_match[key] =  req.zillow_match[key].length == 1 ?  req.zillow_match[key][0] :  req.zillow_match[key]
           for (var k in  req.zillow_match[key]){
              req.zillow_match[key][k] =  req.zillow_match[key][k].length == 1 ?  req.zillow_match[key][k][0] :  req.zillow_match[key][k]
              for (var kk in  req.zillow_match[key][k]){
                 req.zillow_match[key][k][kk] =  req.zillow_match[key][k][kk].length == 1 ?  req.zillow_match[key][k][kk][0] :  req.zillow_match[key][k][kk]
              } 
            } 
          }   
        

          //req.zillow_match = req.zillow_match.replace_singleton()
          console.log(req.zillow_match)
      }
      next();
  })
}

