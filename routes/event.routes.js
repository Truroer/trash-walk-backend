'use strict';

const router = require('koa-router')();

const controller = require('../controllers/event.controller');

// Create routes for events
router
  .post('/', controller.createEvent)
  .get('/:id', controller.getEvent)
  .post('/update', controller.updateEvent)
  .delete('/:id', controller.deleteEvent);

module.exports = router;
