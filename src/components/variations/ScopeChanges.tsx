import React, { useState } from 'react';
import { GitBranch, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, FileText, DollarSign, TrendingUp, Users, Percent, ArrowRight, Briefcase } from 'lucide-react';

// Scope Change Types based on GTPL RC 128 Article 114
const scopeTypes = {
  'ADDITION': {
    title: 'Scope Addition',
    threshold: 20, // 20% of contract value
    requiredDocs: [
      'Technical Specification',
      'Cost Estimate',
      'Schedule Impact Analysis',
      'Resource Requirements'
    ],
    validationRules: [
      'Within 20% contract value limit',
      'Technical feasibility verified',
      'Resource availability confirmed',
      'Schedule impact assessed'
    ]
  },
  'REDUCTION': {
    title: 'Scope Reduction',
    threshold: 10, // 10% of contract value
    requiredDocs: [
      'Impact Assessment',
      'Cost Adjustment Report',
      'Resource Reallocation Plan',
      'Modified Schedule'
    ],
    validationRules: [
      'Within 10% contract value limit',
      'Impact on project objectives assessed',
      'Cost savings quantified',
      'Schedule optimization verified'
    ]
  }
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Draft': 'bg-gray-50 text-gray-600',
    'Pending': 'bg-yellow-50 text-yellow-600',
    'Under Review': 'bg-blue-50 text-blue-600',
    'Approved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Threshold Indicator Component
const ThresholdIndicator = ({ current, threshold }: { current: number; threshold: number }) => {
  const percentage = (current / threshold) * 100;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Threshold Usage</span>
        <span className={`font-medium ${percentage > 90 ? 'text-red-600' : percentage > 70 ? 'text-yellow-600' : 'text-green-600'}`}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${
            percentage > 90 ? 'bg-red-600' : 
            percentage > 70 ? 'bg-yellow-600' : 
            'bg-green-600'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

const ScopeChanges = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Sample scope changes data
  const scopeChanges = [
    {
      id: 'SC-2024-001',
      title: 'Additional Floor Level Scope',
      type: 'ADDITION',
      status: 'Under Review',
      originalValue: 5000000,
      changeValue: 850000,
      percentageChange: 17,
      submissionDate: '2024-03-15',
      reviewDate: '2024-03-20',
      submittedBy: 'John Smith',
      documents: [
        { name: 'Technical Specs.pdf', size: '3.2 MB' },
        { name: 'Cost Analysis.xlsx', size: '1.8 MB' },
        { name: 'Schedule Impact.pdf', size: '2.4 MB' }
      ],
      complianceStatus: {
        documentation: true,
        thresholdCheck: true,
        technicalFeasibility: true,
        scheduleImpact: true
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scope Changes</h1>
          <p className="text-sm text-gray-500 mt-1">GTPL RC 128 Article 114</p>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} />
            <span>New Scope Change</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Changes</p>
              <p className="text-2xl font-semibold mt-1">18</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <GitBranch size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Under Review</p>
              <p className="text-2xl font-semibold mt-1">6</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Net Change Value</p>
              <p className="text-2xl font-semibold mt-1">2.8M SAR</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Impact</p>
              <p className="text-2xl font-semibold mt-1">+12.5%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Percent size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search scope changes..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          {Object.entries(scopeTypes).map(([key, type]) => (
            <option key={key} value={key}>{type.title}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
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

      {/* Scope Changes List */}
      <div className="space-y-4">
        {scopeChanges.map((change) => (
          <div key={change.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-50">
                  <GitBranch size={24} className="text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900">{change.title}</h3>
                    <StatusBadge status={change.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{change.id}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>Submitted: {change.submissionDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>Review: {change.reviewDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Change Value</p>
                <p className="text-lg font-semibold text-gray-900">
                  {change.changeValue.toLocaleString()} SAR
                </p>
                <p className={`text-sm ${
                  change.percentageChange > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change.percentageChange > 0 ? '+' : ''}{change.percentageChange}%
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Compliance Status</h4>
                <div className="space-y-2">
                  {Object.entries(change.complianceStatus).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      {value ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <XCircle size={16} className="text-red-600" />
                      )}
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Threshold Analysis</h4>
                <ThresholdIndicator 
                  current={change.percentageChange} 
                  threshold={scopeTypes[change.type as keyof typeof scopeTypes].threshold} 
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {change.documents.map((doc, index) => (
                    <button key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-sm hover:bg-gray-100">
                      <FileText size={14} className="text-gray-400" />
                      <span className="text-gray-600">{doc.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Brain size={16} className="text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Users size={16} className="text-purple-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowRight size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScopeChanges;