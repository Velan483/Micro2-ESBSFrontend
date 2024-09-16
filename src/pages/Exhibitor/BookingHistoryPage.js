import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faPhone, faTrash, faBox, faDollarSign, faCalendarDay, faCheckCircle, faTimesCircle, faTicket, faCheck } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const BookingHistoryPage = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const name = sessionStorage.getItem('name');
        const response = await axios.get(`http://localhost:8090/payment/name/${name}`);
        setBookingData(response.data);
      } catch (err) {
        setError('Failed to fetch booking data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  const handleDelete = (paymentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8090/payment/${paymentId}`)
          .then(() => {
            Swal.fire(
              'Cancelled!',
              'The booking has been cancelled.',
              'success'
            );
            setBookingData(bookingData.filter(booking => booking.booking.paymentId !== paymentId));
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              'There was an error cancelling the booking.',
              'error'
            );
            console.log(err);
          });
      }
    });
  };

  if (loading) return <div className="text-center text-gray-700 text-2xl py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 text-2xl py-10">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-full mb-10 py-10 ">
      <div className="container mx-auto px-4 md:px-8 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Booking History</h1>

        {bookingData.length === 0 ? (
          <div className="text-center text-gray-600 text-xl mb-52">No booking history found.</div>
        ) : (
          <div className="space-y-6">
            {bookingData.map((booking, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center mb-6">
                  <div className="flex-1 mb-4 md:mb-0">
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" /><strong>Event:</strong> {booking.booking.eventName}</p>
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faUser} className="mr-2 text-green-500" /><strong>Name:</strong> {booking.booking.name}</p>
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faUser} className="mr-2 text-orange-500" /><strong>Email:</strong> {booking.booking.email}</p>
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faPhone} className="mr-2 text-red-500" /><strong>Phone:</strong> {booking.booking.phoneNumber}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faBox} className="mr-2 text-purple-500" /><strong>Booked Stalls:</strong> {booking.booking.numberOfStalls}</p>
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faDollarSign} className="mr-2 text-yellow-500" /><strong>Amount Paid:</strong> ₹{booking.booking.amount.toFixed(2)}</p>
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faCalendarDay} className="mr-2 text-teal-500" /><strong>Booking Date:</strong> {booking.booking.bookingDate}</p>
                    <p className="text-lg text-gray-800 mb-1"><FontAwesomeIcon icon={faCheck} className="mr-2 text-white bg-green-500 p-1 rounded-full text-xs font-extrabold " /><strong>Payment Status:</strong> <span className='bg-green-500 px-3 py-1 rounded-full text-white font-semibold text-sm '>{booking.status}</span></p>
                  </div>
                </div>
                <div className="flex justify-center border-t border-gray-200 pt-4">
                  <button 
                    onClick={() => handleDelete(booking.paymentId)} 
                    className="flex items-center text-red-600 hover:bg-red-600 hover:text-white font-semibold py-2 px-4 border border-red-600 rounded-full transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;
