import React, { useState, useEffect } from 'react';
import { FileCheck, Download, Book, AlertCircle, CheckCircle, Info, ArrowRight, FileText, MessageSquare, Scale, Gavel, GitCompare, Loader } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const VariationsComplianceGuide = () => {
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
      element.href = '/knowledge-base/variations-compliance/download';
      element.download = 'Variations_Compliance_Guide_0425.pdf';
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
            <h1 className="text-2xl font-bold text-gray-900">Variations Compliance Guide</h1>
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
            onClick={() => handleModuleChange('variations', 'Overview')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowRight size={16} />
            <span>Go to Variations Dashboard</span>
          </button>
          <button 
            onClick={() => handleModuleChange('engineer-notices', 'Draft Notices')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ArrowRight size={16} />
            <span>View Notice of Variation</span>
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

        {/* Floating Table of Contents */}
        <div className="lg:flex gap-6">
          <div className="lg:w-3/4">
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
                      <a href="#article-69" className="flex items-center gap-2 text-blue-600 hover:underline">
                        <ArrowRight size={16} />
                        <span>Article 69: Change Order Limits</span>
                      </a>
                    </li>
                    <li>
                      <a href="#article-114" className="flex items-center gap-2 text-blue-600 hover:underline">
                        <ArrowRight size={16} />
                        <span>Article 114: Additional Work Requirements</span>
                      </a>
                    </li>
                    <li>
                      <a href="#approval-workflow" className="flex items-center gap-2 text-blue-600 hover:underline">
                        <ArrowRight size={16} />
                        <span>Approval Workflow</span>
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
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <Book size={20} className="text-blue-600" />
                    Introduction
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base">
                      Variations management under the Saudi Government Tenders and Procurement Law 128 (GTPL RC 128) requires strict adherence to specific procedures, limits, and approval processes. This guide outlines the key compliance requirements to ensure your variations are processed effectively and in accordance with the law.
                    </p>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info size={20} className="text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-blue-900">Compliance Importance</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Non-compliance with GTPL RC 128 procedures can result in variation rejection, contract disputes, and potential legal complications. Following this guide will help ensure your variations meet all regulatory requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Article 69 Section */}
                <section id="article-69" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <FileText size={20} className="text-blue-600" />
                    Article 69: Change Order Limits
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base">
                      <a href="/knowledge-base/gtpl-rc128/law#article-69" className="text-blue-600 hover:underline">Article 69</a> of GTPL RC 128 establishes specific limits for contract variations. Understanding these limits is essential for compliance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-medium mb-2">Increase Limit</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600">+</span>
                          </div>
                          <div>
                            <p className="font-medium">Up to 10%</p>
                            <p className="text-sm text-gray-500">of original contract value</p>
                          </div>
                        </div>
                        <p className="text-sm mt-2">
                          Variations that increase the contract value must not exceed 10% of the original contract amount.
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-medium mb-2">Decrease Limit</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-red-600">-</span>
                          </div>
                          <div>
                            <p className="font-medium">Up to 20%</p>
                            <p className="text-sm text-gray-500">of original contract value</p>
                          </div>
                        </div>
                        <p className="text-sm mt-2">
                          Variations that decrease the contract value must not exceed 20% of the original contract amount.
                        </p>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="text-yellow-600 mt-1" />
                        <div>
                          <p className="font-medium text-yellow-900">Important Consideration</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Exceeding these limits requires special approval procedures and may necessitate a new contract or tender process. Always verify the cumulative impact of multiple variations against these limits.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Article 114 Section */}
                <section id="article-114" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <FileText size={20} className="text-blue-600" />
                    Article 114: Additional Work Requirements
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base">
                      <a href="/knowledge-base/gtpl-rc128/regulation#article-114" className="text-blue-600 hover:underline">Article 114</a> establishes requirements for additional works and modifications to existing contracts. These requirements must be strictly followed.
                    </p>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-medium mb-2">Key Requirements</h3>
                      <ul className="list-disc list-inside text-sm space-y-2">
                        <li className="p-1">
                          <span className="font-medium">Scope Alignment:</span> Additional work must stay within the general scope of the original contract
                        </li>
                        <li className="p-1">
                          <span className="font-medium">Funding Verification:</span> Proper funding must exist before changes are approved
                        </li>
                        <li className="p-1">
                          <span className="font-medium">Technical Necessity:</span> Changes must be technically necessary for the project
                        </li>
                        <li className="p-1">
                          <span className="font-medium">Fair Pricing:</span> Variation pricing must be consistent with market rates
                        </li>
                        <li className="p-1">
                          <span className="font-medium">Documentation:</span> Complete technical and financial justification must be provided
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-green-600 mt-1" />
                        <div>
                          <p className="font-medium text-green-900">Compliance Tip</p>
                          <p className="text-sm text-green-700 mt-1">
                            Maintain detailed documentation of the technical necessity for each variation. Include market price comparisons and scope alignment justifications with all variation requests.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Approval Workflow Section */}
                <section id="approval-workflow" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <GitCompare size={20} className="text-blue-600" />
                    Approval Workflow
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base">
                      GTPL RC 128 requires a specific workflow for variations processing. Following this workflow is essential for compliance.
                    </p>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-medium mb-2">Variations Workflow Steps</h3>
                      <ol className="list-decimal list-inside text-sm space-y-2">
                        <li className="p-2 bg-gray-50 rounded">
                          <span className="font-medium">Variation Documents</span>
                          <p className="ml-6 text-gray-600">Prepare technical specifications, drawings, and cost estimates</p>
                        </li>
                        <li className="p-2 bg-gray-50 rounded">
                          <span className="font-medium">Notice of Variation</span>
                          <p className="ml-6 text-gray-600">Engineer issues formal notice with detailed requirements</p>
                        </li>
                        <li className="p-2 bg-gray-50 rounded">
                          <span className="font-medium">Contractor Response</span>
                          <p className="ml-6 text-gray-600">Contractor reviews and responds with proposal</p>
                        </li>
                        <li className="p-2 bg-gray-50 rounded">
                          <span className="font-medium">AI Analysis</span>
                          <p className="ml-6 text-gray-600">System-generated compliance check and risk assessment</p>
                        </li>
                        <li className="p-2 bg-gray-50 rounded">
                          <span className="font-medium">Variation Approval</span>
                          <p className="ml-6 text-gray-600">Final review and approval/rejection decision</p>
                        </li>
                      </ol>
                    </div>
                  </div>
                </section>

                {/* Arbitration Section */}
                <section id="arbitration" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <Scale size={20} className="text-blue-600" />
                    Arbitration and Dispute Resolution
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base">
                      When variations disputes cannot be resolved through standard procedures, GTPL RC 128 provides mechanisms for arbitration and dispute resolution.
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
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <CheckCircle size={20} className="text-blue-600" />
                    Best Practices
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base">
                      Following these best practices will help ensure successful variations management under GTPL RC 128.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-900 mb-2">Documentation</h3>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                          <li>Maintain comprehensive variation records</li>
                          <li>Document all communications related to variations</li>
                          <li>Keep detailed cost and schedule impact records</li>
                          <li>Preserve evidence of technical necessity</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-medium text-green-900 mb-2">Timing</h3>
                        <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                          <li>Process variations promptly</li>
                          <li>Adhere strictly to all regulatory timelines</li>
                          <li>Track approval deadlines for all submissions</li>
                          <li>Schedule regular variation status reviews</li>
                        </ul>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-medium text-purple-900 mb-2">System Utilization</h3>
                      <ul className="list-disc list-inside text-sm text-purple-700 space-y-1">
                        <li>Use AI analysis results to strengthen variation justifications</li>
                        <li>Upload all supporting documentation to the system</li>
                        <li>Utilize the variations dashboard for tracking and monitoring</li>
                        <li>Generate compliance reports before submission</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* References Section */}
                <section id="references" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
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
                    Overview of Government Tenders and Procurement Law 128 requirements for variations, change orders, and additional works in public contracts.
                  </p>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info size={20} className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-blue-900">Compliance Importance</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Non-compliance with GTPL RC 128 procedures can result in variation rejection, contract disputes, and potential legal complications. Following this guide will help ensure your variations meet all regulatory requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Change Order Limits */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <FileText size={20} className="text-blue-600" />
                    1. Change Order Limits (Article 69, GTPL 128)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-base">
                      Contract variations are strictly limited by the following parameters:
                    </p>
                    <ul className="list-disc pl-8 space-y-2">
                      <li>Increase in contract value must not exceed 10% of original contract value.</li>
                      <li>Decrease in contract value must not exceed 20% of original contract value.</li>
                      <li>Changes must be approved by the authorized entity before implementation.</li>
                    </ul>
                    <div className="text-sm text-gray-500 italic">
                      Source: Government Tenders and Procurement Law (GTPL 128), Saudi Arabia
                    </div>
                  </div>
                </section>

                {/* Executive Regulations */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <FileText size={20} className="text-blue-600" />
                    2. Executive Regulations under GTPL 128
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">2.1 Additional Works (Article 114, Executive Regulation)</h3>
                    <div className="space-y-4">
                      <p className="text-base">Requirements for additional works:</p>
                      <ul className="list-disc pl-8 space-y-2">
                        <li>Additional work must be within the general scope of the original contract.</li>
                        <li>Proper funding must be available before approval.</li>
                        <li>If contractor disagrees with pricing, government entity may seek other contractors.</li>
                      </ul>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Procedures:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                          <li>Technical specifications and drawings must be prepared.</li>
                          <li>Cost estimates must be developed based on market prices.</li>
                          <li>Formal variation order must be issued before work begins.</li>
                        </ul>
                      </div>
                      
                      <div className="text-sm text-gray-500 italic">
                        Source: GTPL 128 Executive Regulations - Ministry of Finance Saudi Arabia
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">2.2 Unauthorized Works (Article 115, Executive Regulation)</h3>
                    <div className="space-y-4">
                      <p className="text-base">Key restrictions:</p>
                      <ul className="list-disc pl-8 space-y-2">
                        <li>Contractor cannot perform additional works without written approval.</li>
                        <li>No compensation for unauthorized works, even if beneficial to the project.</li>
                        <li>Contractor may be required to remove unauthorized works at their own expense.</li>
                      </ul>
                      
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle size={20} className="text-red-600 mt-1" />
                          <div>
                            <p className="font-medium text-red-900">Critical Warning:</p>
                            <p className="text-sm text-red-700 mt-1">
                              Never proceed with any variation work without formal written approval, regardless of verbal instructions or apparent urgency.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Summary Table */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
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
                          <td className="border border-gray-200 px-4 py-2">Contract increases and decreases</td>
                          <td className="border border-gray-200 px-4 py-2">Limited to 10%-20% range</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 px-4 py-2 font-medium">Contract Extensions</td>
                          <td className="border border-gray-200 px-4 py-2">Delay penalties waived under strict conditions</td>
                          <td className="border border-gray-200 px-4 py-2">Requires regulatory compliance</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 font-medium">Unauthorized Works</td>
                          <td className="border border-gray-200 px-4 py-2">No payments without prior authorization</td>
                          <td className="border border-gray-200 px-4 py-2">Contractor must receive formal approval</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 px-4 py-2 font-medium">Arbitration</td>
                          <td className="border border-gray-200 px-4 py-2">SAR 100M+ contracts</td>
                          <td className="border border-gray-200 px-4 py-2">Only Saudi law applicable</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 font-medium">Technical Dispute Resolution</td>
                          <td className="border border-gray-200 px-4 py-2">30-45 days</td>
                          <td className="border border-gray-200 px-4 py-2">No delay to work progress allowed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                
                {/* Related Articles */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
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
          </div>

          {/* Floating Right Navigation */}
          <div className="hidden lg:block lg:w-1/4 sticky top-6 self-start">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">On This Page</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#introduction" className="text-blue-600 hover:underline">Introduction</a>
                </li>
                <li>
                  <a href="#article-69" className="text-blue-600 hover:underline">Article 69: Change Order Limits</a>
                </li>
                <li>
                  <a href="#article-114" className="text-blue-600 hover:underline">Article 114: Additional Work Requirements</a>
                </li>
                <li>
                  <a href="#approval-workflow" className="text-blue-600 hover:underline">Approval Workflow</a>
                </li>
                <li>
                  <a href="#arbitration" className="text-blue-600 hover:underline">Arbitration and Dispute Resolution</a>
                </li>
                <li>
                  <a href="#best-practices" className="text-blue-600 hover:underline">Best Practices</a>
                </li>
                <li>
                  <a href="#references" className="text-blue-600 hover:underline">Helpful References</a>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Related Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/knowledge-base/gtpl-rc128/law#article-69" className="text-blue-600 hover:underline flex items-center gap-1">
                      <FileText size={14} />
                      <span>GTPL RC 128 Law Article 69</span>
                    </a>
                  </li>
                  <li>
                    <a href="/knowledge-base/gtpl-rc128/law#article-74" className="text-blue-600 hover:underline flex items-center gap-1">
                      <FileText size={14} />
                      <span>GTPL RC 128 Law Article 74</span>
                    </a>
                  </li>
                  <li>
                    <a href="/knowledge-base/gtpl-rc128/regulation#article-114" className="text-blue-600 hover:underline flex items-center gap-1">
                      <FileText size={14} />
                      <span>GTPL RC 128 Regulation Article 114</span>
                    </a>
                  </li>
                  <li>
                    <a href="/knowledge-base/gtpl-rc128/regulation#article-115" className="text-blue-600 hover:underline flex items-center gap-1">
                      <FileText size={14} />
                      <span>GTPL RC 128 Regulation Article 115</span>
                    </a>
                  </li>
                  <li>
                    <a href="/knowledge-base/gtpl-rc128/regulation#article-116" className="text-blue-600 hover:underline flex items-center gap-1">
                      <FileText size={14} />
                      <span>GTPL RC 128 Regulation Article 116</span>
                    </a>
                  </li>
                  <li>
                    <a href="/knowledge-base/claims-compliance-guide" className="text-blue-600 hover:underline flex items-center gap-1">
                      <FileCheck size={14} />
                      <span>Claims Compliance Guide</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Download Full Variations Compliance Guide</h3>
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

export default VariationsComplianceGuide;