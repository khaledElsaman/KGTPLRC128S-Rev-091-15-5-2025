import React, { useState } from 'react';
import { Scale, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Gavel, ArrowUpDown, FileText, DollarSign, Users, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight } from 'lucide-react';

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Pending': 'bg-yellow-50 text-yellow-600',
    'In Progress': 'bg-blue-50 text-blue-600',
    'Resolved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600',
    'Escalated': 'bg-purple-50 text-purple-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Dispute Settlement Types based on GTPL RC 128 Article 155
const settlementTypes = {
  'TECHNICAL': {
    title: 'Technical Dispute',
    article: '155',
    timeline: '30 days',
    council: 'Technical Dispute Council',
    requirements: [
      'Representative from government entity',
      'Representative from contractor',
      'Chairperson from Ministry'
    ]
  },
  'FINANCIAL': {
    title: 'Financial Dispute',
    article: '155',
    timeline: '45 days',
    council: 'Financial Dispute Council',
    requirements: [
      'Financial expert from government entity',
      'Financial representative from contractor',
      'Financial specialist from Ministry'
    ]
  },
  'CONTRACTUAL': {
    title: 'Contractual Dispute',
    article: '155',
    timeline: '60 days',
    council: 'Contractual Dispute Council',
    requirements: [
      'Legal representative from government entity',
      'Legal representative from contractor',
      'Legal expert from Ministry'
    ]
  }
};

const DisputeSettlement = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewDisputeModal, setShowNewDisputeModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);

  // Sample disputes data
  const disputes = [
    {
      id: 'DSP-2024-001',
      title: 'Foundation Design Technical Dispute',
      type: 'TECHNICAL',
      status: 'In Progress',
      submissionDate: '2024-03-15',
      parties: {
        government: 'Ministry of Housing',
        contractor: 'ABC Construction Co.'
      },
      description: 'Dispute regarding foundation design specifications and compliance with building codes',
      timeline: {
        submitted: '2024-03-15',
        councilFormed: '2024-03-20',
        hearingDate: '2024-04-05',
        decisionDue: '2024-04-15'
      },
      documents: [
        { name: 'Technical Report.pdf', size: '3.2 MB' },
        { name: 'Building Codes.pdf', size: '1.8 MB' },
        { name: 'Design Specifications.pdf', size: '4.5 MB' }
      ]
    },
    {
      id: 'DSP-2024-002',
      title: 'Payment Schedule Financial Dispute',
      type: 'FINANCIAL',
      status: 'Pending',
      submissionDate: '2024-03-10',
      parties: {
        government: 'Ministry of Education',
        contractor: 'XYZ Builders Ltd.'
      },
      description: 'Dispute regarding payment schedule and delayed payments for completed milestones',
      timeline: {
        submitted: '2024-03-10',
        councilFormed: '2024-03-18',
        hearingDate: 'Pending',
        decisionDue: 'Pending'
      },
      documents: [
        { name: 'Payment Schedule.pdf', size: '1.5 MB' },
        { name: 'Milestone Completion Report.pdf', size: '2.8 MB' },
        { name: 'Financial Statement.xlsx', size: '1.2 MB' }
      ]
    }
  ];

  // Filter disputes based on selected criteria
  const filteredDisputes = disputes.filter(dispute => {
    const matchesType = selectedType === 'all' || dispute.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || dispute.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      dispute.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispute Settlement</h1>
          <p className="text-sm text-gray-500 mt-1">Mechanisms and procedures for resolving government contract disputes</p>
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
          <button 
            onClick={() => setShowNewDisputeModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Dispute</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Disputes</p>
              <p className="text-2xl font-semibold mt-1">{disputes.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Scale size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold mt-1">{disputes.filter(d => d.status === 'In Progress').length}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold mt-1">{disputes.filter(d => d.status === 'Resolved').length}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Escalated</p>
              <p className="text-2xl font-semibold mt-1">{disputes.filter(d => d.status === 'Escalated').length}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Gavel size={24} className="text-purple-600" />
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
            placeholder="Search disputes..."
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
          {Object.entries(settlementTypes).map(([key, type]) => (
            <option key={key} value={key}>{type.title}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
          <option value="Escalated">Escalated</option>
        </select>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <Scale size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No disputes found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or create a new dispute</p>
            <button 
              onClick={() => setShowNewDisputeModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              New Dispute
            </button>
          </div>
        ) : (
          filteredDisputes.map((dispute) => (
            <div key={dispute.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Scale size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{dispute.title}</h3>
                      <StatusBadge status={dispute.status} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{dispute.id}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>Submitted: {dispute.submissionDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock size={14} />
                        <span>Decision Due: {dispute.timeline.decisionDue}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Dispute Type</p>
                  <p className="font-medium text-gray-900">{settlementTypes[dispute.type as keyof typeof settlementTypes].title}</p>
                  <p className="text-sm text-gray-500 mt-2">Article {settlementTypes[dispute.type as keyof typeof settlementTypes].article}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Parties</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Government Entity:</span>
                      <span className="text-sm font-medium">{dispute.parties.government}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Contractor:</span>
                      <span className="text-sm font-medium">{dispute.parties.contractor}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Council Formed:</span>
                      <span className="text-sm font-medium">{dispute.timeline.councilFormed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Hearing Date:</span>
                      <span className="text-sm font-medium">{dispute.timeline.hearingDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {dispute.documents.map((doc: any, index: number) => (
                      <button key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-sm hover:bg-gray-100">
                        <FileText size={14} className="text-gray-400" />
                        <span className="text-gray-600">{doc.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedDispute(dispute)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MessageSquare size={16} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Share2 size={16} className="text-purple-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <ArrowRight size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dispute Detail Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDispute.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Dispute ID: {selectedDispute.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedDispute(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {/* Dispute Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dispute Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={selectedDispute.status} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{settlementTypes[selectedDispute.type as keyof typeof settlementTypes].title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submission Date</p>
                        <p className="font-medium">{selectedDispute.submissionDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Decision Due</p>
                        <p className="font-medium">{selectedDispute.timeline.decisionDue}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Description</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{selectedDispute.description}</p>
                    </div>
                  </div>

                  {/* Parties */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Parties</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Government Entity</p>
                        <p className="font-medium text-blue-900 mt-1">{selectedDispute.parties.government}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600">Contractor</p>
                        <p className="font-medium text-purple-900 mt-1">{selectedDispute.parties.contractor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Documents</h3>
                    <div className="space-y-3">
                      {selectedDispute.documents.map((doc: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.size}</p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <Download size={16} className="text-gray-500" />
                          </button>
                        </div>
                      ))}
                      <button className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Upload New Document</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Dispute Council */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dispute Council</h3>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">{settlementTypes[selectedDispute.type as keyof typeof settlementTypes].council}</p>
                      <div className="mt-3 space-y-2">
                        {settlementTypes[selectedDispute.type as keyof typeof settlementTypes].requirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-blue-600" />
                            <p className="text-sm text-blue-700">{req}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dispute Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <FileText size={16} className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Dispute Submitted</p>
                            <span className="text-xs text-gray-500">{selectedDispute.timeline.submitted}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Initial dispute submission</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                            <Users size={16} className="text-purple-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Council Formed</p>
                            <span className="text-xs text-gray-500">{selectedDispute.timeline.councilFormed}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Dispute resolution council formed</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                            <MessageSquare size={16} className="text-yellow-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Hearing Date</p>
                            <span className="text-xs text-gray-500">{selectedDispute.timeline.hearingDate}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Dispute hearing scheduled</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                            <Gavel size={16} className="text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Decision Due</p>
                            <span className="text-xs text-gray-500">{selectedDispute.timeline.decisionDue}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Final decision expected</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GTPL Reference */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">GTPL RC 128 Reference</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Article {settlementTypes[selectedDispute.type as keyof typeof settlementTypes].article}</p>
                      <p className="font-medium mt-2">Timeline: {settlementTypes[selectedDispute.type as keyof typeof settlementTypes].timeline}</p>
                      <button className="mt-3 text-sm text-blue-600 flex items-center gap-1">
                        <span>View full article</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download size={16} />
                      <span>Download Report</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <MessageSquare size={16} />
                      <span>Add Comment</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Share2 size={16} />
                      <span>Share Dispute</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Dispute Modal */}
      {showNewDisputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">New Dispute</h2>
                  <p className="text-sm text-gray-500 mt-1">Create a new dispute settlement case</p>
                </div>
                <button 
                  onClick={() => setShowNewDisputeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dispute Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter dispute title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dispute Type
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {Object.entries(settlementTypes).map(([key, type]) => (
                        <option key={key} value={key}>{type.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Government Entity
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter government entity name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contractor
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter contractor name"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dispute Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Describe the dispute in detail"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Submission Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Escalated">Escalated</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex flex-col items-center">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop files here, or click to select files
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOCX, XLSX up to 10MB each
                      </p>
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        Select Files
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewDisputeModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Dispute
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeSettlement;