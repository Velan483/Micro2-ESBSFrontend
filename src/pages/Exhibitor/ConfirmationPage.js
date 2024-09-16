// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { QRCodeSVG } from 'qrcode.react';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import PaymentDocument from './PaymentDocument';
// const ConfirmationPage = () => {
//   const [paymentData, setPaymentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPaymentData = async () => {
//       try {
//         const name = sessionStorage.getItem('name'); 
//         const email = sessionStorage.getItem('Email'); 
//         if (!name || !email) throw new Error('Name or email not found in session storage');
        
//         const response = await axios.get(`http://localhost:8090/payment/name/${name}`);
//         if (response.data.length > 0) {
         
//           const payment = response.data[0];
//           setPaymentData(payment);
          
//           sendEmail(email, payment);
//         } else {
//           throw new Error('No payment data found');
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

    
//     const sendEmail = async (email, payment) => {
//       try {
//           const subject = `Stall Booking Confirmation - ${payment.booking.eventName}`;
//           const body = `
//               <html>
//               <body style="font-family: Arial, sans-serif; color: #333;">
//                   <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
//                       <h2 style="color: #007bff;">Stall Booking Confirmation</h2>
//                       <p>Dear ${payment.booking.name},</p>
                      
//                       <p>Thank you for booking a stall at <strong>${payment.booking.eventName}</strong>. We are excited to have you with us! Below are the details of your booking:</p>
                      
//                       <h3 style="color: #333;">Booking Details:</h3>
//                       <ul style="line-height: 1.6;">
//                           <li><strong>Event Name:</strong> ${payment.booking.eventName}</li>
//                           <li><strong>Name:</strong> ${payment.booking.name}</li>
//                           <li><strong>Number of Stalls Booked:</strong> ${payment.booking.numberOfStalls}</li>
//                           <li><strong>Price:</strong> ${payment.booking.amount}</li>
//                       </ul>
                      
//                       <h3 style="color: #333;">Payment Details:</h3>
//                       <ul style="line-height: 1.6;">
//                           <li><strong>Total Amount Paid:</strong> ${payment.booking.amount}</li>
//                           <li><strong>Payment Method:</strong> ${payment.paymentMethod}</li>
//                           <li><strong>Date:</strong> ${new Date(payment.paymentDate).toLocaleDateString()}</li>
//                           <li><strong>Transaction ID:</strong> ${payment.transactionId}</li>
//                       </ul>
                      
//                       <p>If you have any questions or need further assistance, please feel free to contact us at <a href="mailto:cvelanias@gmail.com">cvelanias@gmail.com</a> or <a href="tel:9876543210">9876543210</a>.</p>
                      
//                       <p>We look forward to seeing you at the event!</p>
                      
//                       <p style="font-weight: bold;">Best Regards,<br>The ${payment.booking.eventName} Team</p>
//                   </div>
//               </body>
//               </html>
//           `;
  
//           await axios.post('http://localhost:8090/payment/send', {
//               from: 'noreply@yourdomain.com',
//               to: email,
//               subject: subject,
//               body: body
//           }, {
//               headers: {
//                   'Content-Type': 'application/json'
//               }
//           });
  
//       } catch (err) {
//           console.error('Error sending email:', err);
//       }
//   };
  
    

//     fetchPaymentData();
//   }, []);

//   if (loading) return <div className="text-center text-gray-500">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">Error: {error}</div>;

//   if (!paymentData) return <div className="text-center text-gray-500">No payment data available</div>;

//   // Construct QR code content with better structure
//   const qrContent = ` 
//     Booking Details:
//     Event Name: ${paymentData.booking.eventName}
//     Name: ${paymentData.booking.name}
//     Booked Stalls: ${paymentData.booking.numberOfStalls}
//     Amount Paid: ${paymentData.booking.amount}

//     Payment Details:
//     Payment Method: ${paymentData.paymentMethod}
//     Payment Date: ${new Date(paymentData.paymentDate).toLocaleDateString()}
//     Transaction ID: ${paymentData.transactionId}
//     Payment Status: ${paymentData.status}
//   `;

//   return (
//     <div className="text-center p-6 m-20">
//       <h1 className="text-3xl font-bold text-green-500">Payment Successful</h1>
//       <p className="text-lg text-gray-700 mt-2">Your payment has been processed successfully.</p>
//       <div className="flex justify-center mt-8">
//         <QRCodeSVG value={qrContent} size={200} />
//       </div>
//       {paymentData && (
//         <div className="mt-6">
//           <PDFDownloadLink
//             document={<PaymentDocument paymentData={paymentData} />}
//             fileName="payment-details.pdf"
//           >
//             {({ loading }) => (
//               <button
//                 className={`px-4 py-2 font-bold text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-800 rounded-full'}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Loading document...' : 'Download PDF'}
//               </button>
//             )}
//           </PDFDownloadLink>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConfirmationPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentDocument from './PaymentDocument'; // Import the PaymentDocument component

const ConfirmationPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const name = sessionStorage.getItem('name'); // Fetch name from session storage
        const email = sessionStorage.getItem('Email'); // Fetch email from session storage
        if (!name || !email) throw new Error('Name or email not found in session storage');
        
        const response = await axios.get(`http://localhost:8090/payment/name/${name}`);
        if (response.data.length > 0) {
          // Assuming the first payment record is relevant
          const payment = response.data[0];
          setPaymentData(payment);
          
          // Call function to send email
          sendEmail(email, payment);

          // Fetch stall data and update availability
          await updateStallAvailability(payment.booking.eventName, payment.booking.numberOfStalls);
        } else {
          throw new Error('No payment data found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const sendEmail = async (email, payment) => {
      try {
        const subject = `Stall Booking Confirmation - ${payment.booking.eventName}`;
        const body = `
          <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                  <h2 style="color: #007bff;">Stall Booking Confirmation</h2>
                  <p>Dear ${payment.booking.name},</p>
                  
                  <p>Thank you for booking a stall at <strong>${payment.booking.eventName}</strong>. We are excited to have you with us! Below are the details of your booking:</p>
                  
                  <h3 style="color: #333;">Booking Details:</h3>
                  <ul style="line-height: 1.6;">
                      <li><strong>Event Name:</strong> ${payment.booking.eventName}</li>
                      <li><strong>Name:</strong> ${payment.booking.name}</li>
                      <li><strong>Number of Stalls Booked:</strong> ${payment.booking.numberOfStalls}</li>
                      <li><strong>Price:</strong> ${payment.booking.amount}</li>
                  </ul>
                  
                  <h3 style="color: #333;">Payment Details:</h3>
                  <ul style="line-height: 1.6;">
                      <li><strong>Total Amount Paid:</strong> ${payment.booking.amount}</li>
                      <li><strong>Payment Method:</strong> ${payment.paymentMethod}</li>
                      <li><strong>Date:</strong> ${new Date(payment.paymentDate).toLocaleDateString()}</li>
                      <li><strong>Transaction ID:</strong> ${payment.transactionId}</li>
                  </ul>
                  
                  <p>If you have any questions or need further assistance, please feel free to contact us at <a href="mailto:cvelanias@gmail.com">cvelanias@gmail.com</a> or <a href="tel:9876543210">9876543210</a>.</p>
                  
                  <p>We look forward to seeing you at the event!</p>
                  
                  <p style="font-weight: bold;">Best Regards,<br>The ${payment.booking.eventName} Team</p>
              </div>
          </body>
          </html>
        `;

        await axios.post('http://localhost:8090/payment/send', {
          from: 'noreply@yourdomain.com',
          to: email,
          subject: subject,
          body: body
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

      } catch (err) {
        console.error('Error sending email:', err);
      }
    };

    const updateStallAvailability = async (eventName, bookedStalls) => {
      try {
        // Fetch stall data based on eventName
        const stallResponse = await axios.get(`http://localhost:8090/stall/eventName/${eventName}`);
        const stall = stallResponse.data; // Since it's a single object, not an array

        if (stall) {
          const updatedAvailableStall = stall.availableStall - bookedStalls;

          // Update stall availability using PATCH request
          await axios.patch(`http://localhost:8090/stall`, null, {
            params: {
              stallId: stall.stallId,
              availableStall: updatedAvailableStall
            }
          });

        } else {
          throw new Error('No stall data found');
        }
      } catch (err) {
        console.error('Error updating stall availability:', err);
      }
    };

    fetchPaymentData();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  if (!paymentData) return <div className="text-center text-gray-500">No payment data available</div>;

  // Construct QR code content with better structure
  const qrContent = ` 
    Booking Details:
    Event Name: ${paymentData.booking.eventName}
    Name: ${paymentData.booking.name}
    Booked Stalls: ${paymentData.booking.numberOfStalls}
    Amount Paid: ${paymentData.booking.amount}

    Payment Details:
    Payment Method: ${paymentData.paymentMethod}
    Payment Date: ${new Date(paymentData.paymentDate).toLocaleDateString()}
    Transaction ID: ${paymentData.transactionId}
    Payment Status: ${paymentData.status}
  `;

  return (
    <div className="text-center p-6 m-20">
      <h1 className="text-3xl font-bold text-green-500">Payment Successful</h1>
      <p className="text-lg text-gray-700 mt-2">Your payment has been processed successfully.</p>
      <div className="flex justify-center mt-8">
        <QRCodeSVG value={qrContent} size={200} />
      </div>
      {paymentData && (
        <div className="mt-6">
          <PDFDownloadLink
            document={<PaymentDocument paymentData={paymentData} />}
            fileName="payment-details.pdf"
          >
            {({ loading }) => (
              <button
                className={`px-4 py-2 font-bold text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-800 rounded-full'}`}
                disabled={loading}
              >
                {loading ? 'Loading document...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
