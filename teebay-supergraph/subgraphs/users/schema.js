// users/schema.js

//import gql from '@apollo/subgraph';
import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
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
