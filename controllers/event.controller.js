'use strict';

module.exports.getEvent = async (ctx) => {
  try {
    ctx.body = `endpoint for getEvent with parameter ${ctx.params.id}`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};

module.exports.createEvent = async (ctx) => {
  try {
    ctx.body = 'endpoint for createEvent';
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};

module.exports.updateEvent = async (ctx) => {
  try {
    ctx.body = `endpoint for updateEvent with parameter ${ctx.params.id}`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};

module.exports.deleteEvent = async (ctx) => {
  try {
    ctx.body = `endpoint for deleteEvent with parameter ${ctx.params.id}`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};
