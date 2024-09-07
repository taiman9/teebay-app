// /products/schema.js
import gql from 'graphql-tag';

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    title: String!
    description: String!
    price: Float!
    userId: ID!
    createdAt: String!
    categories: [Category!]!
  }

  type Category {
    id: ID!
    name: String!
  }

  extend type Query {
    products(userId: ID): [Product!]!  # Query products, optionally filter by userId
    product(id: ID!): Product!  # Query a single product by ID
    categories: [Category!]!
  }

  extend type Mutation {
    addProduct(
      title: String!,
      description: String!,
      price: Float!,
      userId: ID!,
      categoryIds: [Int!]!
    ): Product!

    editProduct(
      id: ID!,  # Product ID to edit
      title: String,
      description: String,
      price: Float,
      categoryIds: [Int!]
    ): Product!  # Returns the updated product


    deleteProduct(id: ID!): Boolean!
  }
`;

export default typeDefs;
