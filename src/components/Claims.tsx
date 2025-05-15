import React, { useState } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Scale, Hourglass, Briefcase, Users, Clock4, AlertTriangle, CheckSquare, FileSearch, X, Upload, ArrowRight, Brain } from 'lucide-react';

// Claim Types based on GTPLRC128 Articles
const claimTypes = {
  'PRICE': {
    category: 'Price Adjustments',
    article: '68',
    types: {
      'PA-MAT': { title: 'Material Price Adjustment', deadline: '60 days' },
      'PA-LAB': { title: 'Labor Rate Adjustment', deadline: '60 days' },
      'PA-EQP': { title: 'Equipment Rate Adjustment', deadline: '60 days' }
    }
  },
  'PENALTY': {
    category: 'Penalties and Waivers',
    article: '72-74',
    types: {
      'PW-DEL': { title: 'Delay Penalty Waiver', deadline: '30 days' },
      'PW-PER': { title: 'Performance Penalty Waiver', deadline: '30 days' }
    }
  },
  'EXTENSION': {
    category: 'Contract Extensions',
    article: '74',
    types: {
      'EXT-FOR': { title: 'Force Majeure Extension', deadline: '45 days' },
      'EXT-VAR': { title: 'Variation Extension', deadline: '45 days' }
    }
  },
  'TECHNICAL': {
    category: 'Technical Disputes',
    article: '114',
    types: {
      'TD-SPEC': { title: 'Specification Dispute', deadline: '30 days' },
      'TD-DRAW': { title: 'Drawing Conflict', deadline: '30 days' }
    }
  }
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Draft': 'bg-gray-50 text-gray-600',
    'Submitted': 'bg-blue-50 text-blue-600',
    'Under Review': 'bg-yellow-50 text-yellow-600',
    'Technical Review': 'bg-purple-50 text-purple-600',
    'Legal Review': 'bg-indigo-50 text-indigo-600',
    'Approved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600',
    'Under Appeal': 'bg-orange-50 text-orange-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Document Card Component
const DocumentCard = ({ document, onDownload }: { document: any; onDownload: () => void }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-lg">
        <FileText size={16} className="text-gray-400" />
      </div>
      <div>
        <p className="font-medium text-sm">{document.name}</p>
        <p className="text-xs text-gray-500">{document.size}</p>
      </div>
    </div>
    <button 
      onClick={onDownload}
      className="p-2 hover:bg-gray-200 rounded-lg"
    >
      <Download size={16} className="text-gray-500" />
    </button>
  </div>
);

// Timeline Event Component
const TimelineEvent = ({ event }: { event: any }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
        {event.type === 'submission' && <FileText size={16} className="text-blue-600" />}
        {event.type === 'review' && <FileSearch size={16} className="text-purple-600" />}
        {event.type === 'approval' && <CheckCircle size={16} className="text-green-600" />}
        {event.type === 'rejection' && <XCircle size={16} className="text-red-600" />}
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">{event.title}</p>
        <span className="text-xs text-gray-500">{event.date}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
      {event.user && (
        <p className="text-xs text-gray-500 mt-1">By {event.user}</p>
      )}
    </div>
  </div>
);

const Claims = () => {
  const [selectedView, setSelectedView] = useState('list');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Sample claims data
  const claims = [
    {
      id: 'CLM-2024-001',
      title: 'Steel Price Variation Claim',
      type: 'PA-MAT',
      status: 'Under Review',
      submittedDate: '2024-03-15',
      amount: '$245,000',
      description: 'Claim for steel price escalation as per Article 68',
      documents: [
        { name: 'Price Analysis Report.pdf', size: '2.4 MB' },
        { name: 'Market Survey Data.pdf', size: '1.8 MB' },
        { name: 'Supplier Quotations.pdf', size: '3.2 MB' }
      ],
      timeline: [
        {
          type: 'submission',
          title: 'Claim Submitted',
          date: '2024-03-15',
          description: 'Initial submission with supporting documents',
          user: 'John Smith'
        },
        {
          type: 'review',
          title: 'Technical Review Started',
          date: '2024-03-16',
          description: 'Review of price analysis and market data',
          user: 'Technical Team'
        }
      ]
    },
    // Add more sample claims as needed
  ];

  const handleClaimClick = (claim: any) => {
    setSelectedClaim(claim);
  };

  const handleDownload = (documentName: string) => {
    console.log(`Downloading ${documentName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Claims</h1>
          <p className="text-sm text-gray-500 mt-1">GTPLRC128 Claims Management</p>
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
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Claim</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search claims..."
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
          {Object.entries(claimTypes).map(([key, category]) => (
            <optgroup key={key} label={category.category}>
              {Object.entries(category.types).map(([typeKey, type]) => (
                <option key={typeKey} value={typeKey}>{type.title}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Claims List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Claim ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Submitted</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr 
                  key={claim.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleClaimClick(claim)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="font-medium">{claim.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{claim.title}</td>
                  <td className="py-3 px-4">
                    {Object.entries(claimTypes).map(([key, category]) => 
                      Object.entries(category.types).find(([typeKey]) => typeKey === claim.type)?.[1].title
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={claim.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{claim.submittedDate}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{claim.amount}</td>
                  <td className="py-3 px-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Detail Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedClaim.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedClaim.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedClaim(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Claim Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={selectedClaim.status} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium">{selectedClaim.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submission Date</p>
                        <p>{selectedClaim.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p>{Object.entries(claimTypes).map(([key, category]) => 
                          Object.entries(category.types).find(([typeKey]) => typeKey === selectedClaim.type)?.[1].title
                        )}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Description</h3>
                    <p className="text-gray-600">{selectedClaim.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                    <div className="space-y-4">
                      {selectedClaim.timeline.map((event: any, index: number) => (
                        <TimelineEvent key={index} event={event} />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Documents</h3>
                  <div className="space-y-3">
                    {selectedClaim.documents.map((doc: any, index: number) => (
                      <DocumentCard
                        key={index}
                        document={doc}
                        onDownload={() => handleDownload(doc.name)}
                      />
                    ))}
                    <button className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                      <Upload size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Upload New Document</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Claims;