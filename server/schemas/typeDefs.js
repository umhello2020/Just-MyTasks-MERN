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
    tasks: [Task]
    donations: [Donation]
  }

  type Task {
    _id: ID!
    title: String!
    description: String!
    completed: Boolean!
    user: User!
  }

  type Donation {
    _id: ID!
    amount: Float!
    user: User
  }

  type Query {
    getTask(taskId: ID!): Task
    getTasks(username: String): [Task]
    getMe: User
    getDonation(_id: ID!): Donation
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String): User
    createTask(title: String!, description: String!, completed: Boolean!): Task
    updateTask(taskId: ID!, title: String, description: String, completed: Boolean): Task
    deleteTask(_id: ID!): Task
    createDonation(amount: Float!): Donation
  }
`;

module.exports = typeDefs;
