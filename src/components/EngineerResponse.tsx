import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight, Brain, Bell, FileWarning, ClipboardList, Send, UserCheck, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

// Response Types based on GTPL RC 128
const responseTypes = {
  'TECHNICAL': {
    category: 'Technical Response',
    types: {
      'TECH-REV': { 
        title: 'Technical Review',
        template: 'tech_review',
        deadline: '14 days',
        requiredDocs: ['Technical Analysis', 'Site Inspection Report']
      },
      'TECH-VAL': { 
        title: 'Technical Validation',
        template: 'tech_validation',
        deadline: '7 days',
        requiredDocs: ['Validation Report', 'Compliance Check']
      }
    }
  },
  'FINANCIAL': {
    category: 'Financial Response',
    types: {
      'FIN-REV': { 
        title: 'Financial Review',
        template: 'fin_review',
        deadline: '21 days',
        requiredDocs: ['Cost Analysis', 'Market Study']
      },
      'FIN-VAL': { 
        title: 'Financial Validation',
        template: 'fin_validation',
        deadline: '10 days',
        requiredDocs: ['Validation Report', 'Rate Analysis']
      }
    }
  },
  'CONTRACTUAL': {
    category: 'Contractual Response',
    types: {
      'CON-REV': { 
        title: 'Contract Review',
        template: 'contract_review',
        deadline: '30 days',
        requiredDocs: ['Legal Analysis', 'Precedent Study']
      },
      'CON-VAL': { 
        title: 'Contract Validation',
        template: 'contract_validation',
        deadline: '15 days',
        requiredDocs: ['Validation Report', 'Compliance Check']
      }
    }
  }
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Draft': 'bg-gray-50 text-gray-600',
    'Submitted': 'bg-blue-50 text-blue-600',
    'Under Review': 'bg-yellow-50 text-yellow-600',
    'Approved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Response Card Component
const ResponseCard = ({ response, onClick }: { response: any; onClick: () => void }) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          response.type.startsWith('TECH') ? 'bg-blue-50' :
          response.type.startsWith('FIN') ? 'bg-green-50' :
          'bg-purple-50'
        }`}>
          <MessageSquare size={24} className={`${
            response.type.startsWith('TECH') ? 'text-blue-600' :
            response.type.startsWith('FIN') ? 'text-green-600' :
            'text-purple-600'
          }`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{response.title}</h3>
          <p className="text-sm text-gray-500">{response.reference}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{response.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              <span>{response.deadline}</span>
            </div>
          </div>
        </div>
      </div>
      <StatusBadge status={response.status} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{
            Object.entries(responseTypes).find(([key, category]) => 
              Object.keys(category.types).includes(response.type)
            )?.[1].types[response.type as keyof typeof responseTypes[keyof typeof responseTypes]['types']].title
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Send size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 size={16} className="text-purple-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Response Detail Modal Component
const ResponseDetailModal = ({ response, isOpen, onClose }: { response: any; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{response.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{response.reference}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Response Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Response Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <StatusBadge status={response.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{
                      Object.entries(responseTypes).find(([key, category]) => 
                        Object.keys(category.types).includes(response.type)
                      )?.[1].types[response.type as keyof typeof responseTypes[keyof typeof responseTypes]['types']].title
                    }</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Claim Reference</p>
                    <p className="font-medium">{response.claimReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium">{response.deadline}</p>
                  </div>
                </div>
              </div>

              {/* Response Content */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Response Content</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{response.description}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Response Timeline</h3>
                <div className="space-y-4">
                  {response.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          {event.type === 'submission' && <FileText size={16} className="text-blue-600" />}
                          {event.type === 'review' && <FileSearch size={16} className="text-purple-600" />}
                        </div>
                      </div>
                      <div>
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
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Supporting Documents */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Supporting Documents</h3>
                <div className="space-y-3">
                  {response.documents.map((doc: any, index: number) => (
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
                    <span className="text-sm text-gray-600">Add Document</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Send size={16} />
                  <span>Submit Response</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Share2 size={16} />
                  <span>Share Response</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Download size={16} />
                  <span>Download as PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Response Modal Component
const NewResponseModal = ({ isOpen, onClose, onSubmit, notices }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: any) => void;
  notices: any[];
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'TECH-REV',
    noticeId: '',
    description: '',
    status: 'Draft' as const,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">New Engineer Response</h2>
              <p className="text-sm text-gray-500 mt-1">Create a new response to a claim notice</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {Object.entries(responseTypes).map(([key, category]) => (
                    <optgroup key={key} label={category.category}>
                      {Object.entries(category.types).map(([typeKey, type]) => (
                        <option key={typeKey} value={typeKey}>{type.title}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Notice
                </label>
                <select
                  value={formData.noticeId}
                  onChange={(e) => setFormData({ ...formData, noticeId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a notice</option>
                  {notices.map(notice => (
                    <option key={notice.id} value={notice.id}>{notice.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Deadline
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Content
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
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
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Response
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EngineerResponse = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewResponseModal, setShowNewResponseModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('claims_notice')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample responses data
  const responses = [
    {
      id: 'RES-2024-001',
      reference: 'RES-2024-001',
      title: 'Technical Review - Steel Price Variation',
      type: 'TECH-REV',
      status: 'Under Review',
      date: '2024-03-15',
      deadline: '2024-03-29',
      claimReference: 'CLM-2024-001',
      description: 'Technical review of steel price variation claim. The analysis confirms that the price increase is in line with market trends and exceeds the threshold specified in Article 68 of GTPL RC 128. The claim is technically valid and supported by appropriate documentation.',
      documents: [
        { name: 'Technical Analysis.pdf', size: '2.4 MB' },
        { name: 'Market Study.pdf', size: '1.8 MB' },
        { name: 'Site Report.pdf', size: '3.2 MB' }
      ],
      timeline: [
        {
          type: 'submission',
          title: 'Response Initiated',
          date: '2024-03-15',
          description: 'Initial technical review started',
          user: 'John Smith'
        },
        {
          type: 'review',
          title: 'Site Inspection Complete',
          date: '2024-03-16',
          description: 'Site inspection and material verification completed',
          user: 'Technical Team'
        }
      ]
    },
    {
      id: 'RES-2024-002',
      reference: 'RES-2024-002',
      title: 'Financial Review - Labor Rate Adjustment',
      type: 'FIN-REV',
      status: 'Submitted',
      date: '2024-03-10',
      deadline: '2024-03-31',
      claimReference: 'CLM-2024-002',
      description: 'Financial review of labor rate adjustment claim. The analysis confirms that the rate increase is justified based on current market conditions and government regulations.',
      documents: [
        { name: 'Financial Analysis.pdf', size: '3.1 MB' },
        { name: 'Labor Market Report.pdf', size: '2.2 MB' }
      ],
      timeline: [
        {
          type: 'submission',
          title: 'Response Initiated',
          date: '2024-03-10',
          description: 'Initial financial review started',
          user: 'Sarah Johnson'
        }
      ]
    },
    {
      id: 'RES-2024-003',
      reference: 'RES-2024-003',
      title: 'Contract Review - Time Extension Request',
      type: 'CON-REV',
      status: 'Draft',
      date: '2024-03-12',
      deadline: '2024-04-11',
      claimReference: 'CLM-2024-003',
      description: 'Contractual review of time extension request. Preliminary analysis indicates that the request has merit under Article 74 of GTPL RC 128.',
      documents: [
        { name: 'Contract Analysis.pdf', size: '4.5 MB' }
      ],
      timeline: [
        {
          type: 'submission',
          title: 'Response Initiated',
          date: '2024-03-12',
          description: 'Initial contractual review started',
          user: 'Michael Chen'
        }
      ]
    }
  ];

  const handleCreateResponse = (data: any) => {
    console.log('Creating new response:', data);
    // In a real implementation, you would save this to the database
    setShowNewResponseModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Engineer Response</h1>
          <p className="text-sm text-gray-500 mt-1">GTPLRC128 Response Management</p>
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
            onClick={() => setShowNewResponseModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Response</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Reviews</p>
              <p className="text-2xl font-semibold mt-1">24</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed Reviews</p>
              <p className="text-2xl font-semibold mt-1">156</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-2xl font-semibold mt-1">3</p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Response Rate</p>
              <p className="text-2xl font-semibold mt-1">94%</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <UserCheck size={24} className="text-blue-600" />
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
            placeholder="Search responses..."
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
          {Object.entries(responseTypes).map(([key, category]) => (
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

      {/* Responses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {responses
          .filter(response => 
            selectedType === 'all' || response.type === selectedType
          )
          .filter(response =>
            selectedStatus === 'all' || response.status === selectedStatus
          )
          .filter(response =>
            searchTerm === '' ||
            response.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            response.reference.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(response => (
            <ResponseCard
              key={response.id}
              response={response}
              onClick={() => setSelectedResponse(response)}
            />
          ))
        }
      </div>

      {/* Response Detail Modal */}
      <ResponseDetailModal
        response={selectedResponse}
        isOpen={!!selectedResponse}
        onClose={() => setSelectedResponse(null)}
      />

      {/* New Response Modal */}
      <NewResponseModal
        isOpen={showNewResponseModal}
        onClose={() => setShowNewResponseModal(false)}
        onSubmit={handleCreateResponse}
        notices={notices}
      />
    </div>
  );
};

export default EngineerResponse;