import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_TASK } from '../utils/queries';
import UpdateTask from '../components/UpdateTask';

import styles from './TaskPage.module.css';

const TaskPage = () => {
  const { taskId } = useParams();

  const { loading, data } = useQuery(GET_TASK, {
    variables: { _id: taskId },
  });

  const task = data?.task || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.taskPage}>
      <h2 className={styles.taskPageTitle}>Task Details</h2>
      <p className={styles.taskPageInfo}>Title: {task.title}</p>
      <p className={styles.taskPageInfo}>Description: {task.description}</p>
      <p className={styles.taskPageInfo}>Completed: {task.completed ? 'Yes' : 'No'}</p>

      <h3 className={styles.taskPageUpdateTitle}>Update Task</h3>
      <UpdateTask taskId={taskId} />
    </div>
  );
};

export default TaskPage;

