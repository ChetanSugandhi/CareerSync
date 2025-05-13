import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2">ZIDIO Connect</h3>
          <p className="text-sm text-gray-300">
            A powerful bridge between students and recruiters. Discover jobs, internships, and insights all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-300">Home</a></li>
            <li><a href="/jobs" className="hover:text-indigo-300">Jobs</a></li>
            <li><a href="/internships" className="hover:text-indigo-300">Internships</a></li>
            <li><a href="/contact" className="hover:text-indigo-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-300">Email: support@zidio.com</p>
          <p className="text-sm text-gray-300">Phone: +91 9876543210</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} ZIDIO Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
