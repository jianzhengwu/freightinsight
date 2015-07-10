'use strict';
//define the custom service "Auth"

angular.module('freightinsightApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {

//Custom service User is defined in user.service.js
//$cookieStore (deprecated, to be replaced in future by $cookies) provides a key-value (string-object) storage, that is backed by session cookies. Objects put or retrieved from this storage are automatically serialized or deserialized by angular's toJson/fromJson.

    var currentUser = {};

    //get the value corresponding the key 'token' which is set by $cookieStore.put below. If token is not set, the value will be null, thus if will not be executed
    if($cookieStore.get('token')) {
      currentUser = User.get(); //retrieve current user from the database by the custom service User
    }

    return {

      /**
       * Authenticate user and save token by $cookieStore.put
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
       
      login: function(user, callback) {
        var cb = callback || angular.noop; //if callback function does not exist, then play no operation
        var deferred = $q.defer(); //the deferred object is to expose the associated Promise instance as well as APIs that can be used for signaling the successful or unsuccessful completion, as well as the status of the task.

//call the node server for login, the module in auth/local/index.js (jwt) will return a token so that the client can use it to establish the connection
        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
//token is returned by jwt method in auth/local/index.js
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
