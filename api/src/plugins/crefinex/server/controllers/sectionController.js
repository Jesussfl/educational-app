module.exports = {
  async find(ctx) {
    try {
      return await strapi.plugin("crefinex").service("sectionService").find(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};