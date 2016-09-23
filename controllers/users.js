var express = require('express');
var router = express.Router();
var app = express();

var mongoose = require('mongoose');
var User  = require('../models/user');


router.route('/new')

  .get(function(req,res,next){
    
    var user = new User;
    res.render('users/new', { user: user });
    
  })


router.route('*:format?')

  // List records
  .get(function(req, res, next) {
    console.log(req.params);
    User.find(function(err, users) {
      if (err) return res.send(err);
      res.format({
        html: function(){
          res.render('users/index', { users: users });
        },
        text: function(){
          res.render('users/index', { users: users });
        },
        json: function(){
          res.json(user);
        }
      });
    })
    
  })
  
  // Create a record
  .post(function(req, res, next) {

    User.create( req.query, function (err, user) {
          console.log(user);
       if (err) return next(err);
        res.redirect(301, '/users');
     });
     
  });
  
router.route('/:user_id')
  
  .get(function(req, res, next) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  })
  
  .put(function(req, res, next) {

      // use our bear model to find the bear we want
      User.findById(req.params.bear_id, function(err, user) {

          if (err) res.send(err);

          user.name = req.body.name;  // update the bears info

          // save the bear
          user.save(function(err) {
              if (err) res.send(err);

              res.json({ message: 'User updated!' });
          });

      });
  });
  
  

module.exports = router;
