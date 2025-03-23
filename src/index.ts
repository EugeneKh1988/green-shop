// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Disable the queries on the 'account-detail' content-type in the 'account-detail' API
    strapi
      .plugin("graphql")
      .service("extension")
      .shadowCRUD("api::account-detail.account-detail")
      .disableQueries();

    // Disable the mutations on the 'account-detail' content-type in the 'account-detail' API
    strapi
      .plugin("graphql")
      .service("extension")
      .shadowCRUD("api::account-detail.account-detail")
      .disableMutations();

    const extensionService = strapi.service("plugin::graphql.extension");
    extensionService.use(({ strapi }) => ({
      typeDefs: `
        type Query {
          accountDetail(status: PublicationStatus): AccountDetail
        }

        type Mutation {
          createAccountDetail(input: AccountDetailInput!): AccountDetail
          updateAccountDetail(documentId: ID!, data: AccountDetailInput!): AccountDetail
        }
      `,
      resolvers: {
        Query: {
          accountDetail: {
            resolve: async (parent, args, context) => {
              const data = await strapi
                .service("api::account-detail.account-detail")
                .findOneDetail([
                  "firstName",
                  "lastName",
                  "email",
                  "tel",
                  "userName",
                  "user_id",
                  "createdAt",
                  "publishedAt",
                  "updatedAt",
                ]);

              //console.log("##################", data.results, "##################");
              if (data.results && data.results.length > 0) {
                return data.results[0];
              }
              return {};
            },
          },
        },
        Mutation: {
          createAccountDetail: {
            resolve: async (parent, args, context) => {
              // query
              const queryParams = args.input;
              // user's id
              queryParams.user_id = context.state.user.id;
              //console.log("Create mutation", queryParams);
              return await strapi
                .documents("api::account-detail.account-detail")
                .create({
                  data: queryParams,
                  status: "published",
                });
            },
          },
          updateAccountDetail: {
            resolve: async (parent, args, context) => {
              // query
              const queryParams = args.data;
              // user's id
              queryParams.user_id = context.state.user.id;
              //console.log("Update mutation", args);
              return await strapi
                .documents("api::account-detail.account-detail")
                .update({
                  documentId: args.documentId,
                  data: queryParams,
                  status: "published",
                });
            },
          },
        },
      },
      resolversConfig: {
        "Query.accountDetail": {
          policies: ["api::account-detail.is-auth"],
        },
        "Mutation.createAccountDetail": {
          policies: [
            "api::account-detail.is-auth",
            "api::account-detail.no-duplicates",
          ],
        },
        "Mutation.updateAccountDetail": {
          policies: [
            "api::account-detail.is-auth",
            "api::account-detail.is-owner",
          ],
        },
      },
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
