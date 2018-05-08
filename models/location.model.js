'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Location = sequelize.define('location', {
  user_id: {
    type: Sequelize.UUIDV4
  },
  event_id: {
    type: Sequelize.UUIDV4
  },
  geoJSON: {
    type: Sequelize.GEOMETRY('POINT')
  }
});
