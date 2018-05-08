'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Participation = sequelize.define('participation', {
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
