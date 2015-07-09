'use strict';
//custom service "User" has two methods, get the current user and change the password of the current user
angular.module('freightinsightApp')
  .factory('User', function ($resource) {

/* $resource is an elegant REST way to do the $http stuff.
- 1st parameter is the url leads to the ressource (request will be handled by node.js), :id and :controller are two URL parameters
- 2nd parameter is the default value of the parameter id. @_id is the data.@_id, where data is the object returned by $resource... i.e. the _id of the user in MongoDB which is returned by an action
- 3nd parameter is an action: there are two actions "changePassword" and "get"
*/
//    get the ressource from the server api/user/index.js. 
    
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
