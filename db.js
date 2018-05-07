'use strict';

const { Client } = require('pg');
require('dotenv').config();

// Create the url based on the config file .env in the root directory
const dbURI = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Initialize postgres client and pool
const client = new Client(dbURI);

// Connect to the DB
client
  .connect()
  .then(() => {
    console.log(`📚 Connected to ${client.database} at ${client.host}:${client.port}`);
  })
  .catch(e => console.log(e));

module.exports = client;
