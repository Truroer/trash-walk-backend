'use strict';

const router = require('koa-router')();

const controller = require('../controllers/event.controller');

// Create routes for events
router
  .post('/', controller.createEvent)
  .post('/update', controller.updateEvent)
  .post('/end', controller.endEvent)
  .get('/:id', controller.getEvent)
  .delete('/:id', controller.deleteEvent);

module.exports = router;
