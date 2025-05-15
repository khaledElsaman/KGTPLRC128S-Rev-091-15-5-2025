import React, { useState, useEffect } from 'react';
import { GitCompare, Calendar, Clock, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, ArrowUpDown, FileText, DollarSign, Users, ArrowRight, Edit, Trash2, FileWarning } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../contexts/AppContext';
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

// Define the Variation type based on the database schema
type Variation = {
  id: string;
  title: string;
  description?: string;
  created_at: string;
  status: string;
  created_by: string;
  value?: number;
  type?: string;
  last_updated_at?: string;
  last_updated_by?: string;
};

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

export default function MasterVariations() {
  const { handleModuleChange } = useApp();
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString());

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
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching variations:', error);
      // Use sample data if no data is returned
      setVariations(getSampleVariations());
    } finally {
      setLoading(false);
    }
  };

  const getSampleVariations = (): Variation[] => {
    return [
      { 
        id: "VO-001", 
        title: "Scope Addition in Zone A", 
        description: "Additional scope for foundation works in Zone A",
        created_at: "2025-03-01T10:00:00Z",
        status: "Approved", 
        created_by: "user-123",
        value: 150000,
        last_updated_at: "2025-03-05T14:30:00Z",
        last_updated_by: "user-456",
        type: "Scope Change"
      },
      { 
        id: "VO-002", 
        title: "Material Price Adjustment", 
        description: "Adjustment due to steel price increase",
        created_at: "2025-04-10T09:15:00Z",
        status: "Submitted", 
        created_by: "user-123",
        value: 75000,
        type: "Price Adjustment"
      },
      { 
        id: "VO-003", 
        title: "Additional Works - Drainage System", 
        description: "Installation of additional drainage system",
        created_at: "2025-04-15T11:30:00Z",
        status: "Under Review", 
        created_by: "user-789",
        value: 220000,
        type: "Additional Works"
      },
      { 
        id: "VO-004", 
        title: "Time Extension Request", 
        description: "Request for 30-day extension due to weather conditions",
        created_at: "2025-04-20T14:20:00Z",
        status: "Rejected", 
        created_by: "user-789",
        value: 0,
        type: "Time Extension"
      },
      { 
        id: "VO-005", 
        title: "Specification Change - Concrete Grade", 
        description: "Change from Grade 30 to Grade 40 concrete",
        created_at: "2025-05-01T08:45:00Z",
        status: "Draft", 
        created_by: "user-123",
        value: 85000,
        type: "Scope Change"
      }
    ];
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
  };

  // Filter variations based on search term and filters
  const filteredVariations = variations.filter(variation => {
    const matchesSearch = searchTerm === '' || 
      variation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variation.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || variation.status === statusFilter;
    const matchesType = typeFilter === 'all' || variation.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate statistics
  const stats = {
    total: variations.length,
    active: variations.filter(v => v.status === 'Under Review').length,
    approved: variations.filter(v => v.status === 'Approved').length,
    rejected: variations.filter(v => v.status === 'Rejected').length,
    totalValue: variations.reduce((sum, v) => sum + (v.value || 0), 0),
    approvalRate: variations.length > 0 ? Math.round((variations.filter(v => v.status === 'Approved').length / variations.length) * 100) : 0
  };

  // Prepare data for charts
  const statusDistributionData = [
    { name: 'Approved', value: stats.approved },
    { name: 'Under Review', value: stats.active },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Other', value: stats.total - stats.approved - stats.active - stats.rejected }
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

  // Prepare type distribution data
  const getTypeDistributionData = () => {
    const typeMap: Record<string, number> = {};
    
    variations.forEach(variation => {
      const type = variation.type || 'Other';
      if (!typeMap[type]) {
        typeMap[type] = 0;
      }
      typeMap[type] += 1;
    });
    
    return Object.entries(typeMap).map(([name, value]) => ({ name, value }));
  };

  const typeDistributionData = getTypeDistributionData();

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Variations Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Dashboard and analytics for all variations</p>
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
            <Brain size={16} />
            <span>AI Analysis</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
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
              <GitCompare size={24} className="text-blue-600" />
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
              <p className="text-2xl font-semibold mt-1">{(stats.totalValue / 1000000).toFixed(1)}M SAR</p>
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
              <p className="text-2xl font-semibold mt-1">{stats.approvalRate}%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Users size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => handleModuleChange('engineer-notices', 'All Variations')}
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

        {/* Type Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Variation Type Distribution</h2>
          <div className="h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : typeDistributionData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {typeDistributionData.map((entry, index) => (
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
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Latest Variations</h2>
          <button 
            onClick={() => handleModuleChange('engineer-notices', 'All Variations')}
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
                    onClick={() => handleModuleChange('engineer-notices', 'All Variations')}
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
}