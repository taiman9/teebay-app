// src/mutation_user.js
import { gql } from '@apollo/client';

// GraphQL mutation to register the user
export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
    $address: String!,
    $phoneNumber: String!
  ) {
    register(
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName,
      address: $address,
      phoneNumber: $phoneNumber
    ) {
      id
      email
    }
  }
`;

// GraphQL mutation to login the user
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;


