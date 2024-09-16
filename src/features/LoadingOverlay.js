import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-white text-xl font-semibold">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 mx-auto mb-4"></div>
        <p>Processing Payment...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
