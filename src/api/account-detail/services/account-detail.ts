/**
 * account-detail service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  "api::account-detail.account-detail",
  ({ strapi }) => ({
    async findOneDetail(fields: string[]) {
      // validateQuery (optional)
      // to throw an error on query params that are invalid or the user does not have access to
      const ctx = strapi.requestContext.get();
      const contentType = strapi.contentType(
        "api::account-detail.account-detail"
      );

      await strapi.contentAPI.validate.query(ctx.query, contentType, { auth: ctx.state.auth });

      const userID = ctx.state.user.id;
      const queryParams = {
        filters: { user_id: { $eq: userID } },
        fields: fields,
        pagination: { pageSize: "1", page: "1" },
        status: "published",
      };

      // sanitizeQuery to remove any query params that are invalid or the user does not have access to
      // It is strongly recommended to use sanitizeQuery even if validateQuery is used
      //const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi
        .service("api::account-detail.account-detail")
        .find(queryParams);
      return { results, pagination };
    },
  })
);
