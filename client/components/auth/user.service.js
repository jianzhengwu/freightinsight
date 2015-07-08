'use strict';
//custom service "User" has two methods, get the current user and change the password of the current user
angular.module('freightinsightApp')
  .factory('User', function ($resource) {
//    get the ressource from the server api/user/index.js. the parameter id is me and the parameter controller is the password
    
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {

 //router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
        changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },

//index.js: router.get('/me', auth.isAuthenticated(), controller.me);
        get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
