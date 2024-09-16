import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingOverlay from '../../features/LoadingOverlay';

const OTPPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId} = location.state || {};

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      if (newOtp.every(digit => digit !== '')) {
        setLoading(true);
        setTimeout(() => {
          handlePayment('Credit Card'); // Trigger payment API call and navigation
        }, 5000); // Simulate processing time
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePayment = async (paymentMethod) => {
    try {
        console.log({
            paymentMethod,
            paymentDate: new Date().toISOString(),
            booking: {
              bookingId,
            },
          }); // Log the data being sent
      await axios.post('http://localhost:8090/payment', {
        paymentMethod,
        paymentDate: new Date().toISOString(),
        booking: {
          bookingId,
        },
      });
      navigate('/confirmation');
    } catch (error) {
      console.error('Payment error:', error);
      // Handle error here (e.g., show error message)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-100 rounded-lg shadow-lg relative m-40">
      {loading && <LoadingOverlay />}
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">Enter OTP</h1>
      <div className="flex justify-center mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-24 h-24 border border-gray-300 rounded-lg text-center text-xl font-semibold mx-1"
            maxLength="1"
          />
        ))}
      </div>
    </div>
  );
};

export default OTPPage;

