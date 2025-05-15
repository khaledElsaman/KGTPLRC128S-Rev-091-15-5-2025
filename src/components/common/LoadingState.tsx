import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingState;