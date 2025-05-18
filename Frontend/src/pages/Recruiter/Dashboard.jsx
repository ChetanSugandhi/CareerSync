import React from 'react';
import { Briefcase, Users } from 'lucide-react'; // using lucide icons

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Recruiter Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Jobs Posted Card */}
        <div className="bg-gradient-to-tr from-blue-100 to-blue-50 shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-full text-white">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-900">Jobs Posted</h2>
              <p className="text-4xl font-bold text-blue-700 mt-1">5</p>
            </div>
          </div>
        </div>

        {/* Total Applicants Card */}
        <div className="bg-gradient-to-tr from-green-100 to-green-50 shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-full text-white">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-900">Total Applicants</h2>
              <p className="text-4xl font-bold text-green-700 mt-1">123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
