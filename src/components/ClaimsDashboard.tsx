import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Calendar, Search, Filter, TrendingUp, Bell, BarChart2, ArrowUp, ArrowDown, DollarSign, Download, FileCheck, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../contexts/AppContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface Claim {
  id: string;
  title: string;
  status: string;
  created_at: string;
  value: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
}

const ClaimsDashboard = () => {
  const { currentSubView, handleModuleChange } = useApp();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    rejected: 0,
    totalValue: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample data for charts
  const trendData = [
    { month: 'Jan', claims: 65, value: 1.2 },
    { month: 'Feb', claims: 75, value: 1.8 },
    { month: 'Mar', claims: 85, value: 2.4 },
    { month: 'Apr', claims: 70, value: 1.9 },
    { month: 'May', claims: 90, value: 2.7 },
    { month: 'Jun', claims: 95, value: 3.1 }
  ];

  // Sample notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Claim Submitted',
      message: 'Steel Price Variation Claim has been submitted for review',
      type: 'info',
      timestamp: '2024-03-15 10:30 AM'
    },
    {
      id: '2',
      title: 'Claim Approved',
      message: 'Site Access Delay Claim has been approved',
      type: 'success',
      timestamp: '2024-03-15 09:15 AM'
    },
    {
      id: '3',
      title: 'Deadline Approaching',
      message: 'Response required for CLM-2024-003 within 48 hours',
      type: 'warning',
      timestamp: '2024-03-14 02:45 PM'
    }
  ];

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('claims_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setClaims(data);
        
        setStats({
          total: data.length,
          pending: data.filter(claim => claim.status === 'Submitted').length,
          resolved: data.filter(claim => claim.status === 'Resolved').length,
          rejected: data.filter(claim => claim.status === 'Rejected').length,
          totalValue: data.reduce((sum, claim) => sum + (claim.value || 0), 0)
        });
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderOverview = () => (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Claims</p>
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
              <p className="text-sm text-gray-500">Pending Claims</p>
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
              <p className="text-sm text-gray-500">Resolved Claims</p>
              <p className="text-2xl font-semibold mt-1">{stats.resolved}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected Claims</p>
              <p className="text-2xl font-semibold mt-1">{stats.rejected}</p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Claims</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Claim Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Created Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Value</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Loading claims...
                  </td>
                </tr>
              ) : filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No claims found
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{claim.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        claim.status === 'Resolved' ? 'bg-green-50 text-green-600' :
                        claim.status === 'Submitted' ? 'bg-yellow-50 text-yellow-600' :
                        claim.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatDate(claim.created_at)}</td>
                    <td className="py-3 px-4">{claim.value ? `${claim.value.toLocaleString()} SAR` : '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="claims" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Value Analysis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Value Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-600" size={20} />
                <div>
                  <p className="font-medium">Approval Rate</p>
                  <p className="text-sm text-gray-500">Last 30 days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">85%</p>
                <p className="text-sm text-green-600">+5%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium">Average Processing Time</p>
                  <p className="text-sm text-gray-500">Last 30 days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">12 days</p>
                <p className="text-sm text-red-600">+2 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <p className="font-medium text-green-900">Documentation Complete</p>
                </div>
                <p className="text-green-600">92%</p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-yellow-600" size={20} />
                  <p className="font-medium text-yellow-900">Pending Reviews</p>
                </div>
                <p className="text-yellow-600">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims Volume Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="claims" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Claims Value Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trend Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Monthly Growth</h3>
          <div className="flex items-center gap-2">
            <ArrowUp className="text-green-600" size={20} />
            <span className="text-2xl font-semibold text-green-600">15%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">vs. previous month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Average Claim Value</h3>
          <div className="flex items-center gap-2">
            <ArrowUp className="text-green-600" size={20} />
            <span className="text-2xl font-semibold">125K SAR</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">+8% vs. previous month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Resolution Time</h3>
          <div className="flex items-center gap-2">
            <ArrowDown className="text-red-600" size={20} />
            <span className="text-2xl font-semibold">18 days</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">+3 days vs. target</p>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Mark all as read
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  notification.type === 'success' ? 'bg-green-50' :
                  notification.type === 'warning' ? 'bg-yellow-50' :
                  'bg-blue-50'
                }`}>
                  {notification.type === 'success' && <CheckCircle size={20} className="text-green-600" />}
                  {notification.type === 'warning' && <AlertCircle size={20} className="text-yellow-600" />}
                  {notification.type === 'info' && <Bell size={20} className="text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    </div>
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      {/* Compliance Risk Alerts Panel */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Compliance Risk Alerts</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Filter issues..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            >
              <option value="all">All Types</option>
              <option value="documentation">Documentation</option>
              <option value="timeline">Timeline</option>
              <option value="regulatory">Regulatory</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
            <AlertCircle size={20} className="text-red-600 mt-1" />
            <div>
              <h3 className="font-medium text-red-900">Missing Notices of Claim</h3>
              <p className="text-sm text-red-700 mt-1">
                8 claims are missing corresponding notices as required by GTPL RC 128 Article 68
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
                  HIGH
                </span>
                <span className="text-xs text-red-600">
                  8 affected claims
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
            <AlertCircle size={20} className="text-yellow-600 mt-1" />
            <div>
              <h3 className="font-medium text-yellow-900">Late Notice Submissions</h3>
              <p className="text-sm text-yellow-700 mt-1">
                5 notices were submitted after the 60-day deadline specified in Article 113
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-600">
                  MEDIUM
                </span>
                <span className="text-xs text-yellow-600">
                  5 affected claims
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <AlertCircle size={20} className="text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900">Incomplete Documentation</h3>
              <p className="text-sm text-blue-700 mt-1">
                12 claims have incomplete or missing supporting documentation
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                  LOW
                </span>
                <span className="text-xs text-blue-600">
                  12 affected claims
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Recommendations */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FileCheck size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Compliance Recommendations</h3>
            <div className="space-y-3 mt-3">
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-600 mt-0.5" />
                <p className="text-blue-800">Implement standardized documentation templates for all claim types.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-600 mt-0.5" />
                <p className="text-blue-800">Establish a pre-submission review process to ensure all required documentation is included.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-600 mt-0.5" />
                <p className="text-blue-800">Conduct monthly compliance training sessions for project teams.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-600 mt-0.5" />
                <p className="text-blue-800">Set up automated reminders for claim submission deadlines.</p>
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => handleModuleChange('claims-compliance-guide', 'Overview')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FileCheck size={16} />
                <span>View Full Compliance Guide</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of all claims</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FileText size={16} />
            <span>New Claim</span>
          </button>
        </div>
      </div>

      {/* Content based on current sub-view */}
      {currentSubView === 'Overview' && renderOverview()}
      {currentSubView === 'Insights' && renderInsights()}
      {currentSubView === 'Trends' && renderTrends()}
      {currentSubView === 'Notifications' && renderNotifications()}
      {currentSubView === 'Compliance' && renderCompliance()}
    </div>
  );
};

export default ClaimsDashboard;