// gateway.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express'; // Correct package name
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';  // Import IntrospectAndCompose

// Initialize the gateway using IntrospectAndCompose
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'users', url: 'http://localhost:4002/graphql' },  // User subgraph
      { name: 'products', url: 'http://localhost:4003/graphql' }  // Product subgraph
    ],
  }),
});

// Initialize the Apollo Server with the Apollo Gateway
const server = new ApolloServer({
  gateway,
  subscriptions: false,  // Disable subscriptions (not supported in federation)
});

const app = express(); // Create an Express application

// Start the server and apply middleware
server.start().then(() => {
  server.applyMiddleware({ app });

  // Listen on the specified port
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Gateway ready at http://localhost:4000${server.graphqlPath}`);
  });
});
