import React from 'react';
import { useQuery } from '@apollo/client';

import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

import { GET_TASKS } from '../utils/queries';

import './Home.module.css';

const Home = () => {
  const { loading, data } = useQuery(GET_TASKS);
  const tasks = data?.tasks || [];

  return (
    <main>
      <div className="home-container">
        <div className="task-form-container">
          <TaskForm />
        </div>
        <div className="task-list-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              title="Here are your tasks"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
