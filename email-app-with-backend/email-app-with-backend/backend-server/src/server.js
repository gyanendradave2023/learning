const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4'); // For Apollo Server 4.x
const typeDefs = require('./schema/schema'); // Adjust the path as needed
const resolvers = require('./resolvers/resolvers'); // Adjust the path as needed
const authMiddleware = require('./authMiddleware'); // Adjust the path as needed
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

// Example REST API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Additional REST API routes can be added here
// For example, you might add user routes like so:
// app.use('/api/users', userRoutes);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers, 
});

const startServer = async () => {
  // Await server.start() before applying middleware
  await server.start();


  /**** */
  app.use(
    '/login',  
    expressMiddleware(server, { context: ({ req }) => {
      console.log("🚀 ~ req:", req)
      return {
        user: req.user,
      }
    }, }) // Apply middleware for GraphQL
  );


  // Apply Apollo Server middleware
  app.use(
    '/graphql',
    authMiddleware, 
    expressMiddleware(server, { context: ({ req }) => {
      console.log("🚀 ~ req:", req)
      return {
        user: req.user,
      }
    }, }) // Apply middleware for GraphQL
  );

  

  // Apply authentication middleware
  app.use(authMiddleware);

  // Start the server
  const PORT = process.env.PORT || 5000; // Set to 5000 for REST API
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(console.error);
