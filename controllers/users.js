var express = require('express'),
    passport = require('passport'),
    flash = require('connect-flash'),
    _ = require('underscore'),
    UserApp = require('userapp'),
    UserAppStrategy = require('passport-userapp').Strategy;

var router = express.Router();
var app = express();

var _ = require("lodash")
var mongoose = require('mongoose');
var User  = require('../models/user');

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

router.route('/login')

  .get( function (req, res) { res.render('users/login', { user:req.user }); })
  
  .post(
    passport.authenticate( 'userapp', { failureRedirect: '/users/login', failureFlash: 'Invalid username or password.'}),
    function (req, res) {
        res.redirect('/users/login');
    }
);

router.route('/signup')

  .get( function (req, res) { res.render('users/signup', { user:req.user }); })
  
  .post(

    //first we need to create the user in UserApp
    function createUser(req, res, next){

        // the HTML form names are conveniently named the same as
        // the UserApp fields...
        var user = req.body;

        // Create the user in UserApp
        UserApp.User.save(user, function(err, user){

            // We can just pass through messages like "Password must be at least 5 characters." etc.
            if (err) return res.render('signup', {user: false, message: err.message});

            // UserApp passport needs a username parameter
            req.body.username = req.body.login;

            //on to authentication
            next();
        });

    // authenticate the user using passport
   },  

    passport.authenticate('userapp', { failureRedirect: '/signup', failureFlash: 'Error logging in user' }), 

      function serveAccount(req, res, next){ res.redirect('/'); }

    );


router.route('/new')

  .get(function(req,res,next){
    
    var user = new User;
    res.render('users/new', { user: user });
    
  })

/// Super hacky at the moment
router.route('/post')
  
  // Create a record
  .all(
    function(){},
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