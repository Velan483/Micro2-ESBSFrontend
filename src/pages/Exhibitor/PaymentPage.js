import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});

  const validateCreditCard = () => {
    const newErrors = {};
    if (!cardHolderName) newErrors.cardHolderName = 'Please enter the card holder name.';
    if (cardNumber.length !== 16) newErrors.cardNumber = 'Card number must be exactly 16 digits.';
    if (!/^\d{2}\/\d{2}$/.test(expireDate)) newErrors.expireDate = 'Enter a valid date in MM/YY format.';
    if (expireDate && new Date(`20${expireDate.split('/')[1]}`, expireDate.split('/')[0]) < new Date()) newErrors.expireDate = 'Card was expired.';
    return newErrors;
  };

  const validateUPI = () => {
    const newErrors = {};
    if (!upiId) newErrors.upiId = 'Please enter the UPI ID.';
    return newErrors;
  };

  const handlePayment = () => {
    const newErrors = {};
    if (paymentMethod === 'Credit Card') {
      Object.assign(newErrors, validateCreditCard());
    } else if (paymentMethod === 'UPI') {
      Object.assign(newErrors, validateUPI());
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!bookingId) {
        console.error('Booking ID is not defined');
        return;
      }

    // Navigate to the appropriate page based on payment method
    if (paymentMethod === 'Credit Card') {
      navigate('/otp', { state: { bookingId} }); // Navigate to OTP page
    } else if (paymentMethod === 'UPI') {
      navigate('/pin', { state: { bookingId} }); // Navigate to PIN number page
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl m-28 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Payment Page</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setPaymentMethod('Credit Card')}
          className={`px-6 py-2 rounded-l-lg ${paymentMethod === 'Credit Card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Credit Card
        </button>
        <button
          onClick={() => setPaymentMethod('UPI')}
          className={`px-6 py-2 rounded-r-lg ${paymentMethod === 'UPI' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          UPI
        </button>
      </div>

      {paymentMethod === 'Credit Card' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block mb-4">
            Card Holder Name:
            <input
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="border px-3 py-2 mt-1 block w-full rounded-md"
            />
            {errors.cardHolderName && <p className="text-red-600 mt-1">{errors.cardHolderName}</p>}
          </label>
          <label className="block mb-4">
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border px-3 py-2 mt-1 block w-full rounded-md"
              maxLength="16"
            />
            {errors.cardNumber && <p className="text-red-600 mt-1">{errors.cardNumber}</p>}
          </label>
          <label className="block mb-4">
            Expiry Date (MM/YY):
            <input
              type="text"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              className="border px-3 py-2 mt-1 block w-full rounded-md"
            />
            {errors.expireDate && <p className="text-red-600 mt-1">{errors.expireDate}</p>}
          </label>
          <label className="block mb-4">
            Amount:
            <input
              type="text"
              value={`₹${amount}`}
              className="border px-3 py-2 mt-1 block w-full rounded-md"
              readOnly
            />
          </label>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Pay Now
          </button>
        </div>
      )}

      {paymentMethod === 'UPI' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block mb-4">
            UPI ID:
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="border px-3 py-2 mt-1 block w-full rounded-md"
            />
            {errors.upiId && <p className="text-red-600 mt-1">{errors.upiId}</p>}
          </label>
          <label className="block mb-4">
            Amount:
            <input
              type="text"
              value={`₹${amount}`}
              className="border px-3 py-2 mt-1 block w-full rounded-md"
              readOnly
            />
          </label>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

