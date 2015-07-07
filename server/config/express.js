/**
 * Express configuration
 */

'use strict';

var express = require('express');
//Express middleware for serving a favicon. The advantage over just a normal favicon.ico on your public/ directory is that this module also deals with cache control. You can remove this module if you like because Express doesn't depend on it.
var favicon = require('serve-favicon');
//Express middleware for logging requests and responses. I like to use it during development and only during development so you can see what requests are being made. You can also remove this module without any consequences.
var morgan = require('morgan'); 
//compression middleware, http requests passed by this middleware will be compressed 
var compression = require('compression'); 
//Express middleware you probably want to use if you're doing anything with forms. It will add a body object to your request so that you can access POST parameters.
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
//working with and handling paths, e.g. path.normalize / path.join 
var path = require('path');
var config = require('./environment');
//session middleware to be used with password
var session = require('express-session');
//Middleware passport is a muti-strategies authentication plugin 
var passport = require('passport');

module.exports = function(app) {
  var env = app.get('env');

//define and register the template engine 'html'
//for the moment, there is only one server side template: 404 not found page
//config.root=freight insight folder
  app.engine('html', require('ejs').renderFile); // define my own template engine 'html'
  app.set('views', config.root + '/server/views'); //specify the view directory where the templates are located for the template engine
  app.set('view engine', 'html'); //register the template engine 'html', another choice may be template jade
  
//session middleware
  app.use(session({
  secret:'asdfasdfasdf', //you have to put sth here, Express will use this to hash the session
  resave: false,
  saveUninitialized: false
  }));
  
  app.use(compression()); //compress incomming http requests
  app.use(bodyParser.urlencoded({ extended: false })); //parse urlencoded http request
  app.use(bodyParser.json()); //parse json format http request
  app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(cookieParser());

//Passport for authentification
  app.use(passport.initialize()); 
  app.use(passport.session());

  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
//define the static assets of the sites, so that we can do http://.....com/public/image/picture.jpeg
    app.use(express.static(path.join(config.root, 'public'))); //put the static ressource (picture etc.) in freightinsight/public folder, this folder will be created in the dist folder when running grunt serve:dist for releasing in prod.
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
/*If you want to use multiple directories as static assets directories, you can call the express.static middleware multiple times. The files will be looked up in the order the static directories were set using the express.static middleware */
    app.use(express.static(path.join(config.root, '.tmp')));//using .tmp for static assets
    app.use(express.static(path.join(config.root, 'client'))); //using freightinsight/client for static ressource in dev.
    app.set('appPath', 'client'); //set the appPath app setting to client, this will be used in the file routes.js by app.get ('appPath') 
    app.use(morgan('dev')); //http logger
    app.use(errorHandler()); // Error handler - has to be last
  }
};