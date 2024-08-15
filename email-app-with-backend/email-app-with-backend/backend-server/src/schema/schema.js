const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Email {
    id: ID!
    from: ID!
    to: String!
    subject: String!
    body: String!
    sentAt: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    inbox: [Email]
    sentEmails: [Email]
    email(id: ID!): Email
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    sendEmail(to: String!, subject: String!, body: String!): Email
    logout: Boolean
  }
`;

module.exports = typeDefs;
