import React, { useState, useEffect, useCallback } from 'react';
import { BarChart2, PieChart, TrendingUp, AlertCircle, FileText, Clock, CheckCircle, Plus, Brain, Scale, Calendar, ArrowRight, FileWarning, MessageSquare, ClipboardList, AlertTriangle, Filter, Download, Search, Bell, Briefcase, DollarSign, Users, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';
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

type Variation = Database['public']['Tables']['variations_master']['Row'];
type VariationAnalysis = Database['public']['Tables']['variations_analysis']['Row'];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];

const VariationAnalysis = () => {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [analyses, setAnalyses] = useState<VariationAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedMetric, setSelectedMetric] = useState('value');
  const [showNewAnalysisModal, setShowNewAnalysisModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    variation_id: '',
    analysis_type: 'cost',
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
      
      // Fetch analyses
      const { data: analysesData, error: analysesError } = await supabase
        .from('variations_analysis')
        .select('*')
        .order('created_at', { ascending: false });

      if (analysesError) {
        console.warn('Using mock analysis data:', analysesError.message);
        // If table doesn't exist yet, use mock data
        setAnalyses([]);
      } else {
        setAnalyses(analysesData || []);
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
        .from('variations_analysis')
        .insert([{
          ...formData,
          created_by: 'user-id', // Replace with actual user ID
          analysis_data: {}
        }])
        .select()
        .single();

      if (error) throw error;
      setAnalyses(prev => [data, ...prev]);
      setShowNewAnalysisModal(false);
      setFormData({
        title: '',
        description: '',
        variation_id: '',
        analysis_type: 'cost',
        status: 'Draft'
      });
    } catch (error) {
      console.error('Error creating analysis:', error);
    }
  };

  // Calculate statistics
  const stats = {
    total: variations.length,
    active: variations.filter(v => v.status === 'Under Review').length,
    approved: variations.filter(v => v.status === 'Approved').length,
    totalValue: variations.reduce((sum, v) => sum + (v.value || 0), 0),
    approvalRate: variations.length > 0 ? 
      (variations.filter(v => v.status === 'Approved').length / variations.length) * 100 : 0
  };

  // Prepare chart data
  const statusData = Object.entries(
    variations.reduce((acc, variation) => {
      acc[variation.status] = (acc[variation.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const monthlyData = variations.reduce((acc, variation) => {
    const month = new Date(variation.created_at).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { month, count: 0, value: 0 };
    }
    acc[month].count++;
    acc[month].value += variation.value || 0;
    return acc;
  }, {} as Record<string, { month: string; count: number; value: number }>);

  const trendData = Object.values(monthlyData);

  // Cost breakdown data
  const costBreakdownData = [
    { name: 'Material', value: 45 },
    { name: 'Labor', value: 30 },
    { name: 'Equipment', value: 15 },
    { name: 'Overhead', value: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI-Driven Variations Analysis</h1>
          <p className="text-sm text-gray-500 mt-1">Analytics and insights for variations</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>AI Insights</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export Report</span>
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Variations</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Variations</p>
              <p className="text-2xl font-semibold mt-1">{stats.active}</p>
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
                {(stats.totalValue / 1000000).toFixed(1)}M SAR
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
              <p className="text-sm text-gray-500">Approval Rate</p>
              <p className="text-2xl font-semibold mt-1">{stats.approvalRate.toFixed(0)}%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution (Pie Chart) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Variations Over Time (Line Chart) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Variations Over Time</h2>
            <select
              className="px-3 py-1 border border-gray-200 rounded-lg bg-white"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="value">Value</option>
              <option value="count">Count</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Breakdown (Bar Chart) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Value Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Value Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Average Processing Time</h3>
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-blue-600" />
            <div>
              <p className="text-2xl font-semibold">12 days</p>
              <p className="text-sm text-gray-500 mt-2">Average time to approval</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Average Value</h3>
          <div className="flex items-center gap-3">
            <DollarSign size={24} className="text-green-600" />
            <div>
              <p className="text-2xl font-semibold">
                {stats.total > 0 ? 
                  ((stats.totalValue / stats.total) / 1000).toFixed(1) + 'K SAR' : 
                  '0 SAR'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Per variation</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Rejection Rate</h3>
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="text-red-600" />
            <div>
              <p className="text-2xl font-semibold">
                {stats.total > 0 ? 
                  ((variations.filter(v => v.status === 'Rejected').length / stats.total) * 100).toFixed(1) + '%' : 
                  '0%'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Of total variations</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Analysis Modal */}
      {showNewAnalysisModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">New AI-Driven Variation Analysis</h2>
                <button 
                  onClick={() => setShowNewAnalysisModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variation
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
                    Analysis Type
                  </label>
                  <select
                    value={formData.analysis_type}
                    onChange={(e) => setFormData({ ...formData, analysis_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="cost">Cost Analysis</option>
                    <option value="schedule">Schedule Analysis</option>
                    <option value="risk">Risk Analysis</option>
                    <option value="compliance">Compliance Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewAnalysisModal(false)}
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
      )}
    </div>
  );
};

export default VariationAnalysis;