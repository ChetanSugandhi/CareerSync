import React from 'react';

const Jobs = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Jobs & Internships</h2>

      {/* Filter */}
      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded">
          <option>All</option>
          <option>Internships</option>
          <option>Full-time</option>
        </select>
        <input type="text" className="border p-2 rounded w-full" placeholder="Search jobs..." />
      </div>

      {/* Job Card */}
      <div className="bg-white border p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold">Frontend Developer Intern</h3>
        <p className="text-sm text-gray-600">ABC Corp · Remote</p>
        <p className="text-sm mt-2">Stipend: ₹10,000/month | Duration: 3 months</p>
        <div className="mt-3 flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
          <button className="border px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
