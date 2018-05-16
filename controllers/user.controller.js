'use strict';

const Sequelize = require('sequelize');
const uuid = require('uuid');
const models = require('../models');

module.exports.getUser = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const { userId } = ctx.params;

  if (userId) {
    const userInfo = await models.User
      .findOne({
        where: {
          id: userId,
        },
      })
      .then(res => res)
      .catch((e) => {
        throw new Error(e);
      });

    const badges = await models.Achievement
      .findAll({
        where: {
          UserId: userId
        },
        include: {
          model: models.Badge
        }
      })
      .then(res => res)
      .catch((e) => {
        throw new Error(e);
      });

    const participations = await models.Participation
      .findAll({
        where: {
          UserId: userId
        }
      })
      .then(res => res)
      .catch((e) => {
        throw new Error(e);
      });

    const stats = await models.Participation
      .findAll({
        where: {
          UserId: userId
        },
        group: ['UserId'],
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('distance')), 'totalDistance'],
          [Sequelize.fn('ST_Area', Sequelize.fn('ST_Union', Sequelize.col('shape')), true), 'totalArea']
        ],
      });

    ctx.body = {
      userInfo,
      badges,
      participations,
      stats: stats[0],
    };
    ctx.status = 200;
  } else {
    console.log('The user is mandatory on this request.');
    ctx.status = 200;
  }
};

// Create a new user
module.exports.createUser = async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  const { body } = ctx.request;
  let newUser;

  if (body.email) {
    // Create new user on User table
    newUser = await models.User
      .create({
        id: uuid(),
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        token: body.token,
      })
      .then(res => res.get({ plain: true }))
      .catch((e) => { throw new Error(e); });

    ctx.body = {
      ...newUser,
      badges: [],
      participations: [],
      stats: {},
    };
    ctx.status = 201;
  } else {
    console.log('The email field is mandatory on this request.');
    ctx.status = 204;
  }
};
