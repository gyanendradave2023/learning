const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const authMiddleware = require('./authMiddleware');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  }),
});

module.exports = (app) => {
  // Apply authMiddleware to set req.user before Apollo Server middleware
  app.use(authMiddleware);

  // Apply Apollo Server middleware
  server.applyMiddleware({ app });
};
