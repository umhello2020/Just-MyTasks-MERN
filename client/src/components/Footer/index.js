import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-content']}>
        {location.pathname !== '/' && (
          <button
            className={styles['back-btn']}
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          Made with{' '}
          <span
            className={styles['footer-emoji']}
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by Olivia and Cole.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;

