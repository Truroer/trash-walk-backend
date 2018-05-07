'use strict';

const router = require('koa-router')();

const userRoutes = require('./user.routes');
const eventRoutes = require('./event.routes');

router
  .use('/user', userRoutes)
  .use('/event', eventRoutes);

module.exports = router;
