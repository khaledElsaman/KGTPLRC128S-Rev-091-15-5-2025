import React, { useState } from 'react';
import { variationTypes, VariationTypeInfo } from '../../data/variationData';
import { Search, Info } from 'lucide-react';

interface VariationTypeSelectorProps {
  onSelect: (variationType: VariationTypeInfo) => void;
  selectedType?: string;
}

const VariationTypeSelector: React.FC<VariationTypeSelectorProps> = ({ onSelect, selectedType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInfo, setShowInfo] = useState<string | null>(null);

  // Filter variation types based on search term
  const filteredTypes = variationTypes.filter(type => 
    type.variationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.legalBasis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search variation types..."
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.variationType;
          
          return (
            <div 
              key={type.variationType}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              onClick={() => onSelect(type)}
              title={type.tooltip}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {Icon && (
                    <div className={`p-2 rounded-lg bg-${type.color || 'blue'}-50`}>
                      <Icon size={20} className={`text-${type.color || 'blue'}-600`} />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{type.variationType}</h3>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  </div>
                </div>
                <button 
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo(showInfo === type.variationType ? null : type.variationType);
                  }}
                >
                  <Info size={16} className="text-gray-400" />
                </button>
              </div>
              
              {showInfo === type.variationType && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Legal Basis</p>
                      <p className="text-sm text-gray-700">{type.legalBasis}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Remarks</p>
                      <p className="text-sm text-gray-700">{type.remarks}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {filteredTypes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No variation types found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default VariationTypeSelector;