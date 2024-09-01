// gateway/index.js
const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:4002' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false, // Subscriptions are not supported in Apollo Gateway yet
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Supergraph Gateway ready at ${url}`);
});
