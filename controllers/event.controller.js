
'use strict';

const Sequelize = require('sequelize');
const uuid = require('uuid');

const models = require('../models');

// Get info about a specific event
module.exports.getEvent = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const { query } = ctx.request;

  if (query.userId && query.eventId) {
    // Get the participationId to append Images and Comments in next tables
    const participationDetail = await models.Participation.find({
      where: {
        UserId: query.userId,
        EventId: query.eventId,
      },
      attributes: [
        [Sequelize.fn('ST_AsGeoJSON', Sequelize.col('shape')), 'shape'],
        'distance',
        'area',
        'id',
        'startTime',
        'endTime',
        'EventId',
        'UserId',
      ],
      include: [
        {
          model: models.Comment,
        },
        {
          model: models.Image,
        }
      ]
    });

    const eventStats = await models.Participation.findAll({
      where: {
        EventId: query.eventId,
      },
      attributes: [
        [Sequelize.fn('ST_AsGeoJSON', Sequelize.fn('ST_Union', Sequelize.col('shape'))), 'shape'],
        [Sequelize.fn('SUM', Sequelize.col('distance')), 'distance'],
        [Sequelize.fn('COUNT', Sequelize.col('UserId')), 'participants'],
        [Sequelize.fn('ST_Area', Sequelize.fn('ST_Union', Sequelize.col('shape')), true), 'area']
      ]
    });

    const eventDetail = await models.Event.findAll({
      where: {
        id: query.eventId,
      }
    });

    ctx.body = {
      participation: {
        ...participationDetail.dataValues,
        shape: JSON.parse(participationDetail.dataValues.shape).coordinates,
      },
      event: {
        ...eventStats[0].dataValues,
        ...eventDetail[0].dataValues,
        shape: JSON.parse(eventStats[0].dataValues.shape).coordinates,
      },
    };
    ctx.status = 200;
  } else {
    ctx.status = 204;
  }
};


// Create a new event
module.exports.createEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;

  if (body.userId) {
    // Create the new event in the Event table
    let newEvent = await models.Event.create({
      id: uuid(),
      startTime: Date.now(),
      active: true,
    });
    newEvent = newEvent.get({ plain: true });

    // Create a new participation into Participation table for the new event created
    await models.Participation.create({
      id: uuid(),
      UserId: body.userId,
      EventId: newEvent.id,
      startTime: newEvent.startTime,
    });

    // Return the event instance after creation
    ctx.body = newEvent;
    ctx.status = 201;
  } else {
    ctx.status = 204;
  }
};

// Join an existing event
module.exports.joinEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;

  if (body.userId && body.eventId && body.startTime) {
    // Create a new participation for a pre-existing event
    let participation = await models.Participation.create({
      id: uuid(),
      UserId: body.userId,
      EventId: body.eventId,
      startTime: body.startTime,
    });
    participation = participation.get({ plain: true });

    ctx.body = { id: participation.EventId };
    ctx.status = 201;
  } else {
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
    });

    // Compute Shape, Area and Distance based on coords
    let geometry = await models.Location.findAll({
      attributes: [
        [
          Sequelize.fn(
            'ST_AsGeoJSON',
            Sequelize.fn(
              'ST_Buffer',
              Sequelize.fn('ST_MakeLine', Sequelize.col('geography')),
              0.000045,
            ),
          ),
          'Shape',
        ],
        [
          Sequelize.fn(
            'ST_Area',
            Sequelize.fn(
              'ST_Buffer',
              Sequelize.fn('ST_MakeLine', Sequelize.col('geography')),
              0.000045,
            ), true
          ),
          'Area',
        ],
        [
          Sequelize.fn(
            'ST_Length',
            Sequelize.fn('ST_MakeLine', Sequelize.col('geography')),
            true
          ),
          'Distance',
        ]
      ],
      where: {
        UserId: body.userId,
        EventId: body.eventId,
      },
    });
    geometry = geometry[0].dataValues;

    // Update Participation with Shape, Area and Distance
    await models.Participation.update(
      {
        shape: JSON.parse(geometry.Shape),
        area: geometry.Area,
        distance: geometry.Distance
      },
      {
        where: {
          UserId: body.userId,
          EventId: body.eventId,
        }
      },
    );

    // Get the participationId to append Images and Comments in next tables
    const participationDetail = await models.Participation.find({
      where: {
        UserId: body.userId,
        EventId: body.eventId,
      },
      group: ['Participation.shape', 'Participation.distance', 'Participation.area', 'Participation.id', 'Participation.startTime', 'Participation.endTime'],
      attributes: [
        [Sequelize.fn('ST_AsGeoJSON', Sequelize.col('shape')), 'shape'],
        [Sequelize.fn('COUNT', Sequelize.col('UserId')), 'participants'],
        'distance',
        'area',
        'id',
        'startTime',
        'endTime',
        'EventId',
        'UserId',
      ]
    });

    ctx.body = {
      ...participationDetail.dataValues,
      shape: JSON.parse(participationDetail.dataValues.shape).coordinates,
    };
    ctx.status = 201;
  } else {
    ctx.status = 204;
  }
};

// End your participation to an event
module.exports.endEvent = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;
  let participationId;

  if (body.userId && body.eventId) {
    // Update the participation status on the event end
    await models.Participation.update(
      {
        endTime: Date.now(),
      },
      {
        where: {
          UserId: body.userId,
          EventId: body.eventId,
        },
        returning: true,
      },
    );

    // Get the participationId to append Images and Comments in next tables
    participationId = await models.Participation.find({
      where: {
        UserId: body.userId,
        EventId: body.eventId,
      },
      attributes: ['id'],
    });
    participationId = participationId.dataValues.id;

    // Update the event status
    updateEventStatus(body);

    ctx.body = {};
    ctx.status = 200;
  } else {
    ctx.status = 204;
  }

  // If is passed, create an instance for comments related to the participation
  if (body.comments) {
    await models.Comment.create({
      id: uuid(),
      ParticipationId: participationId,
      comments: body.comments,
    });
  }

  // If is passed, create an instance for images related to the participation
  if (body.imageUrl) {
    await models.Image.create({
      id: uuid(),
      ParticipationId: participationId,
      imageUrl: body.imageUrl,
    });
  }
};

// Cancel your participation to an event
module.exports.deleteEvent = async (ctx, next) => {
  if (ctx.method !== 'DELETE') return next();

  const { body } = ctx.request;

  if (body.userId && body.eventId) {
    // Remove the participation instance from the participation table
    await models.Participation.destroy({
      where: {
        UserId: body.userId,
        EventId: body.eventId,
      },
    });

    // Remove locations related to the deleted participation
    await models.Location.destroy({
      where: {
        UserId: body.userId,
        EventId: body.eventId,
      },
    });

    // Update the event status
    updateEventStatus(body);

    ctx.body = {};
    ctx.status = 200;
  } else {
    ctx.status = 204;
  }
};

// Function to check and update the status of an event
const updateEventStatus = async (body) => {
  const status = await models.Participation.find({
    where: {
      EventId: body.eventId,
      endTime: null,
    },
  });

  if (!status) {
    models.Event.update(
      {
        active: false,
        endTime: Date.now(),
      },
      {
        where: {
          id: body.eventId,
        },
      },
    );
  }
};
