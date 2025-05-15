import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  Filter, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  Calendar,
  User,
  Tag,
  ArrowUpDown,
  FileText,
  Trash2,
  MoreVertical
} from 'lucide-react';

// Log level configuration
const logLevels = {
  INFO: {
    label: 'Info',
    icon: Info,
    style: 'bg-blue-50 text-blue-600'
  },
  WARNING: {
    label: 'Warning',
    icon: AlertTriangle,
    style: 'bg-yellow-50 text-yellow-600'
  },
  ERROR: {
    label: 'Error',
    icon: AlertCircle,
    style: 'bg-red-50 text-red-600'
  },
  SUCCESS: {
    label: 'Success',
    icon: CheckCircle,
    style: 'bg-green-50 text-green-600'
  }
};

// Log categories based on GTPL RC 128
const logCategories = {
  CLAIM: 'Claims Management',
  DOCUMENT: 'Document Processing',
  USER: 'User Activity',
  SYSTEM: 'System Events',
  SECURITY: 'Security Events',
  COMPLIANCE: 'Compliance Checks',
  WORKFLOW: 'Workflow Events',
  ANALYSIS: 'Analysis Operations'
};

interface Log {
  id: string;
  timestamp: string;
  level: keyof typeof logLevels;
  category: keyof typeof logCategories;
  message: string;
  details: string;
  user: string;
  module: string;
  correlationId?: string;
}

const LogScreen = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'desc'
  });

  // Sample logs data
  const logs: Log[] = [
    {
      id: 'LOG-2024-001',
      timestamp: '2024-03-15 10:30:45',
      level: 'INFO',
      category: 'CLAIM',
      message: 'New claim submission received',
      details: 'Claim ID: CLM-2024-001, Type: Price Adjustment',
      user: 'John Smith',
      module: 'Claims Processing',
      correlationId: 'CORR-001'
    },
    {
      id: 'LOG-2024-002',
      timestamp: '2024-03-15 10:35:22',
      level: 'WARNING',
      category: 'DOCUMENT',
      message: 'Document validation warning',
      details: 'Missing required attachments in submission',
      user: 'Sarah Johnson',
      module: 'Document Validation',
      correlationId: 'CORR-002'
    },
    {
      id: 'LOG-2024-003',
      timestamp: '2024-03-15 11:15:00',
      level: 'ERROR',
      category: 'SYSTEM',
      message: 'Database connection error',
      details: 'Connection timeout during claim update',
      user: 'System',
      module: 'Database',
      correlationId: 'CORR-003'
    },
    {
      id: 'LOG-2024-004',
      timestamp: '2024-03-15 11:30:15',
      level: 'SUCCESS',
      category: 'WORKFLOW',
      message: 'Claim approval workflow completed',
      details: 'Claim ID: CLM-2024-001 approved by committee',
      user: 'Mike Chen',
      module: 'Workflow Engine',
      correlationId: 'CORR-004'
    }
  ];

  // Filter logs based on selected criteria
  const filteredLogs = logs.filter(log => {
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesLevel && matchesCategory && matchesSearch;
  });

  // Sort logs
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortConfig.key === 'timestamp') {
      return sortConfig.direction === 'asc' 
        ? a.timestamp.localeCompare(b.timestamp)
        : b.timestamp.localeCompare(a.timestamp);
    }
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleLogSelection = (logId: string) => {
    setSelectedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const handleBulkDelete = () => {
    // Implement bulk delete logic
    console.log('Deleting logs:', selectedLogs);
  };

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting logs:', selectedLogs.length ? selectedLogs : 'all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
          <p className="text-sm text-gray-500 mt-1">GTPL RC 128 Activity Monitoring</p>
        </div>
        <div className="flex gap-3">
          {selectedLogs.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span>Delete Selected ({selectedLogs.length})</span>
            </button>
          )}
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Download size={16} />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search logs..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="all">All Levels</option>
          {Object.entries(logLevels).map(([key, value]) => (
            <option key={key} value={key}>{value.label}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {Object.entries(logCategories).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="w-8 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedLogs.length === logs.length}
                    onChange={(e) => setSelectedLogs(e.target.checked ? logs.map(log => log.id) : [])}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900"
                    onClick={() => handleSort('timestamp')}
                  >
                    <Clock size={16} />
                    <span>Timestamp</span>
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Level</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Message</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Module</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedLogs.map((log) => {
                const LogIcon = logLevels[log.level].icon;
                return (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedLogs.includes(log.id)}
                        onChange={() => handleLogSelection(log.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-sm">{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${logLevels[log.level].style}`}>
                        <LogIcon size={14} />
                        <span className="text-sm font-medium">{logLevels[log.level].label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-gray-400" />
                        <span className="text-sm">{logCategories[log.category]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.message}</p>
                        <p className="text-sm text-gray-500">{log.details}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        <span className="text-sm">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="text-sm">{log.module}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Info size={16} className="text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Download size={16} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm">
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
            <span className="text-sm text-gray-500">
              Showing 1 to {sortedLogs.length} of {logs.length} entries
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogScreen;