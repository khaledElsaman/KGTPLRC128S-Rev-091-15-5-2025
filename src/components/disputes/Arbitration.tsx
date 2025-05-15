import React, { useState } from 'react';
import { Gavel, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, FileText, DollarSign, Users, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight, FileCheck, Shield } from 'lucide-react';

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Pending': 'bg-yellow-50 text-yellow-600',
    'In Progress': 'bg-blue-50 text-blue-600',
    'Resolved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600',
    'Approved': 'bg-purple-50 text-purple-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Arbitration Types based on GTPL RC 128 Article 154
const arbitrationTypes = {
  'DOMESTIC': {
    title: 'Domestic Arbitration',
    article: '154',
    requirements: [
      'Contract value exceeds SAR 100 million',
      'Ministerial approval obtained',
      'Saudi Arbitration Law applies',
      'Saudi jurisdiction'
    ]
  },
  'INTERNATIONAL': {
    title: 'International Arbitration',
    article: '154',
    requirements: [
      'Foreign contractor involved',
      'Contract value exceeds SAR 100 million',
      'Ministerial approval obtained',
      'Saudi Arbitration Law applies'
    ]
  }
};

const Arbitration = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewArbitrationModal, setShowNewArbitrationModal] = useState(false);
  const [selectedArbitration, setSelectedArbitration] = useState<any>(null);

  // Sample arbitration data
  const arbitrations = [
    {
      id: 'ARB-2024-001',
      title: 'Highway Construction Dispute',
      type: 'DOMESTIC',
      status: 'In Progress',
      submissionDate: '2024-02-15',
      contractValue: 250000000,
      parties: {
        government: 'Ministry of Transport',
        contractor: 'National Roads Co.'
      },
      description: 'Arbitration regarding cost overruns and delays in highway construction project',
      timeline: {
        ministerialApproval: '2024-01-20',
        arbitrationRequest: '2024-02-15',
        tribunalFormed: '2024-03-10',
        hearingDate: '2024-05-15',
        awardDue: '2024-07-15'
      },
      documents: [
        { name: 'Ministerial Approval.pdf', size: '1.2 MB' },
        { name: 'Arbitration Request.pdf', size: '3.5 MB' },
        { name: 'Contract Documents.pdf', size: '8.7 MB' }
      ],
      arbitrators: [
        { name: 'Dr. Ahmed Al-Mansour', role: 'Chairman' },
        { name: 'Eng. Sarah Johnson', role: 'Government Appointee' },
        { name: 'Mr. Mohammed Al-Harbi', role: 'Contractor Appointee' }
      ]
    },
    {
      id: 'ARB-2024-002',
      title: 'Airport Terminal Expansion Dispute',
      type: 'INTERNATIONAL',
      status: 'Pending',
      submissionDate: '2024-03-05',
      contractValue: 420000000,
      parties: {
        government: 'General Authority of Civil Aviation',
        contractor: 'Global Airport Developers Ltd.'
      },
      description: 'Arbitration regarding design changes and additional works in airport terminal expansion',
      timeline: {
        ministerialApproval: '2024-02-25',
        arbitrationRequest: '2024-03-05',
        tribunalFormed: 'Pending',
        hearingDate: 'TBD',
        awardDue: 'TBD'
      },
      documents: [
        { name: 'Ministerial Approval.pdf', size: '1.5 MB' },
        { name: 'Arbitration Request.pdf', size: '4.2 MB' },
        { name: 'International Contractor Agreement.pdf', size: '6.8 MB' }
      ],
      arbitrators: [
        { name: 'TBD', role: 'Chairman' },
        { name: 'Dr. Khalid Al-Saud', role: 'Government Appointee' },
        { name: 'Ms. Jennifer Smith', role: 'Contractor Appointee' }
      ]
    }
  ];

  // Filter arbitrations based on selected criteria
  const filteredArbitrations = arbitrations.filter(arbitration => {
    const matchesType = selectedType === 'all' || arbitration.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || arbitration.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      arbitration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arbitration.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Arbitration Framework under GTPL RC 128</h1>
          <p className="text-sm text-gray-500 mt-1">Arbitration mechanisms for public contracts per Article 154 of GTPL RC 128</p>
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
            onClick={() => setShowNewArbitrationModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Arbitration</span>
          </button>
        </div>
      </div>

      {/* Eligibility Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Eligibility Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center gap-2">
              <DollarSign size={20} className="text-blue-600" />
              Contract Value Threshold
            </h3>
            <p className="text-blue-700 mb-3">
              Arbitration is only permitted for contracts with a value exceeding <span className="font-bold">SAR 100 million</span>.
            </p>
            <p className="text-sm text-blue-600">
              This threshold is explicitly stated in Article 154 of GTPL RC 128 and is non-negotiable.
            </p>
          </div>
          
          <div className="p-5 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="text-lg font-medium text-purple-800 mb-3 flex items-center gap-2">
              <FileCheck size={20} className="text-purple-600" />
              Ministerial Approval
            </h3>
            <p className="text-purple-700 mb-3">
              Prior approval from the Minister of Finance is required before initiating any arbitration proceedings.
            </p>
            <p className="text-sm text-purple-600">
              This approval must be documented and included with the arbitration request.
            </p>
          </div>
        </div>
      </div>

      {/* Arbitration Conditions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Arbitration Conditions (Article 154)</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Scale size={20} className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Saudi Arbitration Law</p>
                <p className="text-sm text-gray-600 mt-1">
                  All arbitration proceedings must be conducted in accordance with the Saudi Arbitration Law and its procedures, regardless of the nationality of the parties involved.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Gavel size={20} className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Jurisdiction Restriction</p>
                <p className="text-sm text-gray-600 mt-1">
                  Saudi law must be the governing law for all arbitration proceedings involving government contracts, ensuring consistency with local legal frameworks.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Users size={20} className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">International Arbitration Exception</p>
                <p className="text-sm text-gray-600 mt-1">
                  International arbitration is only permitted for contracts with foreign entities, but still requires ministerial approval and adherence to Saudi Arbitration Law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enforcement and Appeal Process */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Enforcement and Appeal Process</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Arbitral Award Enforcement</p>
                <p className="text-sm text-gray-600 mt-1">
                  Arbitral awards must be enforced through the competent court in Saudi Arabia in accordance with the Saudi Arbitration Law.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-yellow-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Appeal Limitations</p>
                <p className="text-sm text-gray-600 mt-1">
                  Appeals against arbitral awards are limited to specific grounds as outlined in the Saudi Arbitration Law, such as lack of jurisdiction or procedural irregularities.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Time Limitations</p>
                <p className="text-sm text-gray-600 mt-1">
                  Appeals must be filed within 60 days from the date of notification of the arbitral award, as per Saudi Arbitration Law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Arbitrations</p>
              <p className="text-2xl font-semibold mt-1">{arbitrations.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Gavel size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold mt-1">{arbitrations.filter(a => a.status === 'In Progress').length}</p>
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
              <p className="text-2xl font-semibold mt-1">
                {(arbitrations.reduce((sum, a) => sum + a.contractValue, 0) / 1000000).toFixed(1)}M SAR
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
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold mt-1">{arbitrations.filter(a => a.status === 'Resolved').length}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <CheckCircle size={24} className="text-purple-600" />
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
            placeholder="Search arbitrations..."
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
          {Object.entries(arbitrationTypes).map(([key, type]) => (
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
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* Arbitrations List */}
      <div className="space-y-4">
        {filteredArbitrations.length === 0 ? (
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <Gavel size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No arbitrations found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or create a new arbitration</p>
            <button 
              onClick={() => setShowNewArbitrationModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              New Arbitration
            </button>
          </div>
        ) : (
          filteredArbitrations.map((arbitration) => (
            <div key={arbitration.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <Gavel size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{arbitration.title}</h3>
                      <StatusBadge status={arbitration.status} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{arbitration.id}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>Submitted: {arbitration.submissionDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <DollarSign size={14} />
                        <span>Contract Value: {(arbitration.contractValue / 1000000).toFixed(1)}M SAR</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Arbitration Type</p>
                  <p className="font-medium text-gray-900">{arbitrationTypes[arbitration.type as keyof typeof arbitrationTypes].title}</p>
                  <p className="text-sm text-gray-500 mt-2">Article {arbitrationTypes[arbitration.type as keyof typeof arbitrationTypes].article}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Parties</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Government Entity:</span>
                      <span className="text-sm font-medium">{arbitration.parties.government}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Contractor:</span>
                      <span className="text-sm font-medium">{arbitration.parties.contractor}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tribunal</h4>
                  <div className="space-y-2">
                    {arbitration.arbitrators.map((arbitrator: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{arbitrator.role}:</span>
                        <span className="text-sm font-medium">{arbitrator.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {arbitration.documents.map((doc: any, index: number) => (
                      <button key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-sm hover:bg-gray-100">
                        <FileText size={14} className="text-gray-400" />
                        <span className="text-gray-600">{doc.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedArbitration(arbitration)}
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

      {/* Arbitration Detail Modal */}
      {selectedArbitration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedArbitration.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Arbitration ID: {selectedArbitration.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedArbitration(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {/* Arbitration Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Arbitration Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={selectedArbitration.status} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{arbitrationTypes[selectedArbitration.type as keyof typeof arbitrationTypes].title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submission Date</p>
                        <p className="font-medium">{selectedArbitration.submissionDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contract Value</p>
                        <p className="font-medium">{selectedArbitration.contractValue.toLocaleString()} SAR</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Description</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{selectedArbitration.description}</p>
                    </div>
                  </div>

                  {/* Parties */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Parties</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Government Entity</p>
                        <p className="font-medium text-blue-900 mt-1">{selectedArbitration.parties.government}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-600">Contractor</p>
                        <p className="font-medium text-purple-900 mt-1">{selectedArbitration.parties.contractor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Arbitration Tribunal */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Arbitration Tribunal</h3>
                    <div className="space-y-3">
                      {selectedArbitration.arbitrators.map((arbitrator: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users size={20} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{arbitrator.name}</p>
                              <p className="text-sm text-gray-500">{arbitrator.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Documents</h3>
                    <div className="space-y-3">
                      {selectedArbitration.documents.map((doc: any, index: number) => (
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
                  {/* Requirements Checklist */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Requirements Checklist</h3>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="space-y-3">
                        {arbitrationTypes[selectedArbitration.type as keyof typeof arbitrationTypes].requirements.map((req, index) => (
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
                    <h3 className="text-lg font-semibold mb-4">Arbitration Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <FileCheck size={16} className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Ministerial Approval</p>
                            <span className="text-xs text-gray-500">{selectedArbitration.timeline.ministerialApproval}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Approval to proceed with arbitration</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                            <FileText size={16} className="text-purple-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Arbitration Request</p>
                            <span className="text-xs text-gray-500">{selectedArbitration.timeline.arbitrationRequest}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Formal request for arbitration</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                            <Users size={16} className="text-yellow-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Tribunal Formed</p>
                            <span className="text-xs text-gray-500">{selectedArbitration.timeline.tribunalFormed}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Arbitration tribunal established</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                            <MessageSquare size={16} className="text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Hearing Date</p>
                            <span className="text-xs text-gray-500">{selectedArbitration.timeline.hearingDate}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Arbitration hearing scheduled</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                            <Gavel size={16} className="text-red-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Award Due</p>
                            <span className="text-xs text-gray-500">{selectedArbitration.timeline.awardDue}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Final arbitration award expected</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GTPL Reference */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">GTPL RC 128 Reference</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Article {arbitrationTypes[selectedArbitration.type as keyof typeof arbitrationTypes].article}</p>
                      <p className="font-medium mt-2">Arbitration is only permitted for contracts valued above SAR 100 million</p>
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
                      <span>Share Arbitration</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Arbitration Modal */}
      {showNewArbitrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">New Arbitration</h2>
                  <p className="text-sm text-gray-500 mt-1">Create a new arbitration case</p>
                </div>
                <button 
                  onClick={() => setShowNewArbitrationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arbitration Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter arbitration title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arbitration Type
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {Object.entries(arbitrationTypes).map(([key, type]) => (
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Value (SAR)
                    </label>
                    <input
                      type="number"
                      min="100000000"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter contract value (min 100M SAR)"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be at least 100,000,000 SAR as per Article 154</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ministerial Approval Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arbitration Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Describe the arbitration case in detail"
                      required
                    />
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
                    onClick={() => setShowNewArbitrationModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Arbitration
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

export default Arbitration;