/**
 * noDuplicates policy
 */

export default async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  const { results } = await strapi
    .service("api::account-detail.account-detail")
    .findOneDetail(["firstName"]);
  //console.log(results);

  if (results && results.length > 0) {
    return false;
  }

  return true;
};
