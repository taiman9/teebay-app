import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import * as userOperations from './mutation_user';  // Import all user operations
import * as productOperations from './mutation_product';  // Import all product operations

// HTTP link for Users subgraph
const usersLink = createHttpLink({
  uri: 'http://localhost:4002/graphql',  // Replace with your actual Users subgraph URL
});

// HTTP link for Products subgraph
const productsLink = createHttpLink({
  uri: 'http://localhost:4003/graphql',  // Replace with your actual Products subgraph URL
});

// Function to check if the operation exists in the provided module (user or product operations)
const matchOperationInModule = (operationName, operations) => {
  return Object.keys(operations).some(
    (operation) => operations[operation]?.definitions?.some(def => def.name.value.toLowerCase() === operationName)
  );
};

// Split based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    // Check if the operation is defined and has a name
    if (definition.kind === 'OperationDefinition' && definition.name?.value) {
      const operationName = definition.name.value.toLowerCase();

      // Check if the operation is in user-related operations
      if (matchOperationInModule(operationName, userOperations)) {
        return true;  // Route to usersLink
      }

      // Check if the operation is in product-related operations
      if (matchOperationInModule(operationName, productOperations)) {
        return false;  // Route to productsLink
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
