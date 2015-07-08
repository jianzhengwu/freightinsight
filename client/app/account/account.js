'use strict';

//Angular routing, /login is linked with the controller LoginCtrl

angular.module('freightinsightApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true    //the routing takes place only if autenticate is true. Of course the actual security is on the server side, this is just for view
      });
  });