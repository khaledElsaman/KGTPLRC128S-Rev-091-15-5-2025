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

const GtplRC128RegulationSectionVI: React.FC = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedArticles, setExpandedArticles] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<number | null>(null);

  // Section VI data
  const sectionData: Section = {
    section: "Section VI",
    title: "Settlement of Complaints and Final Provisions",
    chapters: [
      {
        chapter: "Chapter 1",
        title: "Settlement of Disputes",
        articles: [
          {
            article_number: 153,
            article_text: "Subject to clause (4) of Article (86) of the Law, the following provisions shall apply:\n1. The guarantee shall be presented at the time of filing a complaint before the committee indicated in Article (86) of the Law.\n2. The complaint may not be accepted in case the guarantee is not provided, or the guarantee amount provided is incomplete.\n3. The guarantee shall be effective for a period not less than thirty (30) days from the date of filing of the complaint.\n4. The complainer is not required to renew the guarantee term in case it expires while the complaint is not resolved."
          },
          {
            article_number: 154,
            article_text: "Subject to clause (2) of Article (92) of the Law, agreement to resort to arbitration shall be conditional upon the following:\n1. Arbitration shall be restricted to the contracts whose estimated value exceeds one hundred million Saudi Riyals. The Minister may amend such limits as he deemed proper.\n2. The laws of the Kingdom of Saudi Arabia shall apply to the subject-matter of the dispute. Arbitration before international arbitration panels outside of the Kingdom and enforcement of procedures thereof shall be inadmissible except for the contracts concluded with foreign persons.\n3. The arbitration and its terms shall be set forth in the contract documents."
          },
          {
            article_number: 155,
            article_text: "In case a technical dispute arises between the Government Authority and the contractor that might undermine the project or cause damage to the employer, the contractor, or any of the State's facilities, the Government Authority may settle the dispute amicably, and if this is not possible, the dispute may be resolved by a body formed for dispute resolution as per the following procedures:\n1. The body shall be formed of a team that includes a representative of the Government Authority and a representative of the contractor. The Ministry shall appoint the chairperson of the dispute settlement body from the government or private sector.\n2. The chairperson and members of the dispute settlement body must have experience and competence in the area of dispute.\n3. Each party to the dispute shall submit a technical report to the dispute settlement body within a period not exceeding (15) days from the date of forming the body.\n4. The dispute settlement body shall issue its decision within (30) days from the date of receiving the technical reports from both parties.\n5. The dispute settlement body may extend the period specified in paragraph (4) of this Article for a period not exceeding (15) days in case one of the parties objects to the decision.\n6. The decision of the dispute settlement body shall be binding on both parties if they accept it. In case one of the parties does not accept the decision, the dispute shall be referred to the competent judicial authority.\n7. The dispute settlement body shall not consider any financial claims.\n8. The dispute shall not suspend the execution of the contract unless the Government Authority decides otherwise.\n9. The Ministry shall determine the remuneration of the chairperson of the dispute settlement body."
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
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Regulation - Section VI</h1>
            <p className="text-gray-500">Settlement of Complaints and Final Provisions</p>
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
              <p className="font-medium text-blue-900">About Section VI</p>
              <p className="text-sm text-blue-700 mt-1">
                Section VI of the GTPL RC 128 Regulation covers the settlement of complaints and final provisions, including procedures for filing complaints, arbitration conditions, and technical dispute resolution mechanisms.
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
                              Section VI - {chapter.chapter} - Article {article.article_number}
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
                                onClick={() => copyToClipboard(`Section VI - ${chapter.chapter} - Article ${article.article_number}`, article.article_number)}
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

export default GtplRC128RegulationSectionVI;