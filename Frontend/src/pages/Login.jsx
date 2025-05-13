import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Login to ZIDIO</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">Login</button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
