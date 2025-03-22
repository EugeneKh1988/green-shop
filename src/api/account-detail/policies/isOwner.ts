/**
 * isOwner policy
 */

export default async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  const { results } = await strapi
    .service("api::account-detail.account-detail")
    .findOneDetail(["firstName", "documentId"]);
  //console.log(results);

  if (results && results.length > 0) {
    const found = results[0];
    if(found && found.documentId == policyContext.params.id) {
        return true;
    }
  }

  return false;
};
