import { supabase } from './supabase';

export type SearchResult = {
  id: string;
  title: string;
  type: 'claim' | 'variation';
  module: string;
  status: string;
  created_at: string;
  description?: string;
};

export async function globalSearch(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const searchTerm = `%${query.toLowerCase()}%`;

  // Search in claims
  const { data: claims, error: claimsError } = await supabase
    .from('claims_master')
    .select('id, title, description, status, created_at')
    .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .limit(5);

  // Search in variations
  const { data: variations, error: variationsError } = await supabase
    .from('variations_master')
    .select('id, title, description, status, created_at')
    .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .limit(5);

  if (claimsError || variationsError) {
    console.error('Search error:', claimsError || variationsError);
    return [];
  }

  // Combine and format results
  const results: SearchResult[] = [
    ...(claims?.map(claim => ({
      ...claim,
      type: 'claim' as const,
      module: 'Claims Management'
    })) || []),
    ...(variations?.map(variation => ({
      ...variation,
      type: 'variation' as const,
      module: 'Variations Management'
    })) || [])
  ];

  // Sort by relevance (exact matches first, then partial matches)
  return results.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const searchLower = query.toLowerCase();

    if (aTitle === searchLower && bTitle !== searchLower) return -1;
    if (bTitle === searchLower && aTitle !== searchLower) return 1;
    if (aTitle.startsWith(searchLower) && !bTitle.startsWith(searchLower)) return -1;
    if (bTitle.startsWith(searchLower) && !aTitle.startsWith(searchLower)) return 1;
    return 0;
  });
}