import React, { useState, useEffect } from 'react';
import { FileCheck, Download, Book, AlertCircle, CheckCircle, Info, ArrowRight, FileText, MessageSquare, Scale, Gavel, Loader } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ClaimsComplianceGuide = () => {
  const { handleModuleChange } = useApp();
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('guide');

  // Check if we need to highlight specific sections based on URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Remove the # character
      const sectionId = hash.substring(1);
      // Scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    
    // Simulate PDF generation/download process
    setTimeout(() => {
      // In a real implementation, this would be a link to an actual PDF file
      const element = document.createElement('a');
      element.href = '/assets/variations_claims_compliance_guide.pdf';
      element.download = 'Claims_Compliance_Guide_0425.pdf';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FileCheck className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Claims Compliance Guide</h1>
            <p className="text-gray-500">Ensuring alignment with Government Tenders and Procurement Law 128 and Implementing Regulations</p>
          </div>
        </div>

        {/* Quick Navigation Panel */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDownloading 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isDownloading ? (
              <>
                <Loader size={16} className="animate-spin" />
                <span>Preparing PDF...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download Compliance Guide PDF</span>
              </>
            )}
          </button>
          <button 
            onClick={() => handleModuleChange('claims-dashboard', 'Overview')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowRight size={16} />
            <span>Go to Claims Dashboard</span>
          </button>
          <button 
            onClick={() => handleModuleChange('notices', 'Draft Notices')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowRight size={16} />
            <span>View Notice of Claims</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'guide'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('guide')}
          >
            Compliance Guide
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'gtpl'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('gtpl')}
          >
            GTPL RC 128 Reference
          </button>
        </div>

        {activeTab === 'guide' && (
          <>
            {/* Table of Contents */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#introduction" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowRight size={16} />
                    <span>Introduction</span>
                  </a>
                </li>
                <li>
                  <a href="#article-68" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowRight size={16} />
                    <span>Article 68: Price Adjustment</span>
                  </a>
                </li>
                <li>
                  <a href="#article-113" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowRight size={16} />
                    <span>Article 113: Compensation Conditions</span>
                  </a>
                </li>
                <li>
                  <a href="#notice-workflow" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowRight size={16} />
                    <span>Notice Workflow</span>
                  </a>
                </li>
                <li>
                  <a href="#arbitration" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowRight size={16} />
                    <span>Arbitration and Dispute Resolution</span>
                  </a>
                </li>
                <li>
                  <a href="#best-practices" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowRight size={16} />
                    <span>Best Practices</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Introduction Section */}
            <section id="introduction" className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Book size={20} className="text-blue-600" />
                Introduction
              </h2>
              <div className="space-y-4">
                <p>
                  Claims management under the Saudi Government Tenders and Procurement Law 128 (GTPL RC 128) requires strict adherence to specific procedures and timelines. This guide provides a comprehensive overview of the legal requirements and compliance procedures for both variations and claims management within the KGTPLRC128S system.
                </p>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Compliance Importance</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Non-compliance with GTPL RC 128 procedures can result in claim rejection, financial losses, and potential legal complications. Following this guide will help ensure your claims meet all regulatory requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Article 68 Section */}
            <section id="article-68" className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Article 68: Price Adjustment
              </h2>
              <div className="space-y-4">
                <p>
                  <a href="/knowledge-base/gtpl-rc128/law#article-68" className="text-blue-600 hover:underline">Article 68</a> of GTPL RC 128 specifies the conditions under which contract price adjustments are permitted. Understanding these conditions is essential for successful claims.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-2">Permitted Adjustments</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Changes in prices of main tendered items or services</li>
                      <li>Changes in taxes or tariffs</li>
                      <li>Unforeseen financial difficulties</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-2">Required Documentation</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Price comparison evidence</li>
                      <li>Market analysis reports</li>
                      <li>Official notifications of tax/tariff changes</li>
                      <li>Financial impact assessment</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-600 mt-1" />
                    <div>
                      <p className="font-medium text-yellow-900">Important Consideration</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Price adjustment claims must be submitted within 60 days of the event causing the adjustment. Late submissions may be rejected regardless of merit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Article 113 Section */}
            <section id="article-113" className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Article 113: Compensation Conditions
              </h2>
              <div className="space-y-4">
                <p>
                  <a href="/knowledge-base/gtpl-rc128/regulation#article-113" className="text-blue-600 hover:underline">Article 113</a> establishes strict conditions for compensations related to taxes, materials, and services. These conditions must be met for claims to be considered valid.
                </p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-2">Compensation Requirements</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Direct relationship between the event and the claimed cost</li>
                    <li>Verification of actual cost impact</li>
                    <li>Evidence that the event was not foreseeable</li>
                    <li>Proof that the contractor took reasonable measures to mitigate impact</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-green-900">Compliance Tip</p>
                      <p className="text-sm text-green-700 mt-1">
                        Maintain contemporaneous records of all events that may impact costs. These records are crucial for establishing the validity of claims under Article 113.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Notice Workflow Section */}
            <section id="notice-workflow" className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Notice Workflow
              </h2>
              <div className="space-y-4">
                <p>
                  GTPL RC 128 requires a specific workflow for claims processing. Following this workflow is essential for compliance.
                </p>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium mb-2">Claims Workflow Steps</h3>
                  <ol className="list-decimal list-inside text-sm space-y-2">
                    <li className="p-2 bg-gray-50 rounded">
                      <span className="font-medium">Submit Notice of Claim</span>
                      <p className="ml-6 text-gray-600">Formal notification of intent to claim with preliminary details</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <span className="font-medium">Engineer Response</span>
                      <p className="ml-6 text-gray-600">Technical review and initial assessment</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <span className="font-medium">Detailed Claim</span>
                      <p className="ml-6 text-gray-600">Comprehensive claim with full documentation and justification</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <span className="font-medium">AI Analysis</span>
                      <p className="ml-6 text-gray-600">System-generated compliance check and risk assessment</p>
                    </li>
                    <li className="p-2 bg-gray-50 rounded">
                      <span className="font-medium">Claims Resolution</span>
                      <p className="ml-6 text-gray-600">Final decision and settlement</p>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Arbitration Section */}
            <section id="arbitration" className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Scale size={20} className="text-blue-600" />
                Arbitration and Dispute Resolution
              </h2>
              <div className="space-y-4">
                <p>
                  When claims cannot be resolved through standard procedures, GTPL RC 128 provides mechanisms for arbitration and dispute resolution.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-2">Article 154</h3>
                    <p className="text-sm">
                      Arbitration is allowed only for contracts over SAR 100M and must apply Saudi Law. All arbitration proceedings must be conducted in accordance with the Saudi Arbitration Law.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-2">Article 155</h3>
                    <p className="text-sm">
                      Technical disputes are resolved via the Dispute Resolution Council within 30-45 days. The council's decisions are binding unless appealed to the Administrative Court.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Best Practices Section */}
            <section id="best-practices" className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-blue-600" />
                Best Practices
              </h2>
              <div className="space-y-4">
                <p>
                  Following these best practices will help ensure successful claims management under GTPL RC 128.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Documentation</h3>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                      <li>Maintain comprehensive contemporaneous records</li>
                      <li>Document all communications related to potential claims</li>
                      <li>Keep detailed cost and schedule impact records</li>
                      <li>Preserve evidence of market conditions and price changes</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Timing</h3>
                    <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                      <li>Submit notices immediately when issues arise</li>
                      <li>Adhere strictly to all regulatory timelines</li>
                      <li>Track response deadlines for all submissions</li>
                      <li>Schedule regular claim status reviews</li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-2">System Utilization</h3>
                  <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                    <li>Use AI analysis results to strengthen claim arguments</li>
                    <li>Upload all supporting documentation to the system</li>
                    <li>Utilize the claims dashboard for tracking and monitoring</li>
                    <li>Generate compliance reports before submission</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* References Section */}
            <section id="references" className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Book size={20} className="text-blue-600" />
                Helpful References
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href="https://ncar.gov.sa/Documents/Details?Id=oCElQIyvsJ%2FH%2BOwE%2F3cZ1A%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                  >
                    <FileText size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">GTPL 128 Full Text (Arabic)</p>
                      <p className="text-sm text-gray-500">Official government publication</p>
                    </div>
                  </a>
                  <a 
                    href="https://www.my.gov.sa/wps/portal/snp/servicesDirectory/servicedetails/9503" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                  >
                    <FileText size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">Government Tenders and Procurement Law – English Summary</p>
                      <p className="text-sm text-gray-500">Translated reference guide</p>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'gtpl' && (
          <>
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 mb-4">
                Overview of Government Tenders and Procurement Law 128 requirements for claim adjustments, arbitration, and dispute resolution in public contracts.
              </p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-blue-900">Compliance Importance</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Non-compliance with GTPL RC 128 procedures can result in claim rejection, financial losses, and potential legal complications. Following this guide will help ensure your claims meet all regulatory requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Adjustment and Change Orders */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                1. Price Adjustment and Change Orders (Article 68, GTPL 128)
              </h2>
              <div className="space-y-4">
                <p>
                  Contract or framework agreement prices can only be adjusted (increase or decrease) in the following cases:
                </p>
                <ul className="list-disc pl-8 space-y-2">
                  <li>Changes in prices of main tendered items or services, as specified by regulations.</li>
                  <li>Adjustment of tariffs, fees, or taxes affecting the contract.</li>
                  <li>Unforeseen financial difficulties arising during contract execution.</li>
                </ul>
                <div className="text-sm text-gray-500 italic">
                  Source: Government Tenders and Procurement Law (GTPL 128), Saudi Arabia
                </div>
              </div>
            </section>

            {/* Executive Regulations */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                2. Executive Regulations under GTPL 128
              </h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">2.1 Adjustment of Contract Prices (Article 113, Executive Regulation)</h3>
                <div className="space-y-4">
                  <p>Compensation is permissible if:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Customs tariffs, fees, taxes, or priced materials/services change after offer submission.</li>
                    <li>Contractor proves actual payment based on new rates.</li>
                    <li>Price increase is not due to contractor's delay.</li>
                  </ul>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Material Price Adjustments:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Applies if market price change &gt;10% for materials (cement, iron, asphalt, etc.).</li>
                      <li>Adjustment only if total contract cost impact &gt;3%.</li>
                      <li>Compensation is capped at 20% of total contract value.</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Procedures:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Contractor must submit a claim within 60 days of the triggering event.</li>
                      <li>Claims must be processed internally within 45–90 days.</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm text-gray-500 italic">
                    Source: GTPL 128 Executive Regulations - Ministry of Finance Saudi Arabia
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">2.2 Arbitration Provisions (Article 154, Executive Regulation)</h3>
                <div className="space-y-4">
                  <p>Key conditions:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Arbitration only allowed for contracts valued above SAR 100 million.</li>
                    <li>Saudi laws must govern the dispute.</li>
                    <li>International arbitration allowed only if foreign parties are involved.</li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">2.3 Technical Dispute Resolution (Article 155, Executive Regulation)</h3>
                <div className="space-y-4">
                  <p>In case of technical disputes that could cause project failure or significant harm:</p>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">A Dispute Council must be formed including:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Representative of the government entity.</li>
                      <li>Representative of the contractor.</li>
                      <li>Chairperson appointed by the Ministry.</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Process:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Both parties submit technical reports.</li>
                      <li>The council must issue a decision within 30 days (extendable by 15 days for objections).</li>
                      <li>Decision binding if agreed, else open to judicial appeal.</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-yellow-600 mt-1" />
                      <div>
                        <p className="font-medium text-yellow-900">Important:</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          Disputes must not delay ongoing project work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Table */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Summary Table
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Section</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Key Focus</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium">Price Adjustments</td>
                      <td className="border border-gray-200 px-4 py-2">Market changes, taxes, financial challenges</td>
                      <td className="border border-gray-200 px-4 py-2">Strict filing deadlines; supporting documents required.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 font-medium">Arbitration</td>
                      <td className="border border-gray-200 px-4 py-2">SAR 100M+ contracts only, Saudi law</td>
                      <td className="border border-gray-200 px-4 py-2">Rare international arbitration allowed for foreign contracts.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 font-medium">Technical Dispute Resolution</td>
                      <td className="border border-gray-200 px-4 py-2">Fast 30–45 days process</td>
                      <td className="border border-gray-200 px-4 py-2">Must not delay project execution.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* Related Articles */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Related Articles
              </h2>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  <span>Article 72: Delay Penalty</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  <span>Article 73: Service Contract Penalties</span>
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  <span>Article 74: Contract Extensions</span>
                </button>
              </div>
            </section>
          </>
        )}

        {/* Download Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Download Full Claims Compliance Guide</h3>
              <p className="text-sm text-gray-500 mt-1">Last Updated: April 2025</p>
            </div>
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className={`mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                isDownloading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isDownloading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  <span>Preparing PDF...</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsComplianceGuide;