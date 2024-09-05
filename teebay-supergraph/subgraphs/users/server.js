// users/server.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express'; // Correct package name
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'; // Optional plugin for Playground
import { buildSubgraphSchema } from '@apollo/subgraph'; // Import for Federation
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

async function startServer() {
  const app = express();

  // Create a federated schema using buildSubgraphSchema
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // Optional: For GraphQL Playground
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 4002 }, () =>
    console.log(`🚀 User subgraph running at http://localhost:4002${server.graphqlPath}`)
  );
}

startServer();
