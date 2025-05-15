import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

type DeploymentStatus = 'idle' | 'building' | 'ready' | 'error' | 'unknown';

interface DeploymentInfo {
  status: DeploymentStatus;
  url?: string;
  error?: string;
  deploy_id?: string;
  claimed?: boolean;
  claim_url?: string;
}

const DeploymentStatus: React.FC = () => {
  const [deploymentInfo, setDeploymentInfo] = useState<DeploymentInfo>({
    status: 'unknown'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDeploymentStatus = async () => {
      try {
        // In a real implementation, this would fetch from an API
        // For now, we'll simulate a deployment status
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll set a static status
        setDeploymentInfo({
          status: 'ready',
          url: 'https://kgtplrc128s-demo.netlify.app',
          deploy_id: 'deploy-123456',
          claimed: false,
          claim_url: 'https://app.netlify.com/claim/site/abc123'
        });
      } catch (error) {
        console.error('Error fetching deployment status:', error);
        setDeploymentInfo({
          status: 'error',
          error: 'Failed to fetch deployment status'
        });
      } finally {
        setLoading(false);
      }
    };

    checkDeploymentStatus();
  }, []);

  const getStatusDisplay = () => {
    switch (deploymentInfo.status) {
      case 'idle':
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <AlertCircle size={20} className="text-gray-400" />
            <span>No active deployment</span>
          </div>
        );
      case 'building':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader size={20} className="animate-spin" />
            <span>Building deployment...</span>
          </div>
        );
      case 'ready':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span>Deployment successful</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle size={20} />
            <span>Deployment failed: {deploymentInfo.error}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <AlertCircle size={20} />
            <span>Unknown status</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Deployment Status</h2>
      
      {loading ? (
        <div className="flex items-center justify-center h-24">
          <Loader size={24} className="animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Checking deployment status...</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>{getStatusDisplay()}</div>
            {deploymentInfo.status === 'ready' && deploymentInfo.url && (
              <a 
                href={deploymentInfo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <span>View Site</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          
          {deploymentInfo.status === 'ready' && deploymentInfo.url && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Deployment URL:</p>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={deploymentInfo.url} 
                  readOnly 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm"
                />
                <button 
                  onClick={() => navigator.clipboard.writeText(deploymentInfo.url || '')}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          
          {deploymentInfo.status === 'ready' && !deploymentInfo.claimed && deploymentInfo.claim_url && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-900">Transfer Ownership</p>
                  <p className="text-sm text-blue-700 mt-1">
                    You can transfer this deployment to your own Netlify account.
                  </p>
                  <a 
                    href={deploymentInfo.claim_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <span>Claim this site</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeploymentStatus;