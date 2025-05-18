import React from 'react';
import { FileText } from 'lucide-react';

const mockApplicants = [
  { id: 1, name: 'Chetan Sugandhi', email: 'chetan@gmail.com', resume: '#' },
  { id: 2, name: 'Rahul Sharma', email: 'rahul@.com', resume: '#' },
];

const Applicants = () => {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applicants</h1>

      <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden p-6 transition-all duration-300">
        <table className="w-full text-left table-auto border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-600 uppercase text-sm tracking-wider">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Resume</th>
            </tr>
          </thead>
          <tbody>
            {mockApplicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="bg-white shadow-md rounded-xl hover:shadow-lg transition duration-200"
              >
                <td className="px-4 py-4 font-medium text-gray-800 rounded-l-xl">{applicant.name}</td>
                <td className="px-4 py-4 text-gray-600">{applicant.email}</td>
                <td className="px-4 py-4 rounded-r-xl">
                  <a
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                  >
                    <FileText size={18} />
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applicants;
