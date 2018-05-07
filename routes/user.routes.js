'use strict';

const router = require('koa-router')();

const controller = require('../controllers/user.controller');

// Create routes for users
router
  .post('/', controller.createUser)
  .get('/:id', controller.getUser)
  .put('/:id', controller.updateUser)
  .delete('/:id', controller.deleteUser);

module.exports = router;
