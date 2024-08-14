// Import necessary modules and classes
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JSON Web Tokens
const { AuthenticationError } = require('apollo-server-express'); // Error handling for authentication issues
const User = require('../models/User'); // User model for MongoDB
const Email = require('../models/Email'); // Email model for MongoDB

// Define GraphQL resolvers for executing queries and mutations
const resolvers = {
  Query: {
    // Resolver to fetch inbox emails for authenticated user
    inbox: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated'); // Check if user is authenticated
      return Email.find({ to: user.email }); // Return emails where the user is the recipient
    },
    // Resolver to fetch sent emails by the authenticated user
    sentEmails: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated'); // Check if user is authenticated
      return Email.find({ from: user.id }); // Return emails sent by the user
    },
    // Resolver to fetch a specific email by ID, for authenticated user
    email: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated'); // Check if user is authenticated
      return Email.findById(id); // Return the email with the specified ID
    },
  },
  Mutation: {
    // Resolver for user registration
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email }); // Check if user already exists
      if (existingUser) throw new Error('User already exists'); // If user exists, throw error

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const user = new User({ username, email, password: hashedPassword }); // Create new user with hashed password
      await user.save(); // Save the user to the database
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT for the user
      return { token }; // Return the token
    },
    // Resolver for user login
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username }); // Find the user by username
      if (!user) throw new Error('User not found'); // If user not found, throw error

      const isMatch = await bcrypt.compare(password, user.password); // Compare provided password with stored hash
      if (!isMatch) throw new Error('Invalid credentials'); // If password doesn't match, throw error

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT for the user
      return { token }; // Return the token
    },
    // Resolver to send an email
    sendEmail: async (_, { to, subject, body }, { user }) => {
      console.log("User in sendEmail resolver:", user); // Debugging line to check user
      if (!user) throw new AuthenticationError('Not authenticated'); // Check if user is authenticated
      const email = new Email({ from: user.id, to, subject, body }); // Create a new email document
      await email.save(); // Save the email to the database
      return email; // Return the saved email
    },
    // Resolver for user logout
    logout: async (_, __, { user }) => {
      // Optional: Implement token invalidation logic if needed
      return {}; // Currently, it just returns an empty object
    },
  },
};

module.exports = resolvers; // Export the resolvers for use in Apollo Server setup