'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Comments = sequelize.define('comments', {
  participation_id: {
    type: Sequelize.UUIDV4
  },
  comment: {
    type: Sequelize.STRING
  }
});

module.exports = Comments;
