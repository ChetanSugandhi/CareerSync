import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome Back, Student!</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">Jobs Applied: 12</div>
        <div className="bg-green-100 p-4 rounded shadow">Applications Approved: 4</div>
        <div className="bg-yellow-100 p-4 rounded shadow">Pending Interviews: 2</div>
        <div className="bg-red-100 p-4 rounded shadow">Jobs Saved: 6</div>
      </div>

      {/* Group Activities */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Student Groups</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>AI & ML Enthusiasts</li>
          <li>Web Developers Guild</li>
          <li>Placement Training Group</li>
        </ul>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Latest Announcements</h3>
        <ul className="space-y-2">
          <li className="bg-gray-100 p-2 rounded">📢 Resume Workshop on May 15th</li>
          <li className="bg-gray-100 p-2 rounded">📝 Internship results out!</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
