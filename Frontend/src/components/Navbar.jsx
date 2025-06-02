import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#0a192f] shadow-md sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-[#00f6ff] tracking-wide">
          ZIDIO<span className="text-white">Connect</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-[#00f6ff] transition">Home</Link>
          <Link to="/recruiter-dashboard" className="hover:text-[#00f6ff] transition">Dashboard</Link>
          <Link to="/recruiter-postjob" className="hover:text-[#00f6ff] transition">Post Job</Link>
          <Link to="/recruiter-applicants" className="hover:text-[#00f6ff] transition">Applicants</Link>
          <Link to="/recruiter-profile" className="hover:text-[#00f6ff] transition">Profile</Link>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/recruiter-login">
            <button className="px-4 py-2 border border-[#00f6ff] text-[#00f6ff] rounded hover:bg-[#00f6ff] hover:text-black transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/recruiter-register">
            <button className="px-4 py-2 bg-[#00f6ff] text-black rounded hover:bg-cyan-300 transition duration-300">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#00f6ff] text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#0a192f] text-white space-y-2 text-sm">
          <Link to="/" className="block py-2 hover:text-[#00f6ff]">Home</Link>
          <Link to="/recruiter-dashboard" className="block py-2 hover:text-[#00f6ff]">Dashboard</Link>
          <Link to="/recruiter-postjob" className="block py-2 hover:text-[#00f6ff]">Post Job</Link>
          <Link to="/recruiter-applicants" className="block py-2 hover:text-[#00f6ff]">Applicants</Link>
          <Link to="/recruiter-profile" className="block py-2 hover:text-[#00f6ff]">Profile</Link>
          <Link to="/recruiter-login" className="block py-2 text-[#00f6ff] font-medium">Login</Link>
          <Link to="/recruiter-register" className="block py-2 text-center bg-[#00f6ff] text-black rounded hover:bg-cyan-300">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
