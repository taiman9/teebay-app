// src/server.js

import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import typeDefs  from './schema.js';
import resolvers from './resolvers.js';

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token.replace('Bearer ', ''));
    return { user };
  },
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});

// Use startStandaloneServer instead of server.listen()
const { url } = await startStandaloneServer(server, {
  listen: { port: 4003 },
});

console.log(`🚀 Server ready at ${url}`);
