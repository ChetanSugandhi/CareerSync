import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Applicants from './Applicants';
import PostJob from './PostJob';

const RecruiterPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'applicants':
        return <Applicants />;
      case 'postjob':
        return <PostJob />;
      default:
        return <Dashboard />;
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'applicants', label: 'Applicants' },
    { id: 'postjob', label: 'Post Job' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-center md:justify-start gap-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-md font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600'
                : 'text-gray-600 hover:text-blue-500'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="p-6 md:p-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 transition-all duration-300">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default RecruiterPage;
