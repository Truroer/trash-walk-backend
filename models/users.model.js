'use strict';

import sequelize from '../db';

const Sequelize = require('sequelize');

const Users = sequelize.define('users', {
  user_id: {
    type: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
});

module.exports = Users;
