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

// Part III clauses data in English
const partIIIClausesEnglish: Clause[] = [
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 1: Submission of Proposals",
    clause: "Article 37",
    text: "1. Proposals submitted through the Portal shall be encrypted, as specified by the Regulations.\n\n2. Proposals shall be submitted on designated dates; otherwise, they shall not be accepted.\n\n3. Proposals may be submitted in sealed envelopes if submission through the Portal is technically infeasible.\n\n4. A government agency shall announce the names of bidders through the Portal; if technically infeasible, announcement shall follow other Regulation-approved methods."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 1: Submission of Proposals",
    clause: "Article 38",
    text: "A government agency may require that a sample of the items to be procured be attached with the proposal."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 1: Submission of Proposals",
    clause: "Article 39",
    text: "1. A proposal shall be valid for 90 days from the proposal opening date; early withdrawal forfeits the initial guarantee.\n\n2. The validity period may be extended for another 90 days. Bidders must accordingly extend their initial guarantees."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 1: Submission of Proposals",
    clause: "Article 40",
    text: "1. Total prices and any changes must be included in the proposal letter. Reductions in separate letters are invalid.\n\n2. Bidders may not alter prices post-submission unless negotiation is permitted under the Law."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 2: Initial Guarantee",
    clause: "Article 41",
    text: "1. A bidder must submit an initial guarantee of 1–2% of the proposal value. Without it, the bid is disqualified.\n\n2. The Regulations specify the provisions for this guarantee."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 2: Initial Guarantee",
    clause: "Article 42",
    text: "No initial guarantee is required for:\n\n1. Direct purchase\n\n2. Competition\n\n3. Intra-governmental contracts\n\n4. Contracts with NGOs/non-profits\n\n5. Contracts with local SMEs"
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 3: Opening of Proposals",
    clause: "Article 43",
    text: "Committees shall be formed by decision of the agency head (or designee) to open proposals, per the Regulations."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 3: Opening of Proposals",
    clause: "Article 44",
    text: "1. Proposals are opened after submission deadline in presence of all committee members. If technical and financial proposals are separate, only technical proposals are opened. Regulations apply.\n\n2. Bidders may attend.\n\n3. Within three days, the opening minutes and proposals must be submitted to the review committee."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 45",
    text: "1. Committees formed to evaluate proposals and submit recommendations.\n\n2. Unified Procurement Agency may participate and has equal authority.\n\n3. Minutes must include recommendations, dissenting opinions, and be sent to the award authority.\n\n4. Separation of roles required between review, opening, and awarding."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 46",
    text: "1. Proposals not meeting criteria shall be disqualified.\n\n2. In dual-envelope/file submissions, only accepted technical proposals proceed; others are returned.\n\n3. Financial proposals are reviewed according to the tender's assessment criteria."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 47",
    text: "Permitted if:\n\n1. Best price is far above market – negotiate down or cancel.\n\n2. Price exceeds appropriations – negotiate or cancel items with UPA approval."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 48",
    text: "A bid may be disqualified if priced 25% below cost/market and the bidder fails to justify pricing upon committee review."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 49",
    text: "Results of the tender shall be announced and bidders notified in accordance with the Regulations."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 50",
    text: "1. If only one valid proposal, acceptance requires price match with market and agency head's approval.\n\n2. Regulations cover cases of equal proposals."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 51",
    text: "Tender is canceled if:\n\n1. Documents contain unrectifiable errors\n\n2. Violation of Law or Regulations\n\n3. Fraud/collusion\n\n4. All bids noncompliant\n\n5. Public interest requires"
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 4: Review of Proposals and Power to Contract",
    clause: "Article 52",
    text: "If canceled, document fees and guarantees are returned to bidders per the Regulations."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 5: Suspension Period",
    clause: "Article 53",
    text: "Upon announcing the award decision, a suspension period of 5–10 working days is required before approval or contract signing to allow for appeals."
  },
  {
    part: "Part III: Proposals and Awards",
    chapter: "Chapter 6: Powers",
    clause: "Article 54",
    text: "1. The head of a government agency may approve and delegate:\na) Awards ≤ 10M SAR\nb) Additional works ≤ 5M SAR or 10% of project value\n\n2. Power to cancel tenders may be delegated\n\n3. Power to terminate contracts may be delegated\n\n4. Power for direct purchases ≤ 3M SAR may be delegated\n\n5. Power to award sale of movables may be delegated\n\n6. Delegations must follow the chain of command"
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

const GtplRC128PartIII = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partIIIClausesEnglish);
  
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
    ? partIIIClausesEnglish.filter(clause => 
        clause.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.chapter.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partIIIClausesEnglish;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Law - Part III</h1>
            <p className="text-gray-500">Proposals and Awards</p>
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
              <p className="font-medium text-blue-900">About Part III</p>
              <p className="text-sm text-blue-700 mt-1">
                Part III of the Government Tenders and Procurement Law (GTPL RC 128) covers the proposals and awards process, including submission of proposals, initial guarantees, opening of proposals, review of proposals and power to contract, suspension period, and powers.
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
                              Part III - {clause.clause}
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

export default GtplRC128PartIII;