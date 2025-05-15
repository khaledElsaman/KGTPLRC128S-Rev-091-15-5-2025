import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// Define the clause structure
interface Clause {
  part: string;
  chapter: string;
  clause: string;
  text: string;
}

// Part II clauses data
const partIIClausesEnglish: Clause[] = [
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 1: Public Tender",
    clause: "Article 28",
    text: "All works and procurements shall be offered for public tender, except for those exempted under the Law."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 1: Public Tender",
    clause: "Article 29",
    text: "1. Public tenders shall be announced through the Portal in accordance with the Regulations.\n\n2. The Regulations shall specify the medium for announcing a public tender if announcement on the Portal is technically infeasible."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 2: Limited Tender",
    clause: "Article 30",
    text: "A government agency may adopt the limited-tender contracting method in the following cases:\n\n1. If the works and procurements are only provided by a limited number of contractors, suppliers, or operators.\n\n2. If the estimated value does not exceed 500,000 riyals, inviting at least five bidders, prioritizing local SMEs.\n\n3. Urgent cases.\n\n4. Provided by NGOs, societies, or non-profits executing the contract themselves.\n\n5. Consulting services.\n\nThe Regulations shall specify the implementation rules."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 3: Two-Stage Tender",
    clause: "Article 31",
    text: "A government agency may offer a tender over two stages if it is not possible to determine the final technical specifications and contractual obligations fully and accurately due to the complex and specialized nature of some works and procurements, as specified by the Regulations."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 4: Direct Purchase",
    clause: "Article 32",
    text: "A government agency may adopt the direct-purchase contracting method in the following cases:\n\n1. Procurement of weapons and military equipment by the General Authority for Military Industries.\n\n2. Sole-source availability, per the Regulations.\n\n3. Estimated cost does not exceed 100,000 riyals, prioritizing local SMEs.\n\n4. National security concerns preclude public/limited tenders; report required post-award.\n\n5. Sole NGO/society/non-profit entity executing the contract.\n\n6. Emergencies.\n\nRegulations define implementation procedures."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 5: Framework Agreement",
    clause: "Article 33",
    text: "A government agency may conclude a framework agreement with the winning bidder, stating the terms for executing the contract, in cases where it is not feasible to determine the quantity for each type or volume of works or services, or the subject of the contract, or determine their execution date, as specified in the Regulations."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 6: Electronic Reverse Auction",
    clause: "Article 34",
    text: "A government agency may adopt the electronic reverse auction in accordance with the Regulations, considering:\n\n1. Detailed specifications are prepared.\n\n2. Competitive market exists.\n\n3. Bids received via Portal and auto-ranked.\n\n4. Auction start and end dates specified.\n\n5. Bidders are provided guidelines on using the Portal."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 7: Transfer of Industry and Know-How",
    clause: "Article 35",
    text: "The Authority may, at its own initiative or upon the request of a government agency, subject to the Ministry's approval, conclude contracts for the transfer of industry and know-how, in accordance with the rules specified by the Regulations."
  },
  {
    part: "Part Two: Manner of Contracting",
    chapter: "Chapter 8: Competition",
    clause: "Article 36",
    text: "A government agency may, by way of competition, conclude a contract with the bidder presenting the best idea, design, or any other intellectual property rights, as specified in the Regulations."
  }
];

// Group clauses by chapter
const groupClausesByChapter = (clauses: Clause[]) => {
  const chapters: Record<string, Clause[]> = {};
  
  clauses.forEach(clause => {
    if (!chapters[clause.chapter]) {
      chapters[clause.chapter] = [];
    }
    chapters[clause.chapter].push(clause);
  });
  
  return chapters;
};

const GtplRC128PartII = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partIIClausesEnglish);
  
  const toggleChapter = (chapter: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapter) 
        ? prev.filter(c => c !== chapter) 
        : [...prev, chapter]
    );
  };
  
  const toggleClause = (clause: string) => {
    setExpandedClauses(prev => 
      prev.includes(clause) 
        ? prev.filter(c => c !== clause) 
        : [...prev, clause]
    );
  };
  
  const copyToClipboard = (text: string, clause: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(clause);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };
  
  // Filter clauses based on search term
  const filteredClauses = searchTerm 
    ? partIIClausesEnglish.filter(clause => 
        clause.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.chapter.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partIIClausesEnglish;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Law - Part II</h1>
            <p className="text-gray-500">Manner of Contracting</p>
          </div>
        </div>
        
        {/* Back button */}
        <button 
          onClick={() => handleModuleChange('gtpl-rc128-part-selector', 'Overview')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 mb-4"
        >
          <ArrowLeft size={16} />
          <span>Back to GTPL RC 128 Law – (EN-AR)</span>
        </button>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search clauses..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-blue-900">About Part II</p>
              <p className="text-sm text-blue-700 mt-1">
                Part II of the Government Tenders and Procurement Law (GTPL RC 128) covers the different methods of contracting, including public tender, limited tender, two-stage tender, direct purchase, framework agreement, electronic reverse auction, transfer of industry and know-how, and competition.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chapters and Clauses */}
      <div className="space-y-6">
        {Object.entries(filteredChapters).length === 0 ? (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">No clauses found matching your search.</p>
          </div>
        ) : (
          Object.entries(filteredChapters).map(([chapter, clauses]) => (
            <div key={chapter} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div 
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleChapter(chapter)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale size={20} className="text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">{chapter}</h2>
                  </div>
                  {expandedChapters.includes(chapter) ? (
                    <ChevronDown size={20} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedChapters.includes(chapter) && (
                <div className="p-4 space-y-4">
                  {clauses.map((clause) => (
                    <div 
                      key={clause.clause} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleClause(clause.clause)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gavel size={16} className="text-blue-600" />
                            <h3 className="font-medium text-gray-900">{clause.clause}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(clause.text, clause.clause);
                              }}
                              className="p-1 hover:bg-gray-100 rounded-md"
                              title="Copy clause text"
                            >
                              {copySuccess === clause.clause ? (
                                <CheckCircle size={16} className="text-green-500" />
                              ) : (
                                <Copy size={16} className="text-gray-400" />
                              )}
                            </button>
                            {expandedClauses.includes(clause.clause) ? (
                              <ChevronDown size={16} className="text-gray-400" />
                            ) : (
                              <ChevronRight size={16} className="text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {expandedClauses.includes(clause.clause) && (
                        <div className="p-4 bg-gray-50">
                          <div className="whitespace-pre-line text-gray-700">
                            {clause.text.split('\n\n').map((paragraph, idx) => (
                              <p key={idx} className="mb-2">{paragraph}</p>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              Part II - {clause.clause}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyToClipboard(clause.text, clause.clause)}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                              >
                                <Copy size={14} />
                                <span>Copy Text</span>
                              </button>
                              <button
                                onClick={() => copyToClipboard(`${clause.part} - ${clause.chapter} - ${clause.clause}`, clause.clause)}
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
        <p className="text-sm text-gray-500">Source: Government Tenders and Procurement Law (GTPL RC 128)</p>
      </div>
    </div>
  );
};

export default GtplRC128PartII;