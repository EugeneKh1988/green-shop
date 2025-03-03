import { gql } from "@apollo/client";

export const homePageQuery = gql`
  query {
    homepage {
      header
      carousel
      info
      images {
        name
        url
      }
    }
  }
`;
