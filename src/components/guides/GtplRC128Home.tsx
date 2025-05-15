import React from 'react';
import { Book, FileText, GitCompare, ArrowRight, Download, Info } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const GtplRC128Home = () => {
  const { handleModuleChange } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Government Tenders & Procurement Law (RC128) Guide</h1>
        <p className="text-lg text-gray-600 mt-2">Knowledge Base for the Law, Regulations, and Related Articles</p>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* GTPL RC128 Law */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-full">
              <Book className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">GTPL RC128 Law</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Explore all legal provisions of the Government Tenders and Procurement Law approved by Royal Decree No. M/128.
          </p>
          <button 
            onClick={() => handleModuleChange('gtpl-guide', 'Overview')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
          >
            <FileText size={16} />
            <span>View Full Law</span>
          </button>
        </div>

        {/* GTPL RC128 Implementing Regulations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 rounded-full">
              <GitCompare className="text-purple-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">GTPL RC128 Regulations</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Access the executive regulations supporting the GTPL RC128 Law.
          </p>
          <button 
            onClick={() => handleModuleChange('gtpl-regulation', 'Overview')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 w-full justify-center"
          >
            <FileText size={16} />
            <span>View Regulations</span>
          </button>
        </div>

        {/* GTPL RC128 Linked Regulations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-50 rounded-full">
              <GitCompare className="text-green-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Linked Regulations</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Browse detailed implementing articles mapped to each legal provision for easier understanding and compliance.
          </p>
          <button 
            onClick={() => handleModuleChange('gtpl-linked-regulations', 'Overview')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full justify-center"
          >
            <FileText size={16} />
            <span>View Article Mapping</span>
          </button>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-10">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Info className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Key Features of GTPL RC128</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <ArrowRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-blue-800">Comprehensive legal framework for government procurement</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-blue-800">Detailed implementing regulations for practical application</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-blue-800">Clear guidelines for variations and claims management</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-blue-800">Structured dispute resolution mechanisms</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-blue-800">Compliance requirements for government entities</p>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-blue-800">Contractor rights and obligations framework</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://ncar.gov.sa/Documents/Details?Id=oCElQIyvsJ%2FH%2BOwE%2F3cZ1A%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FileText className="text-blue-600" size={24} />
            <div>
              <p className="font-medium">GTPL 128 Full Text (Arabic)</p>
              <p className="text-sm text-gray-500">Official government source</p>
            </div>
            <ArrowRight className="ml-auto text-gray-400" size={16} />
          </a>
          
          <a 
            href="https://www.my.gov.sa/wps/portal/snp/servicesDirectory/servicedetails/9503" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FileText className="text-blue-600" size={24} />
            <div>
              <p className="font-medium">Government Tenders and Procurement Law</p>
              <p className="text-sm text-gray-500">English Summary</p>
            </div>
            <ArrowRight className="ml-auto text-gray-400" size={16} />
          </a>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-8 text-right">
        <p className="text-sm text-gray-500">Last Updated: April 2025</p>
      </div>
    </div>
  );
};

export default GtplRC128Home;