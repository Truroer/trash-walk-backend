'use strict';

const router = require('koa-router')();

const userRoutes = require('./user.routes');
const eventRoutes = require('./event.routes');
const globalControllers = require('../controllers/global.controller');

// Appending global endpoints
router
  .get('/events', globalControllers.getEvents)
  .get('/stats', globalControllers.getStats);

// Appending to router user and event endpoints
router
  .use('/user', userRoutes.routes())
  .use('/event', eventRoutes.routes());

module.exports = router;
