import { gql } from "@apollo/client";

export const registerMutation = gql`
  mutation Mutation($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        username
        id
        email
      }
    }
  }
`;

export const registerVariables = (username: string, email: string, password: string) => {
  const variables = {
    input: {}
  };

  if (username && email && password) {
    variables.input = { username, email, password};
  }
  return variables;
};