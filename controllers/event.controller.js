'use strict';

const uuid = require('uuid');

const models = require('../models');

module.exports.getEvent = async (ctx) => {
  try {
    ctx.body = `endpoint for getEvent with parameter ${ctx.params.id}`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};

module.exports.createEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();
  let newEvent;
  if (ctx.request.body) {
    newEvent = await models.Event
      .create({
        id: uuid(),
        startTime: Date.now(),
        active: true,
      })
      .then(res => res.get({ plain: true }))
      .catch((e) => { throw new Error(e); });

    models.Participation
      .create({
        id: uuid(),
        UserId: ctx.request.body.user_id,
        EventId: newEvent.id,
      })
      .then((res) => {
        const newParticipation = res.get({ plain: true });
        console.log(`New partecipation created for user:${newParticipation.UserId} on the event ${newParticipation.EventId}`);
      })
      .catch((e) => { throw new Error(e); });

    ctx.body = newEvent;
    ctx.status = 201;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 204;
  }
  return false;
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
