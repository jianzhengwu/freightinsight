'use strict';

angular.module('freightinsightApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/booking', {
        templateUrl: 'app/booking/booking.html',
        controller: 'BookingCtrl'
      });
  });
