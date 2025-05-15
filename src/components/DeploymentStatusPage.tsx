import React from 'react';
import DeploymentStatus from './DeploymentStatus';
import { GitCompare, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeploymentStatusPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deployment Status</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor your project deployment status</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      {/* Deployment Status Component */}
      <DeploymentStatus />

      {/* Deployment Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Deployment Information</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Project Name</p>
              <p className="font-medium">KGTPLRC128S</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Deployment Provider</p>
              <p className="font-medium">Netlify</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Build Command</p>
              <p className="font-medium">npm run build</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Output Directory</p>
              <p className="font-medium">dist</p>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <GitCompare size={20} className="text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-blue-900">Continuous Deployment</p>
                <p className="text-sm text-blue-700 mt-1">
                  Your project is configured for continuous deployment. Any changes pushed to the main branch will trigger a new deployment automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment History */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Deployment History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Deployment ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Branch</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Commit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">deploy-123456</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                    Success
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">2025-04-27 14:30</td>
                <td className="py-3 px-4 text-sm">main</td>
                <td className="py-3 px-4 text-sm">a1b2c3d</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">deploy-123455</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                    Failed
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">2025-04-26 10:15</td>
                <td className="py-3 px-4 text-sm">main</td>
                <td className="py-3 px-4 text-sm">e5f6g7h</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">deploy-123454</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                    Success
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">2025-04-25 09:45</td>
                <td className="py-3 px-4 text-sm">main</td>
                <td className="py-3 px-4 text-sm">i9j0k1l</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatusPage;