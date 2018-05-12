'use strict';

const uuid = require('uuid');

const models = require('../models');

module.exports.getUser = async (ctx, next) => {
  if (ctx.method !== 'GET') return next();

  const userInfo = await User.findOne({
    where: { user_id: ctx.params.id },
  });

  const userParticipations = await Participation.findAll({
    include: [
      {
        model: User,
        where: { user_id: Sequelize.col('participations.user_id') },
      },
    ],
  });

  const userAchievements = await Achievement.findAll({
    include: [
      {
        model: User,
        where: { user_id: Sequelize.col('achievements.user_id') },
      },
    ],
  });

  ctx.body = `endpoint for getUser with parameter ${ctx.params.id}`;
  ctx.status = 200;
};

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
