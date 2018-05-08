'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Images = sequelize.define('images', {
  participation_id: {
    type: Sequelize.UUIDV4
  },
  imageURL: {
    type: Sequelize.STRING
  }
});

module.exports = Images;
