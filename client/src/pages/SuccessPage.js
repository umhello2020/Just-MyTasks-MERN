import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.module.css';

const SuccessPage = () => {
  return (
    <div>
      <h2>Payment Successful</h2>
      <p>Thank you for your donation!</p>
      <Link to="/">Go back to home page</Link>
    </div>
  );
};

export default SuccessPage;
