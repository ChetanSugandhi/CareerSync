// admin/Admin.jsx
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg px-4 py-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center px-4 py-2 rounded-lg text-left text-sm font-medium transition ${
                activeTab === item.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg transition">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
