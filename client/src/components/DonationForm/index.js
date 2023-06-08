import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DONATION } from '../../utils/mutations';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './DonationForm.css';

const stripePromise = loadStripe('pk_test_51NGbpyFI0y2ABPrPARBz7vhNTai1DgUY1wxtEYqyuDW2FvOPY7Y5tOT3N1wuiFuQW4W0o7QTvyU8qR2pU0hGEoyA00pYv6wdj6');

const DonationFormWithStripe = () => {
  const [formState, setFormState] = useState({
    amount: '',
  });

  const [createDonation] = useMutation(CREATE_DONATION);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { amount } = formState;
    const response = await createDonation({
      variables: {
        amount: parseFloat(amount),
      },
    });

    const { data } = response;
    const donationId = data.createDonation._id;

    const stripe = await stripePromise;
    const session = await createStripeSession(amount, donationId); // Create a Stripe session

    await stripe.redirectToCheckout({
      sessionId: session.id,
      successUrl: 'http://localhost:3001/success', // Specify your success URL here
      cancelUrl: 'http://localhost:3001/cancel', // Specify your cancel URL here
    }).then((result) => {
      if (result.error) {
        // Handle any errors that occur during the redirect to Stripe checkout
        console.error(result.error.message);
      }
    });
  };

  const createStripeSession = async (amount, donationId) => {
    const response = await fetch('http://localhost:3001/create-stripe-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        donationId,
      }),
    });

    const session = await response.json();
    return session;
  };

  return (
    <div className="donation-form">
      <h3 className="donation-form-title">Donation Form</h3>
      <form className="donation-form-form" onSubmit={handleFormSubmit}>
        <input
          className="donation-form-input"
          type="text"
          name="amount"
          placeholder="Donation Amount"
          value={formState.amount}
          onChange={handleChange}
        />
        <button className="submit-btn" type="submit">Donate</button>
      </form>
    </div>
  );
};

const DonationForm = () => (
  <Elements stripe={stripePromise}>
    <DonationFormWithStripe />
  </Elements>
);

export default DonationForm;
