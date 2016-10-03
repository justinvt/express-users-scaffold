var express = require('express'),
    http = require('http'),
    passport = require('passport'),
    flash = require('connect-flash'),
    _ = require('underscore'),
    UserApp = require('userapp'),
    UserAppStrategy = require('passport-userapp').Strategy,
    config = require('./config')


var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var mongoose   = require('mongoose');
mongoose.connect(config.mongo.connection); // connect to our database


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var index_routes = require('./controllers/index');
var users = require('./controllers/users');
var schools = require('./controllers/schools');
var properties = require('./controllers/properties');

//routes
app.use('/users', users);
app.use('/schools', schools);
app.use('/properties', properties);

app.use('/',  index_routes);
 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates

app.use(flash());


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  console.log(req.params);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var users = [];
var appId = '57f0342c75e1f'; // Your UserApp App Id: https://help.userapp.io/customer/portal/articles/1322336-how-do-i-find-my-app-id-

// Don't for get to init UserApp
UserApp.initialize({ appId: appId });

// Passport session setup
passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    var user = _.find(users, function (user) {
        return user.username == username;
    });
    if (user === undefined) {
        done(new Error('No user with username "' + username + '" found.'));
    } else {
        done(null, user);
    }
});

// Use the UserAppStrategy within Passport
passport.use(
    new UserAppStrategy({
        appId: appId,
       passReqToCallback : true
    },
    function (userprofile, done) {
        process.nextTick(function () {
            var exists = _.any(users, function (user) {
                return user.id == userprofile.id;
            });
            
            if (!exists) {
                users.push(userprofile);
            }

            return done(null, userprofile);
        });
    }
));
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