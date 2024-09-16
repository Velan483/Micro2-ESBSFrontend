import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // Update path if necessary
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 h-80">
      <div className="container mx-auto px-6">
       
        {/* Call-to-Action Text */}
        <div className="text-center py-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Ready to Get Started?
          </h2>
          <p className="text-md mb-4">
            Join us today and make managing your exhibition stalls easier than
            ever.
          </p>
          <Link
            to="/register"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Sign Up Now
          </Link>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between mb-6">
          {/* Logo and Website Name */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <img
              src={logo}
              alt="My Stall Booking Logo"
              className="h-10 w-auto mb-2"
            />
            <span className="text-lg font-bold font-merienda">
              <span className="text-white">My Stall</span>
              <span className="text-orange-500"> Booking</span>
            </span>
            <p className="mt-1 text-gray-400 text-center md:text-left">
              Connecting organizers with stall buyers effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:flex-row md:justify-center space-x-4 mb-4 mt-8 md:mb-0 mr-44">
            <div className="flex flex-row space-x-4">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/about" className="hover:text-gray-300">
                About Us
              </Link>
              <Link to="/services" className="hover:text-gray-300">
                Services
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-md font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400 mb-1">
              Email:{" "}
              <a
                href="mailto:cvelanias@gmail.com"
                className="hover:text-gray-300"
              >
                cvelanias@gmail.com
              </a>
            </p>
            <p className="text-gray-400">
              Phone:{" "}
              <a href="tel:+7305658333" className="hover:text-gray-300">
                7305658333
              </a>
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-3 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-white"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-400 hover:text-white"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-white"
          >
            <FaInstagram className="text-xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-white"
          >
            <FaLinkedinIn className="text-xl" />
          </a>
        </div>
      </div>
       {/* Copyright */}
      <div className="text-center text-gray-400 text-md bg-black pb-3 ">
          &copy; {new Date().getFullYear()} My Stall Booking. All rights
          reserved.
        </div>
    </footer>
  );
};

export default Footer;
