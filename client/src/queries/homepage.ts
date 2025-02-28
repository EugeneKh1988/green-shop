import { gql } from "@apollo/client";

export const homePageQuery = gql`
  query {
    homepage {
      header
      images {
        name
        url
      }
    }
  }
`;
