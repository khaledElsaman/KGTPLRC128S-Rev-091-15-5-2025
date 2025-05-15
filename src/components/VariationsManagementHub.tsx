import React from 'react';
import { GitCompare, Brain, Calendar, Clock, CheckCircle, XCircle, DollarSign, Users, ArrowRight, Scale, FileText, Briefcase, Percent, Folder, FileWarning, MessageSquare, BarChart2, Shield, FileDiff } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const VariationsManagementHub = () => {
  const { handleModuleChange } = useApp();

  // Define the main modules for variations management
  const variationsModules = [
    {
      id: 'master-variations',
      name: 'Master Variations',
      description: 'Manage, track, and process all variations related to the project',
      icon: GitCompare,
      color: 'indigo',
      subModule: 'All Variations'
    },
    {
      id: 'variation-requests',
      name: 'Variation Requests',
      description: 'Submit and track all variation forms',
      icon: FileDiff,
      color: 'blue',
      subModule: 'Overview'
    },
    {
      id: 'variation-documents',
      name: 'Project Variation Documents',
      description: 'Variation document management',
      icon: Folder,
      color: 'indigo',
      subModule: 'All Documents'
    },
    {
      id: 'engineer-notices',
      name: 'Full Variation Details',
      description: 'Engineer variation notices',
      icon: FileWarning,
      color: 'yellow',
      subModule: 'Draft Notices'
    },
    {
      id: 'contractor-response',
      name: 'Contractor Response',
      description: 'Contractor responses to variations',
      icon: MessageSquare,
      color: 'purple',
      subModule: 'Pending Responses'
    },
    {
      id: 'variation-analysis',
      name: 'Variation Analysis',
      description: 'Analyze variation patterns',
      icon: BarChart2,
      color: 'green',
      subModule: 'Overview'
    },
    {
      id: 'variations-ai',
      name: 'AI Analysis',
      description: 'AI-powered variation insights',
      icon: Brain,
      color: 'pink',
      subModule: 'Predictions'
    },
    {
      id: 'variation-approval',
      name: 'Variation Approval',
      description: 'Variation approval workflow',
      icon: CheckCircle,
      color: 'green',
      subModule: 'Pending Approval'
    },
    {
      id: 'variations-compliance-guide',
      name: 'Variations Compliance Guide',
      description: 'Ensure your variations comply with GTPL RC 128 requirements',
      icon: Shield,
      color: 'purple',
      subModule: 'Overview'
    }
  ];

  // Statistics for the dashboard
  const statistics = {
    totalVariations: 36,
    activeVariations: 14,
    approvedVariations: 22,
    totalValue: 2850000,
    approvalRate: 82
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Variations Management Hub</h1>
          <p className="text-gray-500 mt-1">Centralized platform for managing all variations under GTPL RC 128</p>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Variations</p>
              <p className="text-2xl font-semibold mt-1">{statistics.totalVariations}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <GitCompare size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Variations</p>
              <p className="text-2xl font-semibold mt-1">{statistics.activeVariations}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
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

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approval Rate</p>
              <p className="text-2xl font-semibold mt-1">{statistics.approvalRate}%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variationsModules.map((module) => {
          const IconComponent = module.icon;
          return (
            <div 
              key={module.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleModuleChange(module.id as any, module.subModule)}
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
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <GitCompare size={16} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">New variation submitted</p>
                <span className="text-sm text-gray-500">3 hours ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Foundation Design Change Variation has been submitted for review</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle size={16} className="text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Variation approved</p>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Material Specification Change Variation has been approved</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Scale size={16} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">Variation under review</p>
                <span className="text-sm text-gray-500">3 days ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Additional Drainage Works Variation is under technical review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Guide */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <GitCompare size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-900">GTPL RC 128 Variations Compliance</h3>
            <p className="text-purple-700 mt-1">
              Ensure all variations comply with Saudi Government Tenders and Procurement Law 128 Articles 113-116 and its Implementing Regulations.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 inline-flex items-center gap-2"
                onClick={() => handleModuleChange('variations-compliance-guide', 'Overview')}
              >
                <span>View Variations Compliance Guide</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="px-4 py-2 bg-white border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 inline-flex items-center gap-2"
                onClick={() => handleModuleChange('knowledge-base', 'Overview')}
              >
                <span>Knowledge Base</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Percent size={20} className="text-blue-600" />
              <h3 className="font-medium text-gray-900">Average Change</h3>
            </div>
            <p className="text-2xl font-semibold">+8.5%</p>
            <p className="text-sm text-gray-500 mt-1">From original contract value</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-yellow-600" />
              <h3 className="font-medium text-gray-900">Avg. Processing Time</h3>
            </div>
            <p className="text-2xl font-semibold">12 days</p>
            <p className="text-sm text-gray-500 mt-1">From submission to approval</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={20} className="text-green-600" />
              <h3 className="font-medium text-gray-900">Active Projects</h3>
            </div>
            <p className="text-2xl font-semibold">8</p>
            <p className="text-sm text-gray-500 mt-1">With ongoing variations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationsManagementHub;