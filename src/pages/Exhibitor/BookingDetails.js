import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    const exhibitorName = sessionStorage.getItem('name');

    if (!exhibitorName) {
      setError('Exhibitor name is not available.');
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/booking/name/exhibitor/${exhibitorName}`);
        console.log('Bookings response:', response.data);  // Debugging
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    // Retrieve payment status from sessionStorage
    const storedPaymentStatus = JSON.parse(sessionStorage.getItem('paymentStatus')) || {};
    setPaymentStatus(storedPaymentStatus);
  }, []);

  const handlePay = (bookingId, amount) => {
    if (!bookingId) {
      console.error('Booking ID is not defined');
      return;
    }

    // Store payment status in sessionStorage
    setPaymentStatus(prevStatus => ({
      ...prevStatus,
      [bookingId]: 'Paid'
    }));
    sessionStorage.setItem('paymentStatus', JSON.stringify({
      ...paymentStatus,
      [bookingId]: 'Paid'
    }));

    // Redirect to payment page
    navigate('/payment', { state: { bookingId, amount } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const hasRejected = bookings.some(booking => booking.status === 'Rejected');

  return (
    <div className="container mx-auto px-4 py-8 mb-52">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Booking Details</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mb-20">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Event Name</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Phone Number</th>
            <th className="py-2 px-4 text-left">Number of Stalls</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId} className="border-b">
              <td className="py-2 px-4">{booking.eventName}</td>
              <td className="py-2 px-4">{booking.name}</td>
              <td className="py-2 px-4">{booking.email}</td>
              <td className="py-2 px-4">{booking.phoneNumber}</td>
              <td className="py-2 px-4">{booking.numberOfStalls}</td>
              <td className="py-2 px-4">₹{booking.amount}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-3 py-1 rounded-full ${
                    booking.status === 'Accepted'
                      ? 'bg-green-500 text-white font-semibold'
                      : booking.status === 'Rejected'
                      ? 'bg-red-500 text-white font-semibold'
                      : 'bg-yellow-300 text-white font-semibold'
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handlePay(booking.bookingId, booking.amount)}
                  disabled={booking.status !== 'Accepted' || paymentStatus[booking.bookingId] === 'Paid'}
                  className={`px-7 py-1 rounded-full text-white ${
                    booking.status === 'Accepted' && paymentStatus[booking.bookingId] !== 'Paid'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {paymentStatus[booking.bookingId] === 'Paid' ? 'Paid' : 'Pay'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasRejected && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
          Unfortunately, your request has been declined by the exhibition organizer. For further clarification or additional details, please contact the exhibition organizer directly.
        </div>
      )}
    </div>
  );
};

export default BookingDetails;


