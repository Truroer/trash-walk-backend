'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Participations = sequelize.define('participations', {
  user_id: {
    type: Sequelize.UUIDV4
  },
  event_id: {
    type: Sequelize.UUIDV4
  },
  distance: {
    type: Sequelize.INTEGER
  }
});

module.exports = Participations;
