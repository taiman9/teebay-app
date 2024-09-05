// src/mutations.js
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

// GraphQL mutation to add a new product
export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!, 
    $description: String!, 
    $price: Float!, 
    $userId: ID!, 
    $categoryIds: [Int!]!
  ) {
    addProduct(
      title: $title, 
      description: $description, 
      price: $price, 
      userId: $userId, 
      categoryIds: $categoryIds
    ) {
      id
      title
      description
      price
      userId
      categories {
        id
        name
      }
    }
  }
`;

// GraphQL query to fetch all categories
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      id
      name
    }
  }
`;
