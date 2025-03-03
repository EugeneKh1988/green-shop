import { gql } from "@apollo/client";

export const homePageQuery = gql`
  query homeQuery(
    $pagination: PaginationArg
    $status: PublicationStatus
    $sort: [String]
  ) {
    homepage {
      header
      carousel
      info
      images {
        name
        url
      }
    }
    blogs(pagination: $pagination, status: $status, sort: $sort) {
      cover {
        name
        url
      }
      documentId
      publishedAt
      readTime
      slug
      title
      description
    }
  }
`;

export const variables = {
  pagination: {
    page: 1,
    pageSize: 4,
  },
  status: "PUBLISHED",
  sort: "updatedAt:desc",
};