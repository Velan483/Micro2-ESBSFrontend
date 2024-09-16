import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState({}); // Track disabled buttons

  const name = sessionStorage.getItem('name'); // Get the name from sessionStorage

  useEffect(() => {
    // Fetch booking details based on the name from sessionStorage
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/booking/name/${encodeURIComponent(name)}`);
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [name]);

  const handleUpdate = async (bookingId, updatedBooking) => {
    try {
      await axios.put('http://localhost:8090/booking', updatedBooking);
    } catch (err) {
      console.error('Failed to update booking:', err);
      setError('Failed to update booking.');
    }
  };

  const handleAccept = async (bookingId) => {
    const updatedBooking = bookings.find(b => b.id === bookingId);
    if (updatedBooking) {
      // Optimistically update the UI
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'Accepted' } : booking
        )
      );

      try {
        await handleUpdate(bookingId, { ...updatedBooking, status: 'Accepted' });
        setDisabledButtons(prevState => ({ ...prevState, [bookingId]: 'accept' }));
      } catch {
        // Revert the UI if the update failed
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: 'Pending' } : booking
          )
        );
      }
    }
  };

  const handleReject = async (bookingId) => {
    const updatedBooking = bookings.find(b => b.id === bookingId);
    if (updatedBooking) {
      // Optimistically update the UI
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'Rejected' } : booking
        )
      );

      try {
        await handleUpdate(bookingId, { ...updatedBooking, status: 'Rejected' });
        setDisabledButtons(prevState => ({ ...prevState, [bookingId]: 'reject' }));
      } catch {
        // Revert the UI if the update failed
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: 'Pending' } : booking
          )
        );
      }
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  // Check if there are any rejected bookings
  const hasRejected = bookings.some(booking => booking.status === 'Rejected');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Booking Details</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 border-b border-gray-300">
            <th className="py-3 px-4 text-left text-gray-700">Event Name</th>
            <th className="py-3 px-4 text-left text-gray-700">Name</th>
            <th className="py-3 px-4 text-left text-gray-700">Email</th>
            <th className="py-3 px-4 text-left text-gray-700">Phone Number</th>
            <th className="py-3 px-4 text-left text-gray-700">Number of Stalls</th>
            <th className="py-3 px-4 text-left text-gray-700">Amount</th>
            <th className="py-3 px-4 text-left text-gray-700">Status</th>
            <th className="py-3 px-4 text-center text-gray-700">Actions</th> {/* Updated header */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-600">{booking.eventName}</td>
              <td className="py-3 px-4 text-gray-600">{booking.name}</td>
              <td className="py-3 px-4 text-gray-600">{booking.email}</td>
              <td className="py-3 px-4 text-gray-600">{booking.phoneNumber}</td>
              <td className="py-3 px-4 text-gray-600">{booking.numberOfStalls}</td>
              <td className="py-3 px-4 text-gray-600">₹{booking.amount}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${
                    booking.status === 'Accepted'
                      ? 'bg-green-500'
                      : booking.status === 'Rejected'
                      ? 'bg-red-500'
                      : 'bg-yellow-400'
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => handleAccept(booking.id)}
                  disabled={disabledButtons[booking.id] === 'accept' || booking.status !== 'Pending'}
                  className={`px-4 py-2 rounded-full text-white transition-colors ${
                    booking.status === 'Pending'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(booking.id)}
                  disabled={disabledButtons[booking.id] === 'reject' || booking.status !== 'Pending'}
                  className={`ml-2 px-4 py-2 rounded-full text-white transition-colors ${
                    booking.status === 'Pending'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBooking;


