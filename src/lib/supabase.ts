import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client with enhanced configuration
const initSupabaseClient = () => {
  try {
    return createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'x-application-name': 'claims-management-system'
        }
      },
      db: {
        schema: 'public'
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    });
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    throw new Error('Failed to initialize Supabase client. Please check your configuration.');
  }
};

export const supabase = initSupabaseClient();

// Enhanced connection test with better error handling
const testConnection = async (retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      // First check if we can reach the Supabase instance
      const healthCheck = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });

      if (!healthCheck.ok) {
        throw new Error(`Supabase health check failed: ${healthCheck.statusText}`);
      }

      // If health check passes, try a simple query
      const { data, error } = await supabase
        .from('variations_master')
        .select('count')
        .limit(1)
        .single();

      if (error) throw error;
      
      console.log('✅ Supabase connection successful');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`❌ Supabase connection attempt ${i + 1} failed: ${errorMessage}`);
      
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      } else {
        console.error('❌ All Supabase connection attempts failed. Please check your configuration and network connection.');
        return false;
      }
    }
  }
  return false;
};

// Initialize connection test
testConnection();

// Generic CRUD operations with enhanced error handling and retry logic
const api = {
  // Create a new record with retry mechanism
  async create<T extends keyof Database['public']['Tables']>(
    table: T,
    data: Database['public']['Tables'][T]['Insert'],
    retries = 3
  ) {
    for (let i = 0; i < retries; i++) {
      try {
        const { data: result, error } = await supabase
          .from(table)
          .insert(data)
          .select()
          .single();

        if (error) throw error;
        return result;
      } catch (error) {
        if (i === retries - 1) {
          console.error(`Failed to create record in ${table}:`, error);
          throw new Error(`Failed to create record in ${table}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  },

  // Read records with retry mechanism
  async read<T extends keyof Database['public']['Tables']>(
    table: T,
    query?: {
      filters?: Record<string, any>;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
      offset?: number;
    },
    retries = 3
  ) {
    for (let i = 0; i < retries; i++) {
      try {
        let queryBuilder = supabase.from(table).select('*');

        if (query?.filters) {
          Object.entries(query.filters).forEach(([key, value]) => {
            queryBuilder = queryBuilder.eq(key, value);
          });
        }

        if (query?.orderBy) {
          queryBuilder = queryBuilder.order(
            query.orderBy.column,
            { ascending: query.orderBy.ascending ?? false }
          );
        }

        if (query?.limit) {
          queryBuilder = queryBuilder.limit(query.limit);
        }

        if (query?.offset) {
          queryBuilder = queryBuilder.range(
            query.offset,
            query.offset + (query.limit || 10) - 1
          );
        }

        const { data, error } = await queryBuilder;
        if (error) throw error;
        return data;
      } catch (error) {
        if (i === retries - 1) {
          console.error(`Failed to read records from ${table}:`, error);
          throw new Error(`Failed to read records from ${table}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  },

  // Update a record with retry mechanism
  async update<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    data: Partial<Database['public']['Tables'][T]['Update']>,
    retries = 3
  ) {
    for (let i = 0; i < retries; i++) {
      try {
        const { data: result, error } = await supabase
          .from(table)
          .update(data)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return result;
      } catch (error) {
        if (i === retries - 1) {
          console.error(`Failed to update record in ${table}:`, error);
          throw new Error(`Failed to update record in ${table}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  },

  // Delete a record with retry mechanism
  async delete<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    retries = 3
  ) {
    for (let i = 0; i < retries; i++) {
      try {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('id', id);

        if (error) throw error;
        return true;
      } catch (error) {
        if (i === retries - 1) {
          console.error(`Failed to delete record from ${table}:`, error);
          throw new Error(`Failed to delete record from ${table}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }
};

export { api };