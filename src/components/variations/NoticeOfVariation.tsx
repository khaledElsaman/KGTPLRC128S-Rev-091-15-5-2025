import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, Brain, Scale, 
  ArrowUpDown, DollarSign, TrendingUp, Users, Percent, ArrowRight, Upload, GitCompare, Info, FileDiff, Bell, FileWarning, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../contexts/AppContext';

// Variation types based on GTPL RC128
const variationTypeOptions = [
  { value: 'scope_addition', label: 'Scope Addition (Article 69)' },
  { value: 'scope_reduction', label: 'Scope Reduction (Article 69)' },
  { value: 'material_price_adjustment', label: 'Material Price Adjustment (Article 68)' },
  { value: 'tariff_adjustment', label: 'Tariff Adjustment (Article 68)' },
  { value: 'emergency_works', label: 'Emergency Works (Article 114)' },
  { value: 'supplementary_works', label: 'Supplementary Works (Article 116)' }
];

// Legal basis options based on GTPL RC128
const legalBasisOptions = [
  { value: 'article_68', label: 'Article 68 - Price Adjustment' },
  { value: 'article_69', label: 'Article 69 - Change Orders (±10%/±20%)' },
  { value: 'article_74', label: 'Article 74 - Contract Extensions' },
  { value: 'article_113', label: 'Regulation 113 - Contract Price Adjustment' },
  { value: 'article_114', label: 'Regulation 114 - Additional Works' },
  { value: 'article_116', label: 'Regulation 116 - Contractor Obligations' }
];

// Approval entities
const approvalEntities = [
  { value: 'project_manager', label: 'Project Manager' },
  { value: 'technical_committee', label: 'Technical Committee' },
  { value: 'financial_committee', label: 'Financial Committee' },
  { value: 'ministry_of_finance', label: 'Ministry of Finance' }
];

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Draft': 'bg-gray-50 text-gray-600',
    'Submitted': 'bg-yellow-50 text-yellow-600',
    'Acknowledged': 'bg-blue-50 text-blue-600',
    'Under Review': 'bg-purple-50 text-purple-600',
    'Approved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

// Document Upload Card Component
const DocumentUploadCard = ({ title, description, onUpload }: { title: string; description: string; onUpload: (file: File) => void }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center text-center">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <label className="mt-4">
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
          <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            Select File
          </span>
        </label>
      </div>
    </div>
  );
};

const NoticeOfVariation = () => {
  const navigate = useNavigate();
  const { handleModuleChange } = useApp();
  const [formData, setFormData] = useState({
    variation_id: '',
    contract_number: '',
    variation_type: '',
    legal_basis: '',
    initiation_date: new Date().toISOString().split('T')[0],
    submission_date: new Date().toISOString().split('T')[0],
    narrative_description: '',
    supporting_docs: [] as File[],
    cost_impact: '',
    time_impact: '',
    approval_entity: '',
    status: 'Draft' as const
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Calculate the deadline for submission (10 working days from initiation)
  const calculateSubmissionDeadline = (initiationDate: string) => {
    const date = new Date(initiationDate);
    let workingDaysToAdd = 10;
    let currentDate = new Date(date);
    
    while (workingDaysToAdd > 0) {
      currentDate.setDate(currentDate.getDate() + 1);
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        workingDaysToAdd--;
      }
    }
    
    return currentDate.toISOString().split('T')[0];
  };

  // Update submission deadline when initiation date changes
  useEffect(() => {
    if (formData.initiation_date) {
      const deadline = calculateSubmissionDeadline(formData.initiation_date);
      // Only update if the current submission date is before the initiation date
      // or if it's not set yet
      if (!formData.submission_date || new Date(formData.submission_date) < new Date(formData.initiation_date)) {
        setFormData(prev => ({ ...prev, submission_date: deadline }));
      }
    }
  }, [formData.initiation_date]);

  // Check for late submission
  useEffect(() => {
    if (formData.initiation_date && formData.submission_date) {
      const deadline = calculateSubmissionDeadline(formData.initiation_date);
      if (new Date(formData.submission_date) > new Date(deadline)) {
        setValidationErrors(prev => ({
          ...prev,
          submission_date: 'Late notice warning: Submission date exceeds the 10 working day requirement'
        }));
      } else {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.submission_date;
          return newErrors;
        });
      }
    }
  }, [formData.initiation_date, formData.submission_date]);

  const handleFileUpload = (file: File) => {
    setFormData(prev => ({
      ...prev,
      supporting_docs: [...prev.supporting_docs, file]
    }));
    
    // Clear any validation errors for supporting docs
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.supporting_docs;
      return newErrors;
    });
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      supporting_docs: prev.supporting_docs.filter((_, i) => i !== index)
    }));
    
    // Check if we need to add validation error back
    if (formData.supporting_docs.length <= 1) {
      setValidationErrors(prev => ({
        ...prev,
        supporting_docs: 'Supporting documents are required as per Regulation Clause 72'
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Required fields
    if (!formData.variation_id) errors.variation_id = 'Variation ID is required';
    if (!formData.contract_number) errors.contract_number = 'Contract Number is required';
    if (!formData.variation_type) errors.variation_type = 'Variation Type is required';
    if (!formData.legal_basis) errors.legal_basis = 'Legal Basis is required';
    if (!formData.initiation_date) errors.initiation_date = 'Date Variation Identified is required';
    if (!formData.submission_date) errors.submission_date = 'Notice Submission Date is required';
    if (!formData.narrative_description) errors.narrative_description = 'Description is required';
    if (formData.supporting_docs.length === 0) {
      errors.supporting_docs = 'Supporting documents are required as per Regulation Clause 72';
    }
    if (!formData.approval_entity) errors.approval_entity = 'Approval Entity is required';
    
    // Check for late submission
    if (formData.initiation_date && formData.submission_date) {
      const deadline = calculateSubmissionDeadline(formData.initiation_date);
      if (new Date(formData.submission_date) > new Date(deadline)) {
        errors.submission_date = 'Late notice warning: Submission date exceeds the 10 working day requirement';
      }
    }
    
    // Check for missing impact estimation
    if (!formData.cost_impact && !formData.time_impact) {
      errors.impact = 'At least one impact estimation (cost or time) should be provided';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    try {
      // In a real implementation, you would upload files to storage
      // and save the notice to the database
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form after submission
      setTimeout(() => {
        setShowSuccessModal(false);
        setFormData({
          variation_id: '',
          contract_number: '',
          variation_type: '',
          legal_basis: '',
          initiation_date: new Date().toISOString().split('T')[0],
          submission_date: new Date().toISOString().split('T')[0],
          narrative_description: '',
          supporting_docs: [],
          cost_impact: '',
          time_impact: '',
          approval_entity: '',
          status: 'Draft'
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting notice:', error);
      alert('Failed to submit notice. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#f0f9ff] p-6 rounded-lg border border-[#dbeafe]">
        <h1 className="text-2xl font-bold text-[#1f2937]">Notice of Variation</h1>
        <p className="text-sm text-gray-600 mt-1">Submit a formal notice of variation in accordance with GTPL RC 128</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="variation_id" className="block text-sm font-medium text-gray-700 mb-2">
                Variation ID <span className="text-red-500">*</span>
              </label>
              <input
                id="variation_id"
                type="text"
                value={formData.variation_id}
                onChange={(e) => setFormData({ ...formData, variation_id: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.variation_id ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {validationErrors.variation_id && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.variation_id}</p>
              )}
            </div>

            <div>
              <label htmlFor="contract_number" className="block text-sm font-medium text-gray-700 mb-2">
                Contract Number <span className="text-red-500">*</span>
              </label>
              <input
                id="contract_number"
                type="text"
                value={formData.contract_number}
                onChange={(e) => setFormData({ ...formData, contract_number: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.contract_number ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {validationErrors.contract_number && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.contract_number}</p>
              )}
            </div>

            <div>
              <label htmlFor="variation_type" className="block text-sm font-medium text-gray-700 mb-2">
                Variation Type <span className="text-red-500">*</span>
              </label>
              <select
                id="variation_type"
                value={formData.variation_type}
                onChange={(e) => setFormData({ ...formData, variation_type: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.variation_type ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              >
                <option value="">Select Variation Type</option>
                {variationTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {validationErrors.variation_type && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.variation_type}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">GTPL RC128 Law Article 36, Regulation Clause 114</p>
            </div>

            <div>
              <label htmlFor="legal_basis" className="block text-sm font-medium text-gray-700 mb-2">
                Legal Basis (GTPL Article) <span className="text-red-500">*</span>
              </label>
              <select
                id="legal_basis"
                value={formData.legal_basis}
                onChange={(e) => setFormData({ ...formData, legal_basis: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.legal_basis ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              >
                <option value="">Select Legal Basis</option>
                {legalBasisOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {validationErrors.legal_basis && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.legal_basis}</p>
              )}
            </div>
          </div>
        </div>

        {/* Dates and Timeline */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dates and Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="initiation_date" className="block text-sm font-medium text-gray-700 mb-2">
                Date Variation Identified <span className="text-red-500">*</span>
              </label>
              <input
                id="initiation_date"
                type="date"
                value={formData.initiation_date}
                onChange={(e) => setFormData({ ...formData, initiation_date: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.initiation_date ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {validationErrors.initiation_date && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.initiation_date}</p>
              )}
            </div>

            <div>
              <label htmlFor="submission_date" className="block text-sm font-medium text-gray-700 mb-2">
                Notice Submission Date <span className="text-red-500">*</span>
              </label>
              <input
                id="submission_date"
                type="date"
                value={formData.submission_date}
                onChange={(e) => setFormData({ ...formData, submission_date: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.submission_date ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {validationErrors.submission_date && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.submission_date}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Must be within 10 working days from variation identification (Reg. Clause 73)</p>
            </div>
          </div>
        </div>

        {/* Description and Documents */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Description and Documents</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="narrative_description" className="block text-sm font-medium text-gray-700 mb-2">
                Description of Variation <span className="text-red-500">*</span>
              </label>
              <textarea
                id="narrative_description"
                value={formData.narrative_description}
                onChange={(e) => setFormData({ ...formData, narrative_description: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.narrative_description ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows={6}
                required
              />
              {validationErrors.narrative_description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.narrative_description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Documents <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentUploadCard
                  title="Technical Documentation"
                  description="Upload drawings, specifications, or technical reports"
                  onUpload={handleFileUpload}
                />
                <DocumentUploadCard
                  title="Cost Documentation"
                  description="Upload cost estimates, quotations, or price analyses"
                  onUpload={handleFileUpload}
                />
              </div>
              {formData.supporting_docs.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Documents:</p>
                  {formData.supporting_docs.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="p-1 hover:bg-gray-200 rounded-full"
                      >
                        <X size={16} className="text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {validationErrors.supporting_docs && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.supporting_docs}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Required as per Regulation Clause 72</p>
            </div>
          </div>
        </div>

        {/* Estimated Impact */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Estimated Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cost_impact" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Cost Impact (SAR)
              </label>
              <input
                id="cost_impact"
                type="number"
                value={formData.cost_impact}
                onChange={(e) => setFormData({ ...formData, cost_impact: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.impact ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label htmlFor="time_impact" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Time Impact (Days)
              </label>
              <input
                id="time_impact"
                type="number"
                value={formData.time_impact}
                onChange={(e) => setFormData({ ...formData, time_impact: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.impact ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {validationErrors.impact && (
              <div className="col-span-2">
                <p className="text-sm text-red-600">{validationErrors.impact}</p>
              </div>
            )}
          </div>
        </div>

        {/* Approval and Status */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Approval and Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="approval_entity" className="block text-sm font-medium text-gray-700 mb-2">
                Entity Approval Route <span className="text-red-500">*</span>
              </label>
              <select
                id="approval_entity"
                value={formData.approval_entity}
                onChange={(e) => setFormData({ ...formData, approval_entity: e.target.value })}
                className={`w-full px-4 py-2 border ${validationErrors.approval_entity ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              >
                <option value="">Select Approval Entity</option>
                {approvalEntities.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {validationErrors.approval_entity && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.approval_entity}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Notice Status
              </label>
              <div className="flex items-center gap-2 h-10">
                <StatusBadge status={formData.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Warnings */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-red-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">Compliance Warnings</h3>
                <ul className="mt-2 space-y-2">
                  {Object.entries(validationErrors).map(([field, message]) => (
                    <li key={field} className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-red-600 mt-1" />
                      <span className="text-sm text-red-700">{message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* GTPL RC 128 Compliance Guide */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Info size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">GTPL RC 128 Compliance Note</h3>
              <p className="text-blue-700 mt-1">
                This Notice of Variation must be submitted within 10 working days of identifying the variation as per Regulation Clause 73. 
                All supporting documentation must be provided as per Regulation Clause 72.
              </p>
              <div className="mt-4">
                <button 
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                  onClick={() => handleModuleChange('variations-compliance-guide', 'Overview')}
                >
                  <span>View Compliance Guide</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
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
            Submit Notice
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Notice Submitted Successfully</h3>
            <p className="text-center text-gray-600 mb-6">
              Your Notice of Variation has been submitted successfully and is now pending acknowledgment.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeOfVariation;