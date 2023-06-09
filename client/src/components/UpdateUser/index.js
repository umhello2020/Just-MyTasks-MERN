import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import styles from './UpdateUser.module.css';

const UpdateUser = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
  });

  const [updateUser] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email } = formState;
    updateUser({
      variables: {
        username,
        email,
      },
    })
      .then((response) => {
        // Handle success
        console.log('User updated successfully', response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating user', error);
      });
  };

  return (
    <div>
      <h3 className={styles['update-user-title']}>Update User</h3>
      <form className={styles['update-user-form']} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
          className={styles['update-user-input']}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          className={styles['update-user-input']}
        />
        <button type="submit" className={styles['submit-btn']}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;

