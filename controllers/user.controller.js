'use strict';

module.exports.getUser = async (ctx) => {
  try {
    ctx.body = `endpoint for getUser with parameter ${ctx.params.id}`;
    ctx.status = 200;
  } catch (e) {
    ctx.body = `An unexpected error occurred. ${e}`;
    ctx.status = 400;
  }
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
