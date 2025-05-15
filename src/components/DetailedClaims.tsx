import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight, Brain, DollarSign, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type DetailedClaim = Database['public']['Tables']['claims_detailed']['Row'];

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

const DetailedClaims = () => {
  const [claims, setClaims] = useState<DetailedClaim[]>([]);
  const [masterClaims, setMasterClaims] = useState<Database['public']['Tables']['claims_master']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<DetailedClaim | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    time_impact: 0,
    cost_impact: 0,
    status: 'Draft' as const,
    claim_id: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchClaims();
    fetchMasterClaims();
    
    // Check if there's a claim ID in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const claimId = urlParams.get('id');
    if (claimId) {
      handleClaimFromUrl(claimId);
    }
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('claims_detailed')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClaims(data || []);
    } catch (error) {
      console.error('Error fetching claims:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMasterClaims = async () => {
    try {
      const { data, error } = await supabase
        .from('claims_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMasterClaims(data || []);
    } catch (error) {
      console.error('Error fetching master claims:', error);
    }
  };

  const handleClaimFromUrl = (claimId: string) => {
    // Find the master claim
    supabase
      .from('claims_master')
      .select('*')
      .eq('id', claimId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching claim:', error);
          return;
        }
        if (data) {
          setFormData({
            title: data.title,
            details: data.description || '',
            time_impact: 0,
            cost_impact: data.value || 0,
            status: data.status,
            claim_id: data.id
          });
          setShowNewClaimModal(true);
        }
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('claims_detailed')
        .insert([{
          ...formData,
          created_by: 'user-id', // Replace with actual user ID
          submission_date: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      setClaims(prev => [data, ...prev]);
      setShowNewClaimModal(false);
      setFormData({
        title: '',
        details: '',
        time_impact: 0,
        cost_impact: 0,
        status: 'Draft',
        claim_id: ''
      });
    } catch (error) {
      console.error('Error creating claim:', error);
    }
  };

  // Filter claims based on search term and status
  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (claim.details && claim.details.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detailed Claims</h1>
          <p className="text-sm text-gray-500 mt-1">Manage detailed claims and impacts</p>
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
            onClick={() => setShowNewClaimModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Claim</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Claims</p>
              <p className="text-2xl font-semibold mt-1">{claims.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Time Impact</p>
              <p className="text-2xl font-semibold mt-1">
                {claims.reduce((sum, claim) => sum + (claim.time_impact || 0), 0)} days
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
              <p className="text-sm text-gray-500">Cost Impact</p>
              <p className="text-2xl font-semibold mt-1">
                {(claims.reduce((sum, claim) => sum + (claim.cost_impact || 0), 0) / 1000000).toFixed(1)}M SAR
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
              <p className="text-sm text-gray-500">Under Review</p>
              <p className="text-2xl font-semibold mt-1">
                {claims.filter(c => c.status === 'Under Review').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <AlertCircle size={24} className="text-purple-600" />
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
            placeholder="Search detailed claims..."
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

      {/* Claims Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Claim Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Details</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Time Impact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Cost Impact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Submission Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    Loading claims...
                  </td>
                </tr>
              ) : filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No claims found
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{claim.title}</td>
                    <td className="py-3 px-4">{claim.details}</td>
                    <td className="py-3 px-4">{claim.time_impact} days</td>
                    <td className="py-3 px-4">{claim.cost_impact?.toLocaleString()} SAR</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={claim.status} />
                    </td>
                    <td className="py-3 px-4">
                      {claim.submission_date && new Date(claim.submission_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedClaim(claim)}
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

      {/* New Claim Modal */}
      {showNewClaimModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">New Detailed Claim</h2>
                <button 
                  onClick={() => setShowNewClaimModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Master Claim
                  </label>
                  <select
                    value={formData.claim_id}
                    onChange={(e) => {
                      const selectedClaim = masterClaims.find(c => c.id === e.target.value);
                      if (selectedClaim) {
                        setFormData({
                          ...formData,
                          claim_id: selectedClaim.id,
                          title: selectedClaim.title,
                          details: selectedClaim.description || '',
                          cost_impact: selectedClaim.value || 0,
                          status: selectedClaim.status
                        });
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a master claim (optional)</option>
                    {masterClaims.map(claim => (
                      <option key={claim.id} value={claim.id}>{claim.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Claim Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Impact (Days)
                    </label>
                    <input
                      type="number"
                      value={formData.time_impact}
                      onChange={(e) => setFormData({ ...formData, time_impact: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost Impact (SAR)
                    </label>
                    <input
                      type="number"
                      value={formData.cost_impact}
                      onChange={(e) => setFormData({ ...formData, cost_impact: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Details
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewClaimModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Claim Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedClaim.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">Detailed Claim ID: {selectedClaim.id}</p>
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
                  {/* Claim Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Claim Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <StatusBadge status={selectedClaim.status} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Submission Date</p>
                        <p className="font-medium">
                          {selectedClaim.submission_date ? 
                            new Date(selectedClaim.submission_date).toLocaleDateString() : 
                            'Not submitted'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time Impact</p>
                        <p className="font-medium">{selectedClaim.time_impact} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cost Impact</p>
                        <p className="font-medium">{selectedClaim.cost_impact?.toLocaleString()} SAR</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Detailed Description</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{selectedClaim.details}</p>
                    </div>
                  </div>

                  {/* Related Master Claim */}
                  {selectedClaim.claim_id && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Related Master Claim</h3>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <FileText size={20} className="text-blue-600 mt-1" />
                          <div>
                            <p className="font-medium text-blue-900">
                              {masterClaims.find(c => c.id === selectedClaim.claim_id)?.title || 'Master Claim'}
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              ID: {selectedClaim.claim_id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Impact Summary */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Impact Summary</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock size={20} className="text-yellow-600" />
                            <p className="font-medium text-yellow-900">Time Impact</p>
                          </div>
                          <p className="font-semibold text-yellow-900">{selectedClaim.time_impact} days</p>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DollarSign size={20} className="text-green-600" />
                            <p className="font-medium text-green-900">Cost Impact</p>
                          </div>
                          <p className="font-semibold text-green-900">{selectedClaim.cost_impact?.toLocaleString()} SAR</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Claim Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <FileText size={16} className="text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Claim Created</p>
                            <span className="text-xs text-gray-500">
                              {new Date(selectedClaim.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Initial detailed claim created</p>
                        </div>
                      </div>
                      {selectedClaim.submission_date && (
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                              <Upload size={16} className="text-green-600" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">Claim Submitted</p>
                              <span className="text-xs text-gray-500">
                                {new Date(selectedClaim.submission_date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Detailed claim submitted for review</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download size={16} />
                      <span>Download Claim</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Share2 size={16} />
                      <span>Share Claim</span>
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

export default DetailedClaims;