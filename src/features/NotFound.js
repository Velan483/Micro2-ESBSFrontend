import React from 'react';
import PageNotFound from '../assets/404.png'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-center">
      <img 
        src={PageNotFound} 
        alt="404 Not Found" 
        className="w-full max-w-md mb-6"
      />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
       to="/" 
        className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
