'use strict';

const router = require('koa-router')();

const controller = require('../controllers/user.controller');

// Create route for users
router
  .get('/:id', controller.getUser);

module.exports = router;
