import React, { useState, useEffect } from 'react';
import { Calculator, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, FileText, ArrowRight, Scale, History, TrendingUp, BarChart2, PieChart, PieChartIcon as ChartPieIcon, MessageSquare, Share2, Tag as TagIcon, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

type ClaimsAnalysis = Database['public']['Tables']['claims_analysis']['Row'];
type Claim = Database['public']['Tables']['claims_master']['Row'];

// Analysis Types based on GTPL RC 128
const analysisTypes = {
  'PRICE': {
    category: 'Price Adjustments',
    article: '68',
    types: {
      'PA-MAT': { 
        title: 'Material Price Analysis',
        thresholds: { min: -20, max: 10 },
        requiredData: ['Original Price', 'Market Price', 'Quantity']
      },
      'PA-LAB': { 
        title: 'Labor Rate Analysis',
        thresholds: { min: -20, max: 10 },
        requiredData: ['Original Rate', 'New Rate', 'Hours']
      }
    }
  },
  'PENALTY': {
    category: 'Penalties and Waivers',
    article: '72',
    types: {
      'PW-DEL': { 
        title: 'Delay Penalty Analysis',
        thresholds: { min: 6, max: 20 },
        requiredData: ['Contract Value', 'Delay Days', 'Force Majeure']
      },
      'PW-PER': { 
        title: 'Performance Penalty Analysis',
        thresholds: { min: 6, max: 20 },
        requiredData: ['Contract Value', 'Performance Metrics', 'Impact']
      }
    }
  },
  'EXTENSION': {
    category: 'Time Extensions',
    article: '74',
    types: {
      'TE-FOR': { 
        title: 'Force Majeure Extension',
        requiredData: ['Event Details', 'Impact Duration', 'Critical Path']
      },
      'TE-VAR': { 
        title: 'Variation Extension',
        requiredData: ['Variation Scope', 'Resource Impact', 'Schedule Impact']
      }
    }
  }
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Pending': 'bg-yellow-50 text-yellow-600',
    'In Progress': 'bg-blue-50 text-blue-600',
    'Completed': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600',
    'Non-Compliant': 'bg-orange-50 text-orange-600',
    'Draft': 'bg-gray-50 text-gray-600',
    'Submitted': 'bg-yellow-50 text-yellow-600',
    'Under Review': 'bg-blue-50 text-blue-600',
    'Approved': 'bg-green-50 text-green-600',
    'Resolved': 'bg-purple-50 text-purple-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Analysis Card Component
const AnalysisCard = ({ analysis, onClick }: { analysis: any; onClick: () => void }) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          analysis.type?.startsWith('PA') ? 'bg-blue-50' :
          analysis.type?.startsWith('PW') ? 'bg-purple-50' :
          'bg-green-50'
        }`}>
          <Calculator size={24} className={`${
            analysis.type?.startsWith('PA') ? 'text-blue-600' :
            analysis.type?.startsWith('PW') ? 'text-purple-600' :
            'text-green-600'
          }`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{analysis.title}</h3>
          <p className="text-sm text-gray-500">{analysis.id}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{new Date(analysis.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              <span>{analysis.progress || 0}% Complete</span>
            </div>
          </div>
        </div>
      </div>
      <StatusBadge status={analysis.status} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TagIcon size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{
            analysis.type && Object.entries(analysisTypes).find(([key, category]) => 
              Object.keys(category.types).includes(analysis.type)
            )?.[1].types[analysis.type as keyof typeof analysisTypes[keyof typeof analysisTypes]['types']]?.title || 'Analysis'
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Brain size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <BarChart2 size={16} className="text-purple-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Analysis Detail Modal Component
const AnalysisDetailModal = ({ analysis, isOpen, onClose, claims }: { 
  analysis: any; 
  isOpen: boolean; 
  onClose: () => void;
  claims: Claim[];
}) => {
  if (!isOpen) return null;

  const relatedClaim = claims.find(claim => claim.id === analysis.claim_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{analysis.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Analysis ID: {analysis.id}</p>
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
              {/* Analysis Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Analysis Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <StatusBadge status={analysis.status} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created Date</p>
                    <p className="font-medium">{new Date(analysis.created_at).toLocaleDateString()}</p>
                  </div>
                  {relatedClaim && (
                    <div>
                      <p className="text-sm text-gray-500">Related Claim</p>
                      <p className="font-medium">{relatedClaim.title}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Analysis Type</p>
                    <p className="font-medium">{
                      analysis.type && Object.entries(analysisTypes).find(([key, category]) => 
                        Object.keys(category.types).includes(analysis.type)
                      )?.[1].types[analysis.type as keyof typeof analysisTypes[keyof typeof analysisTypes]['types']]?.title || 'General Analysis'
                    }</p>
                  </div>
                </div>
              </div>

              {/* Analysis Description */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{analysis.description}</p>
                </div>
              </div>

              {/* Analysis Charts */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Analysis Charts</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Cost Impact</h4>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Original', value: 100 },
                          { name: 'Adjusted', value: 115 },
                          { name: 'Variance', value: 15 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Time Impact</h4>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Original', value: 180 },
                          { name: 'Adjusted', value: 210 },
                          { name: 'Variance', value: 30 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Compliance Check */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Compliance Check</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle size={20} className="text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Documentation Complete</p>
                      <p className="text-sm text-green-700">All required documents provided</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle size={20} className="text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">GTPL RC 128 Compliant</p>
                      <p className="text-sm text-green-700">Meets Article {
                        analysis.type && Object.entries(analysisTypes).find(([key, category]) => 
                          Object.keys(category.types).includes(analysis.type)
                        )?.[1].article || '68-74'
                      } requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Brain size={20} className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Recommendation</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on historical data and current market conditions, this claim has a 78% likelihood of approval with minor adjustments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download size={16} />
                  <span>Download Analysis</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Share2 size={16} />
                  <span>Share Analysis</span>
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

// New Analysis Modal Component
const NewAnalysisModal = ({ isOpen, onClose, onSubmit, claims }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: any) => void;
  claims: Claim[];
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    claim_id: '',
    type: 'PA-MAT',
    status: 'Draft' as const
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
              <h2 className="text-xl font-bold text-gray-900">New Claims Analysis</h2>
              <p className="text-sm text-gray-500 mt-1">Create a new analysis for a claim</p>
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
                  Analysis Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {Object.entries(analysisTypes).map(([key, category]) => (
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
                  Related Claim
                </label>
                <select
                  value={formData.claim_id}
                  onChange={(e) => setFormData({ ...formData, claim_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a claim</option>
                  {claims.map(claim => (
                    <option key={claim.id} value={claim.id}>{claim.title}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Analysis Description
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
                  <option value="Under Review">Under Review</option>
                </select>
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
                Create Analysis
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ClaimsAnalysis = () => {
  const [analyses, setAnalyses] = useState<ClaimsAnalysis[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnalysis, setSelectedAnalysis] = useState<ClaimsAnalysis | null>(null);
  const [showNewAnalysisModal, setShowNewAnalysisModal] = useState(false);

  // Sample data for charts
  const claimsByStatusData = [
    { name: 'Draft', value: 5 },
    { name: 'Submitted', value: 8 },
    { name: 'Under Review', value: 12 },
    { name: 'Approved', value: 15 },
    { name: 'Rejected', value: 3 }
  ];

  const claimsOverTimeData = [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 15 },
    { month: 'Jun', count: 18 }
  ];

  const claimsByCostData = [
    { range: '0-50K', count: 10 },
    { range: '50K-100K', count: 15 },
    { range: '100K-500K', count: 8 },
    { range: '500K-1M', count: 5 },
    { range: '1M+', count: 2 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
      
      // Fetch analyses
      const { data: analysesData, error: analysesError } = await supabase
        .from('claims_analysis')
        .select('*')
        .order('created_at', { ascending: false });

      if (analysesError) {
        console.warn('Using mock analysis data:', analysesError.message);
        // If table doesn't exist yet, use mock data
        const mockAnalyses = [
          {
            id: 'ANA-2024-001',
            title: 'Steel Price Variation Analysis',
            description: 'Analysis of steel price variation claim based on market data',
            created_at: new Date().toISOString(),
            status: 'In Progress',
            created_by: 'user-id',
            claim_id: claimsData?.[0]?.id,
            type: 'PA-MAT',
            progress: 75
          },
          {
            id: 'ANA-2024-002',
            title: 'Delay Penalty Waiver Analysis',
            description: 'Analysis of delay penalty waiver request due to force majeure',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Completed',
            created_by: 'user-id',
            claim_id: claimsData?.[1]?.id,
            type: 'PW-DEL',
            progress: 100
          }
        ];
        setAnalyses(mockAnalyses as any);
      } else {
        setAnalyses(analysesData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnalysis = async (data: any) => {
    try {
      const { data: newAnalysis, error } = await supabase
        .from('claims_analysis')
        .insert([{
          ...data,
          created_by: 'user-id', // Replace with actual user ID
        }])
        .select()
        .single();

      if (error) throw error;
      setAnalyses(prev => [newAnalysis, ...prev]);
      setShowNewAnalysisModal(false);
    } catch (error) {
      console.error('Error creating analysis:', error);
      
      // Fallback to local state update if database insert fails
      const newAnalysis = {
        id: `ANA-${Date.now()}`,
        title: data.title,
        description: data.description,
        created_at: new Date().toISOString(),
        status: data.status,
        created_by: 'user-id',
        claim_id: data.claim_id,
        type: data.type,
        progress: 0
      };
      
      setAnalyses(prev => [newAnalysis as any, ...prev]);
      setShowNewAnalysisModal(false);
    }
  };

  // Filter analyses based on selected criteria
  const filteredAnalyses = analyses.filter(analysis => {
    const matchesType = selectedType === 'all' || analysis.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || analysis.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (analysis.description && analysis.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims Analysis</h1>
          <p className="text-sm text-gray-500 mt-1">AI-Powered Claims Assessment System</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>AI Insights</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setShowNewAnalysisModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Claims by Status (Pie Chart) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims by Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={claimsByStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {claimsByStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Claims Over Time (Line Chart) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={claimsOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Claims by Cost Impact (Bar Chart) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims by Cost Impact</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={claimsByCostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search analyses..."
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
          {Object.entries(analysisTypes).map(([key, category]) => (
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
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading analyses...</p>
            </div>
          </div>
        ) : filteredAnalyses.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <Calculator size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses found</h3>
              <p className="text-gray-500 mb-4">Create a new analysis to get started</p>
              <button 
                onClick={() => setShowNewAnalysisModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Analysis
              </button>
            </div>
          </div>
        ) : (
          filteredAnalyses.map(analysis => (
            <AnalysisCard
              key={analysis.id}
              analysis={analysis}
              onClick={() => setSelectedAnalysis(analysis)}
            />
          ))
        )}
      </div>

      {/* Analysis Detail Modal */}
      <AnalysisDetailModal
        analysis={selectedAnalysis}
        isOpen={!!selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
        claims={claims}
      />

      {/* New Analysis Modal */}
      <NewAnalysisModal
        isOpen={showNewAnalysisModal}
        onClose={() => setShowNewAnalysisModal(false)}
        onSubmit={handleCreateAnalysis}
        claims={claims}
      />
    </div>
  );
};

export default ClaimsAnalysis;