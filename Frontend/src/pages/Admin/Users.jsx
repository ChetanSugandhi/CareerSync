// admin/Users.jsx
import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, Search, UserCheck, UserX } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Riya Patel', email: 'riya.patel@gmail.com', role: 'Recruiter', status: 'Inactive' },
  { id: 3, name: 'Sanjay Kumar', email: 'sanjay.kumar@gmail.com', role: 'User', status: 'Active' },
  { id: 4, name: 'Neha Singh', email: 'neha.singh@gmail.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Karan Mehta', email: 'karan.mehta@gmail.com', role: 'Recruiter', status: 'Active' },
  { id: 6, name: 'Pooja Desai', email: 'pooja.desai@gmail.com', role: 'User', status: 'Inactive' },
  { id: 7, name: 'Rahul Verma', email: 'rahul.verma@gmail.com', role: 'Admin', status: 'Active' },
  { id: 8, name: 'Anita Joshi', email: 'anita.joshi@gmail.com', role: 'User', status: 'Active' },
  { id: 9, name: 'Vikram Reddy', email: 'vikram.reddy@gmail.com', role: 'Recruiter', status: 'Active' },
  { id: 10, name: 'Deepa Nair', email: 'deepa.nair@gmail.com', role: 'User', status: 'Inactive' },
];

const ROLES = ['All', 'Admin', 'Recruiter', 'User'];
const STATUS = ['All', 'Active', 'Inactive'];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    let filtered = mockUsers;

    if (filterRole !== 'All') {
      filtered = filtered.filter((u) => u.role === filterRole);
    }
    if (filterStatus !== 'All') {
      filtered = filtered.filter((u) => u.status === filterStatus);
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => {
      const valA = a[sortField].toLowerCase();
      const valB = b[sortField].toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    setUsers(filtered);
  }, [searchTerm, filterRole, filterStatus, sortField, sortAsc]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const toggleStatus = (id) => {
    const updatedUsers = mockUsers.map((user) =>
      user.id === id
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    );
    // Update mockUsers data - in real app, call API here
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <UsersIcon className="text-green-600 w-7 h-7" />
        <h2 className="text-3xl font-semibold text-gray-900">Manage Users</h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full border rounded-lg py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        <div className="flex gap-4">
          <select
            className="border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {STATUS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider select-none"
                onClick={() => toggleSort('name')}
              >
                Name
                <SortIcon ascending={sortAsc} active={sortField === 'name'} />
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider select-none"
                onClick={() => toggleSort('email')}
              >
                Email
                <SortIcon ascending={sortAsc} active={sortField === 'email'} />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider select-none"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider select-none"
              >
                Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                        <UserCheck className="w-5 h-5" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                        <UserX className="w-5 h-5" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`px-3 py-1 rounded-lg font-semibold text-sm transition ${
                        user.status === 'Active'
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SortIcon = ({ ascending, active }) => {
  return (
    <svg
      className={`inline w-3 h-3 ml-1 ${
        active ? 'text-green-600' : 'text-gray-400'
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {ascending ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );
};

export default Users;
