'use strict';

const Sequelize = require('sequelize');
require('dotenv').config();

const config = require('./config/dbConfig');

// Create the url based on the config file .env in the root directory
const dbURI = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Initialize connection
const sequelize = new Sequelize(dbURI, config);

// Connect to the DB
sequelize
  .authenticate()
  .then(() => {
    console.log(`📚 Connection to database ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT} has been established successfully.`);
  })
  .catch((e) => {
    console.error('❌ Unable to connect to the database:', e);
  });

module.exports = sequelize;
