import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, AlertCircle, FileText, Clock, CheckCircle, Plus, Brain, Scale, Calendar, ArrowRight, FileWarning, MessageSquare, ClipboardList, AlertTriangle, PieChartIcon as ChartPieIcon, Filter, Download, Search, Bell, Briefcase, DollarSign, Users } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useStatistics } from '../contexts/StatisticsContext';

const Dashboard = () => {
  const { handleModuleChange } = useApp();
  const { statistics } = useStatistics();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedChart, setSelectedChart] = useState('claims');

  // Quick Actions with GTPL RC 128 compliance
  const quickActions = [
    {
      title: 'New Claim',
      description: 'Create a new claim under Article 68/74',
      icon: Plus,
      color: 'blue',
      onClick: () => handleModuleChange('master-claims', 'Active Claims')
    },
    {
      title: 'AI Analysis',
      description: 'Get AI insights on claim patterns',
      icon: Brain,
      color: 'purple',
      onClick: () => handleModuleChange('claims-ai', 'Trends')
    },
    {
      title: 'Resolution',
      description: 'Review pending resolutions',
      icon: Scale,
      color: 'green',
      onClick: () => handleModuleChange('resolution', 'Active Resolutions')
    }
  ];

  // Recent Activity with GTPL RC 128 references
  const recentActivity = [
    {
      type: 'claim',
      title: 'Steel Price Variation Claim',
      reference: 'CLM-2024-001',
      article: 'Article 68.3',
      status: 'Under Review',
      date: '2024-03-15',
      icon: FileText,
      amount: '245,000 SAR'
    },
    {
      type: 'notice',
      title: 'Delay Notice - Site Access',
      reference: 'NOT-2024-001',
      article: 'Article 74.5',
      status: 'Submitted',
      date: '2024-03-14',
      icon: FileWarning,
      impact: '45 days'
    },
    {
      type: 'response',
      title: 'Engineer Response #2024-001',
      reference: 'RES-2024-001',
      article: 'Article 113',
      status: 'Pending',
      date: '2024-03-13',
      icon: MessageSquare,
      deadline: '2024-03-28'
    }
  ];

  // Compliance Alerts
  const complianceAlerts = [
    {
      type: 'deadline',
      title: 'Approaching Deadline',
      description: 'Response required for CLM-2024-001 within 7 days',
      severity: 'high'
    },
    {
      type: 'documentation',
      title: 'Missing Documents',
      description: 'Supporting documents required for NOT-2024-002',
      severity: 'medium'
    },
    {
      type: 'approval',
      title: 'Pending Approval',
      description: 'Committee review pending for 3 claims',
      severity: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Period Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">GTPLRC128 Claims Overview</p>
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
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Claims</p>
              <p className="text-2xl font-semibold mt-1">{statistics.claims.total}</p>
              <p className="text-sm text-green-600 mt-1">
                <span className="flex items-center gap-1">
                  <TrendingUp size={14} />
                  +12% vs last period
                </span>
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Claims</p>
              <p className="text-2xl font-semibold mt-1">{statistics.claims.active}</p>
              <p className="text-sm text-gray-600 mt-1">
                {statistics.claims.pending} pending review
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
              <p className="text-sm text-gray-500">Claims Value</p>
              <p className="text-2xl font-semibold mt-1">{statistics.claims.value.toLocaleString()} SAR</p>
              <p className="text-sm text-gray-600 mt-1">
                {statistics.claims.resolved} resolved
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
              <p className="text-sm text-gray-500">Compliance Rate</p>
              <p className="text-2xl font-semibold mt-1">{statistics.claims.complianceRate}%</p>
              <p className="text-sm text-gray-600 mt-1">
                GTPL RC 128 adherence
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-4 p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`p-3 rounded-lg bg-${action.color}-50`}>
              <action.icon size={24} className={`text-${action.color}-600`} />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
            <ArrowRight size={20} className="ml-auto text-gray-400" />
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <div className="flex gap-2">
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'claim' ? 'bg-blue-50' :
                    activity.type === 'notice' ? 'bg-yellow-50' :
                    'bg-purple-50'
                  }`}>
                    <activity.icon size={20} className={`${
                      activity.type === 'claim' ? 'text-blue-600' :
                      activity.type === 'notice' ? 'text-yellow-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">{activity.reference}</span>
                          <span className="text-sm text-gray-500">{activity.article}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        activity.status === 'Under Review' ? 'bg-yellow-50 text-yellow-600' :
                        activity.status === 'Submitted' ? 'bg-blue-50 text-blue-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>{activity.date}</span>
                      </div>
                      {activity.amount && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <DollarSign size={14} />
                          <span>{activity.amount}</span>
                        </div>
                      )}
                      {activity.impact && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{activity.impact}</span>
                        </div>
                      )}
                      {activity.deadline && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <AlertCircle size={14} />
                          <span>Due {activity.deadline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowRight size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Alerts */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Alerts</h2>
          </div>
          <div className="p-6 space-y-4">
            {complianceAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  alert.severity === 'high' ? 'bg-red-50' :
                  alert.severity === 'medium' ? 'bg-yellow-50' :
                  'bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-100' :
                    alert.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {alert.type === 'deadline' && (
                      <Clock size={16} className={
                        alert.severity === 'high' ? 'text-red-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      } />
                    )}
                    {alert.type === 'documentation' && (
                      <FileText size={16} className={
                        alert.severity === 'high' ? 'text-red-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      } />
                    )}
                    {alert.type === 'approval' && (
                      <Users size={16} className={
                        alert.severity === 'high' ? 'text-red-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      } />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      alert.severity === 'high' ? 'text-red-900' :
                      alert.severity === 'medium' ? 'text-yellow-900' :
                      'text-blue-900'
                    }`}>
                      {alert.title}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      alert.severity === 'high' ? 'text-red-700' :
                      alert.severity === 'medium' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {alert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;