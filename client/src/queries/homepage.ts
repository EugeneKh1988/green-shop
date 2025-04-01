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
      banner
      info
      newsletter
      contacts
      footer
      images {
        name
        url
        width
        height
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
    categories(status: $status) {
      name
      slug
    }
    sizes(status: $status) {
      name
      slug
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

export const plantsQuery = gql`
  query ExampleQuery(
    $plantsStatus: PublicationStatus
    $pagination: PaginationArg
    $filters: PlantFiltersInput
    $sort: [String]
  ) {
    plants_connection(
      status: $plantsStatus
      pagination: $pagination
      filters: $filters
      sort: $sort
    ) {
      nodes {
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
        sizeCount {
          count
          size
        }
      }
      pageInfo {
        pageCount
        total
      }
    }
  }
`;

export const plantsQueryVariables = (category: string, size: string, priceRange: [number, number], sort:string, pageNumber: number = 1, pageSize: number = 9) => {
  const variables = {
    pagination: {
      page: pageNumber,
      pageSize: pageSize,
    },
    filters: {
      price: {
        between: priceRange,
      },
      category: {},
      size: {},
    },
    plantsStatus: "PUBLISHED",
    sort: sort,
  };
  if(category != "all") {
    variables.filters.category = {slug: {eq: category}};
  }
  if (size != "all") {
    variables.filters.size = { slug: { eq: size } };
  }
  return variables;
};