import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Search, Filter, Download, Upload, Plus, MoreVertical, Eye, Edit, Trash2, Clock, CheckCircle, AlertTriangle, FileWarning, MessageSquare, Share2, History, Tag, Lock, Users, ArrowRight, Brain, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type VariationDocument = Database['public']['Tables']['variation_documents']['Row'];
type Variation = Database['public']['Tables']['variations_master']['Row'];

// Document Type Badge Component
const DocumentTypeBadge = ({ type }: { type: string }) => {
  const styles = {
    'Drawing': 'bg-blue-50 text-blue-600',
    'Change Order': 'bg-purple-50 text-purple-600',
    'Other': 'bg-gray-50 text-gray-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[type as keyof typeof styles]}`}>
      {type}
    </span>
  );
};

// Document Card Component
const DocumentCard = ({ document, onClick, onDownload }: { document: VariationDocument; onClick: () => void; onDownload: () => void }) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-50">
          <FileText size={24} className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{document.title}</h3>
          <p className="text-sm text-gray-500 mt-1">Variation ID: {document.variation_id}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{new Date(document.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      <DocumentTypeBadge type={document.document_type} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{document.document_type}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Download size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 size={16} className="text-purple-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ProjectVariationDocuments = () => {
  const [documents, setDocuments] = useState<VariationDocument[]>([]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<VariationDocument | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    variation_id: '',
    document_type: 'Drawing' as const,
    file_url: 'https://example.com/document.pdf' // Default for demo
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocuments();
    fetchVariations();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('variation_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Using mock document data:', error.message);
        // If table doesn't exist yet, use mock data
        const mockDocuments = [
          {
            id: 'DOC-2024-001',
            variation_id: 'VAR-2024-001',
            title: 'Revised Foundation Drawing',
            document_type: 'Drawing',
            file_url: 'https://example.com/documents/drawing.pdf',
            created_at: new Date().toISOString(),
            created_by: 'user-id',
            last_updated_at: new Date().toISOString(),
            last_updated_by: 'user-id'
          },
          {
            id: 'DOC-2024-002',
            variation_id: 'VAR-2024-002',
            title: 'Change Order #45 - Steel Reinforcement',
            document_type: 'Change Order',
            file_url: 'https://example.com/documents/change_order.pdf',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user-id',
            last_updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            last_updated_by: 'user-id'
          },
          {
            id: 'DOC-2024-003',
            variation_id: 'VAR-2024-003',
            title: 'Supplier Quote - Additional Materials',
            document_type: 'Other',
            file_url: 'https://example.com/documents/quote.pdf',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user-id',
            last_updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            last_updated_by: 'user-id'
          }
        ];
        setDocuments(mockDocuments as any);
      } else {
        setDocuments(data || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVariations = async () => {
    try {
      const { data, error } = await supabase
        .from('variations_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVariations(data || []);
    } catch (error) {
      console.error('Error fetching variations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('variation_documents')
        .insert([{
          ...formData,
          created_by: 'user-id', // Replace with actual user ID
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating document:', error);
        // Fallback to local state update if database insert fails
        const newDocument = {
          id: `DOC-${Date.now()}`,
          ...formData,
          created_at: new Date().toISOString(),
          created_by: 'user-id',
          last_updated_at: new Date().toISOString(),
          last_updated_by: 'user-id'
        };
        
        setDocuments(prev => [newDocument as any, ...prev]);
      } else {
        setDocuments(prev => [data, ...prev]);
      }
      
      setShowUploadModal(false);
      setFormData({
        title: '',
        variation_id: '',
        document_type: 'Drawing',
        file_url: 'https://example.com/document.pdf'
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
  };

  const handleView = (document: VariationDocument) => {
    setSelectedDocument(document);
  };

  const handleDownload = (document: VariationDocument) => {
    window.open(document.file_url, '_blank');
  };

  // Filter documents based on selected criteria
  const filteredDocuments = documents.filter(doc => {
    const matchesType = selectedType === 'all' || doc.document_type === selectedType;
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Variation Documents</h1>
          <p className="text-sm text-gray-500 mt-1">Manage variation-related documents</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>AI Analysis</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
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
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="Drawing">Drawings</option>
          <option value="Change Order">Change Orders</option>
          <option value="Other">Other Documents</option>
        </select>
      </div>

      {/* Statistics */}
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
              <p className="text-sm text-gray-500">Drawings</p>
              <p className="text-2xl font-semibold mt-1">
                {documents.filter(d => d.document_type === 'Drawing').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50">
              <FileText size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Change Orders</p>
              <p className="text-2xl font-semibold mt-1">
                {documents.filter(d => d.document_type === 'Change Order').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <FileText size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Other Documents</p>
              <p className="text-2xl font-semibold mt-1">
                {documents.filter(d => d.document_type === 'Other').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <FileText size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading documents...</p>
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500 mb-4">Upload a new document to get started</p>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Upload Document
              </button>
            </div>
          </div>
        ) : (
          filteredDocuments.map(document => (
            <DocumentCard
              key={document.id}
              document={document}
              onClick={() => handleView(document)}
              onDownload={() => handleDownload(document)}
            />
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
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
                      onChange={(e) => setFormData({ ...formData, document_type: e.target.value as any })}
                      required
                    >
                      <option value="Drawing">Drawing</option>
                      <option value="Change Order">Change Order</option>
                      <option value="Other">Other</option>
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

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Related Variation
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.variation_id}
                      onChange={(e) => setFormData({ ...formData, variation_id: e.target.value })}
                      required
                    >
                      <option value="">Select Variation</option>
                      {variations.map(variation => (
                        <option key={variation.id} value={variation.id}>
                          {variation.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File
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
                      />
                      <button
                        type="button"
                        onClick={() => document.querySelector('input[type="file"]')?.click()}
                        className="mt-4 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        Select File
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
                  <p className="text-sm text-gray-500 mt-1">Document ID: {selectedDocument.id}</p>
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
                        <span className="text-sm text-gray-500">Type</span>
                        <DocumentTypeBadge type={selectedDocument.document_type} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Variation ID</span>
                        <span className="text-sm">{selectedDocument.variation_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Uploaded On</span>
                        <span className="text-sm">{new Date(selectedDocument.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Last Updated</span>
                        <span className="text-sm">{new Date(selectedDocument.last_updated_at).toLocaleDateString()}</span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectVariationDocuments;