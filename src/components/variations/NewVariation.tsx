import React, { useState, useEffect } from 'react';
import { 
  Calculator, Calendar, Clock, AlertCircle, CheckCircle, XCircle, 
  Download, Plus, Filter, Search, MoreVertical, Brain, Scale, 
  ArrowUpDown, FileText, DollarSign, TrendingUp, Users, Percent, 
  ArrowRight, Upload, GitCompare, Info, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import VariationTypeSelector from './VariationTypeSelector';
import LegalBasisSelector from './LegalBasisSelector';
import { VariationTypeInfo } from '../../data/variationData';
import { LegalBasisInfo } from '../../data/legalBasisData';

// Variation Types based on GTPL RC 128
const variationTypes = {
  'PRICE': {
    category: 'Price Adjustments',
    article: '113',
    types: {
      'PA-MAT': { 
        title: 'Material Price Adjustment',
        threshold: '10% of Contract Value',
        requiredDocs: ['Price Analysis', 'Market Survey', 'Supplier Quotations']
      },
      'PA-TAR': { 
        title: 'Tariff Adjustment',
        threshold: '5% of Contract Value',
        requiredDocs: ['Tariff Documentation', 'Cost Impact Analysis']
      }
    }
  },
  'SCOPE': {
    category: 'Scope Changes',
    article: '114',
    types: {
      'SC-ADD': { 
        title: 'Scope Addition',
        threshold: '20% of Contract Value',
        requiredDocs: ['Technical Specification', 'Cost Estimate', 'Schedule Impact']
      },
      'SC-RED': { 
        title: 'Scope Reduction',
        threshold: '10% of Contract Value',
        requiredDocs: ['Impact Analysis', 'Cost Adjustment']
      }
    }
  },
  'ADDITIONAL': {
    category: 'Additional Works',
    article: '116',
    types: {
      'AW-EMG': { 
        title: 'Emergency Works',
        threshold: '15% of Contract Value',
        requiredDocs: ['Emergency Declaration', 'Scope Definition', 'Cost Estimate']
      },
      'AW-SUP': { 
        title: 'Supplementary Works',
        threshold: '25% of Contract Value',
        requiredDocs: ['Technical Justification', 'Cost Analysis', 'Schedule Impact']
      }
    }
  }
};

const NewVariation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVariationType, setSelectedVariationType] = useState<VariationTypeInfo | null>(null);
  const [selectedLegalBasis, setSelectedLegalBasis] = useState<LegalBasisInfo | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    reference: '',
    description: '',
    value: '',
    justification: '',
    impactAnalysis: '',
    scheduleImpact: '',
    documents: [] as File[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create the variation in the database
      const { data, error } = await supabase
        .from('variations_master')
        .insert([{
          title: formData.title,
          description: formData.description,
          type: selectedVariationType?.variationType || 'Other',
          status: 'Draft',
          value: parseFloat(formData.value) || 0,
          created_by: 'user-id', // Replace with actual user ID
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Show success message and redirect
      alert('Variation created successfully!');
      navigate('/master-variations');
    } catch (error) {
      console.error('Error creating variation:', error);
      alert('Failed to create variation. Please try again.');
    }
  };

  const handleFileUpload = (file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, file]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Step 1: Select Variation Type</h2>
            <VariationTypeSelector 
              onSelect={(type) => setSelectedVariationType(type)}
              selectedType={selectedVariationType?.variationType}
            />
            
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/master-variations')}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={!selectedVariationType}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedVariationType
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Step 2: Select Legal Basis</h2>
            <LegalBasisSelector 
              onSelect={(basis) => setSelectedLegalBasis(basis)}
              selectedBasisId={selectedLegalBasis?.id}
            />
            
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                disabled={!selectedLegalBasis}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  selectedLegalBasis
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Step 3: Variation Details</h2>
            
            {selectedVariationType && selectedLegalBasis && (
              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-900">{selectedVariationType.variationType}</h3>
                    <p className="text-sm text-blue-700 mt-1">{selectedVariationType.description}</p>
                    <div className="mt-2 pt-2 border-t border-blue-200">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Legal Basis:</span> {selectedLegalBasis.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variation Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variation Value (SAR)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Impact (Days)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.scheduleImpact}
                  onChange={(e) => setFormData({ ...formData, scheduleImpact: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Justification
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact Analysis
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.impactAnalysis}
                  onChange={(e) => setFormData({ ...formData, impactAnalysis: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Document Upload Section */}
            {selectedType && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Required Documents</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedLegalBasis && (
                    <>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors"
                      >
                        <div className="flex flex-col items-center text-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-4" />
                          <h3 className="text-sm font-medium text-gray-900">Technical Documentation</h3>
                          <p className="text-xs text-gray-500 mt-1">Upload required document</p>
                          <label className="mt-4">
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                              }}
                            />
                            <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                              Select File
                            </span>
                          </label>
                        </div>
                      </div>
                      
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors"
                      >
                        <div className="flex flex-col items-center text-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-4" />
                          <h3 className="text-sm font-medium text-gray-900">Cost Analysis</h3>
                          <p className="text-xs text-gray-500 mt-1">Upload required document</p>
                          <label className="mt-4">
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                              }}
                            />
                            <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                              Select File
                            </span>
                          </label>
                        </div>
                      </div>
                      
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors"
                      >
                        <div className="flex flex-col items-center text-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-4" />
                          <h3 className="text-sm font-medium text-gray-900">Legal Compliance</h3>
                          <p className="text-xs text-gray-500 mt-1">Upload required document</p>
                          <label className="mt-4">
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                              }}
                            />
                            <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                              Select File
                            </span>
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Variation
                </button>
              </div>
            </div>
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Variation</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new variation request</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>AI Assist</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Save Draft</span>
          </button>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
          }`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
          }`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={currentStep === 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Select Type</span>
          <span className={currentStep === 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Legal Basis</span>
          <span className={currentStep === 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Variation Details</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default NewVariation;