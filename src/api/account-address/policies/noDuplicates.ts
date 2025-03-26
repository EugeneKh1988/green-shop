/**
 * noDuplicates policy
 */

export default async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  const { results } = await strapi
    .service("api::account-address.account-address")
    .findOneAddress(["town"]);
  //console.log(results);

  if (results && results.length > 0) {
    return false;
  }

  return true;
};
