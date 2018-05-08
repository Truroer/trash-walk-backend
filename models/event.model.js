'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Event = sequelize.define('event', {
  event_id: {
    type: Sequelize.UUIDV4
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
