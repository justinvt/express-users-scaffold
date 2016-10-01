var express = require('express');
var router = express.Router();
var app = express();

var _ = require("lodash")
var mongoose = require('mongoose');
var User  = require('../models/user');


var create_user = function(req, res, next){
   
  req.user_params = _.merge({},req.query, req.params)
  console.log(req.user_params)
  var newUser = User({
    name:  req.user_params.name,
    email: req.user_params.email,

  });

  newUser.save(function(err){
    if(err){
      req.error = err 
    }
  })

  req.user = newUser
  next();
}
var find_user = function(req, res, next){
  console.log(req.query)
  next()
}

/// Super hacky at the moment
router.route('/')
  
  // Create a record
 // List records
  .get(    function(req, res, next) {
    console.log(req.params);//////////////////////////////
    User.find(function(err, users) {
      if (err) return res.send(err);
      //req.params.format === undefined ?
      //  res.render('properties/new', { property: req.zillow_match }) :
        res.json(users)
    })
    
  });


router.route('/new')

  .get(function(req,res,next){
    
    var user = new User;
    res.render('users/new', { user: user });
    
  })


/// Super hacky at the moment
router.route('/post')
  
  // Create a record
  .all(
    create_user,
    function(req, res) {
      res.json(req.user)
    }

     
);
  
router.route('/:user_id')
  
  .get(function(req, res) {

   
    User.findById(req.params.user_id,function (err, user) {
     // if (err) return next(err);
    //  res.json(user);
     res.json(user)

    });
  })
  
  .put(function(req, res, next) {

      // use our bear model to find the bear we want
      User.findById(req.params.user_id, function(err, user) {

          if (err) res.send(err);

          user.name = req.body.name;

          // save the bear
          user.save(function(err) {
              if (err) res.send(err);

              res.json({ message: 'User updated!' });
          });

      });
  });
  
  

module.exports = router;
