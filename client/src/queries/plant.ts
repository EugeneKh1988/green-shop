import { gql } from "@apollo/client";

export const plantsSlugsAndCategoriesQuery = gql`
  query Query($status: PublicationStatus) {
    plants(status: $status) {
      slug
      category {
        slug
      }
    }
  }
`;

export const plantQuery = gql`
  query Query($filters: PlantFiltersInput, $status: PublicationStatus) {
    plants(filters: $filters, status: $status) {
      documentId
      name
      price
      size {
        name
        slug
      }
      discount
      category {
        name
        slug
      }
      count
      description
      photos {
        name
        url
        width
        height
      }
      sku
      shortDescription
      sizeCount {
        count
        size
      }
    }
  }
`;

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

export const plantQueryVariables = (
  slug: string,
  category: string,
) => {
  const variables = {
    filters: {
      slug: {},
      category: {},
    },
    plantsStatus: "PUBLISHED",
  };
  
  if (slug) {
    variables.filters.slug = {  eq: slug };
  }
  if (category) {
    variables.filters.category = { slug: { eq: category } };
  }
  return variables;
};