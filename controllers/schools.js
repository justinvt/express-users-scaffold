var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require('mongoose');
var School  = require('../models/school');

 var _ = require('lodash');
 var img = require('imagemagick');


router.route('/tidify')
/*
  .get(function(req,res){
    var regex = new RegExp(req.query.name, 'gi')
    console.log(req.query)
    var data = {}    

    School.findOne(
      {name:regex},
      school.tidify,

      school.save(function (err, updatedSchool) {
            if (err) return handleError(err);
            res.send(updatedSchool);
          });

       })

      //console.log(school)
    })
    */
//  })


router.route('/test')

  .get(function(req,res){
    var data = {}    

    School.find({},null,{sort:{name:1}},function(err, schools){
      data.first =  schools[0].update_logo()
      res.json(
        _(schools).map(function(i){ return i.name.replace(/ - Link/,'')})
      )
    })
  })



router.route('/new')

  .get(function(req,res,next){
    res.render('schools/new');
  })


router.route('/')

  // List records
  .get(function(req, res, next) {
    //console.log(req.params);

    School.find(
      {},'name logo zip',{sort:{name:1}},
      function(err, schools) {
      if(req.query.format === 'html')
        res.render('schools/index', { schools: schools });
      else
        res.json(schools)
       /*
      //if (err) return res.send(err);
      res.format({
        html: function(){
          res.render('schools/index', { schools: schools });
        },
        text: function(){
          res.render('schools/index', { schools: schools });
        },
        json: function(){
          res.json(schools);
        }
      });
      */

    });
    
  })
  
  // Create a record
  .post(function(req, res, next) {

    School.create( req.query, function (err, School) {
          console.log(School);
       if (err) return next(err);
        res.redirect(301, '/schools');
     });
     
  });


router.route('/by_name')
  
  .get(function(req, res) {
    //console.log(req.params)
    var regex = new RegExp(
      req.query.name.replace(/[-_]+/,' ')
      , 'ig')
     School.find({
      name: regex
     }, function (err, schools) {
      if (err) return res.send(err);
      if(req.query.format === 'html')
        res.render('schools/index', { schools: schools });
      else
        res.json(schools)
    });
  })
  
  
router.route('/:school_id')
  
  .get(function(req, res) {
  	console.log(req.params)
	   School.findById(req.params.school_id, function (err, school) {
  	  if (err) return res.send(err);
      if(req.query.format === 'html')
        res.render('schools/show', { school: school });
      else
        res.json(school)
  	});
  })
  
  .put(function(req, res, next) {

      // use our bear model to find the bear we want
      School.findById(req.params.school_id, function(err, school) {

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
