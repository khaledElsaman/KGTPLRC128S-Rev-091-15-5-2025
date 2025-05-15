import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, Tag as TagIcon, X, Calendar, Clock, FileText, GitCompare, BarChart2, PieChart, ArrowRight, Zap, Shield, DollarSign } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

// AI Prediction Types based on GTPL RC 128
const predictionTypes = {
  'RISK': {
    category: 'Risk Analysis',
    types: {
      'COST': {
        title: 'Cost Risk',
        metrics: ['Probability', 'Impact', 'Mitigation'],
        thresholds: { high: 0.7, medium: 0.4, low: 0.2 }
      },
      'SCHEDULE': {
        title: 'Schedule Risk',
        metrics: ['Delay Probability', 'Impact Days', 'Critical Path'],
        thresholds: { high: 0.7, medium: 0.4, low: 0.2 }
      },
      'COMPLIANCE': {
        title: 'Compliance Risk',
        metrics: ['Regulatory Issues', 'Documentation Gaps', 'Legal Exposure'],
        thresholds: { high: 0.7, medium: 0.4, low: 0.2 }
      }
    }
  },
  'APPROVAL': {
    category: 'Approval Prediction',
    types: {
      'LIKELIHOOD': {
        title: 'Approval Likelihood',
        metrics: ['Probability', 'Confidence', 'Historical Basis'],
        thresholds: { high: 0.8, medium: 0.5, low: 0.3 }
      },
      'TIMELINE': {
        title: 'Approval Timeline',
        metrics: ['Expected Days', 'Confidence', 'Bottlenecks'],
        thresholds: { fast: 7, medium: 14, slow: 30 }
      }
    }
  },
  'IMPACT': {
    category: 'Impact Analysis',
    types: {
      'FINANCIAL': {
        title: 'Financial Impact',
        metrics: ['Direct Cost', 'Indirect Cost', 'Long-term ROI'],
        thresholds: { high: 500000, medium: 100000, low: 50000 }
      },
      'SCOPE': {
        title: 'Scope Impact',
        metrics: ['Scope Change %', 'Quality Impact', 'Deliverables Affected'],
        thresholds: { high: 25, medium: 15, low: 5 }
      }
    }
  }
};

// Risk Level Badge Component
const RiskBadge = ({ level }: { level: string }) => {
  const styles = {
    'High': 'bg-red-50 text-red-600',
    'Medium': 'bg-yellow-50 text-yellow-600',
    'Low': 'bg-green-50 text-green-600',
    'Unknown': 'bg-gray-50 text-gray-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[level as keyof typeof styles]}`}>
      {level} Risk
    </span>
  );
};

// Approval Likelihood Badge Component
const ApprovalBadge = ({ likelihood }: { likelihood: number }) => {
  const getStyle = () => {
    if (likelihood >= 80) return 'bg-green-50 text-green-600';
    if (likelihood >= 50) return 'bg-yellow-50 text-yellow-600';
    return 'bg-red-50 text-red-600';
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStyle()}`}>
      {likelihood}% Likelihood
    </span>
  );
};

// AI Prediction Card Component
const AIPredictionCard = ({ prediction, onClick }: { prediction: any; onClick: () => void }) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          prediction.type.startsWith('COST') || prediction.type.startsWith('FINANCIAL') ? 'bg-blue-50' :
          prediction.type.startsWith('SCHEDULE') || prediction.type.startsWith('TIMELINE') ? 'bg-purple-50' :
          prediction.type.startsWith('COMPLIANCE') ? 'bg-green-50' :
          prediction.type.startsWith('LIKELIHOOD') ? 'bg-yellow-50' :
          'bg-orange-50'
        }`}>
          <Brain size={24} className={`${
            prediction.type.startsWith('COST') || prediction.type.startsWith('FINANCIAL') ? 'text-blue-600' :
            prediction.type.startsWith('SCHEDULE') || prediction.type.startsWith('TIMELINE') ? 'text-purple-600' :
            prediction.type.startsWith('COMPLIANCE') ? 'text-green-600' :
            prediction.type.startsWith('LIKELIHOOD') ? 'text-yellow-600' :
            'text-orange-600'
          }`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{prediction.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{prediction.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{prediction.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <GitCompare size={14} />
              <span>Variation {prediction.variationId}</span>
            </div>
          </div>
        </div>
      </div>
      {prediction.riskLevel ? (
        <RiskBadge level={prediction.riskLevel} />
      ) : (
        <ApprovalBadge likelihood={prediction.approvalLikelihood} />
      )}
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TagIcon size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{
            Object.entries(predictionTypes).find(([key, category]) => 
              Object.keys(category.types).includes(prediction.type)
            )?.[1].types[prediction.type as keyof typeof predictionTypes[keyof typeof predictionTypes]['types']].title
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <TrendingUp size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MessageSquare size={16} className="text-purple-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowRight size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// AI Prediction Detail Modal Component
const AIPredictionDetailModal = ({ prediction, isOpen, onClose }: { prediction: any; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{prediction.title}</h2>
              <p className="text-sm text-gray-500 mt-1">AI-Generated Prediction</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Key Findings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
                <div className="space-y-4">
                  {prediction.findings?.map((finding: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Brain size={20} className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium">{finding.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                        {finding.impact && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm font-medium">Impact:</span>
                            <RiskBadge level={finding.impact} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Analysis */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
                <div className="space-y-4">
                  {prediction.details?.map((detail: any, index: number) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-blue-900">{detail.factor}</p>
                        <span className="text-sm text-blue-700">{detail.score}% Impact</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-2">{detail.description}</p>
                      {detail.trend && (
                        <div className="flex items-center gap-2 mt-2">
                          <TrendingUp size={16} className="text-blue-600" />
                          <span className="text-sm text-blue-600">{detail.trend}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
                <div className="space-y-3">
                  {prediction.recommendations?.map((recommendation: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle size={20} className="text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">{recommendation.action}</p>
                        <p className="text-sm text-green-700 mt-1">{recommendation.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Analysis Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
                <div className="space-y-4">
                  {prediction.riskLevel && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Risk Level</p>
                      <RiskBadge level={prediction.riskLevel} />
                    </div>
                  )}
                  {prediction.approvalLikelihood && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Approval Likelihood</p>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              prediction.approvalLikelihood >= 80 ? 'bg-green-600' :
                              prediction.approvalLikelihood >= 50 ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}
                            style={{ width: `${prediction.approvalLikelihood}%` }}
                          />
                        </div>
                        <p className="text-sm font-medium mt-1">{prediction.approvalLikelihood}% Likelihood</p>
                      </div>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Confidence Score</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${prediction.confidenceScore}%` }}
                        />
                      </div>
                      <p className="text-sm font-medium mt-1">{prediction.confidenceScore}% Confidence</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Analysis Timeline</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Generated</span>
                        <span className="font-medium">{prediction.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Updated</span>
                        <span className="font-medium">{prediction.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download size={16} />
                  <span>Download Analysis</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <MessageSquare size={16} />
                  <span>Add Feedback</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <ArrowRight size={16} />
                  <span>View Variation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VariationsAI = () => {
  const [variations, setVariations] = useState<Database['public']['Tables']['variations_master']['Row'][]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVariations();
  }, []);

  const fetchVariations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('variations_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVariations(data || []);
    } catch (error) {
      console.error('Error fetching variations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample AI predictions data
  const predictions = [
    {
      id: 'AI-VAR-2024-001',
      title: 'Cost Risk Assessment - Steel Price Variation',
      type: 'COST',
      description: 'AI analysis of cost risks for steel price variation request',
      date: '2024-03-15',
      lastUpdate: '2 hours ago',
      variationId: 'VAR-2024-001',
      riskLevel: 'Medium',
      confidenceScore: 85,
      findings: [
        {
          title: 'Market Volatility',
          description: 'Steel prices show 15% volatility in the last quarter, indicating moderate risk',
          impact: 'Medium'
        },
        {
          title: 'Supply Chain Constraints',
          description: 'Global supply chain indicators suggest potential delays in steel delivery',
          impact: 'High'
        }
      ],
      details: [
        {
          factor: 'Price Trend Analysis',
          score: 65,
          description: 'Historical price data shows upward trend with seasonal fluctuations',
          trend: 'Increasing 3% month-over-month'
        },
        {
          factor: 'Supplier Reliability',
          score: 40,
          description: 'Current suppliers have moderate reliability scores based on past performance',
          trend: 'Stable with occasional delays'
        }
      ],
      recommendations: [
        {
          action: 'Secure Fixed-Price Agreements',
          rationale: 'Lock in current prices through supplier agreements to mitigate future increases'
        },
        {
          action: 'Explore Alternative Materials',
          rationale: 'Identify cost-effective alternatives for non-critical components'
        }
      ]
    },
    {
      id: 'AI-VAR-2024-002',
      title: 'Approval Prediction - Scope Change Request',
      type: 'LIKELIHOOD',
      description: 'Likelihood analysis for scope change approval',
      date: '2024-03-16',
      lastUpdate: '1 day ago',
      variationId: 'VAR-2024-002',
      approvalLikelihood: 75,
      confidenceScore: 82,
      findings: [
        {
          title: 'Historical Precedent',
          description: 'Similar scope changes have been approved at a 70% rate in the past year',
          impact: 'Medium'
        },
        {
          title: 'Documentation Quality',
          description: 'Current documentation is comprehensive and well-supported with evidence',
          impact: 'Low'
        }
      ],
      details: [
        {
          factor: 'Technical Justification',
          score: 85,
          description: 'Strong technical case with clear necessity demonstrated',
          trend: 'Above average compared to similar requests'
        },
        {
          factor: 'Financial Impact',
          score: 65,
          description: 'Moderate financial impact within acceptable thresholds',
          trend: 'Within 10% of typical approved variations'
        }
      ],
      recommendations: [
        {
          action: 'Enhance Impact Documentation',
          rationale: 'Provide additional details on schedule and resource impacts to strengthen case'
        },
        {
          action: 'Prepare Contingency Plan',
          rationale: 'Develop fallback options in case of partial approval or modification requests'
        }
      ]
    },
    {
      id: 'AI-VAR-2024-003',
      title: 'Schedule Impact Analysis - Additional Works',
      type: 'SCHEDULE',
      description: 'Analysis of schedule impacts for additional works variation',
      date: '2024-03-14',
      lastUpdate: '3 days ago',
      variationId: 'VAR-2024-003',
      riskLevel: 'High',
      confidenceScore: 78,
      findings: [
        {
          title: 'Critical Path Impact',
          description: 'Additional works directly affect 3 critical path activities',
          impact: 'High'
        },
        {
          title: 'Resource Constraints',
          description: 'Specialized labor resources are limited during the planned period',
          impact: 'Medium'
        }
      ],
      details: [
        {
          factor: 'Timeline Extension',
          score: 75,
          description: 'Estimated 15-20 day extension to project completion',
          trend: 'Above average impact compared to similar variations'
        },
        {
          factor: 'Resource Availability',
          score: 60,
          description: 'Limited availability of specialized equipment and personnel',
          trend: 'Declining availability in current market'
        }
      ],
      recommendations: [
        {
          action: 'Fast-Track Critical Activities',
          rationale: 'Implement acceleration measures for critical path activities'
        },
        {
          action: 'Early Resource Booking',
          rationale: 'Secure specialized resources well in advance to avoid delays'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Analysis - Variations</h1>
          <p className="text-sm text-gray-500 mt-1">AI-Driven Insights and Predictions for Variations</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Brain size={16} />
            <span>Train Model</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={16} />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">AI Predictions</p>
              <p className="text-2xl font-semibold mt-1">{predictions.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Brain size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Risk Alerts</p>
              <p className="text-2xl font-semibold mt-1">
                {predictions.filter(p => p.riskLevel === 'High').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Approval Likelihood</p>
              <p className="text-2xl font-semibold mt-1">
                {Math.round(
                  predictions
                    .filter(p => p.approvalLikelihood)
                    .reduce((sum, p) => sum + (p.approvalLikelihood || 0), 0) / 
                  predictions.filter(p => p.approvalLikelihood).length || 0
                )}%
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Prediction Accuracy</p>
              <p className="text-2xl font-semibold mt-1">87%</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Zap size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search predictions..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          {Object.entries(predictionTypes).map(([key, category]) => (
            <optgroup key={key} label={category.category}>
              {Object.entries(category.types).map(([typeKey, type]) => (
                <option key={typeKey} value={typeKey}>{type.title}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
          value={selectedRisk}
          onChange={(e) => setSelectedRisk(e.target.value)}
        >
          <option value="all">All Risk Levels</option>
          <option value="High">High Risk</option>
          <option value="Medium">Medium Risk</option>
          <option value="Low">Low Risk</option>
        </select>
      </div>

      {/* AI Insights Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Insights */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <DollarSign size={20} className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-blue-900">Cost Trend Analysis</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Recent variations show a 12% increase in average cost compared to previous quarter.
                      Material price fluctuations are the primary driver.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-yellow-600 mt-1" />
                  <div>
                    <p className="font-medium text-yellow-900">Approval Timeline Prediction</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Current approval process is averaging 18 days. AI predicts this can be reduced to 12 days
                      by improving documentation quality and early stakeholder engagement.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-green-900">Compliance Optimization</p>
                    <p className="text-sm text-green-700 mt-1">
                      85% of variations have complete GTPL RC 128 documentation. Improving Article 113 
                      documentation could increase approval rates by an estimated 15%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Predictions Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">AI Predictions</h2>
            <div className="space-y-4">
              {predictions
                .filter(prediction => 
                  selectedType === 'all' || prediction.type === selectedType
                )
                .filter(prediction =>
                  selectedRisk === 'all' || prediction.riskLevel === selectedRisk
                )
                .filter(prediction =>
                  searchTerm === '' ||
                  prediction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  prediction.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(prediction => (
                  <AIPredictionCard
                    key={prediction.id}
                    prediction={prediction}
                    onClick={() => setSelectedPrediction(prediction)}
                  />
                ))
              }
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Variations with Highest Risk */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Highest Risk Variations</h2>
            <div className="space-y-3">
              {variations
                .slice(0, 3)
                .map((variation, index) => (
                  <div key={variation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-red-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{variation.title}</p>
                        <p className="text-xs text-gray-500">{variation.id}</p>
                      </div>
                    </div>
                    <RiskBadge level="High" />
                  </div>
                ))
              }
            </div>
          </div>

          {/* Most Likely to be Approved */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Likely to be Approved</h2>
            <div className="space-y-3">
              {variations
                .slice(0, 3)
                .map((variation, index) => (
                  <div key={variation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{variation.title}</p>
                        <p className="text-xs text-gray-500">{variation.id}</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      {85 - (index * 5)}% Likely
                    </span>
                  </div>
                ))
              }
            </div>
          </div>

          {/* AI Model Performance */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Model Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Prediction Accuracy</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Risk Assessment</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">Timeline Prediction</span>
                  <span className="font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Prediction Detail Modal */}
      <AIPredictionDetailModal
        prediction={selectedPrediction}
        isOpen={!!selectedPrediction}
        onClose={() => setSelectedPrediction(null)}
      />
    </div>
  );
};

export default VariationsAI;