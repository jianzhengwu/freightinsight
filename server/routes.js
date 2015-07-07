/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors'); //error functions are defined in components/errors/index.js when using require (a folder), if there is no package.json file present in the folder, then node will attempt to load an index.js or index.node file out of that folder.

module.exports = function(app) {

  // Insert routes below in the route handlers
  // The URL localhost:9000/api/things will be handled by the script /thing/index.js
  app.use('/api/things', require('./api/thing')); //the second argument is supposed to be a router object (see .../thing/index.js)
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]); //error[404]function is defined in components/errors/index.js

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      //in config/express, we have set app.set('appPath', 'client'), so res.sendfile('client/index.html')
      //if we use res.render, express will look into view folder 'views' so we have to use res.sendfile
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
