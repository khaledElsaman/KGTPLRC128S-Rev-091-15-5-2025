import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight, Brain, Scale, Hourglass, Briefcase, Users, Clock4, AlertTriangle, CheckSquare, FileSearch, DollarSign, Handshake, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

// Resolution Types based on GTPL RC 128 Articles
const resolutionTypes = {
  'ARBITRATION': {
    category: 'Arbitration',
    article: '154-155',
    types: {
      'ARB-STD': { 
        title: 'Standard Arbitration',
        timeline: '30 days',
        requiredDocs: ['Claim Details', 'Supporting Evidence', 'Expert Reports']
      },
      'ARB-EXP': { 
        title: 'Expedited Arbitration',
        timeline: '15 days',
        requiredDocs: ['Summary of Dispute', 'Key Evidence', 'Proposed Resolution']
      }
    }
  },
  'APPEAL': {
    category: 'Appeals',
    article: '86-88',
    types: {
      'APP-PEN': { 
        title: 'Penalty Appeal',
        timeline: '14 days',
        requiredDocs: ['Penalty Notice', 'Justification', 'Supporting Documents']
      },
      'APP-DEC': { 
        title: 'Decision Appeal',
        timeline: '30 days',
        requiredDocs: ['Original Decision', 'Appeal Grounds', 'New Evidence']
      }
    }
  },
  'COMMITTEE': {
    category: 'Committee Review',
    article: '113',
    types: {
      'COM-TEC': { 
        title: 'Technical Committee',
        timeline: '21 days',
        requiredDocs: ['Technical Specifications', 'Expert Analysis', 'Impact Assessment']
      },
      'COM-FIN': { 
        title: 'Financial Committee',
        timeline: '21 days',
        requiredDocs: ['Financial Impact', 'Cost Analysis', 'Market Data']
      }
    }
  },
  'NEGOTIATION': {
    category: 'Direct Negotiation',
    article: '68',
    types: {
      'NEG-DIR': { 
        title: 'Direct Negotiation',
        timeline: '14 days',
        requiredDocs: ['Negotiation Terms', 'Proposed Settlement', 'Cost Justification']
      },
      'NEG-MED': { 
        title: 'Mediated Negotiation',
        timeline: '21 days',
        requiredDocs: ['Mediator Selection', 'Position Papers', 'Settlement Framework']
      }
    }
  }
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Pending': 'bg-yellow-50 text-yellow-600',
    'In Progress': 'bg-blue-50 text-blue-600',
    'Agreed': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600',
    'Negotiated': 'bg-purple-50 text-purple-600',
    'Withdrawn': 'bg-gray-50 text-gray-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Timeline Event Component
const TimelineEvent = ({ event }: { event: any }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
        {event.type === 'submission' && <FileText size={16} className="text-blue-600" />}
        {event.type === 'review' && <FileSearch size={16} className="text-purple-600" />}
        {event.type === 'approval' && <CheckCircle size={16} className="text-green-600" />}
        {event.type === 'rejection' && <XCircle size={16} className="text-red-600" />}
        {event.type === 'negotiation' && <Handshake size={16} className="text-blue-600" />}
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
);

// Resolution Card Component
const ResolutionCard = ({ resolution, onClick }: { resolution: any; onClick: () => void }) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          resolution.resolution_type?.startsWith('ARB') ? 'bg-purple-50' :
          resolution.resolution_type?.startsWith('APP') ? 'bg-blue-50' :
          resolution.resolution_type?.startsWith('COM') ? 'bg-green-50' :
          resolution.resolution_type?.startsWith('NEG') ? 'bg-yellow-50' :
          'bg-gray-50'
        }`}>
          <Scale size={24} className={`${
            resolution.resolution_type?.startsWith('ARB') ? 'text-purple-600' :
            resolution.resolution_type?.startsWith('APP') ? 'text-blue-600' :
            resolution.resolution_type?.startsWith('COM') ? 'text-green-600' :
            resolution.resolution_type?.startsWith('NEG') ? 'text-yellow-600' :
            'text-gray-600'
          }`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{resolution.claim?.title || 'Resolution'}</h3>
          <p className="text-sm text-gray-500">{resolution.id}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{resolution.resolution_date ? new Date(resolution.resolution_date).toLocaleDateString() : 'Not set'}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <DollarSign size={14} />
              <span>{resolution.final_amount?.toLocaleString() || 0} SAR</span>
            </div>
          </div>
        </div>
      </div>
      <StatusBadge status={resolution.resolution_status} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{
            resolution.resolution_type && Object.entries(resolutionTypes).find(([key, category]) => 
              Object.keys(category.types).includes(resolution.resolution_type)
            )?.[1].types[resolution.resolution_type as keyof typeof resolutionTypes[keyof typeof resolutionTypes]['types']].title || 'Resolution'
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MessageSquare size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download size={16} className="text-purple-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Resolution Detail Modal Component
const ResolutionDetailModal = ({ resolution, isOpen, onClose, claims }: { 
  resolution: any; 
  isOpen: boolean; 
  onClose: () => void;
  claims: any[];
}) => {
  if (!isOpen) return null;

  const relatedClaim = claims.find(claim => claim.id === resolution.claim_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {relatedClaim ? `Resolution for ${relatedClaim.title}` : 'Claim Resolution'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Resolution ID: {resolution.id}</p>
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
              {/* Resolution Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resolution Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <StatusBadge status={resolution.resolution_status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Resolution Type</p>
                    <p className="font-medium">{
                      resolution.resolution_type && Object.entries(resolutionTypes).find(([key, category]) => 
                        Object.keys(category.types).includes(resolution.resolution_type)
                      )?.[1].types[resolution.resolution_type as keyof typeof resolutionTypes[keyof typeof resolutionTypes]['types']].title || 'Standard Resolution'
                    }</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Resolution Date</p>
                    <p className="font-medium">{resolution.resolution_date ? new Date(resolution.resolution_date).toLocaleDateString() : 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Final Amount</p>
                    <p className="font-medium">{resolution.final_amount?.toLocaleString() || 0} SAR</p>
                  </div>
                </div>
              </div>

              {/* Comments */}
              {resolution.comments && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Comments</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{resolution.comments}</p>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resolution Timeline</h3>
                <div className="space-y-4">
                  <TimelineEvent 
                    event={{
                      type: 'submission',
                      title: 'Resolution Process Started',
                      date: new Date(resolution.created_at).toLocaleDateString(),
                      description: 'Resolution process initiated',
                      user: 'System'
                    }}
                  />
                  {resolution.resolution_date && (
                    <TimelineEvent 
                      event={{
                        type: resolution.resolution_status === 'Agreed' ? 'approval' : 
                              resolution.resolution_status === 'Rejected' ? 'rejection' : 'negotiation',
                        title: `Resolution ${resolution.resolution_status}`,
                        date: new Date(resolution.resolution_date).toLocaleDateString(),
                        description: `Claim was ${resolution.resolution_status.toLowerCase()} with final amount of ${resolution.final_amount?.toLocaleString() || 0} SAR`,
                        user: 'Resolution Committee'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Related Claim */}
              {relatedClaim && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Related Claim</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FileText size={20} className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-blue-900">{relatedClaim.title}</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Status: {relatedClaim.status}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          Original Value: {relatedClaim.value?.toLocaleString() || 0} SAR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resolution Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resolution Summary</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Original Amount</p>
                      <p className="font-medium">{relatedClaim?.value?.toLocaleString() || 0} SAR</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Final Amount</p>
                      <p className="font-medium">{resolution.final_amount?.toLocaleString() || 0} SAR</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Difference</p>
                      <p className={`font-medium ${
                        (resolution.final_amount || 0) >= (relatedClaim?.value || 0) ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {((resolution.final_amount || 0) - (relatedClaim?.value || 0)).toLocaleString()} SAR
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download size={16} />
                  <span>Download Report</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Share2 size={16} />
                  <span>Share Resolution</span>
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

// New Resolution Modal Component
const NewResolutionModal = ({ isOpen, onClose, onSubmit, claims }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: any) => void;
  claims: any[];
}) => {
  const [formData, setFormData] = useState({
    claim_id: '',
    resolution_status: 'Pending' as const,
    resolution_date: new Date().toISOString().split('T')[0],
    final_amount: 0,
    resolution_type: 'NEG-DIR',
    comments: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClaimChange = (claimId: string) => {
    const selectedClaim = claims.find(claim => claim.id === claimId);
    setFormData({
      ...formData,
      claim_id: claimId,
      final_amount: selectedClaim?.value || 0
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">New Claim Resolution</h2>
              <p className="text-sm text-gray-500 mt-1">Create a new resolution for a claim</p>
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
                  Claim
                </label>
                <select
                  value={formData.claim_id}
                  onChange={(e) => handleClaimChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a claim</option>
                  {claims.map(claim => (
                    <option key={claim.id} value={claim.id}>{claim.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Type
                </label>
                <select
                  value={formData.resolution_type}
                  onChange={(e) => setFormData({ ...formData, resolution_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {Object.entries(resolutionTypes).map(([key, category]) => (
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
                  Resolution Status
                </label>
                <select
                  value={formData.resolution_status}
                  onChange={(e) => setFormData({ ...formData, resolution_status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Agreed">Agreed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Negotiated">Negotiated</option>
                  <option value="Withdrawn">Withdrawn</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution Date
                </label>
                <input
                  type="date"
                  value={formData.resolution_date}
                  onChange={(e) => setFormData({ ...formData, resolution_date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Amount (SAR)
                </label>
                <input
                  type="number"
                  value={formData.final_amount}
                  onChange={(e) => setFormData({ ...formData, final_amount: parseFloat(e.target.value) })}
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
                Create Resolution
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface ClaimResolutionProps {}

const ClaimResolution: React.FC<ClaimResolutionProps> = () => {
  const [resolutions, setResolutions] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResolution, setSelectedResolution] = useState<any>(null);
  const [showNewResolutionModal, setShowNewResolutionModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch claims
      const { data: claimsData, error: claimsError } = await supabase
        .from('claims_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (claimsError) throw claimsError;
      setClaims(claimsData || []);
      
      // Fetch resolutions
      const { data: resolutionsData, error: resolutionsError } = await supabase
        .from('claims_resolution')
        .select('*')
        .order('created_at', { ascending: false });

      if (resolutionsError) {
        console.warn('Using mock resolution data:', resolutionsError.message);
        // If table doesn't exist yet, use mock data
        const mockResolutions = [
          {
            id: 'RES-2024-001',
            claim_id: claimsData?.[0]?.id || 'claim-id-1',
            resolution_status: 'Agreed',
            resolution_date: new Date().toISOString(),
            final_amount: 245000,
            resolution_type: 'NEG-DIR',
            comments: 'Claim resolved through direct negotiation with contractor. Final amount agreed based on verified documentation and market rates.',
            created_at: new Date().toISOString(),
            created_by: 'user-id',
            claim: claimsData?.[0] || { title: 'Steel Price Variation Claim', value: 240000 }
          },
          {
            id: 'RES-2024-002',
            claim_id: claimsData?.[1]?.id || 'claim-id-2',
            resolution_status: 'Negotiated',
            resolution_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            final_amount: 180000,
            resolution_type: 'COM-TEC',
            comments: 'Claim reviewed by technical committee. Negotiated settlement reached after detailed analysis of technical specifications and market conditions.',
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user-id',
            claim: claimsData?.[1] || { title: 'Site Access Delay Claim', value: 200000 }
          },
          {
            id: 'RES-2024-003',
            claim_id: claimsData?.[2]?.id || 'claim-id-3',
            resolution_status: 'Rejected',
            resolution_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            final_amount: 0,
            resolution_type: 'ARB-STD',
            comments: 'Claim rejected after standard arbitration process. Insufficient evidence provided to support the claimed amount.',
            created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user-id',
            claim: claimsData?.[2] || { title: 'Equipment Rate Adjustment Claim', value: 150000 }
          }
        ];
        
        // Add claim details to each resolution
        const resolutionsWithClaims = mockResolutions.map(resolution => {
          const claim = claimsData?.find(c => c.id === resolution.claim_id);
          return {
            ...resolution,
            claim
          };
        });
        
        setResolutions(resolutionsWithClaims);
      } else {
        // Add claim details to each resolution
        const resolutionsWithClaims = await Promise.all(
          resolutionsData.map(async (resolution) => {
            const { data: claim } = await supabase
              .from('claims_master')
              .select('*')
              .eq('id', resolution.claim_id)
              .single();
            
            return {
              ...resolution,
              claim
            };
          })
        );
        
        setResolutions(resolutionsWithClaims);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResolution = async (data: any) => {
    try {
      const { data: newResolution, error } = await supabase
        .from('claims_resolution')
        .insert([{
          ...data,
          created_by: 'user-id', // Replace with actual user ID
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Get the claim details
      const { data: claim } = await supabase
        .from('claims_master')
        .select('*')
        .eq('id', data.claim_id)
        .single();
      
      // Add the resolution with claim details to the state
      setResolutions(prev => [{
        ...newResolution,
        claim
      }, ...prev]);
      
      setShowNewResolutionModal(false);
    } catch (error) {
      console.error('Error creating resolution:', error);
      
      // Fallback to local state update if database insert fails
      const claim = claims.find(c => c.id === data.claim_id);
      const newResolution = {
        id: `RES-${Date.now()}`,
        ...data,
        created_at: new Date().toISOString(),
        created_by: 'user-id',
        claim
      };
      
      setResolutions(prev => [newResolution, ...prev]);
      setShowNewResolutionModal(false);
    }
  };

  // Filter resolutions based on selected criteria
  const filteredResolutions = resolutions.filter(resolution => {
    const matchesType = selectedType === 'all' || resolution.resolution_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || resolution.resolution_status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      (resolution.claim?.title && resolution.claim.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (resolution.comments && resolution.comments.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const stats = {
    total: resolutions.length,
    active: resolutions.filter(r => r.resolution_status === 'Pending' || r.resolution_status === 'In Progress').length,
    agreed: resolutions.filter(r => r.resolution_status === 'Agreed').length,
    rejected: resolutions.filter(r => r.resolution_status === 'Rejected').length,
    totalValue: resolutions.reduce((sum, r) => sum + (r.final_amount || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims Resolution</h1>
          <p className="text-sm text-gray-500 mt-1">Resolution Management System</p>
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
            onClick={() => setShowNewResolutionModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Resolution</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Resolutions</p>
              <p className="text-2xl font-semibold mt-1">{stats.active}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Scale size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Agreed Resolutions</p>
              <p className="text-2xl font-semibold mt-1">{stats.agreed}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
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
              <p className="text-sm text-gray-500">Resolution Rate</p>
              <p className="text-2xl font-semibold mt-1">
                {resolutions.length > 0 ? 
                  Math.round((stats.agreed / resolutions.length) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Handshake size={24} className="text-yellow-600" />
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
            placeholder="Search resolutions..."
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
          {Object.entries(resolutionTypes).map(([key, category]) => (
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
          <option value="Pending">Pending</option>
          <option value="Agreed">Agreed</option>
          <option value="Rejected">Rejected</option>
          <option value="Negotiated">Negotiated</option>
          <option value="Withdrawn">Withdrawn</option>
        </select>
      </div>

      {/* Resolutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading resolutions...</p>
            </div>
          </div>
        ) : filteredResolutions.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <Scale size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resolutions found</h3>
              <p className="text-gray-500 mb-4">Create a new resolution to get started</p>
              <button 
                onClick={() => setShowNewResolutionModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Resolution
              </button>
            </div>
          </div>
        ) : (
          filteredResolutions.map(resolution => (
            <ResolutionCard
              key={resolution.id}
              resolution={resolution}
              onClick={() => setSelectedResolution(resolution)}
            />
          ))
        )}
      </div>

      {/* Resolution Detail Modal */}
      <ResolutionDetailModal
        resolution={selectedResolution}
        isOpen={!!selectedResolution}
        onClose={() => setSelectedResolution(null)}
        claims={claims}
      />

      {/* New Resolution Modal */}
      <NewResolutionModal
        isOpen={showNewResolutionModal}
        onClose={() => setShowNewResolutionModal(false)}
        onSubmit={handleCreateResolution}
        claims={claims}
      />
    </div>
  );
};

export default ClaimResolution;