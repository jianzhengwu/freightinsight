'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service'); //auth.signToken will be used

var router = express.Router();

router.post('/', function(req, res, next) {
//callback function will be executed if the authenticate() is successful
//the passport local strategy was configured in passport.js
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});
    var token = auth.signToken(user._id, user.role);
//if login sucessful, sign the token and return in to client for login purpose
    res.json({token: token});
  })(req, res, next)
});

module.exports = router;