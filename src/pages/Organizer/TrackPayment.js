import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrackPayment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        // Get the organizer's name from sessionStorage
        const organizerName = sessionStorage.getItem('name');

        // Make the API request
        const response = await axios.get(`http://localhost:8090/payment/name/organizer/${organizerName}`);
        setPaymentData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen bg-gray-200"><span className="text-lg text-gray-700">Loading...</span></div>;
  if (error) return <div className="flex justify-center items-center h-screen bg-gray-200"><span className="text-lg text-red-600">Error: {error}</span></div>;

  if (!paymentData || paymentData.length === 0) return <div className="flex justify-center items-center h-screen"><span className="text-2xl text-red-700">No payment data found.</span></div>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Payment Details</h1>
      <div className="space-y-6">
        {paymentData.map((payment) => (
          <div key={payment.transactionId} className="max-w-max bg-gradient-to-r shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <div className="mb-3">
              <span className="text-xl font-semibold">Payment By :</span > <span  className="text-xl">{payment.booking.name}</span> 
            </div>
            <div className="mb-3">
              <span className="text-xl font-semibold">Amount Received :</span> <span className="text-xl"> ₹{payment.booking.amount.toFixed(2)}</span>
            </div>
            <div className="mb-3">
              <span className="text-xl font-semibold">Payment Date :</span> <span className="text-xl">{new Date(payment.paymentDate).toLocaleString()}</span>
            </div>
            <div className="mb-3">
              <span className="text-xl font-semibold">Payment Method :</span> <span className="text-xl">{payment.paymentMethod}</span> 
            </div>
            <div className="mb-3">
              <span className="text-xl font-semibold">Status :</span> <span className="text-lg text-white font-semibold bg-green-600 px-4 py-1 rounded-3xl">{payment.status}</span> 
            </div>
            <div className="mb-3">
              <span className="text-xl font-semibold">Transaction ID :</span >  <span className="text-xl">{payment.transactionId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackPayment;

