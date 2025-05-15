import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface Statistics {
  claims: {
    total: number;
    active: number;
    resolved: number;
    pending: number;
    value: number;
    complianceRate: number;
    trends: {
      monthly: number;
      weekly: number;
    };
  };
  variations: {
    total: number;
    active: number;
    approved: number;
    pending: number;
    value: number;
    approvalRate: number;
    trends: {
      monthly: number;
      weekly: number;
    };
  };
  aiAnalysis: {
    predictions: number;
    accuracy: number;
    alerts: number;
    insights: number;
    trends: {
      accuracy: number;
      alerts: number;
    };
  };
}

interface StatisticsContextType {
  statistics: Statistics;
  isLoading: boolean;
  error: Error | null;
  refreshStatistics: () => Promise<void>;
}

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};

// Fallback data in case of connection issues
const fallbackStatistics: Statistics = {
  claims: {
    total: 0,
    active: 0,
    resolved: 0,
    pending: 0,
    value: 0,
    complianceRate: 0,
    trends: {
      monthly: 0,
      weekly: 0
    }
  },
  variations: {
    total: 0,
    active: 0,
    approved: 0,
    pending: 0,
    value: 0,
    approvalRate: 0,
    trends: {
      monthly: 0,
      weekly: 0
    }
  },
  aiAnalysis: {
    predictions: 0,
    accuracy: 0,
    alerts: 0,
    insights: 0,
    trends: {
      accuracy: 0,
      alerts: 0
    }
  }
};

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statistics, setStatistics] = useState<Statistics>(fallbackStatistics);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatistics = useCallback(async (retries = 3) => {
    const delay = (attempt: number) => Math.min(1000 * Math.pow(2, attempt), 10000);

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        setIsLoading(true);
        setError(null);

        // Check Supabase connection first
        const healthCheck = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        });

        if (!healthCheck.ok) {
          throw new Error(`Supabase health check failed: ${healthCheck.statusText}`);
        }

        // Fetch claims statistics with explicit error handling
        const { data: claimsData, error: claimsError } = await supabase
          .from('claims_master')
          .select('status, value');

        if (claimsError) {
          throw new Error(`Failed to fetch claims data: ${claimsError.message}`);
        }

        // Fetch variations statistics with explicit error handling
        const { data: variationsData, error: variationsError } = await supabase
          .from('variations_master')
          .select('status, value');

        if (variationsError) {
          throw new Error(`Failed to fetch variations data: ${variationsError.message}`);
        }

        // Calculate statistics with null checks
        const claims = {
          total: claimsData?.length || 0,
          active: claimsData?.filter(c => c.status === 'active').length || 0,
          resolved: claimsData?.filter(c => c.status === 'resolved').length || 0,
          pending: claimsData?.filter(c => c.status === 'pending').length || 0,
          value: claimsData?.reduce((sum, claim) => sum + (Number(claim.value) || 0), 0) || 0,
          complianceRate: 94,
          trends: {
            monthly: 15,
            weekly: 8
          }
        };

        const variations = {
          total: variationsData?.length || 0,
          active: variationsData?.filter(v => v.status === 'active').length || 0,
          approved: variationsData?.filter(v => v.status === 'approved').length || 0,
          pending: variationsData?.filter(v => v.status === 'pending').length || 0,
          value: variationsData?.reduce((sum, variation) => sum + (Number(variation.value) || 0), 0) || 0,
          approvalRate: 85,
          trends: {
            monthly: 12,
            weekly: 5
          }
        };

        setStatistics(prev => ({
          ...prev,
          claims,
          variations
        }));

        // If we succeed, break out of the retry loop
        break;
      } catch (err) {
        console.error(`Attempt ${attempt + 1} failed:`, err);
        
        if (attempt === retries - 1) {
          // If this was our last attempt, set the error state and use fallback data
          setError(err instanceof Error ? err : new Error('Failed to fetch statistics'));
          setStatistics(fallbackStatistics);
        } else {
          // If we have more attempts, wait before trying again
          await new Promise(resolve => setTimeout(resolve, delay(attempt)));
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const refreshStatistics = useCallback(async () => {
    await fetchStatistics();
  }, [fetchStatistics]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <StatisticsContext.Provider value={{
      statistics,
      isLoading,
      error,
      refreshStatistics
    }}>
      {children}
    </StatisticsContext.Provider>
  );
};