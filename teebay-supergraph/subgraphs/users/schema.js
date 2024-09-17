// users/schema.js

import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String!
    phoneNumber: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    boughtItems(buyerId: ID!): [Bought!]!  # Query to fetch bought items for a user
    soldItems(sellerId: ID!): [Bought!]!  # Query to fetch sold items for a user
  }

  type Mutation {
    register(
      email: String!, 
      password: String!,
      firstName: String!, 
      lastName: String!, 
      address: String!, 
      phoneNumber: String!
    ): User!

    login(email: String!, password: String!): User!

  }
`;

export default typeDefs;
