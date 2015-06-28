
// Libraries
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer'); 

// Database setup
var mongoose = require('mongoose');

// Find the appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uriString = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/personal-intelligence';

mongoose.connect(uriString, function(err, res) {
  if(err) {
    console.log('ERROR connection to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connecting to: ' + uriString);
  }
});

// Local imports
var routes = require('./routes/index');
var users = require('./routes/users');
var people = require('./routes/people');
var organizations = require('./routes/organizations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
// Lets us get the data from a POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use(function(req, res, next) {
  console.log('Something is happening here.');
  next();
});

// View routes
app.use('/', routes);
app.use('/users', users);

// API routes
app.use('/api', people);
app.use('/api/organizations', organizations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
