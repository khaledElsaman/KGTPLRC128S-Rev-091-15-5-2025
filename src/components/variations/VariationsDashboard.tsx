import React, { useState, useEffect } from 'react';
import { GitCompare, Calendar, Clock, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, FileText, DollarSign, Users, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../contexts/AppContext';
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
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

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

const VariationsDashboard = () => {
  const { handleModuleChange } = useApp();
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalValue: 0,
    approvalRate: 0
  });

  useEffect(() => {
    fetchVariations();
  }, [selectedPeriod]);

  const fetchVariations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('variations_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter data based on selected period if needed
      let filteredData = data || [];
      if (selectedPeriod !== 'all') {
        const now = new Date();
        let cutoffDate = new Date();
        
        switch (selectedPeriod) {
          case 'week':
            cutoffDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            cutoffDate.setMonth(now.getMonth() - 1);
            break;
          case 'quarter':
            cutoffDate.setMonth(now.getMonth() - 3);
            break;
          case 'year':
            cutoffDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        filteredData = data?.filter(v => new Date(v.created_at) >= cutoffDate) || [];
      }
      
      setVariations(filteredData);
      
      // Calculate statistics
      const total = filteredData.length;
      const pending = filteredData.filter(v => v.status === 'Submitted' || v.status === 'Under Review').length;
      const approved = filteredData.filter(v => v.status === 'Approved').length;
      const rejected = filteredData.filter(v => v.status === 'Rejected').length;
      const totalValue = filteredData.reduce((sum, v) => sum + (v.value || 0), 0);
      const approvalRate = total > 0 ? (approved / total) * 100 : 0;
      
      setStats({
        total,
        pending,
        approved,
        rejected,
        totalValue,
        approvalRate
      });
      
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching variations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const statusDistributionData = [
    { name: 'Approved', value: stats.approved },
    { name: 'Pending', value: stats.pending },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Other', value: stats.total - stats.approved - stats.pending - stats.rejected }
  ].filter(item => item.value > 0);

  // Prepare variations over time data
  const getVariationsOverTimeData = () => {
    const monthMap: Record<string, { month: string, count: number, value: number }> = {};
    
    variations.forEach(variation => {
      const date = new Date(variation.created_at);
      const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      if (!monthMap[monthYear]) {
        monthMap[monthYear] = { month: monthYear, count: 0, value: 0 };
      }
      
      monthMap[monthYear].count += 1;
      monthMap[monthYear].value += variation.value || 0;
    });
    
    return Object.values(monthMap).sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' ');
      const [bMonth, bYear] = b.month.split(' ');
      
      if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(aMonth) - months.indexOf(bMonth);
    });
  };

  const variationsOverTimeData = getVariationsOverTimeData();

  // Prepare cost impact data
  const getCostImpactData = () => {
    // Group variations by type
    const typeMap: Record<string, number> = {};
    
    variations.forEach(variation => {
      const type = variation.type || 'Other';
      if (!typeMap[type]) {
        typeMap[type] = 0;
      }
      typeMap[type] += variation.value || 0;
    });
    
    return Object.entries(typeMap).map(([type, value]) => ({
      type,
      value
    }));
  };

  const costImpactData = getCostImpactData();

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Variations Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time overview and KPIs for all submitted variations</p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Variations</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <GitCompare size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Variations</p>
              <p className="text-2xl font-semibold mt-1">{stats.pending}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved Variations</p>
              <p className="text-2xl font-semibold mt-1">{stats.approved}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected Variations</p>
              <p className="text-2xl font-semibold mt-1">{stats.rejected}</p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <XCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => handleModuleChange('master-variations', 'All Variations')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50"
        >
          <FileText size={16} />
          <span>View All Variations</span>
        </button>
        <button 
          onClick={() => handleModuleChange('variations-compliance-guide', 'Overview')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50"
        >
          <FileText size={16} />
          <span>Compliance Guide</span>
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variation Status Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Variation Status Distribution</h2>
          <div className="h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : statusDistributionData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <p className="text-xs text-gray-500 text-right mt-2">Last updated: {lastUpdated}</p>
        </div>

        {/* Variations Over Time */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Variations Over Time</h2>
          <div className="h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : variationsOverTimeData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={variationsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    name="Number of Variations"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <p className="text-xs text-gray-500 text-right mt-2">Last updated: {lastUpdated}</p>
        </div>

        {/* Cost Impact Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cost Impact Breakdown</h2>
          <div className="h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : costImpactData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} SAR`, 'Value']}/>
                  <Legend />
                  <Bar dataKey="value" fill="#8b5cf6" name="Value (SAR)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <p className="text-xs text-gray-500 text-right mt-2">Last updated: {lastUpdated}</p>
        </div>

        {/* Value Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Value Distribution</h2>
          <div className="h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : variationsOverTimeData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={variationsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} SAR`, 'Value']}/>
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Value (SAR)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <p className="text-xs text-gray-500 text-right mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Latest Variations</h2>
          <button 
            onClick={() => handleModuleChange('master-variations', 'All Variations')}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Variation ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Created Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Value</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Loading variations...
                  </td>
                </tr>
              ) : variations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No variations found
                  </td>
                </tr>
              ) : (
                variations.slice(0, 5).map((variation) => (
                  <tr 
                    key={variation.id} 
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleModuleChange('master-variations', 'All Variations')}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <GitCompare size={16} className="text-gray-400" />
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VariationsDashboard;