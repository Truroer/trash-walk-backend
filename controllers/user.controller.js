'use strict';

// const sequelize = require('sequelize');
const uuid = require('uuid');
const models = require('../models');

module.exports.getUser = async (ctx, next) => {
  // if (ctx.method !== 'GET') return next();

  // const { userId } = ctx.params;

  // if (userId) {
  //   const userInfo = await models.User
  //     .findOne({
  //       where: {
  //         id: userId,
  //       },
  //     })
  //     .then(res => res)
  //     .catch((e) => {
  //       throw new Error(e);
  //     });

  //   const badges = await models.Achievement
  //     .findAll({
  //       where: {
  //         UserId: userId
  //       }
  //     })
  //     .then(res => res)
  //     .catch((e) => {
  //       throw new Error(e);
  //     });

  //   const participations = await models.Participation
  //     .findAll({
  //       where: {
  //         UserId: userId
  //       }
  //     })
  //     .then(res => res)
  //     .catch((e) => {
  //       throw new Error(e);
  //     });

  //   // const userTotalTime = await models.Participation
  //   //   .findAll({
  //   //     where: {
  //   //       UserId: userId
  //   //     },
  //   //     group: ['UserId'],
  //   //     attributes: [[sequelize.literal('EXTRACT (EPOCH FROM ("endTime" - "startTime"))::integer/60 FROM "Participations"'), 'timeDiff']],
  //   //     // attributes: ['startTime', 'endTime', [sequelize.literal('extract(epoch from (startTime - endTime))::intefer/60 AS timeDifference')],
  //   //   })
  //   //   .then(res => console.log(res))
  //   //   .catch((e) => {
  //   //     throw new Error(e);
  //   //   });

  //   const userTotalDistance = await models.Participation
  //     .findAll({
  //       where: {
  //         UserId: userId
  //       },
  //       group: ['UserId'],
  //       attributes: [[sequelize.fn('sum', sequelize.col('distance')), 'totalDistance']],
  //     })
  //     .then(res => res[0].dataValues.totalDistance)
  //     .catch((e) => {
  //       throw new Error(e);
  //     });

  //   // const userTotalArea =

  //   const stats = {
  //     // totalTime: userTotalTime,
  //     // totalArea: userTotalArea,
  //     totalDistance: userTotalDistance,
  //   };

  //   ctx.body = {
  //     userInfo,
  //     badges,
  //     participations,
  //     stats,
  //   };
  //   ctx.status = 200;
  // } else {
  //   console.log('The user is mandatory on this request.');
  //   ctx.status = 200;
  // }
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
