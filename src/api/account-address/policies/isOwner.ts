/**
 * isOwner policy
 */

export default async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  const { results } = await strapi
    .service("api::account-address.account-address")
    .findOneAddress(["town", "documentId"]);
  //console.log(results);

  if (results && results.length > 0) {
    const found = results[0];
    //console.log(found);
    // for API
    if (
      found &&
      policyContext.params && found.documentId == policyContext.params.id
    ) {
      return true;
    }
    // for GraphQL
    if (
      found &&
      policyContext.args && found.documentId == policyContext.args.documentId
    ) {
      return true;
    }
  }

  return false;
};
