const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const Email = require('../models/Email');

const resolvers = {
  Query: {
    inbox: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return Email.find({ to: user.id });
    },
    sentEmails: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return Email.find({ from: user.id });
    },
    email: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return Email.findById(id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      console.log("existingUser", existingUser);
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });    
      await user.save();     
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const findUser = await User.findOne({ username });
      console.log("user", findUser);
      return { token };
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      console.log("user", user);
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token };
    },
    sendEmail: async (_, { to, subject, body }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      const email = new Email({ from: user.id, to, subject, body });
      await email.save();
      return email;
    },
    logout: async (_, __, { user }) => {
      // Optional: Implement token invalidation logic if needed
      return {};
    },
  },
};

module.exports = resolvers;
