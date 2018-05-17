module.exports = async (ctx, next) => {
  if (ctx.status === 404) {
    ctx.body = '<h1>Sorry, this URL does not exist.</h1>';
  }
};
