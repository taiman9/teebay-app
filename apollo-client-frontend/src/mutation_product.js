import { gql } from '@apollo/client';

// GraphQL mutation to add a new product
export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!, 
    $description: String!, 
    $price: Float!,
    $rentPrice: Float, 
    $userId: ID!, 
    $categoryIds: [Int!]!
  ) {
    addProduct(
      title: $title, 
      description: $description, 
      price: $price,
      rentPrice: $rentPrice, 
      userId: $userId, 
      categoryIds: $categoryIds
    ) {
      id
      title
      description
      price
      rentPrice
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

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($userId: ID) {
    products(userId: $userId) {
      id
      title
      description
      price
      rentPrice
      userId
      createdAt
      categories {
        id
        name
      }
      buyerId  # Fetch the buyerId field
      buyDate  # Fetch the buyDate field
    }
  }
`;

// Updated query to get a product by ID
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      title
      description
      price
      rentPrice
      userId
      categories {
        id
        name
      }
      buyerId  # Fetch the buyerId field
      buyDate  # Fetch the buyDate field
      createdAt
    }
  }
`;

export const BROWSE_PRODUCTS = gql`
  query BrowseProducts($userId: ID!) {
    browseProducts(userId: $userId) {
      id
      title
      description
      price
      rentPrice
      categories {
        id
        name
      }
      buyerId  # Fetch the buyerId field
      buyDate  # Fetch the buyDate field
      createdAt
    }
  }
`;

// Mutation to edit a product
export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: ID!,
    $title: String,
    $description: String,
    $price: Float,
    $rentPrice: Float,
    $categoryIds: [Int!]
  ) {
    editProduct(
      id: $id,
      title: $title,
      description: $description,
      price: $price,
      rentPrice: $rentPrice,
      categoryIds: $categoryIds
    ) {
      id
      title
      description
      price
      categories {
        id
        name
      }
    }
  }
`;

// Mutation to delete a product
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Mutation to update the buyerId and buyDate in the Product table
export const UPDATE_PRODUCT_BUYER = gql`
  mutation UpdateProductBuyer($id: ID!, $buyerId: ID!, $buyDate: String!) {
    updateProductBuyer(id: $id, buyerId: $buyerId, buyDate: $buyDate) {
      id
      buyerId
      buyDate
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($userId: ID!, $transactionType: String!) {
    getTransaction(userId: $userId, transactionType: $transactionType) {
      id
      title
      description
      price
      userId
      buyerId
      createdAt
    }
  }
`;
