'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Image = sequelize.define('image', {
  participation_id: {
    type: Sequelize.UUIDV4
  },
  imageURL: {
    type: Sequelize.STRING
  }
});
