import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ArrowLeft, Menu } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// Define the regulation article structure
interface RegulationArticle {
  id: string;
  article_number: string;
  article_title: string;
  article_body: string;
  part_number: string;
  chapter_number: string;
}

// Sample regulation articles data
const regulationArticles: RegulationArticle[] = [
  {
    id: 'reg-art-113',
    article_number: "Article 113",
    article_title: "Contract Price Adjustment",
    article_body: "Compensation is permissible if:\n\n1. Customs tariffs, fees, taxes, or priced materials/services change after offer submission.\n\n2. Contractor proves actual payment based on new rates.\n\n3. Price increase is not due to contractor's delay.\n\nMaterial Price Adjustments:\n• Applies if market price change >10% for materials (cement, iron, asphalt, etc.).\n• Adjustment only if total contract cost impact >3%.\n• Compensation is capped at 20% of total contract value.",
    part_number: '3',
    chapter_number: '2'
  },
  {
    id: 'reg-art-114',
    article_number: "Article 114",
    article_title: "Additional Works",
    article_body: "Rules for additional works and amendments:\n\n1. Additional work must be within the general scope of the original contract.\n\n2. Proper funding must be available before approval.\n\n3. If contractor disagrees with pricing, government entity may seek other contractors.",
    part_number: '3',
    chapter_number: '2'
  },
  {
    id: 'reg-art-115',
    article_number: "Article 115",
    article_title: "Contract Amendments",
    article_body: "Rules for contract amendments and restrictions:\n\n1. Amendments must be in writing and signed by both parties.\n\n2. Amendments must not alter the nature of the contract.\n\n3. Amendments must be within the limits specified in Article 69 of the Law.",
    part_number: '3',
    chapter_number: '2'
  },
  {
    id: 'reg-art-116',
    article_number: "Article 116",
    article_title: "Contractor Obligations",
    article_body: "Rules for modifying contractor obligations:\n\n1. Contractor cannot perform additional works without written approval.\n\n2. No compensation for unauthorized works, even if beneficial to the project.\n\n3. Contractor may be required to remove unauthorized works at their own expense.",
    part_number: '3',
    chapter_number: '3'
  },
  {
    id: 'reg-art-153',
    article_number: "Article 153",
    article_title: "Grievance Procedures",
    article_body: "Grievance procedures (guarantee requirement):\n\n1. Grievances must be submitted within the specified timeframe.\n\n2. A financial guarantee may be required for certain types of grievances.\n\n3. The committee shall issue its decision within the period specified in the Law.",
    part_number: '5',
    chapter_number: '1'
  },
  {
    id: 'reg-art-154',
    article_number: "Article 154",
    article_title: "Arbitration Provisions",
    article_body: "Arbitration is only permitted for contracts with a value exceeding SAR 100 million. Prior approval from the Minister of Finance is required before initiating any arbitration proceedings. Arbitration shall be conducted in accordance with the Saudi Arbitration Law and its procedures.",
    part_number: '5',
    chapter_number: '2'
  },
  {
    id: 'reg-art-155',
    article_number: "Article 155",
    article_title: "Technical Dispute Resolution",
    article_body: "In case of a technical dispute between the government entity and the contractor that could lead to project failure or significant harm to either or both parties, a council shall be formed to consider the dispute, consisting of a representative from the government entity, a representative from the contractor, and a chairperson appointed by the Ministry. The council shall issue its decision within thirty days, which may be extended by fifteen days in case of objections. The council's decision shall be binding if accepted by both parties.",
    part_number: '5',
    chapter_number: '2'
  }
];

const GtplRC128RegulationViewer = () => {
  const { handleModuleChange } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showToc, setShowToc] = useState(true);

  // Check if we're on mobile
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleArticle = (articleId: string) => {
    setExpandedArticles(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const copyLinkToClipboard = (articleId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${articleId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(articleId);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  // Filter articles based on search term
  const filteredArticles = regulationArticles.filter(article =>
    article.article_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.article_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.article_body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format content with proper paragraph breaks
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4 text-gray-700">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Table of Contents */}
      <div 
        className={`${showToc ? 'w-1/4' : 'w-0'} h-full overflow-y-auto border-r border-gray-200 transition-all duration-300 ${isMobile ? 'absolute z-10 bg-white' : 'relative'}`}
      >
        <div className="p-4 border-b border-gray-200 sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">GTPL RC 128 Regulation</h2>
            {isMobile && (
              <button 
                onClick={() => setShowToc(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <ArrowLeft size={20} className="text-gray-500" />
              </button>
            )}
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="p-2">
          {regulationArticles.map(article => (
            <button
              key={article.id}
              className={`w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg ${
                expandedArticles.includes(article.id) ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onClick={() => toggleArticle(article.id)}
            >
              <span className="text-sm">{article.article_number}</span>
              {expandedArticles.includes(article.id) ? (
                <ChevronDown size={16} className="text-gray-500" />
              ) : (
                <ChevronRight size={16} className="text-gray-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {isMobile && !showToc && (
          <div className="sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
            <button 
              onClick={() => setShowToc(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg"
            >
              <Menu size={16} />
              <span>Show Table of Contents</span>
            </button>
          </div>
        )}
        <div className="max-w-3xl mx-auto py-8 px-6">
          <div className="space-y-8">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredArticles.map(article => (
                <div 
                  key={article.id} 
                  id={article.id}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${
                    expandedArticles.includes(article.id) ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Scale size={20} className="text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-900">
                          {article.article_number}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyLinkToClipboard(article.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Copy link to article"
                        >
                          {copySuccess === article.id ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      {article.article_title}
                    </h3>
                    
                    <div className="prose max-w-none">
                      {formatContent(article.article_body)}
                    </div>
                    
                    <div className="mt-6 text-sm text-gray-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">Part:</span> {article.part_number}
                        </div>
                        <div>
                          <span className="font-medium">Chapter:</span> {article.chapter_number}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GtplRC128RegulationViewer;