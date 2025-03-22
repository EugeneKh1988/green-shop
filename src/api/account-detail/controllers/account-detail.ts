/**
 * account-detail controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::account-detail.account-detail",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { results, pagination } = await strapi
        .service("api::account-detail.account-detail")
        .findOneDetail([
          "firstName",
          "lastName",
          "email",
          "tel",
          "userName",
          "user_id",
        ]);
      //console.log(ctx.params);
      // sanitizeOutput to ensure the user does not receive any data they do not have access to
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    async create(ctx) {
      if (ctx.request.body && ctx.request.body.data) {
        ctx.request.body.data.user_id = ctx.state.user.id;
      }
      //console.log(ctx.request.body);
      return await super.create(ctx);
    },

    async update(ctx) {
      if (ctx.request.body && ctx.request.body.data) {
        ctx.request.body.data.user_id = ctx.state.user.id;
      }
      //console.log(ctx.request.body);
      return await super.update(ctx);
    },
  })
);
