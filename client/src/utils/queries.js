import { gql } from '@apollo/client';

export const GET_TASK = gql`
  query getTask($taskId: ID!) {
    task(_id: $taskId) {
      _id
      title
      description
      completed
      user {
        _id
      }
    }
  }
`;

export const GET_TASKS = gql`
  query getTasks {
    tasks {
      _id
      title
      description
      completed
      user {
        _id
      }
    }
  }
`;

export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      tasks {
        _id
        title
        description
        completed
      }
    }
  }
`;

export const GET_DONATION = gql`
  query getDonation($donationId: ID!) {
    donation(_id: $donationId) {
      _id
      amount
      user {
        _id
      }
    }
  }
`;
