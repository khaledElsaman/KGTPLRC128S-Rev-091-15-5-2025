import React from 'react';
import { FileText, GitCompare, Brain, Calendar, Clock, CheckCircle, XCircle, DollarSign, Users, ArrowRight, Shield, Book, HelpCircle, Home, LayoutDashboard, Folder, FileWarning, MessageSquare, ClipboardList, BarChart2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const ClaimsManagementHub = () => {
  const { handleModuleChange } = useApp();

  // Define the main modules for claims management
  const claimsModules = [
    {
      id: 'claims-dashboard',
      name: 'Claims Dashboard',
      description: 'Overview of all claims',
      icon: LayoutDashboard,
      color: 'blue',
      subModules: ['Overview', 'Insights', 'Trends', 'Notifications', 'Compliance']
    },
    {
      id: 'master-claims',
      name: 'Master Claims',
      description: 'Manage and track all claims',
      icon: FileText,
      color: 'blue',
      subModules: ['Active Claims', 'Pending Claims', 'Archived Claims']
    },
    {
      id: 'documents',
      name: 'Project Documents',
      description: 'Document management system',
      icon: Folder,
      color: 'indigo',
      subModules: ['All Documents', 'Pending Approvals', 'Archived Files']
    },
    {
      id: 'notices',
      name: 'Notice of Claims',
      description: 'Manage claim notices',
      icon: FileWarning,
      color: 'yellow',
      subModules: ['Draft Notices', 'Issued Notices', 'Archived Notices']
    },
    {
      id: 'engineer-response',
      name: 'Engineer Response',
      description: 'Handle engineer responses',
      icon: MessageSquare,
      color: 'purple',
      subModules: ['All Responses', 'Pending Reviews', 'Approved Responses']
    },
    {
      id: 'records',
      name: 'Contemporaneous Records',
      description: 'Track and manage records',
      icon: ClipboardList,
      color: 'green',
      subModules: ['Daily Logs', 'Incident Reports', 'Pending Reviews']
    },
    {
      id: 'detailed-claims',
      name: 'Detailed Claims',
      description: 'In-depth claim management',
      icon: FileText,
      color: 'indigo',
      subModules: ['Submitted Claims', 'Under Review', 'Rejected Claims']
    },
    {
      id: 'analysis',
      name: 'Claims Analysis',
      description: 'Analyze claim patterns',
      icon: BarChart2,
      color: 'pink',
      subModules: ['Overview', 'Pending Reviews', 'Insights']
    },
    {
      id: 'claims-ai',
      name: 'AI Analysis',
      description: 'AI-powered insights',
      icon: Brain,
      color: 'purple',
      subModules: ['Trends', 'Predictions', 'Early Warnings', 'Reports']
    },
    {
      id: 'resolution',
      name: 'Claims Resolution',
      description: 'Resolve and close claims',
      icon: CheckCircle,
      color: 'green',
      subModules: ['Active Resolutions', 'Completed Cases', 'Committee Approval']
    },
    {
      id: 'claims-compliance-guide',
      name: 'Claims Compliance Guide',
      description: 'Ensure your claims comply with GTPL RC 128 requirements',
      icon: Shield,
      color: 'blue',
      subModules: ['Overview']
    }
  ];

  // Statistics for the dashboard
  const statistics = {
    totalClaims: 42,
    activeClaims: 18,
    resolvedClaims: 24,
    totalValue: 3750000,
    approvalRate: 78
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
          <p className="text-gray-500 mt-1">Centralized platform for managing all claims under GTPL RC 128</p>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Claims</p>
              <p className="text-2xl font-semibold mt-1">{statistics.totalClaims}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Claims</p>
              <p className="text-2xl font-semibold mt-1">{statistics.activeClaims}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-semibold mt-1">{(statistics.totalValue / 1000000).toFixed(1)}M SAR</p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <DollarSign size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approval Rate</p>
              <p className="text-2xl font-semibold mt-1">{statistics.approvalRate}%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Users size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {claimsModules.map((module) => {
          const IconComponent = module.icon;
          return (
            <div 
              key={module.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleModuleChange(module.id as any, module.subModules[0])}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-${module.color}-50`}>
                  <IconComponent size={24} className={`text-${module.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{module.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <FileText size={16} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">New claim submitted</p>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Steel Price Variation Claim has been submitted for review</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle size={16} className="text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Claim approved</p>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Site Access Delay Claim has been approved</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-red-100 rounded-full">
              <XCircle size={16} className="text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Claim rejected</p>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Additional Equipment Claim has been rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Guide */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FileText size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">GTPL RC 128 Compliance</h3>
            <p className="text-blue-700 mt-1">
              Ensure all claims comply with Saudi Government Tenders and Procurement Law 128 and its Implementing Regulations.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                onClick={() => handleModuleChange('claims-compliance-guide', 'Overview')}
              >
                <span>View Claims Compliance Guide</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 inline-flex items-center gap-2"
                onClick={() => handleModuleChange('knowledge-base', 'Overview')}
              >
                <span>Knowledge Base</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsManagementHub;