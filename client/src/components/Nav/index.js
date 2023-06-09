import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

import Auth from '../../utils/auth';

const Nav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const renderAuthLinks = () => {
    if (Auth.loggedIn()) {
      return (
        <>
          <Link className={styles['nav-link']} to="/donation">
            Donation
          </Link>
          <Link className={styles['nav-link']} to="/me">
            {Auth.getProfile().data.username}'s Profile
          </Link>
          <button className={`${styles['nav-link']} ${styles['nav-logout-btn']}`} onClick={logout}>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link className={styles['nav-link']} to="/login">
            Login
          </Link>
          <Link className={styles['nav-link']} to="/signup">
            Signup
          </Link>
        </>
      );
    }
  };

  return (
    <nav className={styles['nav-header']}>
      <div className={styles['container']}>
        <div className={styles['nav-logo']}>
          <Link className={styles['nav-link']} to="/">
            <h1 className={styles['nav-title']}>Just MyTasks</h1>
          </Link>
        </div>
        <div className={styles['nav-links']}>
          {renderAuthLinks()}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

