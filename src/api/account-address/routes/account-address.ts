/**
 * account-address router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::account-address.account-address', {
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
  });
