var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require('mongoose');
var School  = require('../models/school');


router.route('/new')

  .get(function(req,res,next){
    
    var School = new School;
    res.render('schools/new', { school: school });
    
  })


router.route('/')

  // List records
  .get(function(req, res, next) {
    console.log(req.params);
    School.find({},null,{sort:{name:1}},function(err, schools) {
      if (err) return res.send(err);
      res.format({
        html: function(){
          res.render('schools/index', { schools: schools });
        },
        text: function(){
          res.render('schools/index', { schools: schools });
        },
        json: function(){
          res.json(School);
        }
      });
    })
    
  })
  
  // Create a record
  .post(function(req, res, next) {

    School.create( req.query, function (err, School) {
          console.log(School);
       if (err) return next(err);
        res.redirect(301, '/Schools');
     });
     
  });
  
router.route('/:school_id')
  
  .get(function(req, res, next) {
  	console.log(req)
	School.findById(req.params.school_id, function (err, school) {
  	  if (err) return res.send(err);
      res.format({
        html: function(){
          res.render('schools/show', { school: school });
        },
        text: function(){
          res.render('schools/show', { school: school });
        },
        json: function(){
          res.json(School);
        }
      });
	});
  })
  
  .put(function(req, res, next) {

      // use our bear model to find the bear we want
      School.findById(req.params.bear_id, function(err, school) {

          if (err) res.send(err);

          School.name = req.body.name;  // update the bears info

          // save the bear
          School.save(function(err) {
              if (err) res.send(err);

              res.json({ message: 'School updated!' });
          });

      });
  });
  
  

module.exports = router;
