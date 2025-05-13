import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          ZIDIO<span className="text-indigo-500">Connect</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 font-medium">Jobs</Link>
          <Link to="/internships" className="text-gray-700 hover:text-indigo-600 font-medium">Internships</Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</Link>

          {/* Student Dropdown */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-indigo-600 font-medium focus:outline-none">
              Student
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</Link>
              <Link to="/applications" className="block px-4 py-2 text-sm hover:bg-gray-100">Applications</Link>
              <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
              <Link to="/history" className="block px-4 py-2 text-sm hover:bg-gray-100">History</Link>
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
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

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/jobs" className="block py-2 text-gray-700 hover:text-indigo-600">Jobs</Link>
          <Link to="/internships" className="block py-2 text-gray-700 hover:text-indigo-600">Internships</Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-indigo-600">Contact</Link>
          <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-indigo-600">Dashboard</Link>
          <Link to="/applications" className="block py-2 text-gray-700 hover:text-indigo-600">Applications</Link>
          <Link to="/profile" className="block py-2 text-gray-700 hover:text-indigo-600">Profile</Link>
          <Link to="/history" className="block py-2 text-gray-700 hover:text-indigo-600">History</Link>
          <Link to="/login" className="block py-2 text-indigo-600 font-medium">Login</Link>
          <Link to="/register" className="block py-2 text-white bg-indigo-600 text-center rounded mt-2">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
