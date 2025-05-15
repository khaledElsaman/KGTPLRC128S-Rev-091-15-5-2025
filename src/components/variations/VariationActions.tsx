import React, { useState } from 'react';
import { Plus, Download, Brain, Filter, GitCompare } from 'lucide-react';

type VariationActionsProps = {
  onAddNew?: () => void;
  onExport?: () => void;
  onAnalyze?: () => void;
};

export default function VariationActions({ onAddNew, onExport, onAnalyze }: VariationActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleAddNew = () => {
    if (onAddNew) {
      onAddNew();
    } else {
      console.log('Add new variation clicked');
    }
  };
  
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log('Export variations clicked');
    }
  };
  
  const handleAnalyze = () => {
    if (onAnalyze) {
      onAnalyze();
    } else {
      console.log('Analyze variations clicked');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <button 
        onClick={handleAddNew}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={16} />
        <span>Add New Variation</span>
      </button>
      
      <button 
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Download size={16} />
        <span>Export</span>
      </button>
      
      <button 
        onClick={handleAnalyze}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Brain size={16} />
        <span>AI Analysis</span>
      </button>
      
      <div className="relative ml-auto">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter size={16} />
          <span>More Actions</span>
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              <button 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log('View all variations');
                  setShowDropdown(false);
                }}
              >
                View All Variations
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log('View pending approvals');
                  setShowDropdown(false);
                }}
              >
                Pending Approvals
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log('View compliance report');
                  setShowDropdown(false);
                }}
              >
                Compliance Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}