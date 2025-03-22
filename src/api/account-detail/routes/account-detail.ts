/**
 * account-detail router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  "api::account-detail.account-detail",
  {
    except: ["find", "delete"],
    config: {
      findOne: {
        policies: ["is-auth"],
      },
      create: {
        policies: ["is-auth", "no-duplicates"],
      },
      update: {
        policies: ["is-auth", "is-owner"],
      },
    },
  }
);
