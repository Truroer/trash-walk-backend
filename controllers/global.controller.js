'use strict';

const Sequelize = require('sequelize');

const models = require('../models');

module.exports.getEvents = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const { lat, lng } = ctx.request.query;

  if (lat && lng) {
    const radius = 2000;
    const currentLocation = Sequelize.literal(`ST_GeomFromText('POINT(${ctx.request.query.lng} ${ctx.request.query.lat})')`);
    const distance = Sequelize.fn('ST_DistanceSphere', Sequelize.col('shape'), currentLocation);

    let closestLocations = await models.Participation.findAll({
      attributes: ['EventId', [Sequelize.fn('COUNT', Sequelize.col('UserId')), 'participants']],
      where: Sequelize.where(distance, { $lte: radius }),
      group: ['Participation.id', 'Event.id'],
      include: [{
        model: models.Event,
        where: {
          active: false,
        },
        attributes: [
          'active',
          [Sequelize.fn('ST_AsGeoJSON', Sequelize.fn('ST_Union', Sequelize.col('shape'))), 'shape'],
          [Sequelize.fn('SUM', Sequelize.col('distance')), 'distance'],
          [Sequelize.fn('ST_Area', Sequelize.fn('ST_Union', Sequelize.col('shape')), true), 'area']
        ]
      }]
    });

    closestLocations = closestLocations.map((event) => {
      return {
        ...event.dataValues,
        Event: {
          ...event.dataValues.Event.dataValues,
          shape: JSON.parse(event.dataValues.Event.dataValues.shape).coordinates,
        }
      };
    });

    ctx.body = closestLocations;
    ctx.status = 200;
  } else {
    console.log('LAT and LNG query parameters are mandatory on this request.');
    ctx.status = 204;
  }
};

module.exports.getStats = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const global = await models.Participation.findAll({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('distance')), 'totalDistance'],
      [Sequelize.fn('COUNT', Sequelize.fn('DISTINCT', Sequelize.col('UserId'))), 'totalParticipants'],
      [Sequelize.fn('ST_Area', Sequelize.fn('ST_Union', Sequelize.col('shape')), true), 'totalArea']
    ]
  });

  ctx.body = global[0];
  ctx.status = 200;
};
