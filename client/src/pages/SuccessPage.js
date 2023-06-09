import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SuccessPage.module.css';

const SuccessPage = () => {
  return (
    <div className={styles.successPage}>
      <h2 className={styles.successTitle}>Payment Successful</h2>
      <p className={styles.successMessage}>Thank you for your donation!</p>
      <Link to="/" className={styles.successLink}>Go back to home page</Link>
    </div>
  );
};

export default SuccessPage;

