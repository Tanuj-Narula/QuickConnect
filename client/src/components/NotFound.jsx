import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <img
        src="https://cdn-icons-png.flaticon.com/512/9006/9006569.png"
        alt="404 Not Found"
        className="w-2xs mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <NavLink
        to="/"
        className="px-6 py-3 mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
      >
        Go to Homepage
      </NavLink>
      <NavLink
        to="/login"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
      >
        Go to Login
      </NavLink>
    </div>
  );
}

export default NotFound;
