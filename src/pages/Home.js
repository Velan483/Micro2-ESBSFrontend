import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUserTie,
  FaClipboardList,
  FaCreditCard,
  FaMap,
  FaRegUser,
} from "react-icons/fa";
import BgVedio from "../assets/bg vedio.mp4";
import AllExhibitionRecords from "./Exhibitor/AllExhibitionRecords";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen animate-slideRight">
      
      {/* Hero Section */}
      {/* <section className="relative text-white text-center py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src={BgVedio} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 opacity-40"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Welcome to My Stall Booking
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Streamline your stall bookings and manage exhibitions with ease.
            Join us and elevate your events to the next level!
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition ease-in-out duration-300"
          >
            Get Started
          </Link>
        </div>
      </section> */}

<section className="relative text-white text-center py-20 overflow-hidden bg-gradient-to-r from-blue-900 via-blue-600 to-teal-500">
  <div className="absolute inset-0 overflow-hidden">
    <video className="w-full h-full object-cover" autoPlay muted loop>
      <source src={BgVedio} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30"></div>
  </div>
  <div className="relative z-10 container mx-auto px-6 md:px-12 py-12">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
      Welcome to My Stall Booking
    </h1>
    <p className="text-lg md:text-2xl mb-8 font-light">
      Streamline your stall bookings and manage exhibitions with ease. Join us and elevate your events to the next level!
    </p>
    <Link
      to="/register"
      className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition ease-in-out duration-300"
    >
      Get Started
    </Link>
  </div>
</section>
<div className="p-4">
      <AllExhibitionRecords/>
    </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 text-center">
              <FaMap className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">
                Floor Plan Visualization
              </h3>
              <p>
                View and select available stalls with our interactive floor
                plan.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 text-center">
              <FaCalendarAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">
                Real-time Availability
              </h3>
              <p>
                Check stall availability in real-time to ensure you get the best
                spot.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 text-center">
              <FaCreditCard className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Secure Payment</h3>
              <p>
                Easy and secure payment methods for a smooth booking experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 text-center">
              <FaRegUser className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">User Profiles</h3>
              <p>Manage your profile, bookings, and history with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12">
            How It Works
          </h2>
          <div className="flex flex-col lg:flex-row lg:justify-center gap-8">
            {/* Card 1: For Organizers */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 h-full flex flex-col items-center">
                <FaUserTie className="text-blue-600 text-5xl mb-4" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-center">
                    For Organizers
                  </h3>
                  <p className="mb-4 text-center">
                    Efficiently manage exhibitions by setting up events,
                    defining stall configurations, and overseeing bookings.
                  </p>
                  <div className="w-full">
                    <ul className="list-disc pl-5 text-sm  mx-auto max-w-xs">
                      <li className="mb-2">Register and create events</li>
                      <li className="mb-2">Manage stalls and locations</li>
                      <li className="mb-2">Track bookings and payments</li>
                      <li className="mb-2">Send notifications and updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 2: For Exhibitors */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 h-full flex flex-col items-center">
                <FaClipboardList className="text-blue-600 text-5xl mb-4" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-center">
                    For Exhibitors
                  </h3>
                  <p className="mb-4 text-center">
                    Browse available stalls, book your preferred space, and
                    manage your bookings seamlessly.
                  </p>
                  <div className="w-full">
                    <ul className="list-disc pl-5 text-sm mx-auto max-w-xs">
                      <li className="mb-2">Register and create an account</li>
                      <li className="mb-2">
                        Explore stall options and availability
                      </li>
                      <li className="mb-2">
                        Complete your booking and make payments
                      </li>
                      <li className="mb-2">
                        Manage and review your booking history
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
