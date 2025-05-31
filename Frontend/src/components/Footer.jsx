import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-10 mt-10 relative overflow-hidden">
      {/* Background glowing circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500 opacity-20 animate-pulse mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-600 opacity-25 animate-pulse mix-blend-screen blur-2xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-cyan-400">ZIDIO Connect</h3>
          <p className="text-sm text-gray-300">
            A powerful bridge between students and recruiters. Discover jobs, internships, and insights all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-cyan-400">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-purple-400">Home</a></li>
            <li><a href="/jobs" className="hover:text-purple-400">Jobs</a></li>
            <li><a href="/internships" className="hover:text-purple-400">Internships</a></li>
            <li><a href="/contact" className="hover:text-purple-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-cyan-400">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: support@zidio.com</p>
          <p className="text-sm text-gray-300">Phone: +91 9876543210</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative text-center mt-10 text-sm text-gray-400 z-10">
        &copy; {new Date().getFullYear()} ZIDIO Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
