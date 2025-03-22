/**
 * isAuth policy
 */

import { Core } from "@strapi/strapi";

export default (
  policyContext,
  config,
  { strapi }: { strapi: Core.Strapi }
) => {
  // Add your own logic here.
  const authUser = policyContext.state.user;
  if (authUser && authUser.confirmed && !authUser.blocked) {
    // user confirmed and not blocked
    //console.log(policyContext.state.user);
    return true;
  }

  return false;
};
