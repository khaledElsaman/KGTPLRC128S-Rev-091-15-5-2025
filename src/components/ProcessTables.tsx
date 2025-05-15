import React, { useState } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, History, Tag, X, Upload, ArrowRight, Brain, ClipboardList, Users, ArrowUpRight } from 'lucide-react';

const processTables = {
  BID_EXAMINATION: {
    title: 'Bid Examination Committee Process',
    article: 'Articles 113-115',
    description: 'Process for bid examination committee reviews and decisions',
    steps: [
      {
        stepNo: '5.1',
        description: 'Committee receives claim or variation request for review.',
        responsible: 'Committee Secretary',
        timeline: 'Within 3 working days',
        requirements: ['Complete submission package', 'Initial assessment report']
      },
      {
        stepNo: '5.2',
        description: 'Technical team conducts detailed analysis.',
        responsible: 'Technical Team',
        timeline: '15 working days',
        requirements: ['Technical evaluation', 'Market analysis', 'Impact study']
      },
      {
        stepNo: '5.3',
        description: 'Committee meeting scheduled and members notified.',
        responsible: 'Committee Secretary',
        timeline: 'Within 5 working days',
        requirements: ['Meeting agenda', 'Review materials', 'Member confirmations']
      },
      {
        stepNo: '5.4',
        description: 'Committee reviews and makes recommendation.',
        responsible: 'Committee Members',
        timeline: '1 working day',
        requirements: ['Meeting minutes', 'Decision document', 'Voting record']
      },
      {
        stepNo: '5.5',
        description: 'Final decision documented and communicated.',
        responsible: 'Committee Chairman',
        timeline: 'Within 3 working days',
        requirements: ['Official decision letter', 'Supporting documentation']
      }
    ]
  },
  CONTRACT_TERMINATION: {
    title: 'Contract Termination Process',
    article: 'Articles 77-81',
    description: 'Process for contract termination and closeout procedures',
    steps: [
      {
        stepNo: '6.1',
        description: 'Initial notification of termination consideration.',
        responsible: 'Government Agency',
        timeline: 'Immediate',
        requirements: ['Breach documentation', 'Performance records']
      },
      {
        stepNo: '6.2',
        description: 'Contractor provided opportunity to remedy.',
        responsible: 'Contractor',
        timeline: '15 days',
        requirements: ['Remedy plan', 'Timeline for correction']
      },
      {
        stepNo: '6.3',
        description: 'Final termination decision made if no remedy.',
        responsible: 'Government Agency',
        timeline: 'Within 30 days',
        requirements: ['Decision document', 'Legal review']
      },
      {
        stepNo: '6.4',
        description: 'Site handover and inventory check.',
        responsible: 'Both Parties',
        timeline: '15 days',
        requirements: ['Inventory list', 'Handover certificate']
      },
      {
        stepNo: '6.5',
        description: 'Final account settlement.',
        responsible: 'Government Agency',
        timeline: '60 days',
        requirements: ['Financial statement', 'Settlement agreement']
      }
    ]
  },
  VARIATION_ORDERS: {
    title: 'Variation Orders Process',
    article: 'Article 69',
    description: 'Process for handling variation orders and modifications',
    steps: [
      {
        stepNo: '7.1',
        description: 'Variation requirement identified and documented.',
        responsible: 'Project Engineer',
        timeline: 'Immediate',
        requirements: ['Variation scope', 'Technical justification']
      },
      {
        stepNo: '7.2',
        description: 'Contractor submits variation proposal.',
        responsible: 'Contractor',
        timeline: '15 days',
        requirements: ['Cost estimate', 'Schedule impact', 'Technical details']
      },
      {
        stepNo: '7.3',
        description: 'Technical evaluation of variation.',
        responsible: 'Consultant',
        timeline: '14 days',
        requirements: ['Technical review', 'Cost analysis']
      },
      {
        stepNo: '7.4',
        description: 'Variation order approval process.',
        responsible: 'Government Agency',
        timeline: '30 days',
        requirements: ['Approval document', 'Budget confirmation']
      },
      {
        stepNo: '7.5',
        description: 'Implementation and monitoring.',
        responsible: 'Project Team',
        timeline: 'As per schedule',
        requirements: ['Progress reports', 'Quality checks']
      }
    ]
  },
  QUALITY_CONTROL: {
    title: 'Quality Control Process',
    article: 'Article 114',
    description: 'Process for quality control and technical compliance',
    steps: [
      {
        stepNo: '8.1',
        description: 'Quality control plan submission.',
        responsible: 'Contractor',
        timeline: 'Project start',
        requirements: ['QC plan', 'Testing procedures']
      },
      {
        stepNo: '8.2',
        description: 'Regular quality inspections.',
        responsible: 'QC Team',
        timeline: 'Weekly',
        requirements: ['Inspection reports', 'Test results']
      },
      {
        stepNo: '8.3',
        description: 'Non-conformance reporting and resolution.',
        responsible: 'QC Manager',
        timeline: '48 hours',
        requirements: ['NCR reports', 'Corrective actions']
      },
      {
        stepNo: '8.4',
        description: 'Technical compliance verification.',
        responsible: 'Consultant',
        timeline: '7 days',
        requirements: ['Compliance reports', 'Technical reviews']
      },
      {
        stepNo: '8.5',
        description: 'Final quality certification.',
        responsible: 'Project Engineer',
        timeline: 'Project completion',
        requirements: ['Quality certificates', 'Final inspection report']
      }
    ]
  }
};

const ProcessTables = () => {
  const [selectedProcess, setSelectedProcess] = useState(Object.keys(processTables)[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const currentProcess = processTables[selectedProcess as keyof typeof processTables];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Process Tables</h1>
          <p className="text-sm text-gray-500 mt-1">GTPL RC 128 Process Documentation</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} />
            <span>New Process</span>
          </button>
        </div>
      </div>

      {/* Process Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(processTables).map(([key, process]) => (
          <button
            key={key}
            onClick={() => setSelectedProcess(key)}
            className={`p-4 rounded-lg border ${
              selectedProcess === key
                ? 'border-blue-200 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                selectedProcess === key ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <ClipboardList size={20} className="text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">{process.title}</p>
                <p className="text-sm text-gray-500">{process.article}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Process Details */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">{currentProcess.title}</h2>
            <p className="text-sm text-gray-500">{currentProcess.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search steps..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Step</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Responsible</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Timeline</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Requirements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProcess.steps
                .filter(step => 
                  searchTerm === '' ||
                  step.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  step.responsible.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((step, index) => (
                  <tr key={step.stepNo} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{step.stepNo}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{step.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{step.responsible}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{step.timeline}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {step.requirements.map((req, reqIndex) => (
                          <span 
                            key={reqIndex}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcessTables;