import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle } from 'lucide-react';

// Define the clause structure
interface Clause {
  part: string;
  chapter: string;
  clause: string;
  text: string;
}

// Part VII clauses data
const partVIIClauses: Clause[] = [
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 89",
    text: "Government agencies may contract with one another through direct agreement, provided they execute the works themselves."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 90",
    text: "A contract shall be directly concluded with licensed persons with no intermediaries, except in cases where the nature of the contract requires the use of intermediaries, in accordance with the Regulations."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 91",
    text: "A government agency shall use the approved forms for contracts, tender documents, and other related documents, in accordance with the Regulations."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 92",
    text: "1. A government agency shall fulfill its contractual obligations and pay the contractor's entitlements in accordance with the contract terms and conditions.\n\n2. A government agency may not resort to arbitration for resolving disputes arising from its contracts except after obtaining the approval of the Minister. Arbitration shall be conducted in accordance with the Saudi Arbitration Law and its procedures. Arbitration is not permitted for disputes arising from contracts with a value of less than one hundred million riyals."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 93",
    text: "Companies working for government agencies shall comply with the Law."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 94",
    text: "Employees violating the Law are subject to disciplinary and legal action."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 95",
    text: "To exclude provisions of the Law, a committee shall be formed by the President of the Council of Ministers to consider cases requiring exclusion from the provisions of the Law, in accordance with the Regulations."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 96",
    text: "The Ministry shall prepare regulations on conflict of interest, ethics, local content prioritization, and other matters related to the implementation of the Law, to be issued within 120 days from the date of publication of the Law in the Official Gazette."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 97",
    text: "The Minister shall issue the Implementing Regulations within 120 days from the date of publication of the Law in the Official Gazette."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 98",
    text: "This Law supersedes the Government Tenders and Procurement Law issued by Royal Decree No. M/58 dated 4/9/1427H, and repeals any provisions that contradict it."
  },
  {
    part: "Part VII: Concluding Provisions",
    chapter: "Chapter 1: Final and Transitional Provisions",
    clause: "Clause 99",
    text: "This Law shall enter into force 120 days from the date of its publication in the Official Gazette."
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

const GtplRC128PartVII = () => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partVIIClauses);
  
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
    ? partVIIClauses.filter(clause => 
        clause.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.part.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partVIIClauses;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Law - Part VII</h1>
            <p className="text-gray-500">Concluding Provisions</p>
          </div>
        </div>
        
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
              <p className="font-medium text-blue-900">About Part VII</p>
              <p className="text-sm text-blue-700 mt-1">
                Part VII of the Government Tenders and Procurement Law (GTPL RC 128) covers the concluding provisions, including final and transitional provisions, dispute resolution mechanisms, and the law's implementation timeline.
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
                              Part VII - {clause.clause}
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

export default GtplRC128PartVII;