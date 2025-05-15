import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ArrowLeft, Menu } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { regulationToLawMappings, lawToRegulationMappings } from '../../lib/regulationLawMappings';

// Define the linked article structure
interface LinkedArticle {
  id: string;
  lawArticle: {
    articleNumber: string;
    articleTitle: string;
    articleText: string;
  };
  relatedRegulations: {
    regulationNumber: string;
    regulationTitle: string;
    regulationText: string;
  }[];
  partNumber?: string;
  chapterNumber?: string;
}

// Sample linked articles data
const linkedArticles: LinkedArticle[] = [
  {
    id: 'linked-art-8',
    lawArticle: {
      articleNumber: "Article 8",
      articleTitle: "Tendering Guidelines",
      articleText: "The tendering and contracting of works and procurements shall be restricted to the actual needs of the government agency and shall be at fair prices that do not exceed prevailing market prices."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 8.1",
        regulationTitle: "Needs Assessment",
        regulationText: "Government agencies must upload tender needs in the portal annually. The needs assessment must include detailed specifications, estimated costs, and timeline requirements."
      },
      {
        regulationNumber: "Regulation 8.2",
        regulationTitle: "Price Verification",
        regulationText: "Government agencies shall verify that prices do not exceed prevailing market prices by conducting market research, consulting price indices, or obtaining multiple quotations."
      }
    ],
    partNumber: '1',
    chapterNumber: '1'
  },
  {
    id: 'linked-art-68',
    lawArticle: {
      articleNumber: "Article 68",
      articleTitle: "Price Adjustment and Change Orders",
      articleText: "Contract or framework agreement prices can only be adjusted (increase or decrease) in the following cases:\n\n1. Changes in prices of main tendered items or services, as specified by regulations.\n\n2. Adjustment of tariffs, fees, or taxes affecting the contract.\n\n3. Unforeseen financial difficulties arising during contract execution."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 113",
        regulationTitle: "Contract Price Adjustment",
        regulationText: "Compensation is permissible if:\n\n1. Customs tariffs, fees, taxes, or priced materials/services change after offer submission.\n\n2. Contractor proves actual payment based on new rates.\n\n3. Price increase is not due to contractor's delay.\n\nMaterial Price Adjustments:\n• Applies if market price change >10% for materials (cement, iron, asphalt, etc.).\n• Adjustment only if total contract cost impact >3%.\n• Compensation is capped at 20% of total contract value."
      }
    ],
    partNumber: '3',
    chapterNumber: '2'
  },
  {
    id: 'linked-art-69',
    lawArticle: {
      articleNumber: "Article 69",
      articleTitle: "Change Orders Limits",
      articleText: "Change orders up to +10% / -20% of contract value. The government entity may issue change orders to increase the contractor's obligations by no more than 10% of the contract value, or decrease them by no more than 20% of the contract value."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 114",
        regulationTitle: "Additional Works",
        regulationText: "Rules for additional works and amendments:\n\n1. Additional work must be within the general scope of the original contract.\n\n2. Proper funding must be available before approval.\n\n3. If contractor disagrees with pricing, government entity may seek other contractors."
      },
      {
        regulationNumber: "Regulation 115",
        regulationTitle: "Contract Amendments",
        regulationText: "Rules for contract amendments and restrictions:\n\n1. Amendments must be in writing and signed by both parties.\n\n2. Amendments must not alter the nature of the contract.\n\n3. Amendments must be within the limits specified in Article 69 of the Law."
      }
    ],
    partNumber: '3',
    chapterNumber: '2'
  },
  {
    id: 'linked-art-74',
    lawArticle: {
      articleNumber: "Article 74",
      articleTitle: "Contract Extensions",
      articleText: "Conditions to extend contracts and waive fines. A contract may be extended and delay penalties waived in the following cases:\n\n1. If the contractor is assigned additional works.\n\n2. If the annual financial appropriations for the project are insufficient.\n\n3. If the delay is caused by the government agency or circumstances beyond the contractor's control."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 116",
        regulationTitle: "Contractor Obligations",
        regulationText: "Rules for modifying contractor obligations:\n\n1. Contractor cannot perform additional works without written approval.\n\n2. No compensation for unauthorized works, even if beneficial to the project.\n\n3. Contractor may be required to remove unauthorized works at their own expense."
      }
    ],
    partNumber: '3',
    chapterNumber: '3'
  },
  {
    id: 'linked-art-86',
    lawArticle: {
      articleNumber: "Article 86",
      articleTitle: "Appeal Committees",
      articleText: "Appeal committees and binding decisions. The Minister shall form one or more committees to consider bidder complaints. The committee's decision shall be binding on all government agencies."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 153",
        regulationTitle: "Grievance Procedures",
        regulationText: "Grievance procedures (guarantee requirement):\n\n1. Grievances must be submitted within the specified timeframe.\n\n2. A financial guarantee may be required for certain types of grievances.\n\n3. The committee shall issue its decision within the period specified in the Law."
      }
    ],
    partNumber: '5',
    chapterNumber: '1'
  },
  {
    id: 'linked-art-72',
    lawArticle: {
      articleNumber: "Article 72",
      articleTitle: "Delay Penalty",
      articleText: "Delay Penalty (6% supply contracts, 20% others). For supply contracts, the penalty shall not exceed 6% of the contract value. For other contracts, the penalty shall not exceed 20% of the contract value."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 118",
        regulationTitle: "Penalty Calculation",
        regulationText: "Rules for calculating delay penalties:\n\n1. Penalties are calculated based on the value of delayed works or services.\n\n2. For supply contracts, penalties must not exceed 6% of contract value.\n\n3. For other contracts, penalties must not exceed 20% of contract value."
      }
    ],
    partNumber: '3',
    chapterNumber: '3'
  },
  {
    id: 'linked-art-73',
    lawArticle: {
      articleNumber: "Article 73",
      articleTitle: "Service Contract Penalties",
      articleText: "Continuing Service Contract penalties (up to 20%). For continuing service contracts, the penalty for non-performance shall not exceed 20% of the monthly invoice value."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 119",
        regulationTitle: "Service Performance Monitoring",
        regulationText: "Rules for monitoring service contract performance:\n\n1. Government entity must establish clear performance indicators.\n\n2. Regular performance evaluations must be conducted.\n\n3. Penalties for non-performance must not exceed 20% of monthly invoice value."
      }
    ],
    partNumber: '3',
    chapterNumber: '3'
  },
  {
    id: 'linked-art-92',
    lawArticle: {
      articleNumber: "Article 92",
      articleTitle: "Dispute Resolution",
      articleText: "1. A government agency shall fulfill its contractual obligations and pay the contractor's entitlements in accordance with the contract terms and conditions.\n\n2. A government agency may not resort to arbitration for resolving disputes arising from its contracts except after obtaining the approval of the Minister. Arbitration shall be conducted in accordance with the Saudi Arbitration Law and its procedures. Arbitration is not permitted for disputes arising from contracts with a value of less than one hundred million riyals."
    },
    relatedRegulations: [
      {
        regulationNumber: "Regulation 154",
        regulationTitle: "Arbitration Agreements",
        regulationText: "Arbitration is only permitted for contracts with a value exceeding SAR 100 million. Prior approval from the Minister of Finance is required before initiating any arbitration proceedings. Arbitration shall be conducted in accordance with the Saudi Arbitration Law and its procedures."
      },
      {
        regulationNumber: "Regulation 155",
        regulationTitle: "Technical Disputes Council",
        regulationText: "In case of a technical dispute between the government entity and the contractor that could lead to project failure or significant harm to either or both parties, a council shall be formed to consider the dispute, consisting of a representative from the government entity, a representative from the contractor, and a chairperson appointed by the Ministry. The council shall issue its decision within thirty days, which may be extended by fifteen days in case of objections. The council's decision shall be binding if accepted by both parties."
      }
    ],
    partNumber: '4',
    chapterNumber: '3'
  }
];

// Generate TOC items from linked articles
const generateTocItems = (articles: LinkedArticle[]) => {
  // Group by part number
  const partGroups: Record<string, LinkedArticle[]> = {};
  articles.forEach(article => {
    const partNumber = article.partNumber || 'Other';
    if (!partGroups[partNumber]) {
      partGroups[partNumber] = [];
    }
    partGroups[partNumber].push(article);
  });

  // Create TOC structure
  const tocItems = Object.entries(partGroups).map(([partNumber, partArticles]) => {
    // Group by chapter within part
    const chapterGroups: Record<string, LinkedArticle[]> = {};
    partArticles.forEach(article => {
      const chapterNumber = article.chapterNumber || 'Other';
      if (!chapterGroups[chapterNumber]) {
        chapterGroups[chapterNumber] = [];
      }
      chapterGroups[chapterNumber].push(article);
    });

    // Create chapters
    const chapters = Object.entries(chapterGroups).map(([chapterNumber, chapterArticles]) => {
      // Create articles within chapter
      const articles = chapterArticles.map(article => ({
        id: article.id,
        title: article.lawArticle.articleTitle,
        type: 'article' as const,
        articleNumber: article.lawArticle.articleNumber.replace('Article ', '')
      }));

      return {
        id: `linked-chapter-${partNumber}-${chapterNumber}`,
        title: `Chapter ${chapterNumber}`,
        type: 'chapter' as const,
        partNumber,
        chapterNumber,
        children: articles
      };
    });

    return {
      id: `linked-part-${partNumber}`,
      title: `Part ${partNumber}`,
      type: 'part' as const,
      partNumber,
      children: chapters
    };
  });

  return tocItems;
};

const GtplRC128LinkedRegulations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [lastUpdated] = useState('April 15, 2025');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showToc, setShowToc] = useState(true);
  const articleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tocRef = useRef<HTMLDivElement>(null);

  const tocItems = generateTocItems(linkedArticles);

  // Check if we're on mobile
  useEffect(() => {
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

  const handleTocItemClick = (itemId: string) => {
    // Expand the article if it's not already expanded
    if (!expandedArticles.includes(itemId)) {
      setExpandedArticles(prev => [...prev, itemId]);
    }
    
    // Set active article
    setActiveArticleId(itemId);
    
    // Scroll to the article
    if (articleRefs.current[itemId]) {
      articleRefs.current[itemId]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const filterArticles = (articles: LinkedArticle[]) => {
    return articles.filter(article =>
      article.lawArticle.articleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.lawArticle.articleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.lawArticle.articleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.relatedRegulations.some(reg => 
        reg.regulationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.regulationTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.regulationText.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredArticles = filterArticles(linkedArticles);

  // Format content with proper paragraph breaks
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4 text-gray-700">
        {paragraph}
      </p>
    ));
  };

  const copyLinkToClipboard = (articleId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${articleId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(articleId);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Table of Contents */}
      <div 
        className={`${showToc ? 'w-1/4' : 'w-0'} h-full overflow-y-auto border-r border-gray-200 transition-all duration-300 ${isMobile ? 'absolute z-10 bg-white' : 'relative'}`}
        ref={tocRef}
      >
        <div className="p-4 border-b border-gray-200 sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">Regulation Articles Linked to GTPL RC128</h2>
            {isMobile && (
              <button 
                onClick={() => setShowToc(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <ChevronLeft size={20} className="text-gray-500" />
              </button>
            )}
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles and regulations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="p-2">
          {tocItems.map(item => {
            const isExpanded = expandedArticles.includes(item.id);
            return (
              <div key={item.id} className="mb-2">
                <button
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                  onClick={() => toggleArticle(item.id)}
                >
                  <span className="font-medium">{item.title}</span>
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500" />
                  )}
                </button>
                
                {isExpanded && item.children && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.children.map(chapter => {
                      const isChapterExpanded = expandedArticles.includes(chapter.id);
                      return (
                        <div key={chapter.id}>
                          <button
                            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                            onClick={() => toggleArticle(chapter.id)}
                          >
                            <span className="font-medium">{chapter.title}</span>
                            {isChapterExpanded ? (
                              <ChevronDown size={16} className="text-gray-500" />
                            ) : (
                              <ChevronRight size={16} className="text-gray-500" />
                            )}
                          </button>
                          {isChapterExpanded && chapter.children && (
                            <div className="ml-4 mt-1 space-y-1">
                              {chapter.children.map(article => (
                                <button
                                  key={article.id}
                                  className={`w-full text-left p-2 rounded-lg ${
                                    activeArticleId === article.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                                  }`}
                                  onClick={() => handleTocItemClick(article.id)}
                                >
                                  {article.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Linked Articles */}
          <div className="space-y-6">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matching articles found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredArticles.map((linkedArticle) => (
                <div 
                  key={linkedArticle.id} 
                  id={linkedArticle.id}
                  ref={el => articleRefs.current[linkedArticle.id] = el}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${
                    activeArticleId === linkedArticle.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div 
                    className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleArticle(linkedArticle.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Scale size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{linkedArticle.lawArticle.articleNumber}: {linkedArticle.lawArticle.articleTitle}</h3>
                        <p className="text-sm text-gray-500">GTPL RC 128 Law</p>
                      </div>
                    </div>
                    {expandedArticles.includes(linkedArticle.id) ? (
                      <ChevronDown size={20} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-400" />
                    )}
                  </div>

                  {expandedArticles.includes(linkedArticle.id) && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Law Article */}
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <div className="flex items-center gap-2 mb-4">
                            <Scale size={20} className="text-blue-600" />
                            <h3 className="font-medium text-blue-900">Law {linkedArticle.lawArticle.articleNumber}</h3>
                          </div>
                          <div className="prose max-w-none text-blue-800">
                            {formatContent(linkedArticle.lawArticle.articleText)}
                          </div>
                        </div>

                        {/* Related Regulations */}
                        <div className="space-y-4">
                          {linkedArticle.relatedRegulations.map((regulation, index) => (
                            <div key={index} className="bg-purple-50 p-6 rounded-lg">
                              <div className="flex items-center gap-2 mb-4">
                                <Gavel size={20} className="text-purple-600" />
                                <h3 className="font-medium text-purple-900">{regulation.regulationNumber}: {regulation.regulationTitle}</h3>
                              </div>
                              <div className="prose max-w-none text-purple-800">
                                {formatContent(regulation.regulationText)}
                              </div>
                              <div className="mt-4 flex items-center gap-2 text-sm text-purple-600">
                                <Link size={16} />
                                <span>Linked to {linkedArticle.lawArticle.articleNumber}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated}
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                  <Download size={16} />
                  <span>Download as PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GtplRC128LinkedRegulations;