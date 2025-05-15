import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle } from 'lucide-react';

// Define the regulation article structure
interface RegulationArticle {
  article_no: string;
  title: string;
  text: string;
}

interface Chapter {
  chapter: string;
  articles: RegulationArticle[];
}

interface Part {
  part: string;
  chapters: Chapter[];
}

// GTPL RC 128 Regulation Part One in English
const gtplRC128RegulationPartOne: Part = {
  part: "Part One: General Provisions",
  chapters: [
    {
      chapter: "Chapter 1: Definitions",
      articles: [
        {
          article_no: "Article 1",
          title: "Definitions",
          text: "In these Regulations, the following terms shall have the meanings assigned thereto unless the context requires otherwise:\n\nLaw: Government Tenders and Procurement Law.\n\nMinister: Minister of Finance.\n\nMinistry: Ministry of Finance.\n\nAuthority: Local Content and Government Procurement Authority.\n\nUnified Procurement Agency: The agency in charge of unified strategic procurement which is determined pursuant to a resolution by the Council of Ministers.\n\nGovernment Agencies: Ministries, government bodies, public agencies, authorities, and institutions, and other entities with an independent public corporate personality.\n\nHead of Government Agency: Minister, president, governor, or principal officer of a government agency.\n\nPortal: The electronic portal designated for government procurements which is under the Ministry's supervision."
        }
      ]
    },
    {
      chapter: "Chapter 2: Scope of Application",
      articles: [
        {
          article_no: "Article 2",
          title: "Scope of Application",
          text: "These Regulations shall apply to all government agencies subject to the Law. The provisions of these Regulations shall apply to works and procurements carried out outside the Kingdom, taking into account the following:\n\n1. The government agency may, when necessary, exempt works and procurements carried out outside the Kingdom from some provisions of these Regulations, provided that such exemption does not violate the principles of fair competition, equal opportunity, and transparency.\n\n2. The government agency shall, when exempting works and procurements carried out outside the Kingdom from some provisions of these Regulations, document the reasons for such exemption."
        }
      ]
    },
    {
      chapter: "Chapter 3: Advance Planning",
      articles: [
        {
          article_no: "Article 3",
          title: "Advance Planning",
          text: "1. The government agency shall, at the beginning of each fiscal year, publish its procurement plan on the Portal. The plan shall include the following information:\na) Type of works or procurements.\nb) Their description.\nc) Their estimated value.\nd) Method of tendering.\ne) Proposed time for tendering.\n\n2. The government agency shall update its procurement plan whenever necessary."
        }
      ]
    }
  ]
};

const GtplRC128Regulation = () => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = gtplRC128RegulationPartOne.chapters;
  
  const toggleChapter = (chapter: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapter) 
        ? prev.filter(c => c !== chapter) 
        : [...prev, chapter]
    );
  };
  
  const toggleArticle = (article: string) => {
    setExpandedArticles(prev => 
      prev.includes(article) 
        ? prev.filter(a => a !== article) 
        : [...prev, article]
    );
  };
  
  const copyToClipboard = (text: string, article: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(article);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };
  
  // Filter chapters and articles based on search term
  const filteredChapters = gtplRC128RegulationPartOne.chapters.map(chapter => {
    const filteredArticles = chapter.articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.article_no.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      ...chapter,
      articles: filteredArticles
    };
  }).filter(chapter => chapter.articles.length > 0 || chapter.chapter.toLowerCase().includes(searchTerm.toLowerCase()));

  // Format text with proper line breaks
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Regulation</h1>
        <div className="flex items-center gap-2">
          <Book className="text-blue-600" size={24} />
          <span className="text-blue-600 font-medium">Part One: General Provisions</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search regulations..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-blue-600 mt-1" />
          <div>
            <p className="font-medium text-blue-900">About the Regulation</p>
            <p className="text-sm text-blue-700 mt-1">
              Implementing Regulations of the Government Tenders and Procurement Law (GTPL RC 128) issued by Ministerial Decision No. 1242 dated 21/3/1441H
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredChapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div 
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleChapter(chapter.chapter)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale size={20} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">{chapter.chapter}</h2>
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
                {chapter.articles.map((article, articleIndex) => (
                  <div key={articleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleArticle(`${chapter.chapter}-${article.article_no}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-blue-600" />
                          <h3 className="font-medium text-gray-900">{article.article_no}: {article.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(article.text, article.article_no);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-md"
                            title="Copy article text"
                          >
                            {copySuccess === article.article_no ? (
                              <CheckCircle size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} className="text-gray-400" />
                            )}
                          </button>
                          {expandedArticles.includes(`${chapter.chapter}-${article.article_no}`) ? (
                            <ChevronDown size={16} className="text-gray-400" />
                          ) : (
                            <ChevronRight size={16} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedArticles.includes(`${chapter.chapter}-${article.article_no}`) && (
                      <div className="p-4 bg-gray-50">
                        <div className="prose max-w-none text-gray-700">
                          {formatText(article.text)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredChapters.length === 0 && (
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">No regulations found matching your search. Please try different search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GtplRC128Regulation;