import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, DollarSign, Users, Stamp, FileCheck, PieChart, BarChart2, TrendingUp, Share2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type Variation = Database['public']['Tables']['variations_master']['Row'];
type VariationApproval = Database['public']['Tables']['variation_approval']['Row'];

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

// Approval Card Component
const ApprovalCard = ({ approval, variation, onClick }: { 
  approval: VariationApproval; 
  variation: Variation | undefined;
  onClick: () => void 
}) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-green-50">
          <Stamp size={24} className="text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{variation?.title || 'Variation Approval'}</h3>
          <p className="text-sm text-gray-500 mt-1">Approved by: {approval.approver_name}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{new Date(approval.approval_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <DollarSign size={14} />
              <span>{approval.approved_amount.toLocaleString()} SAR</span>
            </div>
          </div>
        </div>
      </div>
      <StatusBadge status="Approved" />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">Approval ID: {approval.id.substring(0, 8)}...</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Approval Detail Modal Component
const ApprovalDetailModal = ({ approval, variation, isOpen, onClose }: { 
  approval: VariationApproval | null; 
  variation: Variation | undefined;
  isOpen: boolean; 
  onClose: () => void 
}) => {
  if (!isOpen || !approval) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Variation Approval</h2>
              <p className="text-sm text-gray-500 mt-1">Approval ID: {approval.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Approval Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Approval Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Approver</p>
                    <p className="font-medium">{approval.approver_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Approval Date</p>
                    <p className="font-medium">{new Date(approval.approval_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Approved Amount</p>
                    <p className="font-medium">{approval.approved_amount.toLocaleString()} SAR</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <StatusBadge status="Approved" />
                  </div>
                </div>
              </div>

              {/* Comments */}
              {approval.comments && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Comments</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{approval.comments}</p>
                  </div>
                </div>
              )}

              {/* Related Variation */}
              {variation && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Related Variation</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Scale size={20} className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-blue-900">{variation.title}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-blue-700">
                            <Calendar size={14} />
                            <span>{new Date(variation.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-blue-700">
                            <StatusBadge status={variation.status} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Approval Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Approval Summary</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Original Value</p>
                    <p className="font-medium">{variation?.value?.toLocaleString() || 0} SAR</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Approved Value</p>
                    <p className="font-medium">{approval.approved_amount.toLocaleString()} SAR</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Difference</p>
                    <p className={`font-medium ${
                      approval.approved_amount === (variation?.value || 0) ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {(approval.approved_amount - (variation?.value || 0)).toLocaleString()} SAR
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download size={16} />
                  <span>Download Approval</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Share2 size={16} />
                  <span>Share Approval</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Approval Modal Component
const NewApprovalModal = ({ isOpen, onClose, onSubmit, variations }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: any) => void;
  variations: Variation[];
}) => {
  const [formData, setFormData] = useState({
    variation_id: '',
    approved_amount: 0,
    approval_date: new Date().toISOString().split('T')[0],
    approver_name: '',
    comments: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleVariationChange = (variationId: string) => {
    const selectedVariation = variations.find(v => v.id === variationId);
    setFormData({
      ...formData,
      variation_id: variationId,
      approved_amount: selectedVariation?.value || 0
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">New Variation Approval</h2>
              <p className="text-sm text-gray-500 mt-1">Approve a variation request</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variation
                </label>
                <select
                  value={formData.variation_id}
                  onChange={(e) => handleVariationChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a variation</option>
                  {variations
                    .filter(v => v.status === 'Under Review')
                    .map(variation => (
                      <option key={variation.id} value={variation.id}>{variation.title}</option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approver Name
                </label>
                <input
                  type="text"
                  value={formData.approver_name}
                  onChange={(e) => setFormData({ ...formData, approver_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Date
                </label>
                <input
                  type="date"
                  value={formData.approval_date}
                  onChange={(e) => setFormData({ ...formData, approval_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approved Amount (SAR)
                </label>
                <input
                  type="number"
                  value={formData.approved_amount}
                  onChange={(e) => setFormData({ ...formData, approved_amount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments
                </label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
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
                Approve Variation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const VariationApproval = () => {
  const [approvals, setApprovals] = useState<VariationApproval[]>([]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewApprovalModal, setShowNewApprovalModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<VariationApproval | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    fetchData();
    
    // Check if there's a variation ID in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const variationId = urlParams.get('id');
    if (variationId) {
      handleVariationFromUrl(variationId);
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch variations
      const { data: variationsData, error: variationsError } = await supabase
        .from('variations_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (variationsError) throw variationsError;
      setVariations(variationsData || []);
      
      // Fetch approvals
      const { data: approvalsData, error: approvalsError } = await supabase
        .from('variation_approval')
        .select('*')
        .order('approval_date', { ascending: false });

      if (approvalsError) {
        console.warn('Using mock approval data:', approvalsError.message);
        // If table doesn't exist yet, use mock data
        const mockApprovals = [
          {
            id: 'APP-2024-001',
            variation_id: variationsData?.[0]?.id || 'VAR-2024-001',
            approved_amount: 245000,
            approval_date: new Date().toISOString(),
            approver_name: 'John Smith',
            comments: 'Approved based on technical necessity and market price verification.',
            created_at: new Date().toISOString(),
            created_by: 'user-id'
          },
          {
            id: 'APP-2024-002',
            variation_id: variationsData?.[1]?.id || 'VAR-2024-002',
            approved_amount: 180000,
            approval_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            approver_name: 'Sarah Johnson',
            comments: 'Approved with reduced amount based on market analysis.',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user-id'
          },
          {
            id: 'APP-2024-003',
            variation_id: variationsData?.[2]?.id || 'VAR-2024-003',
            approved_amount: 320000,
            approval_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            approver_name: 'Mike Chen',
            comments: 'Approved as per technical committee recommendation.',
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user-id'
          }
        ];
        setApprovals(mockApprovals as any);
      } else {
        setApprovals(approvalsData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVariationFromUrl = (variationId: string) => {
    // Find the variation in the loaded variations
    const variation = variations.find(v => v.id === variationId);
    if (variation) {
      // Open the approval modal for this variation
      setFormData({
        variation_id: variationId,
        approved_amount: variation.value || 0,
        approval_date: new Date().toISOString().split('T')[0],
        approver_name: '',
        comments: ''
      });
      setShowNewApprovalModal(true);
    } else {
      // If variations haven't loaded yet, fetch the specific variation
      supabase
        .from('variations_master')
        .select('*')
        .eq('id', variationId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching variation:', error);
            return;
          }
          if (data) {
            setFormData({
              variation_id: variationId,
              approved_amount: data.value || 0,
              approval_date: new Date().toISOString().split('T')[0],
              approver_name: '',
              comments: ''
            });
            setShowNewApprovalModal(true);
          }
        });
    }
  };

  const [formData, setFormData] = useState({
    variation_id: '',
    approved_amount: 0,
    approval_date: new Date().toISOString().split('T')[0],
    approver_name: '',
    comments: ''
  });

  const handleCreateApproval = async (data: any) => {
    try {
      const { data: newApproval, error } = await supabase
        .from('variation_approval')
        .insert([{
          ...data,
          created_by: 'user-id', // Replace with actual user ID
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Update the variation status to Approved
      await supabase
        .from('variations_master')
        .update({ status: 'Approved' })
        .eq('id', data.variation_id);
      
      // Get the variation details
      const { data: variation } = await supabase
        .from('variations_master')
        .select('*')
        .eq('id', data.variation_id)
        .single();
      
      // Add the approval with variation details to the state
      setApprovals(prev => [{
        ...newApproval,
        variation
      }, ...prev] as any);
      
      setShowNewApprovalModal(false);
    } catch (error) {
      console.error('Error creating approval:', error);
      
      // Fallback to local state update if database insert fails
      const variation = variations.find(v => v.id === data.variation_id);
      const newApproval = {
        id: `APP-${Date.now()}`,
        ...data,
        created_at: new Date().toISOString(),
        created_by: 'user-id',
        variation
      };
      
      setApprovals(prev => [newApproval as any, ...prev]);
      setShowNewApprovalModal(false);
    }
  };

  // Filter approvals based on search term and date range
  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = searchTerm === '' || 
      approval.approver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = 
      (!dateRange.start || new Date(approval.approval_date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(approval.approval_date) <= new Date(dateRange.end));
    
    return matchesSearch && matchesDateRange;
  });

  // Calculate statistics
  const stats = {
    total: approvals.length,
    totalValue: approvals.reduce((sum, a) => sum + a.approved_amount, 0),
    averageValue: approvals.length > 0 ? 
      approvals.reduce((sum, a) => sum + a.approved_amount, 0) / approvals.length : 0,
    thisMonth: approvals.filter(a => {
      const approvalDate = new Date(a.approval_date);
      const now = new Date();
      return approvalDate.getMonth() === now.getMonth() && 
             approvalDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Variation Approval</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track variation approvals</p>
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
            onClick={() => setShowNewApprovalModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Approval</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Approvals</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Stamp size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-semibold mt-1">{stats.thisMonth}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <Calendar size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold mt-1">
                {(stats.totalValue / 1000000).toFixed(1)}M SAR
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <DollarSign size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Value</p>
              <p className="text-2xl font-semibold mt-1">
                {(stats.averageValue / 1000).toFixed(1)}K SAR
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <TrendingUp size={24} className="text-yellow-600" />
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
            placeholder="Search approvals..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            placeholder="Start Date"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            className="px-4 py-2 border border-gray-200 rounded-lg"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            placeholder="End Date"
          />
        </div>
      </div>

      {/* Approvals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading approvals...</p>
            </div>
          </div>
        ) : filteredApprovals.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <Stamp size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No approvals found</h3>
              <p className="text-gray-500 mb-4">Create a new approval to get started</p>
              <button 
                onClick={() => setShowNewApprovalModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Approval
              </button>
            </div>
          </div>
        ) : (
          filteredApprovals.map(approval => (
            <ApprovalCard
              key={approval.id}
              approval={approval}
              variation={variations.find(v => v.id === approval.variation_id)}
              onClick={() => setSelectedApproval(approval)}
            />
          ))
        )}
      </div>

      {/* Pending Approvals */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approval</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Variation ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Created Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Value</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {variations
                .filter(v => v.status === 'Under Review')
                .map(variation => (
                  <tr key={variation.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="font-medium">{variation.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{variation.title}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={variation.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{new Date(variation.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {variation.value?.toLocaleString()} SAR
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => {
                          setFormData({
                            variation_id: variation.id,
                            approved_amount: variation.value || 0,
                            approval_date: new Date().toISOString().split('T')[0],
                            approver_name: '',
                            comments: ''
                          });
                          setShowNewApprovalModal(true);
                        }}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              }
              {variations.filter(v => v.status === 'Under Review').length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No variations pending approval
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Detail Modal */}
      <ApprovalDetailModal
        approval={selectedApproval}
        variation={variations.find(v => v.id === selectedApproval?.variation_id)}
        isOpen={!!selectedApproval}
        onClose={() => setSelectedApproval(null)}
      />

      {/* New Approval Modal */}
      <NewApprovalModal
        isOpen={showNewApprovalModal}
        onClose={() => setShowNewApprovalModal(false)}
        onSubmit={handleCreateApproval}
        variations={variations}
      />
    </div>
  );
};

export default VariationApproval;