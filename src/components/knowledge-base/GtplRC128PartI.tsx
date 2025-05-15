import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { regulationToLawMappings, getRelatedLawArticles } from '../../lib/regulationLawMappings';

// Define the clause structure
interface Clause {
  part: string;
  chapter: string;
  clause: string;
  text: string;
}

// Part I clauses data in English
const partIClausesEnglish: Clause[] = [
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 1: Definitions",
    clause: "Article 1",
    text: "In this Law, the following terms shall have the meanings assigned thereto unless the context requires otherwise:\n\nLaw: Government Tenders and Procurement Law.\n\nRegulations: Implementing Regulations of the Law.\n\nMinister: Minister of Finance.\n\nMinistry: Ministry of Finance.\n\nAuthority: Local Content and Government Procurement Authority.\n\nUnified Procurement Agency: The agency in charge of unified strategic procurement which is determined pursuant to a resolution by the Council of Ministers.\n\nGovernment Agencies: Ministries, government bodies, public agencies, authorities, and institutions, and other entities with an independent public corporate personality.\n\nHead of Government Agency: Minister, president, governor, or principal officer of a government agency.\n\nPortal: The electronic portal designated for government procurements which is under the Ministry\'s supervision."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 2: Objectives of the Law",
    clause: "Article 2",
    text: "This Law aims at:\n\n1. Regulating procedures relating to works and procurements, and preventing abuse of power and conflict of interest to protect public funds.\n\n2. Achieving optimal value of public funds when concluding contracts of works and procurements, and implementing them at fair and competitive prices.\n\n3. Promoting integrity and competitiveness, maintaining equality, and ensuring fair treatment of bidders, in fulfillment of the principle of equal opportunity.\n\n4. Maintaining transparency in all procedures related to works and procurements.\n\n5. Fostering economic growth and development."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 3: Fundamental Principles",
    clause: "Article 3",
    text: "1. Government agencies shall, in carrying out their works and procurements, only contract licensed persons, subject to applicable laws and regulations.\n\n2. Government agencies shall, before contracting foreign persons to carry out procurements or works inside the Kingdom, ensure the unavailability of more than one local person qualified to carry out said works or procurements. The Regulations shall specify the terms and conditions for implementing the provisions of this paragraph."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 3: Fundamental Principles",
    clause: "Article 4",
    text: "All qualified persons seeking to contract with a government agency shall be accorded equal opportunities and treatment."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 3: Fundamental Principles",
    clause: "Article 5",
    text: "Bidders shall be provided with clear and uniform information on the required works and procurements and shall be given access to such information at a specified time."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 3: Fundamental Principles",
    clause: "Article 6",
    text: "A public tender shall be subject to the principles of publicity, transparency, and equal opportunity."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 3: Fundamental Principles",
    clause: "Article 7",
    text: "No proposals or contracts shall be accepted or concluded unless they are compliant with the provisions of the Law."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 3: Fundamental Principles",
    clause: "Article 8",
    text: "The tendering and contracting of works and procurements shall be restricted to the actual needs of the government agency and shall be at fair prices that do not exceed prevailing market prices."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 3: Fundamental Principles",
    clause: "Article 9",
    text: "Priority shall be given to local small- and medium-sized enterprises, local content, and companies listed in the Capital Market. The regulations referred to in Article 96(3) of this Law shall determine the manner of prioritization."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 4: Scope of Application",
    clause: "Article 10",
    text: "This Law shall apply to all government agencies."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 4: Scope of Application",
    clause: "Article 11",
    text: "Works and procurements carried out outside the Kingdom shall be subject to the provisions of the Law. However, they may be exempted from some provisions, as specified in the Regulations."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 5: Advance Planning",
    clause: "Article 12",
    text: "1. A government agency shall plan in advance for its works and procurements and shall coordinate with the Ministry to secure the necessary appropriations therefor. At the beginning of each fiscal year, the government agency shall publish a plan commensurate with its budget, including key information on its works and procurements during that year, without prejudice to the requirements of national security.\n\n2. The publication of a government agency's works and procurement plans shall not entail any obligation on its part."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 6: Institutional Organization",
    clause: "Article 13",
    text: "1. In implementation of the provisions of the Law, the Ministry shall:\na) establish, supervise, and continuously develop the Portal;\nb) develop policies and issue directives, instructions, and guidelines relating to the implementation of the provisions of the Law and the Regulations;\nc) collect information on tendering activities and publish it on the Portal, and monitor the implementation of the provisions of the Law, without prejudice to the roles of other regulatory agencies; and\nd) publish, through the Portal, lists of persons prohibited from dealing with government agencies.\n\n2. The Minister shall approve forms for contracts, tender documents, pre-qualification documents, contractor performance assessment forms, and any other document required by the nature of works or procurements."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 6: Institutional Organization",
    clause: "Article 14",
    text: "Without prejudice to the powers of the General Authority for Military Industries, and in implementation of the provisions of the Law, the Unified Procurement Agency shall:\n\n1. determine works and procurements needed by more than one government agency, standardize their technical specifications, and carry out all procedures for tendering them, receiving and examining proposals, and selecting the best thereof, and conclude framework agreements in respect thereof on behalf of government agencies in accordance with the provisions of the Law;\n\n2. prepare lists of works and procurements in respect of which framework agreements are concluded, and enable government agencies to view them and the provisions of framework agreements through the Portal;\n\n3. review the feasibility studies and estimated costs of procurements and works to be tendered, as well as related tender documents and pre-qualification documents, if any, submitted by government agencies, and provide its opinion thereon within the period specified in the Regulations; and\n\n4. prepare forms for tender documents, pre-qualification documents, contracts, contractor performance assessment, and any other document required by the nature of works or procurements, in accordance with the provisions of the Law, the Regulations, and the regulations referred to in Article 96(3) of the Law."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 6: Institutional Organization",
    clause: "Article 15",
    text: "1. A government agency may not procure items or execute works included in the lists prepared by the Unified Procurement Agency except through the framework agreements concluded by the Unified Procurement Agency.\n\n2. Notwithstanding the provisions of paragraph (1) of this Article, a government agency may, upon approval of the Unified Procurement Agency, execute works and procure items included in the lists in accordance with the provisions of the Law.\n\n3. Prior to tendering its projects or works, or prior to conducting pre-qualification, if any, a government agency shall submit the feasibility study, estimated cost, tender documents, and pre-qualification documents, if any, as well as the procedures it has taken, to the Unified Procurement Agency for review within the period specified in the Regulations. If the Unified Procurement Agency fails to respond within said period, it shall be deemed to have approved. The government agency shall comply with the amendments requested by the Unified Procurement Agency.\n\n4. Notwithstanding the provisions of paragraph (3) of this Article, a government agency may tender its projects or works, or conduct pre-qualification, if any, without submitting the feasibility study, estimated cost, tender documents, and pre-qualification documents, if any, as well as the procedures it has taken, to the Unified Procurement Agency, in the case of works and procurements with an estimated cost not exceeding the amount specified in the Regulations, or in the case of emergency or urgency. In such cases, the government agency shall notify the Unified Procurement Agency of the actions taken in this regard."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 7: Portal",
    clause: "Article 16",
    text: "Tender procedures shall be carried out through the Portal, in accordance with the provisions of the Law and the Regulations."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 7: Portal",
    clause: "Article 17",
    text: "1. The Portal shall maintain the highest levels of privacy, confidentiality, security, and information transparency, while ensuring the integrity of procedures.\n\n2. The Portal shall enable interested persons to view information and data related to tenders as specified in the Regulations.\n\n3. A record shall be designated in the Portal for each government agency to record all information, data, and procedures related to contracts concluded and projects and works tendered by it, in accordance with the Regulations.\n\n4. The Ministry shall charge a fee for services provided by the Portal. The Council of Ministers shall determine the amount of such fee, which may be amended by a resolution of the Council based on a recommendation by the Ministry."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 8: Conditions for Dealing and Qualification of Bidders",
    clause: "Article 18",
    text: "Persons dealing with government agencies shall satisfy the conditions necessary for executing works and procurements, in accordance with the Regulations."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 8: Conditions for Dealing and Qualification of Bidders",
    clause: "Article 19",
    text: "1. A government agency shall conduct pre-qualification or post-qualification in works and procurements, in accordance with the Regulations.\n\n2. In case of pre-qualification, only those who pass pre-qualification shall be invited to participate in the tender."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 8: Conditions for Dealing and Qualification of Bidders",
    clause: "Article 20",
    text: "Pre-qualification or post-qualification criteria shall be objective, measurable, and related to the technical, financial, and administrative capabilities of bidders, as well as to the volume of contractual obligations of bidders, and shall be proportionate to the nature, size, and value of the project or work."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 9: Tender Documents",
    clause: "Article 21",
    text: "1. Tender documents shall include information and data related to the tendered works and procurements, as specified in the Regulations.\n\n2. Electronic copies of tender documents shall be made available on the Portal. If this is not technically feasible, sufficient hard copies shall be provided.\n\n3. The Regulations shall specify the criteria for determining the cost of tender documents."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 10: Contracting Methods",
    clause: "Article 22",
    text: "Tenders shall be of the following types:\n\n1. Public tender.\n\n2. Limited tender.\n\n3. Two-stage tender.\n\n4. Direct purchase.\n\n5. Competition.\n\nThe Regulations shall specify the terms and conditions for each type."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 10: Contracting Methods",
    clause: "Article 23",
    text: "All works and procurements shall be tendered in a public tender, except for those exempted under the provisions of the Law."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 10: Contracting Methods",
    clause: "Article 24",
    text: "1. A government agency may tender through a limited tender in the following cases:\na) if the works and procurements are available only with a limited number of contractors, suppliers, or service providers;\nb) if the estimated cost of works and procurements does not exceed 500,000 riyals, by inviting the largest possible number of bidders, provided that they are not less than five. In this case, priority shall be given to local small and medium enterprises;\nc) in cases of urgency;\nd) if the works and procurements are available with non-profit institutions or associations or entities, provided that they execute them by themselves; or\ne) consultancy services.\n\nThe Regulations shall specify the necessary terms, conditions, and procedures for implementing this Article."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 10: Contracting Methods",
    clause: "Article 25",
    text: "A government agency may tender in two stages if it is not possible to fully and accurately determine the technical specifications and final contractual terms due to the complex and specialized nature of some works and procurements, in accordance with the Regulations."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 10: Contracting Methods",
    clause: "Article 26",
    text: "A government agency may contract through direct purchase in the following cases:\n\n1. Procurement of arms, ammunition, military equipment and spare parts, through the General Authority for Military Industries.\n\n2. If the works and procurements are available exclusively with one contractor, supplier, or service provider, and there is no acceptable alternative, provided that the contracting is in accordance with the Regulations.\n\n3. If the estimated cost of works and procurements does not exceed 100,000 riyals. In this case, priority shall be given to local small and medium enterprises.\n\n4. If the use of this method is necessary to protect national security interests and it is not possible to use public or limited tender. In this case, a report shall be prepared explaining the reasons and a copy thereof shall be provided to the General Auditing Bureau.\n\n5. If the works and procurements are available with one non-profit institution, association, or entity, provided that it executes them by itself.\n\n6. In cases of emergency.\n\nThe Regulations shall specify the terms, conditions, and procedures for implementing the provisions of this Article."
  },
  {
    part: "Part One: General Provisions",
    chapter: "Chapter 10: Contracting Methods",
    clause: "Article 27",
    text: "A government agency may conclude a framework agreement with a bidder awarded a tender, which includes the provisions under which contracts will be executed within a specific period, in cases where it is not possible to determine the quantities of items or volume of works or services contracted for, or the time of their execution, in accordance with the Regulations."
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

const GtplRC128PartI = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partIClausesEnglish);
  
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

  const navigateToRegulationArticle = (regulationArticle: string) => {
    // Convert to kebab case for URL
    const articleId = regulationArticle.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the regulation article
    handleModuleChange('gtpl-rc128-regulation-viewer', 'Article Details');
    
    // Add a hash to the URL to scroll to the specific article
    window.location.hash = articleId;
  };
  
  // Filter clauses based on search term
  const filteredClauses = searchTerm 
    ? partIClausesEnglish.filter(clause => 
        clause.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.chapter.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partIClausesEnglish;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Law - Part I</h1>
            <p className="text-gray-500">General Provisions</p>
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
              <p className="font-medium text-blue-900">About Part I</p>
              <p className="text-sm text-blue-700 mt-1">
                Part I of the Government Tenders and Procurement Law (GTPL RC 128) covers the general provisions, including definitions, purposes of the law, fundamental principles, scope of application, advance planning, institutional organization, portal, conditions for dealing and qualification of bidders, tender documents, and contracting methods.
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
                          
                          {/* Related Regulation Articles */}
                          {getRelatedLawArticles(clause.clause) && getRelatedLawArticles(clause.clause).length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Related Regulation Articles</h4>
                              <div className="flex flex-wrap gap-2">
                                {getRelatedLawArticles(clause.clause).map((regulationArticle, index) => (
                                  <button
                                    key={index}
                                    onClick={() => navigateToRegulationArticle(regulationArticle)}
                                    className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm hover:bg-purple-100"
                                  >
                                    <Gavel size={14} />
                                    <span>{regulationArticle}</span>
                                    <ExternalLink size={12} />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              Part I - {clause.clause}
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

export default GtplRC128PartI;