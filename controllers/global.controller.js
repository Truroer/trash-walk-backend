'use strict';

module.exports.getEvents = async (ctx) => {
  try {
    ctx.body = `endpoint for getEvents`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};

module.exports.getStats = async (ctx) => {
  try {
    ctx.body = `endpoint for getStats`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};
