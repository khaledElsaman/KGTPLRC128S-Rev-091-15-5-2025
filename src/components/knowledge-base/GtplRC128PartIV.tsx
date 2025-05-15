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

// Part IV clauses data
const partIVClauses: Clause[] = [
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 1: General Provisions",
    clause: "Article 88",
    text: "Upon provision of the performance bond, the Government Authority shall set a date to sign the contract. If the contractor fails to appear on the specified date without an acceptable excuse, the Authority may withdraw the award and confiscate the initial guarantee. The Authority shall then evaluate whether to award to the next bidder or re-tender the project based on public interest considerations."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 1: General Provisions",
    clause: "Article 89",
    text: "The contract shall be executed in at least six copies; one for each of the contractor, supervising department, accounting, auditing, and other relevant departments. Additional copies shall be provided as needed for regulatory authorities. All copies shall be signed by authorized representatives of both parties and stamped with the official seal of the Government Authority."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 1: General Provisions",
    clause: "Article 90",
    text: "Correspondence and notifications shall be exchanged between the Government Authority and the contractor through the E-Portal. When technical limitations prevent E-Portal usage, alternative methods may be used as specified in the Regulations, provided all communications are documented and archived in the contract file."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 1: General Provisions",
    clause: "Article 91",
    text: "The Government Authority may stipulate in the contract that summer holidays shall be excluded from service contract periods. This exclusion must be clearly stated in the tender documents and contract terms to ensure transparency and fair competition among bidders."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 1: General Provisions",
    clause: "Article 92",
    text: "In performance-based contracts, the Authority may set conditions linked to deliverables and payment performance thresholds. These conditions must be objective, measurable, and directly related to the contract objectives. Payment schedules shall be tied to verified achievement of these performance indicators."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 1: General Provisions",
    clause: "Article 93",
    text: "All contracts exceeding one year or SAR 5 million must undergo financial, legal, and drafting review before signing. The review shall ensure compliance with GTPL RC 128 requirements, budget availability, and proper risk allocation. The review committee shall document its findings and recommendations in the contract file."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 2: Contracting Types",
    clause: "Article 94",
    text: "Government Authorities shall use standard contract types such as construction, supply, consultancy, IT, lease, and sales. The Ministry shall issue standard templates for each contract type, which shall be used by all Government Authorities unless specific project requirements necessitate modifications. Any substantial deviations from standard templates require Ministry approval."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 2: Contracting Types",
    clause: "Article 95",
    text: "Contracts may be awarded under various pricing models: measurement-based, turnkey, lump sum, performance-based, etc. The selection of pricing model shall be based on project nature, risk allocation, and value for money principles. The chosen model must be clearly specified in tender documents and aligned with project objectives."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 3: Receipt of Sites",
    clause: "Article 96",
    text: "The contractor shall receive the project site within the timeframe specified in the contract. The site handover shall be documented with a formal report signed by both parties, detailing the site condition, boundaries, and any existing facilities or obstacles. Failure to hand over the site on time may entitle the contractor to time extension or compensation."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 3: Receipt of Sites",
    clause: "Article 97",
    text: "The contractor must verify site conditions and report any discrepancies between actual conditions and contract documents within the period specified in the contract. Failure to report such discrepancies may result in the contractor bearing any additional costs arising from these differences."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 4: Responsibility of Contractor with the Government",
    clause: "Article 98",
    text: "The contractor shall be fully responsible for the execution of works in accordance with the contract terms, specifications, and applicable regulations. This includes responsibility for the quality of materials, workmanship, and compliance with safety and environmental requirements."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 4: Responsibility of Contractor with the Government",
    clause: "Article 99",
    text: "The contractor shall be liable for any damages resulting from negligence or non-compliance with contract terms. This liability extends to damages caused by subcontractors or workers under the contractor's supervision. The contractor shall indemnify the Government Authority against any third-party claims arising from contract execution."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 5: Performance Bond",
    clause: "Article 100",
    text: "The contractor shall provide a performance bond of 5% of the contract value within 15 working days from the award notification. For contracts exceeding SAR 100 million, the bond may be reduced to 2.5% with Ministry approval. The bond shall remain valid until final acceptance of all contract deliverables."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 5: Performance Bond",
    clause: "Article 101",
    text: "The performance bond shall be in the form of a bank guarantee issued by a licensed bank in Saudi Arabia. The guarantee shall be unconditional, irrevocable, and payable on first demand. Electronic guarantees issued through the approved banking system are acceptable."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 6: Advance Payment Guarantee",
    clause: "Article 102",
    text: "If the contract provides for advance payment, the contractor shall submit a guarantee equal to the advance amount. The guarantee shall be gradually reduced as the advance is recovered through progress payments. The advance shall not exceed 20% of the contract value and shall be recovered according to the schedule specified in the contract."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 7: Extension of Guarantees",
    clause: "Article 103",
    text: "If the contract period is extended, the contractor shall extend all guarantees accordingly. Failure to extend guarantees within 14 days of notification may result in confiscation of existing guarantees. The Government Authority shall notify the contractor of the required extension at least 30 days before guarantee expiry."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 8: Confiscation of Guarantees",
    clause: "Article 104",
    text: "Guarantees may be confiscated in cases of contractor default, contract termination, or failure to fulfill contractual obligations. Partial confiscation is permitted proportional to the unfulfilled obligations. The contractor shall be notified of the confiscation decision and the reasons thereof."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 9: General Provisions concerning the Guarantees",
    clause: "Article 105",
    text: "All guarantees shall be issued by banks licensed to operate in Saudi Arabia. Foreign bank guarantees may be accepted if confirmed by a local bank. The Government Authority shall verify the authenticity of guarantees through the banking system before accepting them."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 9: General Provisions concerning the Guarantees",
    clause: "Article 106",
    text: "Guarantees shall be released promptly upon fulfillment of the related obligations. The Government Authority shall not delay the release of guarantees without valid reasons. Any delay in releasing guarantees may entitle the contractor to compensation for resulting damages."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 10: Cash Security Deposit",
    clause: "Article 107",
    text: "For contracts involving maintenance or operation, the Government Authority may retain up to 10% of each payment as security for proper execution. This retention shall be released upon satisfactory completion of the maintenance or operation period, subject to any deductions for remedying defects."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 11: Payment of Financial Consideration",
    clause: "Article 108",
    text: "The Government Authority shall pay the contractor's entitlements according to the payment schedule specified in the contract. Payments shall be processed within 30 days of verification of entitlement. Delayed payments may entitle the contractor to compensation as specified in the Regulations."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 11: Payment of Financial Consideration",
    clause: "Article 109",
    text: "Progress payments shall be made based on actual work completed and accepted by the supervising engineer. The Government Authority may withhold up to 10% of each payment as retention money, to be released upon final acceptance of the works."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 11: Payment of Financial Consideration",
    clause: "Article 110",
    text: "The final payment shall be processed after completion of all contract obligations, including submission of as-built drawings, operation manuals, and clearance certificates from relevant authorities. The contractor shall submit the final invoice within 90 days of project completion."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 11: Payment of Financial Consideration",
    clause: "Article 111",
    text: "The Government Authority may make direct payments to subcontractors if the main contractor fails to pay their entitlements. Such payments shall be deducted from the main contractor's entitlements after notifying the contractor and providing an opportunity to respond."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 11: Payment of Financial Consideration",
    clause: "Article 112",
    text: "All payments shall be made in Saudi Riyals unless otherwise specified in the contract. Foreign currency payments shall be made at the exchange rate prevailing on the payment date. The contractor shall bear any exchange rate risks unless the contract explicitly provides otherwise."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 12: Adjustment of Contract Prices",
    clause: "Article 113",
    text: "Compensation is permissible if:\n\n1. Customs tariffs, fees, taxes, or priced materials/services change after offer submission.\n\n2. Contractor proves actual payment based on new rates.\n\n3. Price increase is not due to contractor's delay.\n\nMaterial Price Adjustments:\n• Applies if market price change >10% for materials (cement, iron, asphalt, etc.).\n• Adjustment only if total contract cost impact >3%.\n• Compensation is capped at 20% of total contract value."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 13: Increase or Decrease of the Contractor's Obligations",
    clause: "Article 114",
    text: "Rules for additional works and amendments:\n\n1. Additional work must be within the general scope of the original contract.\n\n2. Proper funding must be available before approval.\n\n3. If contractor disagrees with pricing, government entity may seek other contractors."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 13: Increase or Decrease of the Contractor's Obligations",
    clause: "Article 115",
    text: "Rules for contract amendments and restrictions:\n\n1. Amendments must be in writing and signed by both parties.\n\n2. Amendments must not alter the nature of the contract.\n\n3. Amendments must be within the limits specified in Article 69 of the Law."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 13: Increase or Decrease of the Contractor's Obligations",
    clause: "Article 116",
    text: "Rules for modifying contractor obligations:\n\n1. Contractor cannot perform additional works without written approval.\n\n2. No compensation for unauthorized works, even if beneficial to the project.\n\n3. Contractor may be required to remove unauthorized works at their own expense."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 14: Contract Assignment",
    clause: "Article 117",
    text: "The contractor may not assign the contract or any part thereof to another contractor without obtaining prior written approval from the Government Authority and the Ministry. Assignment shall be subject to the same qualification criteria applied to the original contractor. The original contractor shall remain jointly liable with the assignee for contract execution."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 15: Subcontracting",
    clause: "Article 118",
    text: "The contractor may subcontract up to 30% of the contract value after obtaining written approval from the Government Authority. The subcontractor must meet the qualification requirements for the subcontracted works. The main contractor shall remain fully responsible for all subcontracted works and shall ensure subcontractor compliance with contract requirements."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 16: Penalties",
    clause: "Article 119",
    text: "Delay penalties shall be calculated based on the value of delayed works or services. For supply contracts, penalties shall not exceed 6% of the contract value. For other contracts, penalties shall not exceed 20% of the contract value. The penalty calculation method shall be clearly stated in the contract."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 16: Penalties",
    clause: "Article 120",
    text: "For continuing service contracts, penalties for non-performance shall not exceed 20% of the monthly invoice value. The Government Authority shall establish clear performance indicators and evaluation mechanisms. Penalties shall be proportional to the impact of non-performance on service quality."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 16: Penalties",
    clause: "Article 121",
    text: "The Government Authority may exempt the contractor from penalties if the delay is due to force majeure, causes attributable to the Authority, or circumstances beyond the contractor's control. Exemption requests shall be submitted within 30 days of the cause arising and shall be supported by documentary evidence."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 16: Penalties",
    clause: "Article 122",
    text: "Penalties shall be applied automatically without the need for legal action or proof of damage. The contractor shall be notified of the penalties and the reasons thereof. Penalties shall be deducted from the contractor's entitlements or guarantees if necessary."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 16: Penalties",
    clause: "Article 123",
    text: "The Government Authority may impose additional penalties for specific violations as stipulated in the contract. These penalties shall be proportional to the violation severity and shall not exceed 10% of the contract value in total. The contractor shall be given an opportunity to remedy the violation before penalties are imposed."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 17: Extension of Contracts, Exemption of Delay Penalty, and Suspension of Works",
    clause: "Article 124",
    text: "The contract may be extended if the delay is caused by the Government Authority, budget constraints, or force majeure. Extension requests shall be submitted before contract expiry and shall include justification and supporting documents. The extension period shall be proportional to the delay cause."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 17: Extension of Contracts, Exemption of Delay Penalty, and Suspension of Works",
    clause: "Article 125",
    text: "Delay penalties may be waived if the delay is due to additional works, insufficient annual appropriations, or causes attributable to the Government Authority. The waiver decision shall be documented with justification and supporting evidence. Partial waiver is permitted proportional to the impact of the delay cause."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 17: Extension of Contracts, Exemption of Delay Penalty, and Suspension of Works",
    clause: "Article 126",
    text: "The Government Authority may suspend works temporarily due to public interest, safety concerns, or budget constraints. The suspension period shall not exceed 180 days unless agreed by both parties. The contractor may be entitled to compensation for costs incurred during the suspension period."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 18: Receipt of Works",
    clause: "Article 127",
    text: "Upon completion of works, the contractor shall notify the Government Authority for preliminary acceptance. The Authority shall form a committee to inspect the works within 15 days of notification. The committee shall prepare a detailed report of any defects requiring rectification before final acceptance."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 18: Receipt of Works",
    clause: "Article 128",
    text: "The contractor shall rectify all defects identified during preliminary acceptance within the period specified by the inspection committee. The Government Authority may rectify defects at the contractor's expense if the contractor fails to do so within the specified period."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 18: Receipt of Works",
    clause: "Article 129",
    text: "Final acceptance shall be granted after the warranty period expires and all defects are rectified. The warranty period shall be at least one year from preliminary acceptance or as specified in the contract. Final acceptance shall be documented with a certificate signed by authorized representatives."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 18: Receipt of Works",
    clause: "Article 130",
    text: "The contractor shall provide as-built drawings, operation manuals, and maintenance instructions before final acceptance. Training of Government Authority staff on equipment operation and maintenance shall be completed as specified in the contract. Final payment shall be processed after fulfillment of these requirements."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 19: Contract Termination",
    clause: "Article 131",
    text: "The Government Authority shall terminate the contract if the contractor commits fraud, manipulation, bribery, or bankruptcy. The Authority shall notify the contractor of the termination decision and the reasons thereof. The performance bond shall be confiscated, and the contractor may be blacklisted from future government contracts."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 19: Contract Termination",
    clause: "Article 132",
    text: "The Government Authority may terminate the contract if the contractor delays commencement, performs poorly, or violates contract terms without rectification. The contractor shall be given written notice and a reasonable period to remedy the violation before termination. The Authority shall document the contractor's violations and rectification attempts."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 19: Contract Termination",
    clause: "Article 133",
    text: "The Government Authority may terminate the contract for public interest after Ministry approval. The contractor shall be entitled to compensation for actual costs incurred and lost profit on the unexecuted portion, not exceeding 10% of the remaining contract value. Compensation shall be determined by a specialized committee."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 19: Contract Termination",
    clause: "Article 134",
    text: "The contract may be terminated by mutual agreement between the Government Authority and the contractor. The termination agreement shall specify the rights and obligations of both parties, including financial settlement and handover procedures. The agreement shall be approved by the authorized official."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 19: Contract Termination",
    clause: "Article 135",
    text: "Upon contract termination, the Government Authority shall take inventory of completed works and materials on site. The contractor shall be paid for accepted works and materials after deducting any penalties or damages. The Authority may use the contractor's equipment to complete the works if necessary, with fair compensation."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 20: Partial Withdrawal",
    clause: "Article 136",
    text: "The Government Authority may withdraw part of the works from the contractor if the contractor fails to perform according to the approved schedule. The Authority shall notify the contractor in writing before partial withdrawal. The contractor shall continue to execute the remaining works according to the contract."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 20: Partial Withdrawal",
    clause: "Article 137",
    text: "The withdrawn works shall be executed at the contractor's expense through direct contracting or a new tender. Any additional costs shall be deducted from the contractor's entitlements or guarantees. The contractor shall be entitled to any savings if the works are executed at a lower cost."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 20: Partial Withdrawal",
    clause: "Article 138",
    text: "The contractor shall provide all necessary assistance to the new contractor executing the withdrawn works. This includes site access, sharing of information, and coordination of interfaces. Failure to cooperate may result in additional penalties or damages."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 20: Partial Withdrawal",
    clause: "Article 139",
    text: "Partial withdrawal shall not relieve the contractor from contractual obligations for the remaining works. The contractor shall remain liable for the quality and timely completion of these works. The Government Authority shall adjust the contract schedule and payment terms accordingly."
  },
  {
    part: "Part IV: Concluding and Executing Contracts",
    chapter: "Chapter 21: Assessment of Contractor's Performance",
    clause: "Article 140",
    text: "The Government Authority shall assess the contractor's performance using the standard evaluation form. The assessment shall cover technical quality, compliance with schedule, cooperation, and adherence to regulations. The assessment results shall be recorded in the contractor's file and may affect future qualification for government contracts."
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

const GtplRC128PartIV = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partIVClauses);
  
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
    ? partIVClauses.filter(clause => 
        clause.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clause.part.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partIVClauses;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Law - Part IV</h1>
            <p className="text-gray-500">Concluding and Executing Contracts</p>
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
              <p className="font-medium text-blue-900">About Part IV</p>
              <p className="text-sm text-blue-700 mt-1">
                Part IV of the Government Tenders and Procurement Law (GTPL RC 128) covers the concluding and executing of contracts, including general provisions, contracting types, performance bonds, payments, contract modifications, penalties, and termination procedures.
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
                            {clause.text.split('\n').map((paragraph, idx) => (
                              <p key={idx} className="mb-2">{paragraph}</p>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              Part IV - {clause.clause}
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

export default GtplRC128PartIV;