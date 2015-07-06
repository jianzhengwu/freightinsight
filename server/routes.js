/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors'); //error functions are defined in components/errors/index.js

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]); //error[404]function is defined in components/errors/index.js

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      //in config/express, we have set app.set('appPath', 'client'), so res.sendfile('client/index.html')
      //if we use res.render, express will look into view folder 'views'
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
