import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight, Brain } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Notice = Database['public']['Tables']['claims_notice']['Row'];
type Claim = Database['public']['Tables']['claims_master']['Row'];

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Draft': 'bg-gray-50 text-gray-600',
    'Submitted': 'bg-yellow-50 text-yellow-600',
    'Under Review': 'bg-blue-50 text-blue-600',
    'Approved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600',
    'Resolved': 'bg-purple-50 text-purple-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

const NoticeOfClaims = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewNoticeModal, setShowNewNoticeModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    claim_reference: '',
    notice_date: new Date().toISOString().split('T')[0],
    event_description: '',
    project_name: '',
    title: '',
    description: '',
    status: 'Draft' as const,
    claim_id: ''
  });

  useEffect(() => {
    fetchNotices();
    fetchClaims();
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
        .from('claims_notice')
        .insert([{
          ...formData,
          created_by: 'user-id', // Replace with actual user ID
          notice_date: new Date(formData.notice_date).toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      setNotices(prev => [data, ...prev]);
      setShowNewNoticeModal(false);
      setFormData({
        claim_reference: '',
        notice_date: new Date().toISOString().split('T')[0],
        event_description: '',
        project_name: '',
        title: '',
        description: '',
        status: 'Draft',
        claim_id: ''
      });
    } catch (error) {
      console.error('Error creating notice:', error);
    }
  };

  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
  };

  // Filter notices based on search term and status
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notice.claim_reference && notice.claim_reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (notice.project_name && notice.project_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || notice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notice of Claims</h1>
          <p className="text-sm text-gray-500 mt-1">Manage claim notices</p>
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
            onClick={() => setShowNewNoticeModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Notice</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Notices</p>
              <p className="text-2xl font-semibold mt-1">{notices.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold mt-1">
                {notices.filter(n => n.status === 'Submitted').length}
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
                {notices.filter(n => n.status === 'Approved').length}
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
                {notices.filter(n => n.status === 'Rejected').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <XCircle size={24} className="text-red-600" />
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
            placeholder="Search notices..."
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
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Notice Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Claim Reference</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Project</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Notice Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Loading notices...
                  </td>
                </tr>
              ) : filteredNotices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No notices found
                  </td>
                </tr>
              ) : (
                filteredNotices.map((notice) => (
                  <tr key={notice.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{notice.title}</td>
                    <td className="py-3 px-4">{notice.claim_reference || '-'}</td>
                    <td className="py-3 px-4">{notice.project_name || '-'}</td>
                    <td className="py-3 px-4">
                      {notice.notice_date && new Date(notice.notice_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={notice.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewNotice(notice)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MessageSquare size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Share2 size={16} className="text-purple-600" />
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

      {/* New Notice Modal */}
      {showNewNoticeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">New Notice of Claim</h2>
                <button 
                  onClick={() => setShowNewNoticeModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Linked Claim ID
                    </label>
                    <select
                      value={formData.claim_id}
                      onChange={(e) => {
                        const selectedClaim = claims.find(c => c.id === e.target.value);
                        setFormData({
                          ...formData,
                          claim_id: e.target.value,
                          title: selectedClaim ? `Notice for ${selectedClaim.title}` : formData.title
                        });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a claim (optional)</option>
                      {claims.map(claim => (
                        <option key={claim.id} value={claim.id}>{claim.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Reference
                    </label>
                    <input
                      type="text"
                      value={formData.claim_reference}
                      onChange={(e) => setFormData({ ...formData, claim_reference: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notice Title
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
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={formData.project_name}
                      onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notice Date
                    </label>
                    <input
                      type="date"
                      value={formData.notice_date}
                      onChange={(e) => setFormData({ ...formData, notice_date: e.target.value })}
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
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Description
                    </label>
                    <textarea
                      value={formData.event_description}
                      onChange={(e) => setFormData({ ...formData, event_description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewNoticeModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Notice
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedNotice.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Notice ID: {selectedNotice.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  {/* Notice Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notice Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={selectedNotice.status} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Claim Reference</p>
                        <p className="font-medium">{selectedNotice.claim_reference || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Project</p>
                        <p className="font-medium">{selectedNotice.project_name || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Notice Date</p>
                        <p className="font-medium">
                          {selectedNotice.notice_date ? new Date(selectedNotice.notice_date).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Event Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Event Description</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{selectedNotice.event_description || selectedNotice.description || 'No description provided.'}</p>
                    </div>
                  </div>

                  {/* Related Claim */}
                  {selectedNotice.claim_id && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Related Claim</h3>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <FileText size={20} className="text-blue-600 mt-1" />
                          <div>
                            <p className="font-medium text-blue-900">
                              {claims.find(c => c.id === selectedNotice.claim_id)?.title || 'Claim'}
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              ID: {selectedNotice.claim_id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notice Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <FileText size={16} className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Notice Created</p>
                            <span className="text-xs text-gray-500">
                              {new Date(selectedNotice.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Initial notice submission</p>
                        </div>
                      </div>

                      {selectedNotice.last_updated_at && selectedNotice.last_updated_at !== selectedNotice.created_at && (
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                              <History size={16} className="text-purple-600" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">Notice Updated</p>
                              <span className="text-xs text-gray-500">
                                {new Date(selectedNotice.last_updated_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Notice details updated</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download size={16} />
                      <span>Download Notice</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Share2 size={16} />
                      <span>Share Notice</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <MessageSquare size={16} />
                      <span>Add Comment</span>
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

export default NoticeOfClaims;