import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import SearchResults from './SearchResults';
import type { SearchResult } from '../../lib/search';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const GlobalSearch: React.FC = () => {
  const { searchGlobal, handleSearchSelect } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        setError(null);
        try {
          const searchResults = await searchGlobal(query);
          setResults(searchResults);
        } catch (error) {
          setError(error instanceof Error ? error : new Error('Search failed'));
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query, searchGlobal]);

  if (error) {
    return <ErrorState message={error.message} onRetry={() => setQuery(query)} />;
  }

  return (
    <div ref={searchRef} className="relative flex-1 max-w-lg">
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          placeholder="Search claims, variations, documents..."
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {showResults && (query.trim() || results.length > 0) && (
        <SearchResults
          results={results}
          onSelect={handleSearchSelect}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default GlobalSearch;