import { IAccountAddress } from "@/lib/Interfaces";
import { gql } from "@apollo/client";

export const accountAddressQuery = gql`
  query Query {
    accountAddress {
      documentId
      town
      street
      appartment
      zip
    }
  }
`;

export const accountAddressCreateMut = gql`
  mutation Mutation($input: AccountAddressInput!) {
    createAccountAddress(input: $input) {
      documentId
    }
  }
`;

export const accountAddressUpdateMut = gql`
  mutation Mutation($documentId: ID!, $data: AccountAddressInput!) {
    updateAccountAddress(documentId: $documentId, data: $data) {
      documentId
      town
      street
      appartment
      zip
      user_id
    }
  }
`;

export const accountAddressCreateMutVariables = (input: IAccountAddress) => {
  const variables: {input: IAccountAddress} = {
    input: {},
  };

  if (input) {
    variables.input.town = input.town;
    variables.input.appartment = input.appartment;
    variables.input.street = input.street;
    variables.input.zip = input.zip;
  }
  return variables;
};

export const accountAddressUpdateMutVariables = (documentId: string, data: IAccountAddress) => {
  const variables: {documentId: string, data: IAccountAddress } = {
    documentId: "",
    data: {},
  };

  if(documentId) {
    variables.documentId = documentId;
  }

  if (data) {
    variables.data.town = data.town;
    variables.data.appartment = data.appartment;
    variables.data.street = data.street;
    variables.data.zip = data.zip;
  }
  //console.log("Variab", variables);
  return variables;
};