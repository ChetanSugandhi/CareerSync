// admin/Dashboard.jsx
import React from 'react';
import {
  BarChart2,
  Users,
  Briefcase,
  FileText
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: 1245,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Active Jobs',
      value: 342,
      icon: <Briefcase className="w-6 h-6 text-green-600" />,
      color: 'bg-green-100 text-green-800',
    },
    {
      title: 'Reports',
      value: 87,
      icon: <FileText className="w-6 h-6 text-yellow-600" />,
      color: 'bg-yellow-100 text-yellow-800',
    }
  ];

  const ChartPlaceholder = ({ title }) => (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm flex flex-col justify-between">
      <h3 className="text-gray-700 font-semibold mb-2">{title}</h3>
      <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
        [Chart Placeholder]
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-xl space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <BarChart2 className="text-blue-500 w-6 h-6" />
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className={`inline-flex items-center p-2 rounded-lg mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <h4 className="text-sm font-medium text-gray-600">{stat.title}</h4>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartPlaceholder title="User Growth Trends" />
        <ChartPlaceholder title="Job Postings Overview" />
      </div>

      <div className="grid grid-cols-1">
        <ChartPlaceholder title="Monthly Performance Summary" />
      </div>
    </div>
  );
};

export default Dashboard;
