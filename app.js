var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var upload = multer(); 

var mongoose   = require('mongoose');
mongoose.connect('mongodb://justinvt:asdfg@ds035806.mlab.com:35806/godbutt'); // connect to our database

// Use native Node promises
//mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var basic_routes = require('./controllers/index');
var users = require('./controllers/users');
var schools = require('./controllers/schools');
//routes
app.use('/users', users);
app.use('/schools', schools);
app.use('/', basic_routes);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.array());

// catch 404 and forward to error handler

app.use(function(req, res, next) {
      console.log(req.params);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;