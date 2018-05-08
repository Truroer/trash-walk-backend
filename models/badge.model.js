'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Badge = sequelize.define('badge', {
  achievements_id: {
    type: Sequelize.UUIDV4
  },
  bagde_id: {
    type: Sequelize.UUIDV4
  }
});
