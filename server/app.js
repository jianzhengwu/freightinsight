/**
 * Main application file
 */

'use strict';

// Set default node environment to development. if node env is null then 'development'. For instance, if we do grunt serve, the NODE_ENV will be set as 'development'.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');//When require is given the path of a folder, it'll look for an index.js in that folder; if there is one, it uses that, and if there isn't, it fails. If we did grunt serve, NODE_ENV is 'development' (see the line 8 above, the object contains all and development.js. 

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options); //connect to db according to NOD_ENV, 

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); } //I changed the seedDB to false for all environments

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;