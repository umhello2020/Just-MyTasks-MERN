import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import UpdateUser from '../components/UpdateUser';

import styles from './Profile.module.css';

import { GET_ME, GET_TASKS } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
  console.log('Rendering Profile Page');
  
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? GET_TASKS : GET_ME, {
    variables: { username: userParam },
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const user = userParam ? data?.tasks : data?.me || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.profileContainer}>
        <h2 className={styles.profileTitle}>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className={styles.taskListContainer}>
          <TaskList
            tasks={user.tasks}
            title={`${user.username}'s tasks`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div className={styles.profileFormContainer}>
            <TaskForm />
            <UpdateUser updateUser={updateUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
