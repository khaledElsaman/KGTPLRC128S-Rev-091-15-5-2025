import React from 'react';
import { FileText, GitCompare, Calendar, ArrowRight } from 'lucide-react';
import type { SearchResult } from '../../lib/search';

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect, onClose }) => {
  if (results.length === 0) {
    return (
      <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-4 px-2">
        <p className="text-sm text-gray-500 text-center">No results found</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {results.map((result) => (
        <button
          key={`${result.type}-${result.id}`}
          className="w-full px-4 py-3 hover:bg-gray-50 flex items-start gap-3 text-left"
          onClick={() => {
            onSelect(result);
            onClose();
          }}
        >
          <div className={`p-2 rounded-lg ${
            result.type === 'claim' ? 'bg-blue-50' : 'bg-purple-50'
          }`}>
            {result.type === 'claim' ? (
              <FileText size={16} className="text-blue-600" />
            ) : (
              <GitCompare size={16} className="text-purple-600" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
              <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-500">{result.module}</span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={14} />
                <span>{new Date(result.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            
            {result.description && (
              <p className="text-sm text-gray-600 mt-1 truncate">
                {result.description}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchResults;