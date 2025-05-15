import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface Article {
  article_number: number;
  article_text: string;
}

interface Chapter {
  chapter: string;
  title: string;
  articles: Article[];
}

interface Section {
  section: string;
  title: string;
  chapters: Chapter[];
}

const GtplRC128RegulationSection: React.FC = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedArticles, setExpandedArticles] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<number | null>(null);

  // Section II data
  const sectionData: Section = {
    section: "Section II",
    title: "Contracting Methods",
    chapters: [
      {
        chapter: "Chapter 1",
        title: "Contracting Methods",
        articles: [
          {
            article_number: 32,
            article_text: "The Government Authority shall perform its works and procure its items in accordance with the provisions of the Law and these Regulations through any of the following methods:\n1. General tender;\n2. Selective tender;\n3. 2-phase tender;\n4. Direct procurement;\n5. Framework agreement;\n6. Online reverse auction;\n7. Industry localization and knowledge transfer; or\n8. Contest (competition)."
          }
        ]
      },
      {
        chapter: "Chapter 2",
        title: "General Tender",
        articles: [
          { 
            article_number: 33, 
            article_text: "The Government Authority shall announce the general tender through the Portal in accordance with Article (16) of the Law. The announcement shall include the following:\n1. Name of the Government Authority;\n2. Tender number, description, and purpose;\n3. Tender document cost, if any;\n4. Qualification requirements, if any;\n5. Contact information of the Government Authority; and\n6. Time and date for submitting bids." 
          },
          { 
            article_number: 34, 
            article_text: "The Government Authority shall announce the general tender in the Portal in Arabic. It may also announce it in English if the nature of the tender requires so." 
          },
          { 
            article_number: 35, 
            article_text: "The Government Authority shall set a sufficient period for submitting bids according to the nature of the works and procurements, provided that such period is not less than (15) days from the date of announcing the tender." 
          }
        ]
      },
      {
        chapter: "Chapter 3",
        title: "Selective Tender",
        articles: [
          { 
            article_number: 36, 
            article_text: "The Government Authority may resort to selective tender in accordance with Article (24) of the Law in any of the following cases:\n1. If the works and procurements are available only with a limited number of contractors, suppliers, or service providers not exceeding (5);\n2. If the estimated cost of works and procurements does not exceed (500,000) riyals;\n3. If the works and procurements are of an urgent nature;\n4. If the works and procurements are available with non-profit institutions or associations; or\n5. If the works and procurements are consultancy services." 
          },
          { 
            article_number: 37, 
            article_text: "The Government Authority shall invite the largest possible number of competitors in the selective tender, provided that they are not less than (5) competitors if available." 
          },
          { 
            article_number: 38, 
            article_text: "The Government Authority shall announce the selective tender through the Portal, and the announcement shall include the information set forth in Article (33) of these Regulations." 
          },
          { 
            article_number: 39, 
            article_text: "The Government Authority shall set a sufficient period for submitting bids according to the nature of the works and procurements, provided that such period is not less than (10) days from the date of announcing the tender." 
          },
          { 
            article_number: 40, 
            article_text: "The Government Authority shall give priority to local small and medium enterprises in selective tenders in accordance with the regulations referred to in Article (96) of the Law." 
          },
          { 
            article_number: 41, 
            article_text: "The Government Authority shall document the reasons for resorting to selective tender in the tender file." 
          }
        ]
      },
      {
        chapter: "Chapter 4",
        title: "2-Phase Tender",
        articles: [
          { 
            article_number: 42, 
            article_text: "The Government Authority may resort to 2-phase tender in accordance with Article (25) of the Law if it is not possible to determine the technical specifications and final contractual terms accurately due to the complex and specialized nature of some works and procurements." 
          },
          { 
            article_number: 43, 
            article_text: "The 2-phase tender shall be conducted as follows:\n1. The Government Authority shall announce the tender through the Portal, and the announcement shall include the information set forth in Article (33) of these Regulations.\n2. The Government Authority shall set a sufficient period for submitting bids according to the nature of the works and procurements, provided that such period is not less than (15) days from the date of announcing the tender.\n3. The Government Authority shall receive the technical proposals without the financial proposals in the first phase.\n4. The Government Authority shall discuss the technical proposals with the bidders and may modify the technical specifications and contractual terms.\n5. The Government Authority shall invite the bidders whose technical proposals have been accepted to submit their financial proposals in the second phase.\n6. The Government Authority shall set a sufficient period for submitting financial proposals, provided that such period is not less than (10) days from the date of inviting the bidders to submit their financial proposals." 
          }
        ]
      },
      {
        chapter: "Chapter 5",
        title: "Direct Procurement",
        articles: [
          { 
            article_number: 44, 
            article_text: "The Government Authority may resort to direct procurement in accordance with Article (26) of the Law in any of the following cases:\n1. Procurement of arms, ammunition, military equipment and spare parts, through the General Authority for Military Industries.\n2. If the works and procurements are available exclusively with one contractor, supplier, or service provider, and there is no acceptable alternative.\n3. If the estimated cost of works and procurements does not exceed (100,000) riyals.\n4. If the use of this method is necessary to protect national security interests and it is not possible to use public or limited tender.\n5. If the works and procurements are available with one non-profit institution, association, or entity.\n6. In cases of emergency." 
          },
          { 
            article_number: 45, 
            article_text: "The Government Authority shall document the reasons for resorting to direct procurement in the procurement file." 
          },
          { 
            article_number: 46, 
            article_text: "The Government Authority shall give priority to local small and medium enterprises in direct procurement in accordance with the regulations referred to in Article (96) of the Law." 
          },
          { 
            article_number: 47, 
            article_text: "The Government Authority shall negotiate with the contractor, supplier, or service provider to obtain the best prices and conditions." 
          },
          { 
            article_number: 48, 
            article_text: "The Government Authority shall verify that the prices offered in direct procurement do not exceed the prevailing market prices." 
          }
        ]
      },
      {
        chapter: "Chapter 6",
        title: "Framework Agreement",
        articles: [
          { 
            article_number: 49, 
            article_text: "The Government Authority may conclude a framework agreement with the winning bidder in accordance with Article (27) of the Law, which includes the provisions under which contracts will be executed within a specific period, in cases where it is not possible to determine the quantities of items or volume of works or services contracted for, or the time of their execution." 
          },
          { 
            article_number: 50, 
            article_text: "The framework agreement shall include the following:\n1. The subject matter of the agreement;\n2. The term of the agreement, which shall not exceed (3) years;\n3. The maximum quantity or value of works and procurements;\n4. The method of determining prices;\n5. The method of executing purchase orders; and\n6. The performance bond, if required." 
          },
          { 
            article_number: 51, 
            article_text: "The Government Authority shall announce the framework agreement through the Portal, and the announcement shall include the information set forth in Article (33) of these Regulations." 
          },
          { 
            article_number: 52, 
            article_text: "The Government Authority shall set a sufficient period for submitting bids according to the nature of the works and procurements, provided that such period is not less than (15) days from the date of announcing the framework agreement." 
          },
          { 
            article_number: 53, 
            article_text: "The Government Authority shall execute purchase orders under the framework agreement in accordance with the provisions of the agreement." 
          }
        ]
      },
      {
        chapter: "Chapter 7",
        title: "Online Reverse Auction",
        articles: [
          { 
            article_number: 54, 
            article_text: "The Government Authority may resort to online reverse auction in accordance with Article (28) of the Law if the following conditions are met:\n1. The technical specifications of the items to be procured can be accurately determined;\n2. There is a competitive market for the items to be procured; and\n3. The estimated cost of the items to be procured does not exceed (500,000) riyals." 
          },
          { 
            article_number: 55, 
            article_text: "The Government Authority shall announce the online reverse auction through the Portal, and the announcement shall include the information set forth in Article (33) of these Regulations." 
          },
          { 
            article_number: 56, 
            article_text: "The Government Authority shall set a sufficient period for submitting bids according to the nature of the works and procurements, provided that such period is not less than (5) days from the date of announcing the online reverse auction." 
          },
          { 
            article_number: 57, 
            article_text: "The online reverse auction shall be conducted as follows:\n1. The Government Authority shall receive the bids through the Portal.\n2. The bids shall be automatically ranked according to the prices offered.\n3. The bidders shall be able to see the lowest price offered without knowing the identity of the bidder.\n4. The bidders shall be able to reduce their prices during the auction period.\n5. The auction shall end at the specified time and date.\n6. The Government Authority shall award the contract to the bidder who offered the lowest price at the end of the auction, provided that the bid meets the technical specifications and conditions." 
          }
        ]
      },
      {
        chapter: "Chapter 8",
        title: "Industry Localization and Knowledge Transfer",
        articles: [
          { 
            article_number: 58, 
            article_text: "The Authority may, at its own initiative or upon the request of a government agency, subject to the Ministry's approval, conclude contracts for the transfer of industry and know-how, in accordance with the following rules:\n1. The contract shall be concluded with a company specialized in the field of the contract.\n2. The contract shall include provisions for the transfer of knowledge and technology to the local industry.\n3. The contract shall include provisions for training and qualifying Saudi cadres.\n4. The contract shall include provisions for increasing the local content in the industry.\n5. The contract shall include provisions for establishing research and development centers in the Kingdom." 
          }
        ]
      },
      {
        chapter: "Chapter 9",
        title: "Contest (Competition)",
        articles: [
          { 
            article_number: 59, 
            article_text: "The Government Authority may, by way of competition, conclude a contract with the bidder presenting the best idea, design, or any other intellectual property rights, in accordance with the following rules:\n1. The Government Authority shall announce the competition through the Portal, and the announcement shall include the information set forth in Article (33) of these Regulations.\n2. The Government Authority shall set a sufficient period for submitting bids according to the nature of the competition, provided that such period is not less than (30) days from the date of announcing the competition.\n3. The Government Authority shall form a committee to evaluate the bids and select the winner.\n4. The Government Authority shall award the contract to the winner of the competition.\n5. The Government Authority shall own the intellectual property rights of the winning bid, unless otherwise stipulated in the competition documents." 
          }
        ]
      }
    ]
  };

  const toggleChapter = (chapter: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapter) 
        ? prev.filter(c => c !== chapter) 
        : [...prev, chapter]
    );
  };

  const toggleArticle = (articleNumber: number) => {
    setExpandedArticles(prev => 
      prev.includes(articleNumber) 
        ? prev.filter(a => a !== articleNumber) 
        : [...prev, articleNumber]
    );
  };

  const copyToClipboard = (text: string, articleNumber: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(articleNumber);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  // Filter chapters and articles based on search term
  const filteredChapters = sectionData.chapters.map(chapter => {
    const filteredArticles = chapter.articles.filter(article => 
      article.article_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `Article ${article.article_number}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      ...chapter,
      articles: filteredArticles
    };
  }).filter(chapter => 
    chapter.articles.length > 0 || 
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.chapter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Regulation - Section II</h1>
            <p className="text-gray-500">Contracting Methods</p>
          </div>
        </div>
        
        {/* Back button */}
        <button 
          onClick={() => handleModuleChange('gtpl-rc128-regulation-toc', 'Overview')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 mb-4"
        >
          <ArrowLeft size={16} />
          <span>Back to Regulation Index</span>
        </button>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-blue-900">About Section II</p>
              <p className="text-sm text-blue-700 mt-1">
                Section II of the GTPL RC 128 Regulation covers the various contracting methods available to government authorities, including general tender, selective tender, 2-phase tender, direct procurement, framework agreement, online reverse auction, industry localization and knowledge transfer, and contest (competition).
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chapters and Articles */}
      <div className="space-y-6">
        {filteredChapters.length === 0 ? (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">No articles found matching your search.</p>
          </div>
        ) : (
          filteredChapters.map((chapter) => (
            <div key={chapter.chapter} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div 
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleChapter(chapter.chapter)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale size={20} className="text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">{chapter.chapter}: {chapter.title}</h2>
                  </div>
                  {expandedChapters.includes(chapter.chapter) ? (
                    <ChevronDown size={20} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedChapters.includes(chapter.chapter) && (
                <div className="p-4 space-y-4">
                  {chapter.articles.map((article) => (
                    <div 
                      key={article.article_number} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleArticle(article.article_number)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gavel size={16} className="text-blue-600" />
                            <h3 className="font-medium text-gray-900">Article {article.article_number}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(article.article_text, article.article_number);
                              }}
                              className="p-1 hover:bg-gray-100 rounded-md"
                              title="Copy article text"
                            >
                              {copySuccess === article.article_number ? (
                                <CheckCircle size={16} className="text-green-500" />
                              ) : (
                                <Copy size={16} className="text-gray-400" />
                              )}
                            </button>
                            {expandedArticles.includes(article.article_number) ? (
                              <ChevronDown size={16} className="text-gray-400" />
                            ) : (
                              <ChevronRight size={16} className="text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {expandedArticles.includes(article.article_number) && (
                        <div className="p-4 bg-gray-50">
                          <div className="whitespace-pre-line text-gray-700">
                            {article.article_text.split('\n').map((paragraph, idx) => (
                              <p key={idx} className="mb-2">{paragraph}</p>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              Section II - {chapter.chapter} - Article {article.article_number}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyToClipboard(article.article_text, article.article_number)}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                              >
                                <Copy size={14} />
                                <span>Copy Text</span>
                              </button>
                              <button
                                onClick={() => copyToClipboard(`Section II - ${chapter.chapter} - Article ${article.article_number}`, article.article_number)}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                              >
                                <Link size={14} />
                                <span>Copy Reference</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-8 text-right">
        <p className="text-sm text-gray-500">Source: Government Tenders and Procurement Law Implementing Regulations (GTPL RC 128)</p>
      </div>
    </div>
  );
};

export default GtplRC128RegulationSection;