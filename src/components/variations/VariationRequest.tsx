import React, { useState } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, DollarSign, TrendingUp, Users, Percent, ArrowRight, Upload, GitCompare, Info, FileDiff, Bell, FileWarning } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../contexts/AppContext';

// Variation Request Types based on GTPL RC 128
const requestTypes = {
  'PRICE': {
    category: 'Price Adjustments',
    article: '113',
    types: {
      'PA-MAT': { 
        title: 'Material Price Adjustment',
        requiredDocs: [
          'Price Analysis Report',
          'Market Survey Data',
          'Supplier Quotations',
          'Historical Price Records'
        ],
        validationRules: [
          'Price increase exceeds threshold',
          'Market survey data provided',
          'Multiple supplier quotations attached',
          'Historical price comparison included'
        ]
      },
      'PA-TAR': { 
        title: 'Tariff Adjustment',
        requiredDocs: [
          'Official Tariff Documentation',
          'Cost Impact Analysis',
          'Import Documentation',
          'Payment Records'
        ],
        validationRules: [
          'Official notification attached',
          'Direct impact demonstrated',
          'Calculation methodology clear',
          'Implementation date specified'
        ]
      }
    }
  },
  'SCOPE': {
    category: 'Scope Changes',
    article: '114',
    types: {
      'SC-ADD': { 
        title: 'Scope Addition',
        requiredDocs: [
          'Technical Specification',
          'Cost Estimate',
          'Schedule Impact Analysis',
          'Resource Plan'
        ],
        validationRules: [
          'Technical necessity proven',
          'Cost impact detailed',
          'Schedule impact assessed',
          'Resource availability confirmed'
        ]
      },
      'SC-RED': { 
        title: 'Scope Reduction',
        requiredDocs: [
          'Impact Assessment',
          'Cost Adjustment',
          'Resource Reallocation Plan',
          'Modified Schedule'
        ],
        validationRules: [
          'Impact fully assessed',
          'Cost savings quantified',
          'Resource plan updated',
          'Schedule optimization shown'
        ]
      }
    }
  },
  'ADDITIONAL': {
    category: 'Additional Works',
    article: '116',
    types: {
      'AW-EMG': { 
        title: 'Emergency Works',
        requiredDocs: [
          'Emergency Declaration',
          'Scope Definition',
          'Cost Estimate',
          'Resource Plan'
        ],
        validationRules: [
          'Emergency nature verified',
          'Immediate action justified',
          'Safety/security impact shown',
          'Resource plan viable'
        ]
      },
      'AW-SUP': { 
        title: 'Supplementary Works',
        requiredDocs: [
          'Technical Justification',
          'Cost Analysis',
          'Schedule Impact',
          'Resource Requirements'
        ],
        validationRules: [
          'Technical necessity proven',
          'Cost-benefit analyzed',
          'Schedule impact assessed',
          'Resource availability confirmed'
        ]
      }
    }
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

// Document Upload Card Component
const DocumentUploadCard = ({ title, description, onUpload }: { title: string; description: string; onUpload: (file: File) => void }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center text-center">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <label className="mt-4">
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
          <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            Select File
          </span>
        </label>
      </div>
    </div>
  );
};

const VariationRequest = () => {
  const navigate = useNavigate();
  const { handleModuleChange } = useApp();
  const [activeTab, setActiveTab] = useState<'new-variation' | 'notice-of-variation'>('new-variation');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    justification: '',
    impactAnalysis: '',
    scheduleImpact: '',
    documents: [] as File[]
  });
  
  const [noticeFormData, setNoticeFormData] = useState({
    title: '',
    reference: '',
    description: '',
    noticeDate: new Date().toISOString().split('T')[0],
    engineerName: '',
    projectName: '',
    documents: [] as File[]
  });

  // Sample requests data
  const requests = [
    {
      id: 'VR-2024-001',
      title: 'Steel Price Variation Request',
      type: 'PA-MAT',
      status: 'Under Review',
      submissionDate: '2024-03-15',
      value: 245000,
      documents: [
        { name: 'Price Analysis.pdf', size: '2.4 MB' },
        { name: 'Market Survey.pdf', size: '1.8 MB' }
      ]
    },
    {
      id: 'VR-2024-002',
      title: 'Additional Drainage Works',
      type: 'AW-SUP',
      status: 'Pending',
      submissionDate: '2024-03-18',
      value: 180000,
      documents: [
        { name: 'Technical Justification.pdf', size: '3.1 MB' },
        { name: 'Cost Analysis.xlsx', size: '1.2 MB' }
      ]
    }
  ];
  
  // Sample notices data
  const notices = [
    {
      id: 'NOV-2024-001',
      title: 'Notice of Variation - Foundation Design',
      reference: 'REF-FD-001',
      status: 'Submitted',
      submissionDate: '2024-03-10',
      engineerName: 'John Smith',
      documents: [
        { name: 'Design Change Notice.pdf', size: '1.7 MB' }
      ]
    },
    {
      id: 'NOV-2024-002',
      title: 'Notice of Variation - Electrical Systems',
      reference: 'REF-ES-002',
      status: 'Under Review',
      submissionDate: '2024-03-12',
      engineerName: 'Sarah Johnson',
      documents: [
        { name: 'Electrical Specs.pdf', size: '2.2 MB' }
      ]
    }
  ];

  const handleSubmitVariation = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Variation form submitted:', formData);
    
    // Show success message
    alert('Variation request submitted successfully!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      value: '',
      justification: '',
      impactAnalysis: '',
      scheduleImpact: '',
      documents: []
    });
  };
  
  const handleSubmitNotice = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Notice form submitted:', noticeFormData);
    
    // Show success message
    alert('Notice of variation submitted successfully!');
    
    // Reset form
    setNoticeFormData({
      title: '',
      reference: '',
      description: '',
      noticeDate: new Date().toISOString().split('T')[0],
      engineerName: '',
      projectName: '',
      documents: []
    });
  };

  const handleFileUpload = (file: File) => {
    if (activeTab === 'new-variation') {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, file]
      }));
    } else {
      setNoticeFormData(prev => ({
        ...prev,
        documents: [...prev.documents, file]
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Variation Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Submit and track variation requests under GTPL RC 128</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>AI Assist</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-semibold mt-1">{requests.length + notices.length}</p>
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
                {requests.filter(r => r.status === 'Pending' || r.status === 'Under Review').length + 
                 notices.filter(n => n.status === 'Submitted' || n.status === 'Under Review').length}
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
              <p className="text-sm text-gray-500">Variations Value</p>
              <p className="text-2xl font-semibold mt-1">
                {(requests.reduce((sum, r) => sum + r.value, 0) / 1000000).toFixed(1)}M SAR
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Notices Issued</p>
              <p className="text-2xl font-semibold mt-1">{notices.length}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Bell size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'new-variation'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('new-variation')}
            >
              New Variation
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notice-of-variation'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('notice-of-variation')}
            >
              Notice of Variation
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'new-variation' ? (
            <form onSubmit={handleSubmitVariation} className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">New Variation Request</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variation Category
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {Object.entries(requestTypes).map(([key, category]) => (
                      <option key={key} value={key}>{category.category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variation Type
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    required
                    disabled={!selectedCategory}
                  >
                    <option value="">Select Type</option>
                    {selectedCategory && Object.entries(requestTypes[selectedCategory as keyof typeof requestTypes].types).map(([key, type]) => (
                      <option key={key} value={key}>{type.title}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variation Value (SAR)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Impact (Days)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.scheduleImpact}
                    onChange={(e) => setFormData({ ...formData, scheduleImpact: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Justification
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.justification}
                    onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Impact Analysis
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    value={formData.impactAnalysis}
                    onChange={(e) => setFormData({ ...formData, impactAnalysis: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Document Upload Section */}
              {selectedType && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Required Documents</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {requestTypes[selectedCategory as keyof typeof requestTypes]
                      .types[selectedType as keyof typeof requestTypes[keyof typeof requestTypes]['types']]
                      .requiredDocs.map((doc, index) => (
                        <DocumentUploadCard
                          key={index}
                          title={doc}
                          description="Drag and drop or click to select"
                          onUpload={handleFileUpload}
                        />
                      ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmitNotice} className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notice of Variation</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notice Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={noticeFormData.title}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={noticeFormData.reference}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, reference: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notice Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={noticeFormData.noticeDate}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, noticeDate: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engineer Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={noticeFormData.engineerName}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, engineerName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={noticeFormData.projectName}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, projectName: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={noticeFormData.description}
                    onChange={(e) => setNoticeFormData({ ...noticeFormData, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Document Upload Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Supporting Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <DocumentUploadCard
                    title="Technical Documentation"
                    description="Drag and drop or click to select"
                    onUpload={handleFileUpload}
                  />
                  <DocumentUploadCard
                    title="Legal Documentation"
                    description="Drag and drop or click to select"
                    onUpload={handleFileUpload}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Notice
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Reference</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Value</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <GitCompare size={16} className="text-gray-400" />
                        <span className="font-medium">{request.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{request.title}</td>
                    <td className="py-3 px-4">
                      {Object.entries(requestTypes).map(([key, category]) => 
                        Object.entries(category.types).find(([typeKey]) => typeKey === request.type)?.[1].title
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="py-3 px-4">{request.value.toLocaleString()} SAR</td>
                    <td className="py-3 px-4">{request.submissionDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <FileText size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Download size={16} className="text-purple-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Notices</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Reference</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Engineer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr key={notice.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileWarning size={16} className="text-gray-400" />
                        <span className="font-medium">{notice.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{notice.title}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={notice.status} />
                    </td>
                    <td className="py-3 px-4">{notice.engineerName}</td>
                    <td className="py-3 px-4">{notice.submissionDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <FileText size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Download size={16} className="text-purple-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Compliance Guide */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Info size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">GTPL RC 128 Compliance Guide</h3>
            <p className="text-blue-700 mt-1">
              Ensure your variation requests comply with Saudi Government Tenders and Procurement Law 128 Articles 113-116 and its Implementing Regulations.
            </p>
            <div className="mt-4">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                onClick={() => handleModuleChange('variations-compliance-guide', 'Overview')}
              >
                <span>View Compliance Guide</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationRequest;