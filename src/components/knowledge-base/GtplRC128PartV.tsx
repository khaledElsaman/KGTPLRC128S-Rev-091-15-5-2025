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

// Part V clauses data
const partVClauses: Clause[] = [
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 141",
    text: "Subject to the Rules and Procedures of Government Warehouses, the Government Authority shall form a committee of at least three specialist members to appraise the items and movables intended to be sold. The appraisal shall consider the condition, cost, and expected life of the items and other factors that affect appraisal of the price. If the Government Authority does not have sufficient experience, it may seek a pricing entity that has experience in the items intended to be sold."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 142",
    text: "The estimated prices shall be submitted in a sealed envelope which may not be opened except by the chairperson of the sale committee in the presence of its members after opening the auction envelopes or after the public auction."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 143",
    text: "1. The Government Authority shall form a committee of no less than three members to conduct the public auction, or to open the envelopes and examine the bids of the items intended to be sold in a sealed-bid auction.\n\n2. The committee shall check the integrity of the envelopes, auction documents, and the bonds submitted, and it shall review the prices. Then the committee shall inform the bidders, or their representatives, who are present of the bid prices.\n\n3. The committee shall proceed with the auction procedures and determine the best bid that meets the auction conditions. Then the committee shall submit its report to the competent authority that determines the awarding.\n\n4. In case the auction is public, after the end of the auction, the committee shall draft a report stating the auction procedures and the successful bidder as well as the bond provided by such successful bidder. The committee shall submit such report to the competent authority to determine the awarding."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 144",
    text: "In the event the prices offered in the auction are at least fifteen percent (15%) lower than the estimated prices, another calling shall be made after conducting re-appraisal of the prices. If a suitable price is not offered in the second time, the items may be sold or granted in accordance with the provisions of Article (83) of the Law."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 145",
    text: "In case the items or movables are perishable by storage, they may be sold in accordance with the provisions of Article 81 of the Law."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 146",
    text: "Decision of the auction award shall be issued within no later than thirty days from the envelope opening date, or from the end of the public auction. Should this period lapse without deciding the award, the bidder may withdraw his bid and recover his bond under a letter to the Government Authority within ten days from the expiry of the period scheduled to decide on the award. Bidders who do not come forward during this period shall be deemed to agree to continue with their bids."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 147",
    text: "The successful bidder shall, after increasing his bond to (5%) of his bid value, pay the price of the movable items and the cost of transfer thereof in full within ten days from the date of receiving notification of the award. If the bidder fails to pay, he shall be served a written notice and if he fails to pay within fifteen days from the date of notice, his bond shall be confiscated and negotiations will be held with the next bidders respectively to agree on the same price which was proposed by the first successful bidder. If such price is not reached, another calling of the auction shall be made."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 148",
    text: "Upon payment of the price of the sold items and movables the buyer shall transfer the purchased items within fifteen days maximum from the date of payment, and if he delays the transfer, a written notice shall be served to the buyer to transfer them within an equal period. In case such period expires and the buyer did not transfer the items, his bond may not be released until he transfers the items, pursuant to clause (2) of Article (82) of the Law, and he may be charged with the storage charges. The Government Authority shall not be liable for any loss or damage of the sold items and movables after the period scheduled to transfer them."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 1: Selling of Movable Property",
    clause: "Article 149",
    text: "Licensed brokers may be sought to conduct the public auction for a commission to be incurred by the buyer which may not exceed 2.5% of the price of sold items. The brokers shall be selected in accordance with the provisions of the Law and Regulations."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 2: Rent of Equipment, Devices, and Programs",
    clause: "Article 150",
    text: "Where the Government Authority wishes to procure some of its needs through rental, such as the equipment, cars, and computer devices and programs, it shall observe the following rules:\n\n1. Rental must serve the best interest of the Government Authority better than buying.\n\n2. The need to rent shall be assessed based on a report prepared by a specialized technical committee and approved by the entity authorized to decide the award.\n\n3. The rented devices or supplies shall be insured by the lessor, or are under the lessor's guarantee throughout the lease term, and the lessor shall be obliged in all cases to maintain such items throughout the lease term.\n\n4. The lease term shall be consistent with the cost designated for the contract in the budget and it may not exceed five years."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 3: Replacement of Devices and Equipment",
    clause: "Article 151",
    text: "Where the Government Authority wishes to replace its existing devices and equipment with new ones and pay the difference in value it shall observe the following rules:\n\n1. The expected life of the equipment has expired, or the equipment is of the type that requires continuous upgrade and development, or they do not meet the Government Authority's needs, or the cost of maintenance and spare parts is high as compared with the cost of new equipment and maintenance thereof.\n\n2. The replacement realizes greater savings for the public treasury as compared to the sale.\n\n3. The Government Authority shall form a technical committee to examine the outdated equipment and prepare a technical report thereon which shall indicate their purchase date, cost, current condition, and estimated value. The technical committee shall state in the report that it has verified the items set out in clauses (1 and 2) of this Article.\n\n4. The conditions and specifications of the new equipment offered for tender shall include the estimated value of the outdated equipment and the subject of the tender shall be the value of the new equipment.\n\n5. The relevant item at the Government Authority allows deduction of the entire cost of the new asset.\n\n6. Total cost of the new asset shall be deducted from the designated funds. The value of the outdated asset shall be recorded in the revenues as government sales. The outdated asset shall be issued to the supplier along with the difference in value."
  },
  {
    part: "Part V: Sale and Lease of Movable Property and Replacement of Equipment",
    chapter: "Chapter 3: Replacement of Devices and Equipment",
    clause: "Article 152",
    text: "The needs of the Government Authority which are procured by rental or replacement of existing devices and equipment with new ones shall be offered in a general tender, and they may be secured through selective tender or direct procurement pursuant to the provisions of the Law and these Regulations."
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

const GtplRC128PartV = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partVClauses);
  
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
    ? partVClauses.filter(clause => 
        clause.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.part.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partVClauses;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Law - Part V</h1>
            <p className="text-gray-500">Sale and Lease of Movable Property and Replacement of Equipment</p>
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
              <p className="font-medium text-blue-900">About Part V</p>
              <p className="text-sm text-blue-700 mt-1">
                Part V of the Government Tenders and Procurement Law (GTPL RC 128) covers the sale of movables, including procedures for disposal, auction requirements, guarantees, and alternative methods for handling government assets.
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
                              Part V - {clause.clause}
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

export default GtplRC128PartV;