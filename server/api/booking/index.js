'use strict';

/* The isAuthenticated method allows us to restrict routes to only users who 
are logged in. It also attaches the authenticated user to req.user, 
which we will use in our controller.*/

var express = require('express');
var controller = require('./booking.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;