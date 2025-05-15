import React, { useState } from 'react';
import { FileDiff, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, GitCompare, ArrowRight, FileText, FileWarning } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import NoticeOfVariation from './NoticeOfVariation';

const VariationRequests = () => {
  const { handleModuleChange } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'requests' | 'notice-of-variation'>('requests');

  // Sample data for demonstration
  const requests = [
    {
      id: 'VR-2024-001',
      title: 'Foundation Design Change',
      type: 'Notice of Variation',
      status: 'Submitted',
      submittedBy: 'John Smith',
      submittedDate: '2024-04-15',
      description: 'Notice for changes to foundation design due to soil conditions'
    },
    {
      id: 'VR-2024-002',
      title: 'Additional Drainage Works',
      type: 'New Variation',
      status: 'Draft',
      submittedBy: 'Sarah Johnson',
      submittedDate: '2024-04-18',
      description: 'Request for additional drainage works in Zone B'
    },
    {
      id: 'VR-2024-003',
      title: 'Steel Reinforcement Specification',
      type: 'Notice of Variation',
      status: 'Under Review',
      submittedBy: 'Mike Chen',
      submittedDate: '2024-04-10',
      description: 'Notice regarding changes to steel reinforcement specifications'
    }
  ];

  // Filter requests based on search term and status
  const filteredRequests = requests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      'Draft': 'bg-gray-50 text-gray-600',
      'Submitted': 'bg-yellow-50 text-yellow-600',
      'Under Review': 'bg-blue-50 text-blue-600',
      'Approved': 'bg-green-50 text-green-600',
      'Rejected': 'bg-red-50 text-red-600',
      'Archived': 'bg-purple-50 text-purple-600'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  if (activeTab === 'notice-of-variation') {
    return <NoticeOfVariation />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Variation Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Submit and track all variation forms</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>AI Analysis</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Form Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setActiveTab('notice-of-variation')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-yellow-50">
              <FileText size={24} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Notice of Variation</h3>
              <p className="text-sm text-gray-500 mt-1">Submit official notification of a potential contract variation</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <span>Create Notice</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div 
          className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleModuleChange('new-variation', 'Overview')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <GitCompare size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">New Variation</h3>
              <p className="text-sm text-gray-500 mt-1">Create a new variation request with full justification and attachments</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <span>Create Variation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search requests..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Submitted By</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileDiff size={16} className="text-gray-400" />
                        <span className="font-medium">{request.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{request.title}</td>
                    <td className="py-3 px-4">{request.type}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="py-3 px-4">{request.submittedBy}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{request.submittedDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <FileText size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <ArrowRight size={16} className="text-green-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-semibold mt-1">{requests.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileDiff size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold mt-1">
                {requests.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-semibold mt-1">
                {requests.filter(r => r.status === 'Approved').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-semibold mt-1">
                {requests.filter(r => r.status === 'Rejected').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationRequests;