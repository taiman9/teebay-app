import gql from 'graphql-tag';

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    title: String!
    description: String!
    price: Float!
    rentPrice: Float  # New field for rental price, allowing null values
    userId: ID!
    buyerId: ID  # New field for the buyer ID, allowing null values
    buyDate: String  # New field for the date the product was bought, allowing null values
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
    browseProducts(userId: ID!): [Product!]! 
  }

  extend type Mutation {
    addProduct(
      title: String!,
      description: String!,
      price: Float!,
      rentPrice: Float,  # Optional rental price field for adding a product
      userId: ID!,
      categoryIds: [Int!]!
    ): Product!

    editProduct(
      id: ID!,  # Product ID to edit
      title: String,
      description: String,
      price: Float,
      rentPrice: Float,  # Optional rental price field for editing a product
      categoryIds: [Int!]
    ): Product!  # Returns the updated product

    deleteProduct(id: ID!): Boolean!

    # Mutation to update the buyerId and buyDate fields of a product
    updateProductBuyer(
      id: ID!,  # Product ID to update
      buyerId: ID!,  # Buyer ID to set
      buyDate: String!  # Date when the product was bought
    ): Product!  # Returns the updated product
  }
`;

export default typeDefs;
