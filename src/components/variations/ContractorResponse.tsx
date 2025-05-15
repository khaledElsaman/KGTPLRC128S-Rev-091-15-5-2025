import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, MessageSquare, Users, Share2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type VariationResponse = Database['public']['Tables']['variations_response']['Row'];
type VariationNotice = Database['public']['Tables']['variations_notice']['Row'];
type Variation = Database['public']['Tables']['variations_master']['Row'];

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

// Response Card Component
const ResponseCard = ({ response, variation, onClick }: { 
  response: VariationResponse; 
  variation: Variation | undefined;
  onClick: () => void 
}) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-50">
          <MessageSquare size={24} className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{response.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{variation?.title || 'Variation'}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{new Date(response.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      <StatusBadge status={response.status} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">Response ID: {response.id.substring(0, 8)}...</span>
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

// Response Detail Modal Component
const ResponseDetailModal = ({ response, variation, isOpen, onClose }: { 
  response: VariationResponse | null; 
  variation: Variation | undefined;
  isOpen: boolean; 
  onClose: () => void 
}) => {
  if (!isOpen || !response) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{response.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Response ID: {response.id}</p>
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
              {/* Response Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Response Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <StatusBadge status={response.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created Date</p>
                    <p className="font-medium">{new Date(response.created_at).toLocaleDateString()}</p>
                  </div>
                  {response.last_updated_at && (
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(response.last_updated_at).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Response Content */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Response Content</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{response.description || 'No description provided.'}</p>
                </div>
              </div>

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
              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Response Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <MessageSquare size={16} className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">Response Created</p>
                        <span className="text-xs text-gray-500">
                          {new Date(response.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Initial response created</p>
                    </div>
                  </div>
                  
                  {response.last_updated_at && response.last_updated_at !== response.created_at && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                          <Clock size={16} className="text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">Response Updated</p>
                          <span className="text-xs text-gray-500">
                            {new Date(response.last_updated_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Response details updated</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download size={16} />
                  <span>Download Response</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Share2 size={16} />
                  <span>Share Response</span>
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
  );
};

const ContractorResponse = () => {
  const [responses, setResponses] = useState<VariationResponse[]>([]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [notices, setNotices] = useState<VariationNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewResponseModal, setShowNewResponseModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<VariationResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    variation_id: '',
    title: '',
    description: '',
    status: 'Draft' as const
  });

  useEffect(() => {
    fetchData();
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
      
      // Fetch notices
      const { data: noticesData, error: noticesError } = await supabase
        .from('variations_notice')
        .select('*')
        .order('created_at', { ascending: false });

      if (noticesError) {
        console.warn('Using mock notice data:', noticesError.message);
        // If table doesn't exist yet, use mock data
        setNotices([]);
      } else {
        setNotices(noticesData || []);
      }
      
      // Fetch responses
      const { data: responsesData, error: responsesError } = await supabase
        .from('variations_response')
        .select('*')
        .order('created_at', { ascending: false });

      if (responsesError) {
        console.warn('Using mock response data:', responsesError.message);
        // If table doesn't exist yet, use mock data
        const mockResponses = [
          {
            id: 'RES-2024-001',
            variation_id: variationsData?.[0]?.id || 'VAR-2024-001',
            title: 'Response to Foundation Design Change',
            description: 'We acknowledge the foundation design change and agree with the proposed modifications. We request a detailed schedule for implementation.',
            created_at: new Date().toISOString(),
            status: 'Submitted',
            created_by: 'user-id',
            last_updated_at: new Date().toISOString(),
            last_updated_by: 'user-id'
          },
          {
            id: 'RES-2024-002',
            variation_id: variationsData?.[1]?.id || 'VAR-2024-002',
            title: 'Response to Steel Reinforcement Specification',
            description: 'We have reviewed the steel reinforcement specification changes and have concerns about material availability. We propose an alternative specification that meets structural requirements.',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Under Review',
            created_by: 'user-id',
            last_updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            last_updated_by: 'user-id'
          },
          {
            id: 'RES-2024-003',
            variation_id: variationsData?.[2]?.id || 'VAR-2024-003',
            title: 'Response to Additional Drainage Works',
            description: 'We accept the additional drainage works and have prepared a detailed implementation plan. We request a time extension of 14 days to accommodate these works.',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Approved',
            created_by: 'user-id',
            last_updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            last_updated_by: 'user-id'
          }
        ];
        setResponses(mockResponses as any);
      } else {
        setResponses(responsesData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('variations_response')
        .insert([{
          ...formData,
          created_by: 'user-id', // Replace with actual user ID
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating response:', error);
        // Fallback to local state update if database insert fails
        const newResponse = {
          id: `RES-${Date.now()}`,
          ...formData,
          created_at: new Date().toISOString(),
          created_by: 'user-id',
          last_updated_at: new Date().toISOString(),
          last_updated_by: 'user-id'
        };
        
        setResponses(prev => [newResponse as any, ...prev]);
      } else {
        setResponses(prev => [data, ...prev]);
      }
      
      setShowNewResponseModal(false);
      setFormData({
        variation_id: '',
        title: '',
        description: '',
        status: 'Draft'
      });
    } catch (error) {
      console.error('Error creating response:', error);
    }
  };

  // Filter responses based on search term and status
  const filteredResponses = responses.filter(response => {
    const matchesSearch = searchTerm === '' || 
      response.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (response.description && response.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || response.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contractor Response</h1>
          <p className="text-sm text-gray-500 mt-1">Manage responses to variation notices</p>
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Responses</p>
              <p className="text-2xl font-semibold mt-1">{responses.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <MessageSquare size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold mt-1">
                {responses.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length}
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
                {responses.filter(r => r.status === 'Approved').length}
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
                {responses.filter(r => r.status === 'Rejected').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Responses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading responses...</p>
            </div>
          </div>
        ) : filteredResponses.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No responses found</h3>
              <p className="text-gray-500 mb-4">Create a new response to get started</p>
              <button 
                onClick={() => setShowNewResponseModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Response
              </button>
            </div>
          </div>
        ) : (
          filteredResponses.map(response => (
            <ResponseCard
              key={response.id}
              response={response}
              variation={variations.find(v => v.id === response.variation_id)}
              onClick={() => setSelectedResponse(response)}
            />
          ))
        )}
      </div>

      {/* New Response Modal */}
      {showNewResponseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">New Contractor Response</h2>
                <button 
                  onClick={() => setShowNewResponseModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Related Variation
                  </label>
                  <select
                    value={formData.variation_id}
                    onChange={(e) => setFormData({ ...formData, variation_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Variation</option>
                    {variations.map(variation => (
                      <option key={variation.id} value={variation.id}>
                        {variation.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
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

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewResponseModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Response
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Response Detail Modal */}
      <ResponseDetailModal
        response={selectedResponse}
        variation={variations.find(v => v.id === selectedResponse?.variation_id)}
        isOpen={!!selectedResponse}
        onClose={() => setSelectedResponse(null)}
      />
    </div>
  );
};

export default ContractorResponse;