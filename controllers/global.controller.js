'use strict';

const Sequelize = require('sequelize');

const models = require('../models');

module.exports.getEvents = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const { lat, lng } = ctx.request.query;

  if (lat && lng) {
    const radius = 2000;
    const currentLocation = Sequelize.literal(`ST_GeomFromText('POINT(${ctx.request.query.lng} ${ctx.request.query.lat})')`);
    const distance = Sequelize.fn('ST_DistanceSphere', Sequelize.col('geography'), currentLocation);

    const closestLocations = await models.Location.findAll({
      attributes: [
        [Sequelize.fn('ST_AsGeoJSON', Sequelize.col('geography')), 'geography'],
        // [Sequelize.fn('DISTINCT', Sequelize.col('EventId')), 'EventId']
      ],
      where: Sequelize.where(distance, { $lte: radius }),
      order: [['timestamp', 'ASC']],
      // group: ['Location.EventId', 'Location.id', 'Event.id'],
      // having: ['count(EventId) > 1'],
      include: [{
        model: models.Event,
        where: {
          active: true
        },
        attributes: ['id', 'startTime', 'active'],
      }],
    })
      .then(res => res)
      .catch((e) => { throw new Error(e); });

    ctx.body = closestLocations;
    ctx.status = 200;
  } else {
    console.log('LAT and LNG query parameters are mandatory on this request.');
    ctx.status = 204;
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
