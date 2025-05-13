// src/components/JobCard.jsx
import React from 'react';

const JobCard = ({ job }) => {
  if (!job) return <div>No job data provided</div>;

  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-indigo-800">{job.title}</h2>
      <p className="text-gray-700">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="mt-2 text-gray-600">{job.description}</p>
      <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard; 
