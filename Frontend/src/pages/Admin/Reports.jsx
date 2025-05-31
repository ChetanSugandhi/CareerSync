import React, { useState, useMemo } from 'react';
import { FileBarChart, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const mockReports = [
  { id: 1, title: 'Monthly Recruitment Report', date: '2025-04-01', status: 'Submitted', views: 120 },
  { id: 2, title: 'Quarterly Hiring Analysis', date: '2025-03-15', status: 'Pending', views: 90 },
  { id: 3, title: 'User Activity Overview', date: '2025-04-05', status: 'Submitted', views: 150 },
  { id: 4, title: 'System Performance Metrics', date: '2025-04-10', status: 'Submitted', views: 200 },
  { id: 5, title: 'Applicant Trends', date: '2025-02-28', status: 'Rejected', views: 30 },
  { id: 6, title: 'Job Postings Summary', date: '2025-03-10', status: 'Submitted', views: 80 },
  { id: 7, title: 'Recruiter Activity Log', date: '2025-03-25', status: 'Pending', views: 60 },
];

const STATUS_COLORS = {
  Submitted: 'bg-green-200 text-green-800',
  Pending: 'bg-yellow-200 text-yellow-800',
  Rejected: 'bg-red-200 text-red-800',
};

const Reports = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredReports = useMemo(() => {
    let filtered = mockReports;
    if (filterStatus !== 'All') {
      filtered = filtered.filter(report => report.status === filterStatus);
    }
    return filtered.sort((a, b) => {
      if (sortField === 'date') {
        return sortAsc
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortField === 'views') {
        return sortAsc ? a.views - b.views : b.views - a.views;
      } else {
        return 0;
      }
    });
  }, [filterStatus, sortField, sortAsc]);

  const totalViews = filteredReports.reduce((acc, r) => acc + r.views, 0);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold flex items-center gap-3 mb-6 text-red-600">
        <FileBarChart size={32} /> Reports & Analytics
      </h2>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-md p-2 text-gray-700"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-gray-600 font-semibold">Sort by:</span>
          <button
            onClick={() => toggleSort('date')}
            className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Date
            {sortField === 'date' &&
              (sortAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>
          <button
            onClick={() => toggleSort('views')}
            className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Views
            {sortField === 'views' &&
              (sortAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-red-100 text-red-700">
            <tr>
              <th className="p-3 text-left font-semibold">Title</th>
              <th
                className="p-3 text-left font-semibold cursor-pointer"
                onClick={() => toggleSort('date')}
              >
                Date {sortField === 'date' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th
                className="p-3 text-left font-semibold cursor-pointer"
                onClick={() => toggleSort('views')}
              >
                Views {sortField === 'views' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  No reports found.
                </td>
              </tr>
            )}
            {filteredReports.map(({ id, title, date, status, views }) => (
              <tr
                key={id}
                className="border-b border-gray-200 hover:bg-red-50 transition"
              >
                <td className="p-3">{title}</td>
                <td className="p-3">{new Date(date).toLocaleDateString()}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      STATUS_COLORS[status] || 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {status}
                  </span>
                </td>
                <td className="p-3">{views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-red-300 p-4 rounded-md text-red-900 font-semibold flex justify-between items-center">
        <span>Total Reports: {filteredReports.length}</span>
        <span>Total Views: {totalViews}</span>
      </div>
    </div>
  );
};

export default Reports;
