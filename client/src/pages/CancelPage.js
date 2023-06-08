import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div>
      <h2>Payment Cancelled</h2>
      <p>Your donation was cancelled.</p>
      <Link to="/">Go back to home page</Link>
    </div>
  );
};

export default CancelPage;
