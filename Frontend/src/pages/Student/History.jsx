import React from 'react';

const History = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Activity History</h2>

      <ul className="space-y-3">
        <li className="bg-gray-100 p-3 rounded">🕓 May 1 — You applied to “UI/UX Designer - ABC Inc.”</li>
        <li className="bg-gray-100 p-3 rounded">✅ April 28 — You were selected for “Data Analyst - Infosys”</li>
        <li className="bg-gray-100 p-3 rounded">🔖 April 26 — You saved “DevOps Engineer - IBM”</li>
      </ul>
    </div>
  );
};

export default History;
