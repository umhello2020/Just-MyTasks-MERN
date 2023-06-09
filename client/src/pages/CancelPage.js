import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CancelPage.module.css';

const CancelPage = () => {
  return (
    <div className={styles['cancel-page']}>
      <h2 className={styles['cancel-page-title']}>Payment Cancelled</h2>
      <p>Your donation was cancelled.</p>
      <Link to="/" className={styles['cancel-page-link']}>
        Go back to home page
      </Link>
    </div>
  );
};

export default CancelPage;

