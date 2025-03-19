import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation Mutation($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        username
        id
        email
      }
    }
  }
`;

export const loginVariables = (identifier: string, password: string) => {
  const variables = {
    input: {},
  };

  if (identifier && password) {
    variables.input = { identifier, password };
  }
  return variables;
};