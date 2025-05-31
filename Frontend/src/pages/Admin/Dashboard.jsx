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
      icon: <Users className="w-6 h-6 text-blue-400" />,
      color: 'bg-blue-700 text-blue-200',
    },
    {
      title: 'Active Jobs',
      value: 342,
      icon: <Briefcase className="w-6 h-6 text-green-400" />,
      color: 'bg-green-700 text-green-200',
    },
    {
      title: 'Reports',
      value: 87,
      icon: <FileText className="w-6 h-6 text-yellow-400" />,
      color: 'bg-yellow-700 text-yellow-200',
    }
  ];

  const ChartPlaceholder = ({ title }) => (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-sm flex flex-col justify-between text-gray-300">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
        [Chart Placeholder]
      </div>
    </div>
  );

  return (
    <div className="p-6 rounded-xl space-y-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <BarChart2 className="text-cyan-400 w-6 h-6" />
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 border rounded-xl shadow-sm hover:shadow-md transition ${stat.color}`}
          >
            <div className="inline-flex items-center p-2 rounded-lg mb-3">
              {stat.icon}
            </div>
            <h4 className="text-sm font-medium opacity-80">{stat.title}</h4>
            <p className="text-2xl font-bold">{stat.value}</p>
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
