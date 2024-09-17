import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP link for Users subgraph
const usersLink = createHttpLink({
  uri: 'http://localhost:4002/graphql',  // Replace with your actual Users subgraph URL
});

// HTTP link for Products subgraph
const productsLink = createHttpLink({
  uri: 'http://localhost:4003/graphql',  // Replace with your actual Products subgraph URL
});

// Split based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    // Check if the operation is defined and has a name
    if (definition.kind === 'OperationDefinition' && definition.name?.value) {
      // Extract the operation name to determine its origin
      const operationName = definition.name.value.toLowerCase();

      // If the operation is from mutation_user.js, route to usersLink
      if (
        operationName.includes('register') ||  // Register-related operations
        operationName.includes('login') ||  // Login-related operations
        operationName.includes('user')  // User-related queries/mutations
      ) {
        return true;  // Direct to usersLink
      }

      // If the operation is from mutation_product.js, route to productsLink
      if (
        operationName.includes('addproduct') ||  // Add Product mutation
        operationName.includes('deleteproduct') ||  // Delete Product mutation
        operationName.includes('editproduct') ||  // Edit Product mutation
        operationName.includes('getproductbyid') ||  // Get Product by ID query
        operationName.includes('browseproducts') || // Browse Products query
        operationName.includes('createboughtitem')  // createBoughtItem mutation from users subgraph
      ) {
        return false;  // Direct to productsLink
      }
    }

    // Default to productsLink
    return false;
  },
  usersLink,  // Send operations to Users subgraph if they match the condition
  productsLink  // Otherwise, send operations to Products subgraph
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,  // Use the split link to route requests
  cache: new InMemoryCache(),  // Use in-memory caching
});

// Apollo Provider Component with cache clearing
export const MultiApolloProvider = ({ children }) => {
  useEffect(() => {
    // Clear Apollo Client cache if needed (you can trigger this manually or conditionally)
    client.clearStore();
  }, []);  // Empty dependency array to run only once on mount

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
