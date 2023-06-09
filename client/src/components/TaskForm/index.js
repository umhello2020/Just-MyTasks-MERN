import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../../utils/mutations';
import { GET_TASKS, GET_ME } from '../../utils/queries';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const [createTask, { error }] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      try {
        const { tasks } = cache.readQuery({ query: GET_TASKS, variables: { username: null } });
  
        cache.writeQuery({
          query: GET_TASKS,
          variables: { username: null },
          data: { tasks: [createTask, ...tasks] },
        });
      } catch (e) {
        console.error(e);
      }
  
      try {
        const { me } = cache.readQuery({ query: GET_ME });
  
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...me, tasks: [...me.tasks, createTask] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createTask({
        variables: {
          title: taskTitle,
          description: taskDescription,
          completed: false,
        },
      });

      setTaskTitle('');
      setTaskDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setTaskTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setTaskDescription(value);
  };

  return (
    <div>
      <h3>Create a New Task</h3>

      <form onSubmit={handleFormSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="taskTitle">Title:</label>
          <input
            className={styles['form-control']}
            placeholder="Enter a title"
            name="taskTitle"
            value={taskTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="taskDescription">Description:</label>
          <textarea
            className={styles['form-control']}
            placeholder="Enter a description"
            name="taskDescription"
            value={taskDescription}
            onChange={handleDescriptionChange}
          />
        </div>

        <button className={styles['submit-btn']} type="submit">
          Add Task
        </button>
        {error && <div className={styles['error-message']}>{error.message}</div>}
      </form>
    </div>
  );
};

export default TaskForm;

