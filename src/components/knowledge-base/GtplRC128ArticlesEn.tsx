import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Search, Info, Scale, FileText } from 'lucide-react';

// Define the article structure
interface Article {
  article_no: string;
  title: string;
  text: string;
}

interface Chapter {
  chapter: string;
  articles: Article[];
}

interface Part {
  part: string;
  chapters: Chapter[];
}

// GTPL RC 128 Law Part One in English
const gtplRC128PartOne: Part = {
  part: "Part One: General Provisions",
  chapters: [
    {
      chapter: "Chapter 1: Definitions",
      articles: [
        {
          article_no: "Article 1",
          title: "Definitions",
          text: "In this Law, the following terms shall have the meanings assigned thereto unless the context requires otherwise:\n\nLaw: Government Tenders and Procurement Law.\n\nRegulations: Implementing Regulations of the Law.\n\nMinister: Minister of Finance.\n\nMinistry: Ministry of Finance.\n\nAuthority: Local Content and Government Procurement Authority.\n\nUnified Procurement Agency: The agency in charge of unified strategic procurement which is determined pursuant to a resolution by the Council of Ministers.\n\nGovernment Agencies: Ministries, government bodies, public agencies, authorities, and institutions, and other entities with an independent public corporate personality.\n\nHead of Government Agency: Minister, president, governor, or principal officer of a government agency.\n\nPortal: The electronic portal designated for government procurements which is under the Ministry's supervision."
        }
      ]
    },
    {
      chapter: "Chapter 2: Objectives of the Law",
      articles: [
        {
          article_no: "Article 2",
          title: "Objectives of the Law",
          text: "This Law aims at:\n\n1. Regulating procedures relating to works and procurements, and preventing abuse of power and conflict of interest to protect public funds.\n\n2. Achieving optimal value of public funds when concluding contracts of works and procurements, and implementing them at fair and competitive prices.\n\n3. Promoting integrity and competitiveness, maintaining equality, and ensuring fair treatment of bidders, in fulfillment of the principle of equal opportunity.\n\n4. Maintaining transparency in all procedures related to works and procurements.\n\n5. Fostering economic growth and development."
        }
      ]
    },
    {
      chapter: "Chapter 3: Fundamental Principles",
      articles: [
        {
          article_no: "Article 3",
          title: "Contractor and Competitor Guidelines",
          text: "1. Government agencies shall, in carrying out their works and procurements, only contract licensed persons, subject to applicable laws and regulations.\n\n2. Government agencies shall, before contracting foreign persons to carry out procurements or works inside the Kingdom, ensure the unavailability of more than one local person qualified to carry out said works or procurements. The Regulations shall specify the terms and conditions for implementing the provisions of this paragraph."
        },
        {
          article_no: "Article 4",
          title: "Equal Opportunities",
          text: "All qualified persons seeking to contract with a government agency shall be accorded equal opportunities and treatment."
        },
        {
          article_no: "Article 5",
          title: "Competition Information",
          text: "Bidders shall be provided with clear and uniform information on the required works and procurements and shall be given access to such information at a specified time."
        },
        {
          article_no: "Article 6",
          title: "General Competition Principles",
          text: "A public tender shall be subject to the principles of publicity, transparency, and equal opportunity."
        },
        {
          article_no: "Article 7",
          title: "Offer Acceptance",
          text: "No proposals or contracts shall be accepted or concluded unless they are compliant with the provisions of the Law."
        },
        {
          article_no: "Article 8",
          title: "Tendering Guidelines",
          text: "The tendering and contracting of works and procurements shall be restricted to the actual needs of the government agency and shall be at fair prices that do not exceed prevailing market prices."
        },
        {
          article_no: "Article 9",
          title: "Priority in Dealings",
          text: "Priority shall be given to local small- and medium-sized enterprises, local content, and companies listed in the Capital Market. The regulations referred to in Article 96(3) of this Law shall determine the manner of prioritization."
        }
      ]
    }
  ]
};

const GtplRC128ArticlesEn: React.FC = () => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter chapters and articles based on search term
  const filteredChapters = gtplRC128PartOne.chapters.map(chapter => {
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
        <h1 className="text-2xl font-bold text-gray-900">Government Tenders and Procurement Law</h1>
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
            placeholder="Search articles..."
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
            <p className="font-medium text-blue-900">About the Law</p>
            <p className="text-sm text-blue-700 mt-1">
              Government Tenders and Procurement Law (GTPL RC 128) issued by Royal Decree No. M/128 dated 13/11/1440H
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
                  <h2 className="text-xl font-semibold text-gray-900">{chapter.chapter}</h2>
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
                        {expandedArticles.includes(`${chapter.chapter}-${article.article_no}`) ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
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
            <p className="text-gray-500">No articles found matching your search. Please try different search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GtplRC128ArticlesEn;