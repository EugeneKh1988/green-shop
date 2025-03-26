import { gql } from "@apollo/client";

export const changePasswordMut = gql`
  mutation Mutation($currentPassword: String!, $password: String!, $passwordConfirmation: String!) {
  changePassword(currentPassword: $currentPassword, password: $password, passwordConfirmation: $passwordConfirmation) {
    jwt
    user {
      email
      username
      id
    }
  }
}

`;

export const changePasswordMutVariables = (currentPassword: string, password: string, passwordConfirmation: string) => {
  const variables = {
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  };

  if (currentPassword && password && passwordConfirmation) {
    variables.currentPassword = currentPassword;
    variables.password = password;
    variables.passwordConfirmation = passwordConfirmation;
  }
  return variables;
};