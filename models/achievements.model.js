'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Achievements = sequelize.define('achievements', {
  user_id: {
    type: Sequelize.UUIDV4
  },
  badge_id: {
    type: Sequelize.UUIDV4
  }
});

module.exports = Achievements;
