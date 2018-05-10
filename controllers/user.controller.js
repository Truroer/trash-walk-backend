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
  let newUser;
  if (ctx.request.body.email) {
    newUser = await models.User
      .create({
        id: uuid(),
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        email: ctx.request.body.email,
        token: ctx.request.body.token,
      })
      .then(res => res.get({ plain: true }))
      .catch((e) => { throw new Error(e); });

    ctx.body = newUser;
    ctx.status = 201;
  } else {
    console.log('The request body is mandatory on this request.');
    ctx.status = 204;
  }
  return false;
};

module.exports.updateUser = async (ctx) => {
  try {
    ctx.body = `endpoint for updateUser with parameter ${ctx.params.id}`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};

module.exports.deleteUser = async (ctx) => {
  try {
    ctx.body = `endpoint for deleteUser with parameter ${ctx.params.id}`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
};
