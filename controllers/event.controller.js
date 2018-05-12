'use strict';

const sequelize = require('sequelize');
const uuid = require('uuid');

const models = require('../models');

// Get info about a specific event
module.exports.getEvent = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const { query } = ctx.request;
  let userParticipation;
  let userParticipationLocations;
  let event;
  let eventLocations;

  if (query.userId && query.eventId) {
    userParticipation = await models.Participation
      .find({
        where: {
          UserId: query.userId,
          EventId: query.eventId
        },
      })
      .then(res => res.get({ plain: true }))
      .catch((e) => {
        throw new Error(e);
      });

    userParticipationLocations = await models.Location
      .findAll({
        where: {
          UserId: query.userId,
          EventId: query.eventId
        },
        order: [
          ['UserId', 'ASC'],
          ['timestamp', 'ASC']
        ],
        attributes: [
          [sequelize.fn('ST_AsGeoJSON', sequelize.col('geography')), 'geography'],
          'timestamp'
        ]
      })
      .then(res => res)
      .catch((e) => {
        throw new Error(e);
      });

    ctx.body = userParticipationLocations;
    ctx.status = 200;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 200;
  }
};

// Create a new event
module.exports.createEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;
  let newEvent;

  if (body.userId) {
    // Create the new event in the Event table
    newEvent = await models.Event.create({
      id: uuid(),
      startTime: Date.now(),
      active: true,
    })
      .then(res => res.get({ plain: true }))
      .catch((e) => {
        throw new Error(e);
      });

    // Create a new participation into Participation table for the new event created
    await models.Participation.create({
      id: uuid(),
      UserId: body.userId,
      EventId: newEvent.id,
      startTime: newEvent.startTime,
    })
      .then((res) => {
        const newParticipation = res.get({ plain: true });
        console.log(`New partecipation created for user:${newParticipation.UserId} on the event ${newParticipation.EventId}`);
      })
      .catch((e) => {
        throw new Error(e);
      });

    // Return the event instance after creation
    ctx.body = newEvent;
    ctx.status = 201;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 204;
  }
};

// Join an existing event
module.exports.joinEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;

  if (body.userId && body.eventId && body.startTime) {
    // Create a new participation for a pre-existing event
    await models.Participation
      .create({
        id: uuid(),
        UserId: body.userId,
        EventId: body.eventId,
        startTime: body.startTime,
      })
      .then(() => {
        console.log(`Participation for user: ${body.userId} on the event: ${body.eventId}`);
      })
      .catch((e) => {
        throw new Error(e);
      });

    ctx.status = 201;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 204;
  }
};

// Add locations update lo Location table during an event
module.exports.updateEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;
  let point;

  // Create the geom Point based on lat and lng
  if (body.lat && body.lng) {
    point = {
      type: 'Point',
      coordinates: [body.lng, body.lat],
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
    };
  } else {
    return next();
  }

  if (body.userId && body.eventId) {
    // Create a new location point related to the participation into Location table
    await models.Location.create({
      id: uuid(),
      UserId: body.userId,
      EventId: body.eventId,
      geography: point,
      timestamp: body.timestamp,
    })
      .then((res) => {
        console.log('Created new location point: \n', res.get({ plain: true }));
      })
      .catch((e) => {
        throw new Error(e);
      });
    ctx.status = 201;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 204;
  }
};

// End your participation to an event
module.exports.endEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;
  let participationId;

  if (body.userId && body.eventId && body.distance && body.endTime) {
    // Update the participation status on the event end
    await models.Participation
      .update(
        {
          distance: body.distance,
          endTime: body.endTime,
        },
        {
          where: {
            UserId: body.userId,
            EventId: body.eventId,
          },
          returning: true,
        },
      )
      .then((res) => {
        console.log('Participation ended!');
      })
      .catch((e) => {
        throw new Error(e);
      });

    // Get the participationId to append Images and Comments in next tables
    participationId = await models.Participation
      .find({
        where: {
          UserId: body.userId,
          EventId: body.eventId,
        },
        attributes: ['id']
      });
    participationId = participationId.dataValues.id;

    // Update the event status
    updateEventStatus(body);

    ctx.status = 200;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 204;
  }

  // If is passed, create an instance for comments related to the participation
  if (body.comments) {
    await models.Comment
      .create({
        id: uuid(),
        ParticipationId: participationId,
        comments: body.comments
      })
      .then(() => {
        console.log(`Comment added for the participation: ${participationId}`);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  // If is passed, create an instance for images related to the participation
  if (body.imageUrl) {
    await models.Image
      .create({
        id: uuid(),
        ParticipationId: participationId,
        imageUrl: body.imageUrl,
      })
      .then(() => {
        console.log(`Images added for the participation: ${participationId}`);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }
};

// Cancel your participation to an event
module.exports.deleteEvent = async (ctx, next) => {
  if (ctx.method !== 'DELETE') return next();

  const { body } = ctx.request;

  if (body.userId && body.eventId) {
    // Remove the participation instance from the participation table
    await models.Participation
      .destroy({
        where: {
          UserId: body.userId,
          EventId: body.eventId
        }
      })
      .then(() => {
        console.log('Participation deleted');
      })
      .catch((e) => {
        throw new Error(e);
      });

    // Remove locations related to the deleted participation
    await models.Location
      .destroy({
        where: {
          UserId: body.userId,
          EventId: body.eventId
        }
      })
      .then(() => {
        console.log(`Locations for the user:${body.userId} on the event ${body.eventId} deleted!`);
      })
      .catch((e) => {
        throw new Error(e);
      });

    // Update the event status
    updateEventStatus(body);

    ctx.status = 200;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 204;
  }
};

// Function to check and update the status of an event
const updateEventStatus = async (body) => {
  await models.Participation
    .find({
      where: {
        EventId: body.eventId,
        endTime: null,
      },
    })
    .then((res) => {
      if (!res) {
        models.Event
          .update(
            {
              active: false,
              endTime: Date.now()
            },
            {
              where: {
                id: body.eventId,
              },
            },
          )
          .then(() => console.log('Event closed!'))
          .catch((e) => {
            throw new Error(e);
          });
      }
    })
    .catch((e) => {
      throw new Error(e);
    });
};
