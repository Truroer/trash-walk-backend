'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Badges = sequelize.define('badges', {
  achievements_id: {
    type: Sequelize.UUIDV4
  },
  bagde_id: {
    type: Sequelize.UUIDV4
  }
});

module.exports = Badges;
