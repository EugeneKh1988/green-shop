import { IPlantCart } from "@/lib/Interfaces";
import { gql } from "@apollo/client";

export const cartPlantsQuery = gql`
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
      sku
      sizeCount {
        count
        size
      }
      cover {
        name
        height
        width
        url
      }
    }
  }
`;

export const cartPlantsQueryVariables = (cartPlants: IPlantCart[]) => {
  const variables = {
    filters: {
      documentId: {},
    },
    plantsStatus: "PUBLISHED",
  };

  if (cartPlants) {
    const documentIdArr = cartPlants.map((cartItem) => cartItem.documentId);
    variables.filters.documentId = { in: documentIdArr };
  }

  return variables;
};