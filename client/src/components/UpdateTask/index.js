import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK, DELETE_TASK } from '../../utils/mutations';
import './UpdateTask.module.css';

const UpdateTask = ({ taskId }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormState((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description, completed } = formState;
    updateTask({
      variables: {
        taskId,
        title,
        description,
        completed,
      },
    })
      .then((response) => {
        // Handle success
        console.log("Task updated successfully", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating task", error);
      });
  };

  const handleDelete = () => {
    deleteTask({
      variables: {
        taskId,
      },
    })
      .then((response) => {
        // Handle success
        console.log("Task deleted successfully", response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting task", error);
      });
  };

  return (
    <div>
      <h3 className="task-page-update-title">Update Task</h3>
      <form className="task-page-form" onSubmit={handleFormSubmit}>
        <input
          className="task-page-input"
          type="text"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
        />
        <textarea
          className="task-page-textarea"
          name="description"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
        />
        <label className="task-page-checkbox-label">
          Completed:
          <input
            className="task-page-checkbox"
            type="checkbox"
            name="completed"
            checked={formState.completed}
            onChange={handleChange}
          />
        </label>
        <button className="submit-btn" type="submit">Update Task</button>
      </form>
      <button className="delete-btn" onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default UpdateTask;
