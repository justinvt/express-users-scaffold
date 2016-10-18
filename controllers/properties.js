var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require('mongoose');

var Property = require('../models/property');
var zillow_api = require('./external_api/zillow');



router.route('/new.:format?')

  .get(  zillow_api.digest_zillow, // zillow_api.digest_zillow Defined in controller/external_api.js
         function(req,res){
          if(req.params.format == undefined){

            res.render('properties/new', { property: req.zillow_match })

          }
          else{
            console.log(req.error)
            if(req.error)
              res.status(req.error);

            res.json({ property: req.zillow_match })

          }

        }
)

router.route('/search')

  .post(  function(req,res,next){
            var property = new Property;
            res.render('properties/new', { property:property });
  })

router.route('/location')

  .post(  function(req,res,next){
            var property = new Property;
            res.render('properties/new', { property:property });
  })


router.route('/')

  // List records
  .get(    function(req, res, next) {
    console.log(req.params);//////////////////////////////
    Property.find(function(err, properties) {
      if (err) return res.send(err);
      //req.params.format === undefined ?
      //  res.render('properties/new', { property: req.zillow_match }) :
        res.json(properties)
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