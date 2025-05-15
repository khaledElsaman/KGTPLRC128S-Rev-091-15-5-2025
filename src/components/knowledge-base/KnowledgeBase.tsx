import React, { useState } from 'react';
import { Book, Search, Filter, Download, FileText, HelpCircle, Video, MessageSquare, ArrowRight, ChevronDown, ChevronUp, ExternalLink, FileCheck, GitCompare, Scale, Globe } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// Knowledge categories
const categories = [
  { id: 'getting-started', name: 'Getting Started', icon: Book },
  { id: 'claims', name: 'Claims Management', icon: FileText },
  { id: 'variations', name: 'Variations Management', icon: GitCompare },
  { id: 'compliance', name: 'Compliance', icon: FileCheck },
  { id: 'ai', name: 'AI Features', icon: Book },
  { id: 'gtpl', name: 'GTPL RC 128 Law', icon: Scale },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: HelpCircle }
];

// Sample knowledge base articles
const articles = [
  {
    id: 'article-1',
    title: 'Introduction to KGTPLRC128S',
    category: 'getting-started',
    type: 'guide',
    description: 'Learn about the KGTPLRC128S platform and its key features',
    date: '2024-03-15',
    route: 'system-guide'
  },
  {
    id: 'article-2',
    title: 'Creating Your First Claim',
    category: 'claims',
    type: 'tutorial',
    description: 'Step-by-step guide to creating and submitting a new claim',
    date: '2024-03-16',
    route: 'master-claims'
  },
  {
    id: 'article-3',
    title: 'Variation Approval Process',
    category: 'variations',
    type: 'guide',
    description: 'Understanding the variation approval workflow',
    date: '2024-03-17',
    route: 'variation-approval'
  },
  {
    id: 'article-4',
    title: 'GTPL RC 128 Compliance Checklist',
    category: 'compliance',
    type: 'checklist',
    description: 'Ensure your claims and variations comply with GTPL RC 128',
    date: '2024-03-18',
    route: 'system-guide'
  },
  {
    id: 'article-5',
    title: 'Using AI Analysis for Claims',
    category: 'ai',
    type: 'tutorial',
    description: 'How to leverage AI insights for better claim outcomes',
    date: '2024-03-19',
    route: 'claims-ai'
  },
  {
    id: 'article-6',
    title: 'Claims Compliance Guide',
    category: 'compliance',
    type: 'guide',
    description: 'Comprehensive guide to claims compliance under GTPL RC 128',
    date: '2024-03-20',
    route: 'claims-compliance-guide'
  },
  {
    id: 'article-7',
    title: 'Variations Compliance Guide',
    category: 'compliance',
    type: 'guide',
    description: 'Comprehensive guide to variations compliance under GTPL RC 128',
    date: '2024-03-21',
    route: 'variations-compliance-guide'
  },
  {
    id: 'article-8',
    title: 'GTPL RC 128 Law - Table of Contents',
    category: 'gtpl',
    type: 'guide',
    description: 'Navigate the Government Tenders and Procurement Law by Part, Chapter, and Article',
    date: '2024-04-15',
    route: 'gtpl-rc128-table-of-contents'
  }
];

// FAQ items
const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.'
  },
  {
    question: 'What is the maximum file size for document uploads?',
    answer: 'The maximum file size for document uploads is 50MB. If you need to upload larger files, please contact system support.'
  },
  {
    question: 'How do I link a document to a specific claim?',
    answer: 'When uploading a document, select the related claim from the dropdown menu in the upload form. You can also link existing documents to claims from the document details page.'
  },
  {
    question: 'Can I export reports to Excel?',
    answer: 'Yes, most reports and data tables in the system can be exported to Excel by clicking the "Export" button in the top right corner of the page.'
  },
  {
    question: 'How accurate is the AI prediction feature?',
    answer: 'The AI prediction feature has an average accuracy of 85-90% based on historical data. The system continuously learns and improves as more data is processed.'
  }
];

// Article Type Badge Component
const TypeBadge = ({ type }: { type: string }) => {
  const styles = {
    'guide': 'bg-blue-50 text-blue-600',
    'tutorial': 'bg-green-50 text-green-600',
    'checklist': 'bg-purple-50 text-purple-600',
    'faq': 'bg-yellow-50 text-yellow-600',
    'video': 'bg-red-50 text-red-600',
    'reference': 'bg-indigo-50 text-indigo-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[type as keyof typeof styles]}`}>
      {type}
    </span>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex items-center justify-between w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-500" />
        ) : (
          <ChevronDown size={16} className="text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const KnowledgeBase = () => {
  const { handleModuleChange } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('articles');

  // Filter articles based on selected category and search term
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const navigateToArticle = (article: typeof articles[0]) => {
    handleModuleChange(article.route as any, 'Overview');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-500 mt-1">Find help, tutorials, and answers to common questions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <MessageSquare size={16} />
            <span>Contact Support</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={16} />
            <span>Download Guides</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search knowledge base..."
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
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'articles'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('articles')}
            >
              Articles & Guides
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'videos'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              Video Tutorials
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'faq'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              FAQs
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Articles & Guides</h2>
              
              {filteredArticles.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map(article => (
                    <div 
                      key={article.id} 
                      className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigateToArticle(article)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{article.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{article.description}</p>
                        </div>
                        <TypeBadge type={article.type} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{article.date}</span>
                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                          <span>Read more</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Video Tutorials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <Video size={48} className="text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">Getting Started with KGTPLRC128S</h3>
                    <p className="text-sm text-gray-500 mt-1">A complete overview of the system and its features</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-gray-500">10:25 mins</span>
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                        <span>Watch now</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <Video size={48} className="text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">Claims Management Tutorial</h3>
                    <p className="text-sm text-gray-500 mt-1">Learn how to create and manage claims effectively</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-gray-500">8:15 mins</span>
                      <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                        <span>Watch now</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 mb-4">Can't find what you're looking for?</p>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto">
                  <MessageSquare size={16} />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Knowledge Base Hub - Main Tiles */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Base Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleModuleChange('system-guide', 'Overview')}
          >
            <div className="flex items-center gap-3 mb-4">
              <Book size={24} className="text-blue-600" />
              <h3 className="font-medium text-gray-900">System Guide</h3>
            </div>
            <p className="text-sm text-gray-600">Learn how to use the KGTPLRC128S platform effectively</p>
          </div>
          
          <div 
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleModuleChange('claims-compliance-guide', 'Overview')}
          >
            <div className="flex items-center gap-3 mb-4">
              <FileCheck size={24} className="text-green-600" />
              <h3 className="font-medium text-gray-900">Claims Compliance Guide</h3>
            </div>
            <p className="text-sm text-gray-600">Ensure your claims comply with GTPL RC 128 requirements</p>
          </div>
          
          <div 
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleModuleChange('variations-compliance-guide', 'Overview')}
          >
            <div className="flex items-center gap-3 mb-4">
              <FileCheck size={24} className="text-purple-600" />
              <h3 className="font-medium text-gray-900">Variations Compliance Guide</h3>
            </div>
            <p className="text-sm text-gray-600">Ensure your variations comply with GTPL RC 128 requirements</p>
          </div>
          
          <div 
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleModuleChange('dispute-arbitration-guide', 'Overview')}
          >
            <div className="flex items-center gap-3 mb-4">
              <FileCheck size={24} className="text-blue-600" />
              <h3 className="font-medium text-gray-900">Dispute & Arbitration Guide</h3>
            </div>
            <p className="text-sm text-gray-600">Learn about dispute resolution and arbitration procedures</p>
          </div>

          <div 
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleModuleChange('gtpl-rc128-table-of-contents', 'Overview')}
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale size={24} className="text-indigo-600" />
              <h3 className="font-medium text-gray-900">GTPL RC 128 Law</h3>
            </div>
            <p className="text-sm text-gray-600">Explore the Government Tenders and Procurement Law</p>
          </div>

          <div 
            className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.open('https://ncar.gov.sa/Documents/Details?Id=oCElQIyvsJ%2FH%2BOwE%2F3cZ1A%3D%3D', '_blank')}
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe size={24} className="text-gray-600" />
              <h3 className="font-medium text-gray-900">Official Resources</h3>
            </div>
            <p className="text-sm text-gray-600">Access official government procurement resources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;