import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight, Brain, Bell, Camera, Link2, FileWarning, ClipboardList } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Record = Database['public']['Tables']['claims_contemporaneous']['Row'];
type Claim = Database['public']['Tables']['claims_master']['Row'];

// Record Types based on GTPLRC128 Articles
const recordTypes = {
  'COMMUNICATION': {
    category: 'Communication Records',
    article: '113',
    types: {
      'COM-MTG': { 
        title: 'Meeting Minutes',
        template: 'meeting_minutes',
        requiredFields: ['Date', 'Attendees', 'Decisions']
      },
      'COM-COR': { 
        title: 'Correspondence',
        template: 'correspondence',
        requiredFields: ['From', 'To', 'Subject']
      }
    }
  },
  'PROJECT': {
    category: 'Project Activities',
    article: '114',
    types: {
      'PRJ-PRG': { 
        title: 'Progress Report',
        template: 'progress_report',
        requiredFields: ['Period', 'Activities', 'Status']
      },
      'PRJ-INC': { 
        title: 'Incident Report',
        template: 'incident_report',
        requiredFields: ['Date', 'Description', 'Impact']
      }
    }
  },
  'CONTRACT': {
    category: 'Contract Events',
    article: '68',
    types: {
      'CON-CHG': { 
        title: 'Contract Changes',
        template: 'contract_change',
        requiredFields: ['Change Type', 'Description', 'Impact']
      },
      'CON-PRC': { 
        title: 'Price Adjustments',
        template: 'price_adjustment',
        requiredFields: ['Original Price', 'New Price', 'Justification']
      }
    }
  },
  'COMPLIANCE': {
    category: 'Compliance Records',
    article: '155',
    types: {
      'CMP-AUD': { 
        title: 'Audit Records',
        template: 'audit_record',
        requiredFields: ['Audit Date', 'Findings', 'Actions']
      },
      'CMP-REG': { 
        title: 'Regulatory Submissions',
        template: 'regulatory_submission',
        requiredFields: ['Authority', 'Submission Date', 'Status']
      }
    }
  }
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Active': 'bg-green-50 text-green-600',
    'Pending': 'bg-yellow-50 text-yellow-600',
    'Archived': 'bg-gray-50 text-gray-600',
    'Flagged': 'bg-red-50 text-red-600',
    'Under Review': 'bg-blue-50 text-blue-600',
    'Draft': 'bg-gray-50 text-gray-600',
    'Submitted': 'bg-yellow-50 text-yellow-600',
    'Resolved': 'bg-purple-50 text-purple-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Record Card Component
const RecordCard = ({ record, onClick }: { record: any; onClick: () => void }) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          record.type.startsWith('COM') ? 'bg-blue-50' :
          record.type.startsWith('PRJ') ? 'bg-green-50' :
          record.type.startsWith('CON') ? 'bg-purple-50' :
          'bg-orange-50'
        }`}>
          <ClipboardList size={24} className={`${
            record.type.startsWith('COM') ? 'text-blue-600' :
            record.type.startsWith('PRJ') ? 'text-green-600' :
            record.type.startsWith('CON') ? 'text-purple-600' :
            'text-orange-600'
          }`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{record.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{record.reference}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{record.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              <span>{record.time}</span>
            </div>
          </div>
        </div>
      </div>
      <StatusBadge status={record.status} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{
            Object.entries(recordTypes).find(([key, category]) => 
              Object.keys(category.types).includes(record.type)
            )?.[1].types[record.type as keyof typeof recordTypes[keyof typeof recordTypes]['types']].title
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Link2 size={16} className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Camera size={16} className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Records = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewRecordModal, setShowNewRecordModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Draft' as const,
    claim_id: '',
    event_date: new Date().toISOString().split('T')[0],
    location: '',
    type: 'COM-MTG'
  });

  useEffect(() => {
    fetchRecords();
    fetchClaims();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('claims_contemporaneous')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
      
      // If no records exist yet, use sample data
      if (records.length === 0) {
        const sampleRecords = [
          {
            id: 'REC-2024-001',
            reference: 'REC-2024-001',
            title: 'Weekly Progress Meeting Minutes',
            type: 'COM-MTG',
            status: 'Active',
            date: '2024-03-15',
            time: '10:00 AM',
            description: 'Minutes from weekly progress meeting discussing project milestones',
            location: 'Conference Room A',
            participants: ['John Smith', 'Sarah Johnson', 'Mike Chen'],
            attachments: [
              { name: 'Meeting Minutes.pdf', size: '1.2 MB' },
              { name: 'Progress Photos.zip', size: '5.4 MB' },
              { name: 'Action Items.xlsx', size: '245 KB' }
            ],
            metadata: {
              project: 'Project Alpha',
              phase: 'Execution',
              article: 'GTPL RC 128 Article 113'
            }
          },
          {
            id: 'REC-2024-002',
            reference: 'REC-2024-002',
            title: 'Site Incident Report',
            type: 'PRJ-INC',
            status: 'Under Review',
            date: '2024-03-16',
            time: '14:30 PM',
            description: 'Documentation of safety incident on construction site',
            location: 'Site Block B',
            reporter: 'Safety Officer',
            attachments: [
              { name: 'Incident Report.pdf', size: '2.1 MB' },
              { name: 'Site Photos.jpg', size: '3.8 MB' }
            ],
            metadata: {
              project: 'Project Alpha',
              phase: 'Construction',
              article: 'GTPL RC 128 Article 114'
            }
          }
        ];
        setRecords(sampleRecords as any);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchClaims = async () => {
    try {
      const { data, error } = await supabase
        .from('claims_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClaims(data || []);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('claims_contemporaneous')
        .insert([{
          title: formData.title,
          description: formData.description,
          status: formData.status,
          claim_id: formData.claim_id || null,
          created_by: 'user-id' // Replace with actual user ID
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Add the new record to the state
      const newRecord = {
        ...data,
        reference: `REC-${new Date().getFullYear()}-${String(records.length + 1).padStart(3, '0')}`,
        date: formData.event_date,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: formData.type,
        location: formData.location,
        attachments: [],
        metadata: {
          project: 'Current Project',
          phase: 'Current Phase',
          article: `GTPL RC 128 Article ${recordTypes[formData.type.split('-')[0] as keyof typeof recordTypes].article}`
        }
      };
      
      setRecords(prev => [newRecord as any, ...prev]);
      setShowNewRecordModal(false);
      setFormData({
        title: '',
        description: '',
        status: 'Draft',
        claim_id: '',
        event_date: new Date().toISOString().split('T')[0],
        location: '',
        type: 'COM-MTG'
      });
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  // Statistics calculation
  const stats = {
    total: records.length,
    active: records.filter(r => r.status === 'Active').length,
    pending: records.filter(r => r.status === 'Pending').length,
    flagged: records.filter(r => r.status === 'Flagged').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contemporaneous Records</h1>
          <p className="text-sm text-gray-500 mt-1">Records Management for GTPLRC128</p>
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
            onClick={() => setShowNewRecordModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Record</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Records</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <ClipboardList size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Records</p>
              <p className="text-2xl font-semibold mt-1">{stats.active}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold mt-1">{stats.pending}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Flagged Records</p>
              <p className="text-2xl font-semibold mt-1">{stats.flagged}</p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <AlertCircle size={24} className="text-red-600" />
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
            placeholder="Search records..."
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
          {Object.entries(recordTypes).map(([key, category]) => (
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
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Archived">Archived</option>
          <option value="Flagged">Flagged</option>
          <option value="Under Review">Under Review</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {records
          .filter(record => 
            selectedType === 'all' || (record as any).type === selectedType
          )
          .filter(record =>
            selectedStatus === 'all' || record.status === selectedStatus
          )
          .filter(record =>
            searchTerm === '' ||
            record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ((record as any).reference && (record as any).reference.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map(record => (
            <RecordCard
              key={record.id}
              record={record as any}
              onClick={() => setSelectedRecord(record)}
            />
          ))
        }
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedRecord.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedRecord.reference}</p>
                </div>
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {/* Record Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Record Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={selectedRecord.status} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{
                          Object.entries(recordTypes).find(([key, category]) => 
                            Object.keys(category.types).includes(selectedRecord.type)
                          )?.[1].types[selectedRecord.type as keyof typeof recordTypes[keyof typeof recordTypes]['types']].title
                        }</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date & Time</p>
                        <p className="font-medium">{selectedRecord.date} {selectedRecord.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{selectedRecord.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Description</h3>
                    <p className="text-gray-600">{selectedRecord.description}</p>
                  </div>

                  {/* Participants */}
                  {selectedRecord.participants && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Participants</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecord.participants.map((participant: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                            {participant}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Attachments */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Attachments</h3>
                    <div className="space-y-3">
                      {selectedRecord.attachments && selectedRecord.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <Download size={16} className="text-gray-500" />
                          </button>
                        </div>
                      ))}
                      <button className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Add Attachment</span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  {selectedRecord.metadata && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Metadata</h3>
                      <div className="space-y-2">
                        {Object.entries(selectedRecord.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-sm text-gray-500">{key}</span>
                            <span className="text-sm">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Claim */}
                  {selectedRecord.claim_id && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Related Claim</h3>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-900">
                              {claims.find(c => c.id === selectedRecord.claim_id)?.title || 'Claim'}
                            </p>
                            <p className="text-sm text-blue-700">{selectedRecord.claim_id}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Record Modal */}
      {showNewRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">New Contemporaneous Record</h2>
                  <p className="text-sm text-gray-500 mt-1">Create a new record for GTPL RC 128 compliance</p>
                </div>
                <button 
                  onClick={() => setShowNewRecordModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Record Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {Object.entries(recordTypes).map(([key, category]) => (
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
                      Related Claim (Optional)
                    </label>
                    <select
                      value={formData.claim_id}
                      onChange={(e) => setFormData({ ...formData, claim_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">None</option>
                      {claims.map(claim => (
                        <option key={claim.id} value={claim.id}>{claim.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Record Title
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
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Record Details
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
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
                      <option value="Active">Active</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex flex-col items-center">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop files here, or click to select files
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOCX, XLSX, JPG, PNG up to 10MB each
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
                    onClick={() => setShowNewRecordModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Record
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

export default Records;