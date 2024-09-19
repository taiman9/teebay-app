// users/server.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express'; // Correct package name
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'; // Optional plugin for Playground
import { buildSubgraphSchema } from '@apollo/subgraph'; // Import for Federation
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import cors from 'cors';

async function startServer() {
  const app = express();

  // app.use(cors());  // Enable CORS for all routes

  // Create a federated schema using buildSubgraphSchema
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // Optional: For GraphQL Playground
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 4003 }, () =>
    console.log(`🚀 Products subgraph running at http://localhost:4003${server.graphqlPath}`)
  );
}

startServer();