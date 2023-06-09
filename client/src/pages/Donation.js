import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_DONATION } from '../utils/queries';
import DonationForm from '../components/DonationForm';

import styles from './Donation.module.css';

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
    <div className={styles.donationPage}>
      <h2 className={styles.donationPageTitle}>Donation Details</h2>
      <p className={styles.donationPageInfo}>Amount: {donation.amount}</p>
      <p className={styles.donationPageInfo}>User ID: {donation.user._id}</p>
      <p className={styles.donationPageInfo}>Username: {donation.user.username}</p>
      <p className={styles.donationPageInfo}>Email: {donation.user.email}</p>

      <h3 className={styles.donationPageFormTitle}>Donation Form</h3>
      <DonationForm />
    </div>
  );
};

export default Donation;
