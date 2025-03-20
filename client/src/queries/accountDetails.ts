import { gql } from "@apollo/client";

export const plantsByCategoryQuery = gql`
  query Query(
    $filters: PlantFiltersInput
    $status: PublicationStatus
    $pagination: PaginationArg
  ) {
    plants(filters: $filters, status: $status, pagination: $pagination) {
      documentId
      name
      price
      discount
      slug
      cover {
        name
        height
        width
        url
      }
      category {
        slug
      }
    }
  }
`;

export const plantsByCategoryVariables = (category: string, count: number) => {
  const variables = {
    filters: {
      category: {},
    },
    status: "PUBLISHED",
    pagination: {
      page: 1,
      pageSize: count,
    },
  };

  if (category) {
    variables.filters.category = { slug: { eq: category } };
  }
  return variables;
};