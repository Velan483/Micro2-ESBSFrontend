import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 animate-slideRight">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">About Us</h1>
        <p className="text-lg text-gray-700 mb-4 text-justify">
          Welcome to <span className="font-bold text-blue-600">My Stall Booking</span>, your go-to platform for effortlessly connecting exhibition organizers with stall buyers!
        </p>
        <p className="text-lg text-gray-700 mb-8 text-justify">
          We are revolutionizing the stall space marketplace. Whether you’re an organizer looking to fill up your exhibition or a buyer searching for the perfect spot, our platform streamlines the entire process, making it easier and more efficient for everyone involved.
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-2xl hover:border-blue-500 duration-300 ease-in-out">
            <img src="https://5.imimg.com/data5/SELLER/Default/2021/8/RH/PD/EG/5844513/exhibition-organisers-500x500.jpg" alt="Exhibition Organizer" className="w-full md:w-1/3 h-auto rounded-lg mb-4 md:mb-0 md:mr-4" />
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Exhibition Organizers</h3>
              <p className="text-gray-600">
                Our platform simplifies the management and sale of stall space. Easily reach a wide audience, showcase your stalls, and fill your exhibition space with efficiency and ease.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-2xl hover:border-blue-500 duration-300 ease-in-out">
            <img src="https://www.triumfo.in/wp-content/uploads/2020/01/b.jpg" alt="Stall Buyer" className="w-full md:w-1/3 h-auto rounded-lg mb-4 md:mb-0 md:mr-4" />
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Stall Buyers</h3>
              <p className="text-gray-600">
                Discover and explore various exhibition events and available stall spaces. We encourage you to verify details with the organizer before confirming your booking to ensure everything aligns with your needs.
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-2xl hover:border-blue-500 duration-300 ease-in-out">
            <img src="https://www.wateraid.org/in/sites/g/files/jkxoof336/files/styles/event_landscape_3x2/public/the-wash-photo-project-exhibition-.jpg" alt="Event Overview" className="w-full md:w-1/3 h-auto rounded-lg mb-4 md:mb-0 md:mr-4" />
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Organizers</h3>
              <p className="text-gray-600">
                List your available stalls, reach a broad audience of potential buyers, and manage your event space effortlessly.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center p-4 bg-white shadow-lg rounded-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-2xl hover:border-blue-500 duration-300 ease-in-out">
            <img src="https://t4.ftcdn.net/jpg/03/64/84/17/360_F_364841766_qc35nrh5wUCWEsBQTxQmqleNQX8C5W2m.jpg" alt="Event Overview" className="w-full md:w-1/3 h-auto rounded-lg mb-4 md:mb-0 md:mr-4" />
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">For Buyers</h3>
              <p className="text-gray-600">
                Browse and explore available stall spaces, confirm details with organizers, and secure your spot before making any payment.
              </p>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-700 text-justify mb-6">
          If you encounter any issues or have concerns, please reach out before the event concludes. Our team is dedicated to ensuring smooth communication and a seamless experience for all users.
        </p>
        <p className="text-lg text-gray-700 text-justify mb-6">
          <span className="font-bold text-blue-600">My Stall Booking</span> is committed to enhancing the event management process by bridging the gap between organizers and buyers. We provide a reliable platform for event information and successful transactions.
        </p>
        <p className="text-lg text-gray-700 text-justify">
          Thank you for choosing My Stall Booking. We’re excited to assist you with your exhibition space needs!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
