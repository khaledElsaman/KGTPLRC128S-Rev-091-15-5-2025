import React, { useState } from 'react';
import { Calculator, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, FileText, DollarSign, TrendingUp, Users, Percent, ArrowRight } from 'lucide-react';

// Price Adjustment Types based on GTPL RC 128 Article 113
const adjustmentTypes = {
  'MATERIAL': {
    title: 'Material Cost Adjustment',
    threshold: 10, // 10% of contract value
    requiredDocs: [
      'Price Analysis Report',
      'Market Survey Data',
      'Supplier Quotations',
      'Historical Price Records'
    ],
    validationRules: [
      'Price increase exceeds 10% of original cost',
      'Market survey data supports the increase',
      'Multiple supplier quotations provided',
      'Price fluctuation is market-wide'
    ]
  },
  'TARIFF': {
    title: 'Tariff Adjustment',
    threshold: 5, // 5% of contract value
    requiredDocs: [
      'Official Tariff Documentation',
      'Cost Impact Analysis',
      'Import Documentation',
      'Payment Records'
    ],
    validationRules: [
      'Official government notification',
      'Direct impact on project materials',
      'Calculation methodology verified',
      'Implementation date confirmed'
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

const PriceAdjustments = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Sample price adjustments data
  const adjustments = [
    {
      id: 'PA-2024-001',
      title: 'Steel Price Escalation Q1 2024',
      type: 'MATERIAL',
      status: 'Under Review',
      originalPrice: 1000000,
      adjustedPrice: 1150000,
      percentageChange: 15,
      submissionDate: '2024-03-15',
      reviewDate: '2024-03-20',
      submittedBy: 'John Smith',
      documents: [
        { name: 'Price Analysis Report.pdf', size: '2.4 MB' },
        { name: 'Market Survey Data.xlsx', size: '1.8 MB' },
        { name: 'Supplier Quotations.pdf', size: '3.2 MB' }
      ],
      complianceStatus: {
        documentation: true,
        thresholdCheck: true,
        marketValidation: true,
        timelinessCheck: true
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Price Adjustments</h1>
          <p className="text-sm text-gray-500 mt-1">GTPL RC 128 Article 113</p>
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
            <span>New Adjustment</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Adjustments</p>
              <p className="text-2xl font-semibold mt-1">24</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Calculator size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Under Review</p>
              <p className="text-2xl font-semibold mt-1">8</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold mt-1">1.2M SAR</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Change</p>
              <p className="text-2xl font-semibold mt-1">+8.5%</p>
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
            placeholder="Search adjustments..."
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
          {Object.entries(adjustmentTypes).map(([key, type]) => (
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

      {/* Adjustments List */}
      <div className="space-y-4">
        {adjustments.map((adjustment) => (
          <div key={adjustment.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Calculator size={24} className="text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900">{adjustment.title}</h3>
                    <StatusBadge status={adjustment.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{adjustment.id}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>Submitted: {adjustment.submissionDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>Review: {adjustment.reviewDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Adjustment Value</p>
                <p className="text-lg font-semibold text-gray-900">
                  {(adjustment.adjustedPrice - adjustment.originalPrice).toLocaleString()} SAR
                </p>
                <p className={`text-sm ${
                  adjustment.percentageChange > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {adjustment.percentageChange > 0 ? '+' : ''}{adjustment.percentageChange}%
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Compliance Status</h4>
                <div className="space-y-2">
                  {Object.entries(adjustment.complianceStatus).map(([key, value]) => (
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
                  current={adjustment.percentageChange} 
                  threshold={adjustmentTypes[adjustment.type as keyof typeof adjustmentTypes].threshold} 
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {adjustment.documents.map((doc, index) => (
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

export default PriceAdjustments;