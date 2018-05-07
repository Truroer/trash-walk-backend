'use strict';

const router = require('koa-router')();

const controller = require('../controllers/event.controller');

// Create routes for events
router
  .get('/:id', controller.getEvent);

module.exports = router;
