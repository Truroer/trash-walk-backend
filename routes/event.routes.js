'use strict';

const router = require('koa-router')();

const EventController = require('../controllers/event.controller');
const Participation = require('../models').Participation;
const eventController = new EventController(Participation);

// Create routes for events
router
  .post('/', eventController.createEvent)
  .post('/update', eventController.updateEvent)
  .post('/end', eventController.endEvent)
  .post('/join', eventController.joinEvent)
  .get('/', eventController.getEvent)
  .delete('/', eventController.deleteEvent);

module.exports = router;
