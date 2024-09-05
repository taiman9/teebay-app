// src/ApolloClient.js
import React from 'react';
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

    // If the operation is a query or mutation and is related to Users, route to usersLink
    if (
      definition.kind === 'OperationDefinition' &&
      (definition.name?.value.toLowerCase().includes('user') ||  // Match any operation containing 'user'
       definition.name?.value.toLowerCase().includes('login') ||  // Example: Match specific user-related operations
       definition.name?.value.toLowerCase().includes('register'))
    ) {
      return true;  // Direct to usersLink
    }
    return false;  // Otherwise, direct to productsLink
  },
  usersLink,  // Send operations to Users subgraph if they match the condition
  productsLink  // Otherwise, send operations to Products subgraph
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,  // Use the split link to route requests
  cache: new InMemoryCache(),  // Use in-memory caching
});

// Apollo Provider Component
export const MultiApolloProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
