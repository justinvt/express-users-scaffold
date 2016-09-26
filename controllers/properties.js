var express = require('express');
var router = express.Router();
var app = express();
var config = require('../config');

// Zillow Stuff
var Zillow = require('node-zillow');
var zillow = new Zillow(config.zillow.zwsid);

var mongoose = require('mongoose');
var Property = require('../models/property');

router.route('/new')

  .get(function(req,res,next){
    
    console.log(config.zillow.zwsid);
    var property = new Property;
    res.render('properties/new', { property:property });
    
  })


router.route('/search')

  .post(function(req,res,next){
    console.log(config.justin);
    var property = new Property;
    res.render('properties/new', { property:property });
    
  })


router.route('/')

  // List records
  .get(function(req, res, next) {
    console.log(req.params);
    Property.find(function(err, users) {
      if (err) return res.send(err);
      res.format({
        html: function(){
          res.render('properties/index', { properties:properties });
        },
        text: function(){
          res.render('properties/index',  { properties:properties });
        },
        json: function(){
          res.json(user);
        }
      });
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
  
router.route('/:user_id')
  
  .get(function(req, res, next) {
    Property.find(function (err, users) {
      if (err) return next(err);
      res.json(property);
    });
  })
  
  .put(function(req, res, next) {

      // use our bear model to find the bear we want
      Property.findById(req.params.bear_id, function(err, property) {

          if (err) res.send(err);
          property.name = req.body.name;  // update the bears info

          // save the bear
          property.save(function(err) {
              if (err) res.send(err);

              res.json({ message: 'Property updated!' });
          });

      });
  });
  
  

module.exports = router;
