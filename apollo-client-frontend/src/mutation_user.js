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

// Mutation to buy a product and create an entry in the Bought table
export const CREATE_BOUGHT_ITEM = gql`
  mutation CreateBoughtItem(
    $buyerId: ID!,
    $sellerId: ID!,
    $productId: ID!,
    $title: String!,
    $description: String,
    $price: Float!,
    $categories: [String!]!,  # Updated to include categories field
    $boughtAt: String!,
    $postedAt: String
  ) {
    createBoughtItem(
      buyerId: $buyerId,
      sellerId: $sellerId,
      productId: $productId,
      title: $title,
      description: $description,
      price: $price,
      categories: $categories,  # Updated to include categories field
      boughtAt: $boughtAt,
      postedAt: $postedAt
    ) {
      id
      title
      price
      categories  # Return the categories field in the response
      boughtAt
      postedAt
    }
  }
`;

