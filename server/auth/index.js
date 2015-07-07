'use strict';

//3 passport strategies are defined: local, google and facebook

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');//model use which containes the user schema with Mongoose

// Passport Configuration
require('./local/passport').setup(User, config); 
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local')); //for the route /auth/local, return local/index.js
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));

module.exports = router;