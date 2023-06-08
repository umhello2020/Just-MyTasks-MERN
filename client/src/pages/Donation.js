import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_DONATION } from '../utils/queries';
import DonationForm from '../components/DonationForm';

const Donation = () => {
  const { donationId } = useParams();

  const { loading, data } = useQuery(GET_DONATION, {
    variables: { _id: donationId },
  });

  const donation = data?.donation || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="donation-page">
      <h2 className="donation-page-title">Donation Details</h2>
      <p className="donation-page-info">Amount: {donation.amount}</p>
      <p className="donation-page-info">User ID: {donation.user._id}</p>
      <p className="donation-page-info">Username: {donation.user.username}</p>
      <p className="donation-page-info">Email: {donation.user.email}</p>

      <h3 className="donation-page-form-title">Donation Form</h3>
      <DonationForm />

    </div>
  );
};

export default Donation;
