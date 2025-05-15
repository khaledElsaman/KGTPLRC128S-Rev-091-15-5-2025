import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Download, UserPlus, Briefcase, Key, Mail, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const UserManagement = () => {
  const { hasPermission } = useUser();
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  // Sample users data
  const users = [
    {
      id: 'KSAMAN01',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'employer',
      projects: ['Project 001', 'Project 002'],
      status: 'active',
      lastLogin: '2024-03-15 10:30 AM'
    },
    {
      id: 'KSAMAN02',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'engineer',
      projects: ['Project 001'],
      status: 'active',
      lastLogin: '2024-03-15 09:15 AM'
    },
    {
      id: 'KSAMAN03',
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'contractor',
      projects: ['Project 002'],
      status: 'active',
      lastLogin: '2024-03-14 04:45 PM'
    }
  ];

  if (!hasPermission('users', 'view')) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system users and permissions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
          {hasPermission('users', 'create') && (
            <button 
              onClick={() => setShowNewUserModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus size={16} />
              <span>Add User</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="employer">Employer</option>
          <option value="engineer">Engineer</option>
          <option value="contractor">Contractor</option>
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Projects</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Last Login</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user =>
                  selectedRole === 'all' || user.role === selectedRole
                )
                .filter(user =>
                  selectedStatus === 'all' || user.status === selectedStatus
                )
                .filter(user =>
                  searchTerm === '' ||
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Key size={16} className="text-gray-400" />
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-gray-400" />
                        <span>{user.projects.length} Projects</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-50 text-gray-600'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Key size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Briefcase size={16} className="text-purple-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Mail size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;