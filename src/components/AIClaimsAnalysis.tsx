import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, XCircle, Download, Plus, Filter, Search, MoreVertical, MessageSquare, Share2, Tag as TagIcon, X, Calendar, Clock, FileText, DollarSign, BarChart2, PieChart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type AIPrediction = Database['public']['Tables']['ai_claims_predictions']['Row'];
type Claim = Database['public']['Tables']['claims_master']['Row'];

// AI Analysis Types based on GTPL RC 128
const aiAnalysisTypes = {
  'PREDICTIVE': {
    category: 'Predictive Analysis',
    types: {
      'RISK': {
        title: 'Risk Prediction',
        metrics: ['Probability', 'Impact', 'Timeline'],
        thresholds: { high: 0.7, medium: 0.4, low: 0.2 }
      },
      'FINANCIAL': {
        title: 'Financial Impact',
        metrics: ['Amount', 'Percentage', 'Trend'],
        thresholds: { critical: 1000000, high: 500000, medium: 100000 }
      }
    }
  },
  'MARKET': {
    category: 'Market Analysis',
    types: {
      'PRICE': {
        title: 'Price Trends',
        metrics: ['Current', 'Historical', 'Forecast'],
        thresholds: { significant: 10, moderate: 5, minor: 2 }
      },
      'SUPPLY': {
        title: 'Supply Chain',
        metrics: ['Availability', 'Lead Time', 'Cost'],
        thresholds: { critical: 30, warning: 15, normal: 7 }
      }
    }
  },
  'COMPLIANCE': {
    category: 'Compliance Analysis',
    types: {
      'REGULATORY': {
        title: 'Regulatory Check',
        metrics: ['Adherence', 'Violations', 'Risk Level'],
        thresholds: { high: 0.9, medium: 0.75, low: 0.6 }
      },
      'DOCUMENTATION': {
        title: 'Documentation Analysis',
        metrics: ['Completeness', 'Accuracy', 'Relevance'],
        thresholds: { complete: 0.95, partial: 0.8, incomplete: 0.6 }
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

// AI Insight Card Component
const AIInsightCard = ({ insight, onClick }: { insight: any; onClick: () => void }) => (
  <div 
    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          insight.prediction_type === 'RISK' ? 'bg-red-50' :
          insight.prediction_type === 'FINANCIAL' ? 'bg-blue-50' :
          'bg-purple-50'
        }`}>
          <Brain size={24} className={`${
            insight.prediction_type === 'RISK' ? 'text-red-600' :
            insight.prediction_type === 'FINANCIAL' ? 'text-blue-600' :
            'text-purple-600'
          }`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{insight.title || `${insight.prediction_type} Analysis`}</h3>
          <p className="text-sm text-gray-500 mt-1">{insight.claim?.title || 'Claim Analysis'}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={14} />
              <span>{new Date(insight.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock size={14} />
              <span>Confidence: {insight.confidence_score}%</span>
            </div>
          </div>
        </div>
      </div>
      <RiskBadge level={insight.risk_level || 'Unknown'} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TagIcon size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{
            Object.entries(aiAnalysisTypes).find(([key, category]) => 
              Object.keys(category.types).includes(insight.prediction_type)
            )?.[1].types[insight.prediction_type as keyof typeof aiAnalysisTypes[keyof typeof aiAnalysisTypes]['types']]?.title || insight.prediction_type
          }</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <TrendingUp size={16} className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <BarChart2 size={16} className="text-purple-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// AI Insight Detail Modal Component
const AIInsightDetailModal = ({ insight, isOpen, onClose, claim }: { 
  insight: any; 
  isOpen: boolean; 
  onClose: () => void;
  claim: Claim | null;
}) => {
  if (!isOpen) return null;

  // Parse prediction data if it exists
  const predictionData = insight.prediction_data ? 
    (typeof insight.prediction_data === 'string' ? 
      JSON.parse(insight.prediction_data) : 
      insight.prediction_data) : 
    {};

  const findings = predictionData.findings || [
    {
      title: 'Market Volatility',
      description: 'Steel prices show increasing volatility with 15% variation in the last quarter',
      impact: 'High'
    },
    {
      title: 'Supply Chain Disruption',
      description: 'Global supply chain indicators suggest potential delays in steel delivery',
      impact: 'Medium'
    }
  ];

  const predictions = predictionData.predictions || [
    {
      scenario: 'Price Increase',
      probability: 75,
      description: 'Steel prices likely to increase by 12-15% in the next quarter',
      timeline: '3-4 months'
    },
    {
      scenario: 'Supply Shortage',
      probability: 60,
      description: 'Moderate risk of supply constraints affecting project timeline',
      timeline: '2-3 months'
    }
  ];

  const recommendations = predictionData.recommendations || [
    {
      action: 'Initiate Price Lock Agreements',
      rationale: 'Secure current prices through supplier agreements to mitigate future increases'
    },
    {
      action: 'Diversify Supply Chain',
      rationale: 'Identify alternative suppliers to reduce dependency and supply risk'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{insight.title || `${insight.prediction_type} Analysis`}</h2>
              <p className="text-sm text-gray-500 mt-1">AI-Generated Analysis</p>
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
              {/* Related Claim */}
              {claim && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Related Claim</h3>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FileText size={20} className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-blue-900">{claim.title}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-blue-700">
                            <Calendar size={14} />
                            <span>{new Date(claim.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-blue-700">
                            <DollarSign size={14} />
                            <span>{claim.value?.toLocaleString()} SAR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Findings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
                <div className="space-y-4">
                  {findings.map((finding: any, index: number) => (
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

              {/* Predictions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Predictions</h3>
                <div className="space-y-4">
                  {predictions.map((prediction: any, index: number) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-blue-900">{prediction.scenario}</p>
                        <span className="text-sm text-blue-700">{prediction.probability}% Probability</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-2">{prediction.description}</p>
                      {prediction.timeline && (
                        <p className="text-sm text-blue-600 mt-2">
                          Expected Timeline: {prediction.timeline}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
                <div className="space-y-3">
                  {recommendations.map((recommendation: any, index: number) => (
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
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Risk Level</p>
                    <RiskBadge level={insight.risk_level || 'Unknown'} />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Confidence Score</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${insight.confidence_score || 0}%` }}
                        />
                      </div>
                      <p className="text-sm font-medium mt-1">{insight.confidence_score || 0}% Confidence</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Analysis Timeline</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Generated</span>
                        <span className="font-medium">{new Date(insight.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Updated</span>
                        <span className="font-medium">{new Date(insight.created_at).toLocaleDateString()}</span>
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
                  <Share2 size={16} />
                  <span>Share Insights</span>
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <MessageSquare size={16} />
                  <span>Add Feedback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Prediction Modal Component
const NewPredictionModal = ({ isOpen, onClose, onSubmit, claims }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: any) => void;
  claims: Claim[];
}) => {
  const [formData, setFormData] = useState({
    claim_id: '',
    prediction_type: 'RISK',
    risk_level: 'Medium',
    approval_likelihood: 75,
    suggested_action: '',
    confidence_score: 85
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">New AI Prediction</h2>
              <p className="text-sm text-gray-500 mt-1">Generate a new AI prediction for a claim</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim
                </label>
                <select
                  value={formData.claim_id}
                  onChange={(e) => setFormData({ ...formData, claim_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a claim</option>
                  {claims.map(claim => (
                    <option key={claim.id} value={claim.id}>{claim.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prediction Type
                </label>
                <select
                  value={formData.prediction_type}
                  onChange={(e) => setFormData({ ...formData, prediction_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {Object.entries(aiAnalysisTypes).map(([key, category]) => (
                    <optgroup key={key} label={category.category}>
                      {Object.entries(category.types).map(([typeKey, type]) => (
                        <option key={typeKey} value={typeKey}>{type.title}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level
                </label>
                <select
                  value={formData.risk_level}
                  onChange={(e) => setFormData({ ...formData, risk_level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Likelihood (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.approval_likelihood}
                  onChange={(e) => setFormData({ ...formData, approval_likelihood: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confidence Score (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.confidence_score}
                  onChange={(e) => setFormData({ ...formData, confidence_score: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggested Action
                </label>
                <textarea
                  value={formData.suggested_action}
                  onChange={(e) => setFormData({ ...formData, suggested_action: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Prediction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AIClaimsAnalysis = () => {
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInsight, setSelectedInsight] = useState<AIPrediction | null>(null);
  const [showNewPredictionModal, setShowNewPredictionModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch claims
      const { data: claimsData, error: claimsError } = await supabase
        .from('claims_master')
        .select('*')
        .order('created_at', { ascending: false });

      if (claimsError) throw claimsError;
      setClaims(claimsData || []);
      
      // Fetch AI predictions
      const { data: predictionsData, error: predictionsError } = await supabase
        .from('ai_claims_predictions')
        .select('*')
        .order('created_at', { ascending: false });

      if (predictionsError) {
        console.warn('Using mock prediction data:', predictionsError.message);
        // If table doesn't exist yet, use mock data
        const mockPredictions = [
          {
            id: 'AI-2024-001',
            claim_id: claimsData?.[0]?.id || 'claim-id-1',
            prediction_type: 'RISK',
            risk_level: 'High',
            approval_likelihood: 65,
            suggested_action: 'Review market data and secure fixed-price agreements with suppliers',
            prediction_data: JSON.stringify({
              findings: [
                {
                  title: 'Market Volatility',
                  description: 'Steel prices show increasing volatility with 15% variation in the last quarter',
                  impact: 'High'
                },
                {
                  title: 'Supply Chain Disruption',
                  description: 'Global supply chain indicators suggest potential delays in steel delivery',
                  impact: 'Medium'
                }
              ],
              predictions: [
                {
                  scenario: 'Price Increase',
                  probability: 75,
                  description: 'Steel prices likely to increase by 12-15% in the next quarter',
                  timeline: '3-4 months'
                },
                {
                  scenario: 'Supply Shortage',
                  probability: 60,
                  description: 'Moderate risk of supply constraints affecting project timeline',
                  timeline: '2-3 months'
                }
              ],
              recommendations: [
                {
                  action: 'Initiate Price Lock Agreements',
                  rationale: 'Secure current prices through supplier agreements to mitigate future increases'
                },
                {
                  action: 'Diversify Supply Chain',
                  rationale: 'Identify alternative suppliers to reduce dependency and supply risk'
                }
              ]
            }),
            created_at: new Date().toISOString(),
            created_by: 'user-id',
            confidence_score: 85
          },
          {
            id: 'AI-2024-002',
            claim_id: claimsData?.[1]?.id || 'claim-id-2',
            prediction_type: 'FINANCIAL',
            risk_level: 'Medium',
            approval_likelihood: 78,
            suggested_action: 'Prepare detailed cost breakdown and market comparison data',
            prediction_data: JSON.stringify({
              findings: [
                {
                  title: 'Cost Trend Analysis',
                  description: 'Material costs show 8% increase over baseline, within acceptable range',
                  impact: 'Medium'
                },
                {
                  title: 'Budget Impact',
                  description: 'Current claim represents 12% of contingency budget',
                  impact: 'Medium'
                }
              ],
              predictions: [
                {
                  scenario: 'Partial Approval',
                  probability: 65,
                  description: 'Likely to receive partial approval with some cost adjustments',
                  timeline: '2-3 weeks'
                }
              ],
              recommendations: [
                {
                  action: 'Enhance Documentation',
                  rationale: 'Provide additional market data to support cost claims'
                },
                {
                  action: 'Prepare Negotiation Strategy',
                  rationale: 'Identify areas where cost reductions are possible'
                }
              ]
            }),
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'user-id',
            confidence_score: 82
          }
        ];
        
        // Add claim details to each prediction
        const predictionsWithClaims = mockPredictions.map(prediction => {
          const claim = claimsData?.find(c => c.id === prediction.claim_id);
          return {
            ...prediction,
            claim
          };
        });
        
        setPredictions(predictionsWithClaims as any);
      } else {
        // Add claim details to each prediction
        const predictionsWithClaims = await Promise.all(
          predictionsData.map(async (prediction) => {
            const { data: claim } = await supabase
              .from('claims_master')
              .select('*')
              .eq('id', prediction.claim_id)
              .single();
            
            return {
              ...prediction,
              claim
            };
          })
        );
        
        setPredictions(predictionsWithClaims as any);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePrediction = async (data: any) => {
    try {
      const predictionData = {
        findings: [
          {
            title: 'AI-Generated Finding',
            description: 'This is an automatically generated finding based on the input data',
            impact: data.risk_level
          }
        ],
        predictions: [
          {
            scenario: 'Primary Scenario',
            probability: data.approval_likelihood,
            description: 'AI-generated prediction scenario',
            timeline: '1-3 months'
          }
        ],
        recommendations: [
          {
            action: data.suggested_action,
            rationale: 'AI-recommended action based on analysis'
          }
        ]
      };

      const { data: newPrediction, error } = await supabase
        .from('ai_claims_predictions')
        .insert([{
          claim_id: data.claim_id,
          prediction_type: data.prediction_type,
          risk_level: data.risk_level,
          approval_likelihood: data.approval_likelihood,
          suggested_action: data.suggested_action,
          prediction_data: predictionData,
          created_by: 'user-id', // Replace with actual user ID
          confidence_score: data.confidence_score
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Get the claim details
      const { data: claim } = await supabase
        .from('claims_master')
        .select('*')
        .eq('id', data.claim_id)
        .single();
      
      // Add the prediction with claim details to the state
      setPredictions(prev => [{
        ...newPrediction,
        claim
      }, ...prev] as any);
      
      setShowNewPredictionModal(false);
    } catch (error) {
      console.error('Error creating prediction:', error);
      
      // Fallback to local state update if database insert fails
      const claim = claims.find(c => c.id === data.claim_id);
      const newPrediction = {
        id: `AI-${Date.now()}`,
        claim_id: data.claim_id,
        prediction_type: data.prediction_type,
        risk_level: data.risk_level,
        approval_likelihood: data.approval_likelihood,
        suggested_action: data.suggested_action,
        prediction_data: {},
        created_at: new Date().toISOString(),
        created_by: 'user-id',
        confidence_score: data.confidence_score,
        claim
      };
      
      setPredictions(prev => [newPrediction as any, ...prev]);
      setShowNewPredictionModal(false);
    }
  };

  const handleInsightClick = (insight: AIPrediction) => {
    setSelectedInsight(insight);
    setSelectedClaim(claims.find(c => c.id === insight.claim_id) || null);
  };

  // Filter predictions based on selected criteria
  const filteredPredictions = predictions.filter(prediction => {
    const matchesType = selectedType === 'all' || prediction.prediction_type === selectedType;
    const matchesRisk = selectedRisk === 'all' || prediction.risk_level === selectedRisk;
    const matchesSearch = searchTerm === '' || 
      (prediction.claim?.title && prediction.claim.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (prediction.suggested_action && prediction.suggested_action.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Claims Analysis</h1>
          <p className="text-sm text-gray-500 mt-1">AI-Driven Insights and Predictions</p>
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
          <button 
            onClick={() => setShowNewPredictionModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
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
              <p className="text-sm text-gray-500">AI Insights</p>
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
              <p className="text-2xl font-semibold mt-1">{predictions.filter(p => p.risk_level === 'High').length}</p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <AlertCircle size={24} className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Confidence</p>
              <p className="text-2xl font-semibold mt-1">
                {Math.round(
                  predictions.reduce((sum, p) => sum + (p.confidence_score || 0), 0) / 
                  (predictions.length || 1)
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
              <p className="text-sm text-gray-500">Avg. Approval Likelihood</p>
              <p className="text-2xl font-semibold mt-1">
                {Math.round(
                  predictions.reduce((sum, p) => sum + (p.approval_likelihood || 0), 0) / 
                  (predictions.length || 1)
                )}%
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <TrendingUp size={24} className="text-purple-600" />
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
            placeholder="Search AI insights..."
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
          {Object.entries(aiAnalysisTypes).map(([key, category]) => (
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

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading AI insights...</p>
            </div>
          </div>
        ) : filteredPredictions.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
            <div className="text-center">
              <Brain size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No AI insights found</h3>
              <p className="text-gray-500 mb-4">Create a new AI analysis to get started</p>
              <button 
                onClick={() => setShowNewPredictionModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate New Insight
              </button>
            </div>
          </div>
        ) : (
          filteredPredictions.map(prediction => (
            <AIInsightCard
              key={prediction.id}
              insight={prediction}
              onClick={() => handleInsightClick(prediction)}
            />
          ))
        )}
      </div>

      {/* AI Insight Detail Modal */}
      <AIInsightDetailModal
        insight={selectedInsight}
        isOpen={!!selectedInsight}
        onClose={() => setSelectedInsight(null)}
        claim={selectedClaim}
      />

      {/* New Prediction Modal */}
      <NewPredictionModal
        isOpen={showNewPredictionModal}
        onClose={() => setShowNewPredictionModal(false)}
        onSubmit={handleCreatePrediction}
        claims={claims}
      />
    </div>
  );
};

export default AIClaimsAnalysis;