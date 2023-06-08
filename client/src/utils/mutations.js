import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String) {
    updateUser(username: $username, email: $email) {
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask($title: String!, $description: String!, $completed: Boolean!) {
    createTask(title: $title, description: $description, completed: $completed) {
      _id
      title
      description
      completed
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask($taskId: ID!, $title: String, $description: String, $completed: Boolean!) {
    updateTask(_id: $taskId, title: $title, description: $description, completed: $completed) {
      _id
      title
      description
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(_id: $taskId) {
      _id
    }
  }
`;

export const CREATE_DONATION = gql`
  mutation createDonation($amount: Float!) {
    createDonation(amount: $amount) {
      _id
      amount
    }
  }
`;
