'use strict';

const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('koa-cors');
const bodyParser = require('koa-body-parser');

const router = require('./routes/index.js');
const errorHandler = require('./middlewares/error.handler');
const errorNotFound = require('./middlewares/error.notFound');
require('./db');

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

// Handle errors
app
  .use(errorNotFound)
  .use(errorHandler);

// Server running process
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Open server connection
app.listen(PORT, () =>
  console.log(`🌍 Server running on port ${PORT} - ${ENV} mode!`));
