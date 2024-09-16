import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import StallSelectionModal from './StallSelectionModal'; // Import the StallSelectionModal component

const StallBookingForm = ({ onClose, rentPerStall, eventName, organizerName, totalStall, availableStall, stallId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberOfStalls, setNumberOfStalls] = useState(0);
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('Pending');
  const [showStallModal, setShowStallModal] = useState(false);
  const [selectedStalls, setSelectedStalls] = useState([]);

  const bookingDate = new Date().toLocaleDateString();
  const navigate = useNavigate();

  useEffect(() => {
    setName(sessionStorage.getItem('name') || '');
    setEmail(sessionStorage.getItem('Email') || '');
    setPhoneNumber(sessionStorage.getItem('PhoneNumber') || '');
  }, []);

  useEffect(() => {
    setAmount(numberOfStalls * rentPerStall);
  }, [numberOfStalls, rentPerStall]);

  const handleStallSelection = (stalls) => {
    setSelectedStalls(stalls);
    setNumberOfStalls(stalls.length);
    setShowStallModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (numberOfStalls > availableStall) {
      Swal.fire({
        title: 'Error!',
        text: `You cannot book more than ${availableStall} stalls. Available stalls are not enough.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const bookingData = {
      name,
      email,
      phoneNumber,
      numberOfStalls,
      amount,
      eventName,
      organizerName,
      bookingDate,
      status,
      selectedStalls,
      stallId // Include stallId in the booking data
    };

    try {
      const response = await axios.post('http://localhost:8090/booking', bookingData);

      Swal.fire({
        title: 'Success!',
        text: 'Request has been sent successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/booking-details');
        }
      });

      onClose();
    } catch (error) {
      console.error('Error submitting the form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your request.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-lg w-1/3">
      <h2 className="text-2xl font-semibold mb-4">Stall Booking Form</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Event Name</label>
        <p className="text-gray-900 text-xl">{eventName} (Organized by: {organizerName})</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Booking Date</label>
        <p className="text-gray-900 text-xl">{bookingDate}</p>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-full p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-full p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 rounded-full p-2 w-full"
        />
      </div>

      <div className="mb-4 flex items-center">
        <div className="flex-1">
          <label htmlFor="numberOfStalls" className="block text-gray-700 mb-2">How Many Stalls You Need</label>
          <input
            id="numberOfStalls"
            type="number"
            value={numberOfStalls}
            onChange={(e) => setNumberOfStalls(Number(e.target.value))}
            className="border border-gray-300 rounded-full p-2 w-full"
            min="0"
            readOnly
          />
        </div>
        <button
          type="button"
          onClick={() => setShowStallModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full ml-4 mt-6"
        >
          Select Stall
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
        <input
          id="amount"
          type="text"
          value={`₹${amount}`}
          readOnly
          className="border border-gray-300 rounded-full p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <input
          id="status"
          type="hidden"
          value={status}
          readOnly
          className="border border-gray-300 rounded-full p-2 w-full"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          Submit
        </button>
      </div>

      {/* Modal for Stall Selection */}
      {showStallModal && (
        <StallSelectionModal
          totalStall={totalStall}
          availableStall={availableStall}
          stallId={stallId} // Pass stallId to StallSelectionModal
          onClose={() => setShowStallModal(false)}
          onStallSelect={handleStallSelection}
        />
      )}
    </form>
  );
};

export default StallBookingForm;

