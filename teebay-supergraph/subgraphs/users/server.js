// src/server.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs  from './schema.js';
import resolvers from './resolvers.js';

async function startServer() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4003 }, () =>
    console.log(`🚀 Server ready at http://localhost:4003${server.graphqlPath}`)
  );
}

startServer();