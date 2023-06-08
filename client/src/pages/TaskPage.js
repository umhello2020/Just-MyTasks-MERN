import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_TASK } from '../utils/queries';
import UpdateTask from '../components/UpdateTask';

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
    <div className="task-page">
      <h2 className="task-page-title">Task Details</h2>
      <p className="task-page-info">Title: {task.title}</p>
      <p className="task-page-info">Description: {task.description}</p>
      <p className="task-page-info">Completed: {task.completed ? 'Yes' : 'No'}</p>

      <h3 className="task-page-update-title">Update Task</h3>
      <UpdateTask taskId={taskId} />
    </div>
  );
};

export default TaskPage;
