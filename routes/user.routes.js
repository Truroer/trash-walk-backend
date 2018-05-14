'use strict';

const router = require('koa-router')();

const controller = require('../controllers/user.controller');

// Create routes for users
router
  .post('/', controller.createUser)
  .get('/:userId', controller.getUser);

module.exports = router;
