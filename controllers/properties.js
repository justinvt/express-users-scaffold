var express = require('express');
var router = express.Router();
var app = express();
var config = require('../config');

// Zillow Stuff
var Zillow = require('node-zillow');
var zillow = new Zillow(config.zillow.zwsid);
  
var mongoose = require('mongoose');
var Property = require('../models/property');



exports.digest_zillow = function(req, res, next){
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

router.route('/new.:format?')

  .get(  this.digest_zillow,
         function(req,res){
           req.params.format == undefined ?
             res.render('properties/new', { property: req.zillow_match }) :
             res.json(req.zillow_match)      
  })


router.route('/search')

  .post(  function(req,res,next){
            var property = new Property;
            res.render('properties/new', { property:property });
  })


router.route('/')

  // List records
  .get(    function(req, res, next) {
    console.log(req.params);//////////////////////////////
    Property.find(function(err, users) {
      if (err) return res.send(err);
      res.format({
        html: function(){  res.render('properties/index', { properties:properties })  },
        text: function(){  res.render('properties/index', { properties:properties })  },
        json: function(){  res.json(user) }
      })
    })
    
  })
  
  // Create a record
  .post(function(req, res, next) {
    Property.create( req.query, function (err, property) {
      console.log(property);
      if (err) return next(err);
      res.redirect(301, '/properties');
    });
  });

  
router.route('/:property_id')
  
  .get(function(req, res, next) {
    Property.find(function (err, users) {
      if (err) return next(err);
      res.json(property);
    });
  })
  
  .put(function(req, res, next) {
    Property.findById(req.params.bear_id, function(err, property) {
      if (err) res.send(err);
      property.name = req.body.name;  
      // save the bear
      property.save(function(err) {
          if (err) res.send(err);
          res.json({ message: 'Property updated!' });
      });
    });
  });



module.exports = router;