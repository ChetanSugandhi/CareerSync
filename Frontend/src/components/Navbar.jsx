import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<nav className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow sticky top-0 z-50 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    {/* Logo */}
    <Link to="/" className="text-2xl font-bold text-cyan-400">
      ZIDIO<span className="text-purple-400">Connect</span>
    </Link>

    {/* Desktop Menu */}
    <div className="hidden md:flex space-x-6 items-center">
      <Link to="/" className="hover:text-cyan-400 font-medium">Home</Link>
      <Link to="/jobs" className="hover:text-cyan-400 font-medium">Jobs</Link>
      <Link to="/internships" className="hover:text-cyan-400 font-medium">Internships</Link>
      <Link to="/contact" className="hover:text-cyan-400 font-medium">Contact</Link>

      {/* Student Dropdown */}
      <div className="relative group">
        <button className="hover:text-cyan-400 font-medium focus:outline-none">
          Student
        </button>
        <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-cyan-500/30 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-700">Dashboard</Link>
          <Link to="/applications" className="block px-4 py-2 text-sm hover:bg-gray-700">Applications</Link>
          <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-700">Profile</Link>
          <Link to="/history" className="block px-4 py-2 text-sm hover:bg-gray-700">History</Link>
        </div>
      </div>
    </div>

    {/* Auth Buttons */}
    <div className="hidden md:flex space-x-4">
      <Link to="/login">
        <button className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-black transition duration-300">
          Login
        </button>
      </Link>
      <Link to="/register">
        <button className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition duration-300">
          Register
        </button>
      </Link>
    </div>

    {/* Mobile Toggle Button */}
    <div className="md:hidden">
      <button onClick={toggleMenu} className="text-cyan-400 text-2xl">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden px-4 pb-4 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Link to="/" className="block py-2 hover:text-cyan-400">Home</Link>
      <Link to="/jobs" className="block py-2 hover:text-cyan-400">Jobs</Link>
      <Link to="/internships" className="block py-2 hover:text-cyan-400">Internships</Link>
      <Link to="/contact" className="block py-2 hover:text-cyan-400">Contact</Link>
      <Link to="/dashboard" className="block py-2 hover:text-cyan-400">Dashboard</Link>
      <Link to="/applications" className="block py-2 hover:text-cyan-400">Applications</Link>
      <Link to="/profile" className="block py-2 hover:text-cyan-400">Profile</Link>
      <Link to="/history" className="block py-2 hover:text-cyan-400">History</Link>
      <Link to="/login" className="block py-2 text-cyan-400 font-medium">Login</Link>
      <Link to="/register" className="block py-2 text-center bg-cyan-500 text-white rounded mt-2 hover:bg-cyan-600">
        Register
      </Link>
    </div>
  )}
</nav>

  );
};

export default Navbar;
