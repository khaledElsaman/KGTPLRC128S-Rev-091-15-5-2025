import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="p-4 bg-red-50 rounded-full mb-4">
        <AlertCircle size={32} className="text-red-600" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
      <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;