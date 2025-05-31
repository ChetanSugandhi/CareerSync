import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Users from './Users';
import Reports from './Reports';
import {
  LayoutDashboard,
  Users as UsersIcon,
  FileBarChart,
  LogOut,
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  const navItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
    },
    {
      key: 'users',
      label: 'Users',
      icon: <UsersIcon className="w-5 h-5 mr-2" />,
    },
    {
      key: 'reports',
      label: 'Reports',
      icon: <FileBarChart className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white relative overflow-hidden">
      {/* Glowing Circles for Background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500 opacity-20 animate-pulse mix-blend-screen blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-600 opacity-25 animate-pulse mix-blend-screen blur-2xl"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-6 space-y-6 relative z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-cyan-400">Admin Panel</h2>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center px-4 py-2 rounded-lg text-left text-sm font-medium transition ${
                activeTab === item.key
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-300 hover:bg-cyan-700 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto relative z-10">
        <div className="bg-white rounded-xl shadow-md p-6 text-black">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
  