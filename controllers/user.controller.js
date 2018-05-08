'use strict';

const Sequelize = require('sequelize');

const User = require('../models/user');
const Participation = require('../models/participation');
const Achievement = require('../models/achievement');
const Location = require('../models/location');

module.exports.getUser = async (ctx, next) => {
  if (ctx.method !== 'GET') return await next();

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

  // const user = {
  //   userInfo.firstName,
  //   userInfo.lastName,
  //   userInfo.email,
  //   userInfo.token,
  // }

  ctx.body = `endpoint for getUser with parameter ${ctx.params.id}`;
  ctx.status = 200;
};

module.exports.createUser = async (ctx) => {
  try {
    ctx.body = `endpoint for createUser`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
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
