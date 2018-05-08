'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Events = sequelize.define('events', {
  event_id: {
    type: Sequelize.UUIDV4,
    primaryKey: true
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  active: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Events;
