'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Comment = sequelize.define('comment', {
  participation_id: {
    type: Sequelize.UUIDV4
  },
  comment: {
    type: Sequelize.STRING
  }
});
