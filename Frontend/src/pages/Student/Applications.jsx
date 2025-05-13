import React from 'react';

const Applications = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Applied On</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">Backend Intern</td>
            <td className="p-2 border">XYZ Ltd</td>
            <td className="p-2 border text-yellow-600">Under Review</td>
            <td className="p-2 border">May 3, 2025</td>
          </tr>
          <tr>
            <td className="p-2 border">SDE 1</td>
            <td className="p-2 border">TCS</td>
            <td className="p-2 border text-green-600">Selected</td>
            <td className="p-2 border">April 27, 2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
