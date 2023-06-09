import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import UpdateUser from '../components/UpdateUser';

import './Profile.module.css';

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

  const user = data?.me || data?.tasks || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('User:', user);

  return (
    <div>
      <div className="profile-container">
        <h2 className="profile-title">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="task-list-container">
          <TaskList
            tasks={user.tasks}
            title={`${user.username}'s tasks`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div className="profile-form-container">
            <TaskForm />
            <UpdateUser updateUser={updateUser} />
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Profile;
