const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    tasks: [Task]
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    completed: Boolean
    user: User
  }

  type Donation {
    _id: ID!
    amount: Float!
    user: User
  }

  type Query {
    task(_id: ID!): Task
    tasks: [Task]
    me: User
    donation: Donation 
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String): User
    createTask(title: String!, description: String!, completed: Boolean!): Task
    updateTask(_id: ID!, title: String, description: String, completed: Boolean): Task
    deleteTask(_id: ID!): Task
    createDonation(_id: ID!, amount: Float!): Donation
  }
`;

module.exports = typeDefs;

