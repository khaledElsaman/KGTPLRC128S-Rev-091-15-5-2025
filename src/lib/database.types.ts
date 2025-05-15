type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type ClaimStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Resolved';
type VariationStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Resolved';
type DocumentType = 'Drawing' | 'Change Order' | 'Other';
type DocumentStatus = 'Draft' | 'Pending Review' | 'Approved' | 'Rejected' | 'Archived';
type ResolutionStatus = 'Agreed' | 'Rejected' | 'Negotiated' | 'Pending' | 'Withdrawn';

export interface Database {
  public: {
    Tables: {
      claims_master: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: ClaimStatus
          created_by: string
          value: number
          type: string
          last_updated_at: string
          last_updated_by: string | null
          metadata: Json
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: ClaimStatus
          created_by: string
          value?: number
          type?: string
          last_updated_at?: string
          last_updated_by?: string | null
          metadata?: Json
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: ClaimStatus
          created_by?: string
          value?: number
          type?: string
          last_updated_at?: string
          last_updated_by?: string | null
          metadata?: Json
        }
      }
      claims_notice: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: ClaimStatus
          created_by: string
          claim_id: string | null
          last_updated_at: string | null
          last_updated_by: string | null
          claim_reference: string | null
          notice_date: string | null
          project_name: string | null
          event_description: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: ClaimStatus
          created_by: string
          claim_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          claim_reference?: string | null
          notice_date?: string | null
          project_name?: string | null
          event_description?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: ClaimStatus
          created_by?: string
          claim_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          claim_reference?: string | null
          notice_date?: string | null
          project_name?: string | null
          event_description?: string | null
        }
      }
      claims_response: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: string
          created_by: string
          claim_id: string | null
          last_updated_at: string | null
          last_updated_by: string | null
          response_date: string | null
          response_type: string | null
          deadline: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: string
          created_by: string
          claim_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          response_date?: string | null
          response_type?: string | null
          deadline?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: string
          created_by?: string
          claim_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          response_date?: string | null
          response_type?: string | null
          deadline?: string | null
        }
      }
      claims_analysis: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: string
          created_by: string
          claim_id: string | null
          type: string | null
          progress: number | null
          analysis_data: Json | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: string
          created_by: string
          claim_id?: string | null
          type?: string | null
          progress?: number | null
          analysis_data?: Json | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: string
          created_by?: string
          claim_id?: string | null
          type?: string | null
          progress?: number | null
          analysis_data?: Json | null
        }
      }
      claims_contemporaneous: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: string
          created_by: string
          claim_id: string | null
          event_date: string | null
          location: string | null
          record_type: string | null
          participants: string[] | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: string
          created_by: string
          claim_id?: string | null
          event_date?: string | null
          location?: string | null
          record_type?: string | null
          participants?: string[] | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: string
          created_by?: string
          claim_id?: string | null
          event_date?: string | null
          location?: string | null
          record_type?: string | null
          participants?: string[] | null
          metadata?: Json | null
        }
      }
      claims_detailed: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: ClaimStatus
          created_by: string
          claim_id: string | null
          time_impact: number | null
          cost_impact: number | null
          submission_date: string | null
          details: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: ClaimStatus
          created_by: string
          claim_id?: string | null
          time_impact?: number | null
          cost_impact?: number | null
          submission_date?: string | null
          details?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: ClaimStatus
          created_by?: string
          claim_id?: string | null
          time_impact?: number | null
          cost_impact?: number | null
          submission_date?: string | null
          details?: string | null
        }
      }
      claims_resolution: {
        Row: {
          id: string
          claim_id: string
          resolution_status: ResolutionStatus
          resolution_date: string | null
          final_amount: number | null
          resolution_type: string | null
          comments: string | null
          created_at: string
          created_by: string
          last_updated_at: string | null
          last_updated_by: string | null
        }
        Insert: {
          id?: string
          claim_id: string
          resolution_status: ResolutionStatus
          resolution_date?: string | null
          final_amount?: number | null
          resolution_type?: string | null
          comments?: string | null
          created_at?: string
          created_by: string
          last_updated_at?: string | null
          last_updated_by?: string | null
        }
        Update: {
          id?: string
          claim_id?: string
          resolution_status?: ResolutionStatus
          resolution_date?: string | null
          final_amount?: number | null
          resolution_type?: string | null
          comments?: string | null
          created_at?: string
          created_by?: string
          last_updated_at?: string | null
          last_updated_by?: string | null
        }
      }
      project_documents: {
        Row: {
          id: string
          title: string
          claim_id: string | null
          document_type: string
          file_url: string
          created_at: string
          created_by: string
          status: DocumentStatus
          description: string | null
          version: string | null
          file_size: string | null
          last_updated_at: string
          last_updated_by: string | null
        }
        Insert: {
          id?: string
          title: string
          claim_id?: string | null
          document_type: string
          file_url: string
          created_at?: string
          created_by: string
          status: DocumentStatus
          description?: string | null
          version?: string | null
          file_size?: string | null
          last_updated_at?: string
          last_updated_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          claim_id?: string | null
          document_type?: string
          file_url?: string
          created_at?: string
          created_by?: string
          status?: DocumentStatus
          description?: string | null
          version?: string | null
          file_size?: string | null
          last_updated_at?: string
          last_updated_by?: string | null
        }
      }
      variations_master: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: VariationStatus
          created_by: string
          value: number
          last_updated_at: string
          last_updated_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: VariationStatus
          created_by: string
          value?: number
          last_updated_at?: string
          last_updated_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: VariationStatus
          created_by?: string
          value?: number
          last_updated_at?: string
          last_updated_by?: string | null
        }
      }
      variation_documents: {
        Row: {
          id: string
          variation_id: string
          title: string
          document_type: DocumentType
          file_url: string
          created_at: string
          created_by: string
          last_updated_at: string
          last_updated_by: string | null
        }
        Insert: {
          id?: string
          variation_id: string
          title: string
          document_type: DocumentType
          file_url: string
          created_at?: string
          created_by: string
          last_updated_at?: string
          last_updated_by?: string | null
        }
        Update: {
          id?: string
          variation_id?: string
          title?: string
          document_type?: DocumentType
          file_url?: string
          created_at?: string
          created_by?: string
          last_updated_at?: string
          last_updated_by?: string | null
        }
      }
      variation_approval: {
        Row: {
          id: string
          variation_id: string
          approved_amount: number
          approval_date: string
          approver_name: string
          comments: string | null
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          variation_id: string
          approved_amount: number
          approval_date: string
          approver_name: string
          comments?: string | null
          created_at?: string
          created_by: string
        }
        Update: {
          id?: string
          variation_id?: string
          approved_amount?: number
          approval_date?: string
          approver_name?: string
          comments?: string | null
          created_at?: string
          created_by?: string
        }
      }
      variations_notice: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: string
          created_by: string
          variation_id: string | null
          last_updated_at: string | null
          last_updated_by: string | null
          notice_date: string | null
          engineer_name: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: string
          created_by: string
          variation_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          notice_date?: string | null
          engineer_name?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: string
          created_by?: string
          variation_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
          notice_date?: string | null
          engineer_name?: string | null
        }
      }
      variations_response: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: string
          created_by: string
          variation_id: string | null
          last_updated_at: string | null
          last_updated_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: string
          created_by: string
          variation_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: string
          created_by?: string
          variation_id?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
        }
      }
      variations_analysis: {
        Row: {
          id: string
          title: string
          description: string | null
          created_at: string
          status: string
          created_by: string
          variation_id: string | null
          analysis_data: Json | null
          analysis_type: string | null
          last_updated_at: string | null
          last_updated_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_at?: string
          status: string
          created_by: string
          variation_id?: string | null
          analysis_data?: Json | null
          analysis_type?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_at?: string
          status?: string
          created_by?: string
          variation_id?: string | null
          analysis_data?: Json | null
          analysis_type?: string | null
          last_updated_at?: string | null
          last_updated_by?: string | null
        }
      }
      ai_claims_predictions: {
        Row: {
          id: string
          claim_id: string
          prediction_type: string
          risk_level: string | null
          approval_likelihood: number | null
          suggested_action: string | null
          prediction_data: Json | null
          created_at: string
          created_by: string
          confidence_score: number | null
        }
        Insert: {
          id?: string
          claim_id: string
          prediction_type: string
          risk_level?: string | null
          approval_likelihood?: number | null
          suggested_action?: string | null
          prediction_data?: Json | null
          created_at?: string
          created_by: string
          confidence_score?: number | null
        }
        Update: {
          id?: string
          claim_id?: string
          prediction_type?: string
          risk_level?: string | null
          approval_likelihood?: number | null
          suggested_action?: string | null
          prediction_data?: Json | null
          created_at?: string
          created_by?: string
          confidence_score?: number | null
        }
      }
      ai_variation_predictions: {
        Row: {
          id: string
          variation_id: string
          prediction_type: string
          risk_level: string | null
          approval_likelihood: number | null
          suggested_action: string | null
          prediction_data: Json | null
          created_at: string
          created_by: string
          confidence_score: number | null
        }
        Insert: {
          id?: string
          variation_id: string
          prediction_type: string
          risk_level?: string | null
          approval_likelihood?: number | null
          suggested_action?: string | null
          prediction_data?: Json | null
          created_at?: string
          created_by: string
          confidence_score?: number | null
        }
        Update: {
          id?: string
          variation_id?: string
          prediction_type?: string
          risk_level?: string | null
          approval_likelihood?: number | null
          suggested_action?: string | null
          prediction_data?: Json | null
          created_at?: string
          created_by?: string
          confidence_score?: number | null
        }
      }
      gtpl_dispute_arbitration_guide: {
        Row: {
          id: string
          article_number: string
          article_title_en: string
          article_title_ar: string
          article_body_en: string
          article_body_ar: string
          source_type: string
          linked_articles: string[] | null
          created_at: string
          created_by: string | null
          last_updated_at: string
          last_updated_by: string | null
        }
        Insert: {
          id?: string
          article_number: string
          article_title_en: string
          article_title_ar: string
          article_body_en: string
          article_body_ar: string
          source_type: string
          linked_articles?: string[] | null
          created_at?: string
          created_by?: string | null
          last_updated_at?: string
          last_updated_by?: string | null
        }
        Update: {
          id?: string
          article_number?: string
          article_title_en?: string
          article_title_ar?: string
          article_body_en?: string
          article_body_ar?: string
          source_type?: string
          linked_articles?: string[] | null
          created_at?: string
          created_by?: string | null
          last_updated_at?: string
          last_updated_by?: string | null
        }
      }
    }
  }
}