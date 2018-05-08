'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Locations = sequelize.define('locations', {
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

module.exports = Locations;
