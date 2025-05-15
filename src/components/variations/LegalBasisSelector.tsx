import React, { useState } from 'react';
import { legalBasisOptions, LegalBasisInfo } from '../../data/legalBasisData';
import { Search, Info } from 'lucide-react';

interface LegalBasisSelectorProps {
  onSelect: (legalBasis: LegalBasisInfo) => void;
  selectedBasisId?: string;
}

const LegalBasisSelector: React.FC<LegalBasisSelectorProps> = ({ onSelect, selectedBasisId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInfo, setShowInfo] = useState<string | null>(null);

  // Filter legal basis options based on search term
  const filteredOptions = legalBasisOptions.filter(option => 
    option.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.articles.some(article => article.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by article, description..."
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedBasisId === option.id;
          
          return (
            <div 
              key={option.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              onClick={() => onSelect(option)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {Icon && (
                    <div className={`p-2 rounded-lg bg-${option.color || 'blue'}-50`}>
                      <Icon size={20} className={`text-${option.color || 'blue'}-600`} />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  </div>
                </div>
                <button 
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo(showInfo === option.id ? null : option.id);
                  }}
                >
                  <Info size={16} className="text-gray-400" />
                </button>
              </div>
              
              {showInfo === option.id && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Legal References</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {option.articles.map((article, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                            {article}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {filteredOptions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No legal basis options found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default LegalBasisSelector;