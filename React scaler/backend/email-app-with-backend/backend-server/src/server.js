const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4'); // For Apollo Server 4.x
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const authMiddleware = require('./authMiddleware');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Setup CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  const databaseName = mongoose.connection.db.databaseName;
  console.log('Connected to MongoDB_name', databaseName);
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  }),
});

const startServer = async () => {
  // Await server.start() before applying middleware
  await server.start();

  // Apply Apollo Server middleware
  app.use(
    '/graphql',
    expressMiddleware(server) // Apply middleware
  );

  // Auth middleware
  app.use(authMiddleware);

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(console.error);
