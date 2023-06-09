import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, title, showTitle, showUsername }) => {
  return (
    <div className={styles['task-list']}>
      {showTitle && <h3 className={styles['task-list-title']}>{title}</h3>}
      {tasks.length ? (
        <ul className={styles['task-list-items']}>
          {tasks.map((task) => (
            <li key={task._id} className={styles['task-list-item']}>
              {showUsername && <p>Username: {task.user.username}</p>}
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
              <Link to={`/tasks/${task._id}`} className={styles['task-link']}>View Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
