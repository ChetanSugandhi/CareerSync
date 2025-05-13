import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between p-10 lg:p-20">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-indigo-800">
            Welcome to <span className="text-indigo-600">ZIDIO Connect</span>
          </h1>
          <p className="text-lg text-gray-700">
            Smart platform to connect students with recruiters, internships, and job opportunities.
          </p>
          <div className="flex gap-4 mt-4">
            <Link to="/register">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="px-6 py-3 bg-white border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-100 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img src="/assets/landing-hero.svg" alt="Hero" className="w-full" />
        </div>
      </section>
    </div>
  );
};

export default Landing;
