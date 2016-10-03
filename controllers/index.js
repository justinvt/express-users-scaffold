var express = require('express');
var router = express.Router();
var config = require('../config');

var mongoose = require('mongoose');





router.route('/')
  .get(function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

router.route('/config')

 .get(function(req, res, next) {
  	res.json(config);
  });



module.exports = router;
