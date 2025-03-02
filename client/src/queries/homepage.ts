import { gql } from "@apollo/client";

export const homePageQuery = gql`
  query {
    homepage {
      header
      carousel
      images {
        name
        url
      }
    }
  }
`;
