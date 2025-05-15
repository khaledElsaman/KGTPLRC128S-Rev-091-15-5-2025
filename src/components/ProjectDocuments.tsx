import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Search, Filter, Download, Upload, Plus, MoreVertical, Eye, Edit, Trash2, Clock, CheckCircle, AlertTriangle, FileWarning, MessageSquare, Share2, History, Tag, Lock, Users, ArrowRight, Brain, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

// Document Types based on GTPLRC128
const documentTypes = {
  'CONTRACT': {
    category: 'Contracts & Agreements',
    article: '68-69',
    types: {
      'CON-AGR': { 
        title: 'Contract Agreement', 
        template: 'contract_agreement',
        requiredFields: ['Contract Number', 'Parties', 'Value', 'Duration']
      },
      'CON-AMD': { 
        title: 'Contract Amendment', 
        template: 'contract_amendment',
        requiredFields: ['Amendment Number', 'Reference', 'Changes']
      },
      'CON-VAR': { 
        title: 'Variation Order', 
        template: 'variation_order',
        requiredFields: ['VO Number', 'Scope', 'Impact']
      }
    }
  },
  'CLAIMS': {
    category: 'Claims Documentation',
    article: '74',
    types: {
      'CLM-NOT': { 
        title: 'Notice of Claim', 
        template: 'claim_notice',
        requiredFields: ['Claim Reference', 'Type', 'Description']
      },
      'CLM-SUP': { 
        title: 'Supporting Documents', 
        template: 'claim_support',
        requiredFields: ['Reference', 'Document Type', 'Description']
      }
    }
  },
  'TECHNICAL': {
    category: 'Technical Documents',
    article: '114',
    types: {
      'TECH-DWG': { 
        title: 'Drawings', 
        template: 'technical_drawing',
        requiredFields: ['Drawing Number', 'Title', 'Revision']
      },
      'TECH-SPEC': { 
        title: 'Specifications', 
        template: 'technical_spec',
        requiredFields: ['Spec Number', 'Section', 'Description']
      },
      'TECH-RPT': { 
        title: 'Technical Reports', 
        template: 'technical_report',
        requiredFields: ['Report Number', 'Subject', 'Findings']
      }
    }
  },
  'LEGAL': {
    category: 'Legal & Compliance',
    article: '155',
    types: {
      'LEG-CER': { 
        title: 'Certificates', 
        template: 'legal_certificate',
        requiredFields: ['Certificate Type', 'Issue Date', 'Validity']
      },
      'LEG-APR': { 
        title: 'Approvals', 
        template: 'legal_approval',
        requiredFields: ['Approval Reference', 'Authority', 'Scope']
      }
    }
  }
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    'Draft': 'bg-gray-50 text-gray-600',
    'Pending Review': 'bg-yellow-50 text-yellow-600',
    'Approved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-600',
    'Archived': 'bg-blue-50 text-blue-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

interface Document {
  id: string;
  title: string;
  claim_id?: string;
  document_type: string;
  file_url: string;
  upload_date: string;
  uploaded_by: string;
  status: string;
  description?: string;
  version?: string;
  size?: string;
}

const ProjectDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [claims, setClaims] = useState<Database['public']['Tables']['claims_master']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    claim_id: '',
    document_type: 'TECH-DWG',
    description: '',
    file_url: '',
    status: 'Draft' as const
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocuments();
    fetchClaims();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      
      // This is a mock implementation since we don't have a project_documents table yet
      // In a real implementation, you would fetch from the actual table
      
      // Mock data for demonstration
      const mockDocuments: Document[] = [
        {
          id: 'DOC-2024-001',
          title: 'Main Contract Agreement',
          claim_id: 'CLM-2024-001',
          document_type: 'CON-AGR',
          file_url: 'https://example.com/documents/contract.pdf',
          upload_date: '2024-03-15',
          uploaded_by: 'John Smith',
          status: 'Approved',
          version: '1.0',
          size: '2.4 MB',
          description: 'Main contract agreement for the project'
        },
        {
          id: 'DOC-2024-002',
          title: 'Technical Specifications',
          claim_id: 'CLM-2024-001',
          document_type: 'TECH-SPEC',
          file_url: 'https://example.com/documents/specs.pdf',
          upload_date: '2024-03-16',
          uploaded_by: 'Sarah Johnson',
          status: 'Pending Review',
          version: '2.1',
          size: '5.7 MB',
          description: 'Updated technical specifications for steel works'
        },
        {
          id: 'DOC-2024-003',
          title: 'Notice of Delay Claim',
          claim_id: 'CLM-2024-002',
          document_type: 'CLM-NOT',
          file_url: 'https://example.com/documents/delay_notice.pdf',
          upload_date: '2024-03-17',
          uploaded_by: 'Mike Chen',
          status: 'Draft',
          version: '1.0',
          size: '1.2 MB',
          description: 'Notice of delay claim due to weather conditions'
        }
      ];
      
      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClaims = async () => {
    try {
      const { data, error } = await supabase
        .from('claims_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClaims(data || []);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real implementation, you would upload the file to storage
      // and then save the document metadata to the database
      
      // For demonstration, we'll just add to the local state
      const newDocument: Document = {
        id: `DOC-${Date.now()}`,
        title: formData.title,
        claim_id: formData.claim_id || undefined,
        document_type: formData.document_type,
        file_url: formData.file_url || 'https://example.com/documents/new.pdf',
        upload_date: new Date().toISOString().split('T')[0],
        uploaded_by: 'Current User',
        status: formData.status,
        description: formData.description,
        version: '1.0',
        size: uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.0 MB'
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      setShowUploadModal(false);
      setFormData({
        title: '',
        claim_id: '',
        document_type: 'TECH-DWG',
        description: '',
        file_url: '',
        status: 'Draft'
      });
      setUploadedFile(null);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const handleFileChange = (file: File) => {
    setUploadedFile(file);
    // In a real implementation, you would upload the file to storage
    // and get the URL to save in formData.file_url
    setFormData(prev => ({
      ...prev,
      file_url: URL.createObjectURL(file) // This is just for demonstration
    }));
  };

  const handleView = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleDownload = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document && document.file_url) {
      window.open(document.file_url, '_blank');
    }
  };

  // Filter documents based on selected criteria
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.document_type.startsWith(selectedCategory);
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Document Management System for GTPLRC128</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>AI Analysis</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Share2 size={16} />
            <span>Share</span>
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload size={16} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search documents..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="CON">Contracts & Agreements</option>
          <option value="CLM">Claims Documentation</option>
          <option value="TECH">Technical Documents</option>
          <option value="LEG">Legal & Compliance</option>
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Documents</p>
              <p className="text-2xl font-semibold mt-1">{documents.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold mt-1">
                {documents.filter(d => d.status === 'Pending Review').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-semibold mt-1">
                {documents.filter(d => d.status === 'Approved').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Compliance Issues</p>
              <p className="text-2xl font-semibold mt-1">0</p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Document Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Linked Claim ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Document Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Upload Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Uploaded By</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    Loading documents...
                  </td>
                </tr>
              ) : filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No documents found
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((document) => (
                  <tr key={document.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <span className="font-medium">{document.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{document.claim_id || '-'}</td>
                    <td className="py-3 px-4">
                      {Object.entries(documentTypes).map(([key, category]) => 
                        Object.entries(category.types).find(([typeKey]) => typeKey === document.document_type)?.[1].title
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{document.upload_date}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{document.uploaded_by}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={document.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleView(document)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="View"
                        >
                          <Eye size={16} className="text-blue-600" />
                        </button>
                        <button 
                          onClick={() => handleDownload(document.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Download"
                        >
                          <Download size={16} className="text-purple-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="More">
                          <MoreVertical size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
                  <p className="text-sm text-gray-500 mt-1">Add new document to the system</p>
                </div>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.document_type}
                      onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
                      required
                    >
                      {Object.entries(documentTypes).map(([key, category]) => (
                        <optgroup key={key} label={category.category}>
                          {Object.entries(category.types).map(([typeKey, type]) => (
                            <option key={typeKey} value={typeKey}>{type.title}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter document title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Linked Claim (Optional)
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.claim_id}
                      onChange={(e) => setFormData({ ...formData, claim_id: e.target.value })}
                    >
                      <option value="">None</option>
                      {claims.map(claim => (
                        <option key={claim.id} value={claim.id}>{claim.title} ({claim.id})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      required
                    >
                      <option value="Draft">Draft</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Enter document description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Files
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="flex flex-col items-center">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Drag and drop files here, or click to select files
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOCX, XLSX up to 10MB each
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileChange(file);
                        }}
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                      />
                      <button
                        type="button"
                        onClick={() => document.querySelector('input[type="file"]')?.click()}
                        className="mt-4 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        Select Files
                      </button>
                    </div>
                  </div>
                  {uploadedFile && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <span className="text-sm">{uploadedFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="p-1 hover:bg-blue-100 rounded-full"
                      >
                        <X size={14} className="text-blue-600" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reviewers
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm flex items-center gap-2">
                      <Users size={14} />
                      <span>Technical Team</span>
                      <button className="hover:bg-blue-100 rounded-full p-1">
                        <X size={12} />
                      </button>
                    </div>
                    <button className="px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                      <Plus size={14} />
                      <span>Add Reviewer</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDocument.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedDocument.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedDocument(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText size={48} className="text-gray-400" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Document Details</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Status</span>
                        <StatusBadge status={selectedDocument.status} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Version</span>
                        <span className="text-sm">{selectedDocument.version || '1.0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Size</span>
                        <span className="text-sm">{selectedDocument.size || '1.0 MB'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Uploaded By</span>
                        <span className="text-sm">{selectedDocument.uploaded_by}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Upload Date</span>
                        <span className="text-sm">{selectedDocument.upload_date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Linked Claim</span>
                        <span className="text-sm">{selectedDocument.claim_id || 'None'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a 
                      href={selectedDocument.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </a>
                    <button className="w-full flex items-center justify-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <MessageSquare size={16} />
                      <span>Add Comment</span>
                    </button>
                  </div>
                </div>
              </div>

              {selectedDocument.description && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                  <p className="text-sm text-gray-700">{selectedDocument.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDocuments;