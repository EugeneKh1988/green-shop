import { IAccountDetail } from "@/lib/Interfaces";
import { gql } from "@apollo/client";

export const accountDetailsQuery = gql`
  query Query {
    accountDetail {
      documentId
      email
      firstName
      lastName
      tel
      userName
    }
  }
`;

export const accountDetailCreateMut = gql`
  mutation Mutation($input: AccountDetailInput!) {
    createAccountDetail(input: $input) {
      documentId
    }
  }
`;

export const accountDetailUpdateMut = gql`
  mutation Mutation($documentId: ID!, $data: AccountDetailInput!) {
    updateAccountDetail(documentId: $documentId, data: $data) {
      documentId
      email
      firstName
      lastName
      tel
      userName
      user_id
    }
  }
`;

export const accountDetailCreateMutVariables = (input: IAccountDetail) => {
  const variables: {input: IAccountDetail} = {
    input: {},
  };

  if (input) {
    variables.input.email = input.email;
    variables.input.firstName = input.firstName;
    variables.input.lastName = input.lastName;
    variables.input.userName = input.userName;
    variables.input.tel = input.tel;
  }
  return variables;
};

export const accountDetailUpdateMutVariables = (documentId: string, data: IAccountDetail) => {
  const variables: {documentId: string, data: IAccountDetail } = {
    documentId: "",
    data: {},
  };

  if(documentId) {
    variables.documentId = documentId;
  }

  if (data) {
    variables.data.email = data.email;
    variables.data.firstName = data.firstName;
    variables.data.lastName = data.lastName;
    variables.data.userName = data.userName;
    variables.data.tel = data.tel;
  }
  console.log("Variab", variables);
  return variables;
};