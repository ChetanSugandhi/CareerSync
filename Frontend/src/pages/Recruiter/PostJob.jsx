import React, { useState } from 'react';
import { Briefcase, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: '',
    type: 'Full-time',
    location: '',
    description: '',
    salary: '',
    remote: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobData.title || !jobData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setSuccessMsg('');

    try {
      await new Promise((r) => setTimeout(r, 1500)); // simulate delay
      console.log('Job posted:', jobData);
      setSuccessMsg('Job posted successfully!');
      setJobData({
        title: '',
        type: 'Full-time',
        location: '',
        description: '',
        salary: '',
        remote: false,
      });
    } catch {
      alert('Failed to post job. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-slate-100 via-white to-slate-100 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-2xl flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-800 hover:bg-black hover:text-white transition font-medium shadow"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Briefcase className="text-blue-600" />
          Post a New Job
        </h1>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md text-center font-medium">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="title">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              aria-describedby="titleHelp"
            />
            <p id="titleHelp" className="text-sm text-gray-500 mt-1">
              Enter a clear and concise job title
            </p>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="type">
              Job Type
            </label>
            <select
              id="type"
              name="type"
              value={jobData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-grow">
              <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="e.g. Remote / Jaipur"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={jobData.remote}
              />
            </div>

            <div className="flex items-center gap-2 mt-6">
              <input
                id="remote"
                type="checkbox"
                name="remote"
                checked={jobData.remote}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remote" className="text-gray-700 select-none">
                Remote
              </label>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="salary">
              Salary (Optional)
            </label>
            <input
              id="salary"
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="e.g. ₹50,000 - ₹70,000 per month"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1" htmlFor="description">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Write a detailed description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              aria-describedby="descHelp"
            />
            <p id="descHelp" className="text-sm text-gray-500 mt-1">
              Include responsibilities, qualifications, and benefits
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {submitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              <Send size={18} />
            )}
            {submitting ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
