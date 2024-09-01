// src/mutations.js
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SignInUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`;
