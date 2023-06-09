import React from 'react';
import { useQuery } from '@apollo/client';

import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

import { GET_TASKS } from '../utils/queries';

import styles from './Home.module.css';

const Home = () => {
  const { loading, data } = useQuery(GET_TASKS);
  const tasks = data?.tasks || [];

  return (
    <main>
      <div className={styles.homeContainer}>
        <div className={styles.taskFormContainer}>
          <TaskForm />
        </div>
        <div className={styles.taskListContainer}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              title="Here are your tasks"
              showTitle={true}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

