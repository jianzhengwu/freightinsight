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
  
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};