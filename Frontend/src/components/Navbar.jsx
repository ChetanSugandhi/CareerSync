import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          ZIDIO<span className="text-indigo-500">Connect</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 font-medium">Jobs</Link>
          <Link to="/internships" className="text-gray-700 hover:text-indigo-600 font-medium">Internships</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
