import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp, Loader2 } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isSearching: boolean;
  searchStats: {
    totalResults: number;
    searchTime: number;
    suggestions: string[];
  };
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  isSearching,
  searchStats,
  placeholder = "Search projects..."
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('projx_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  // Save search term to recent searches
  const saveRecentSearch = (term: string) => {
    if (!term.trim() || term.length < 2) return;
    
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('projx_recent_searches', JSON.stringify(updated));
  };

  // Handle search input with debouncing
  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    
    // Save to recent searches when user stops typing
    if (value.trim() && value.length >= 2) {
      const timeoutId = setTimeout(() => {
        saveRecentSearch(value.trim());
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    saveRecentSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  // Clear search
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSearchChange('');
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveSuggestions = searchStats.suggestions.length > 0 || recentSearches.length > 0;

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      {/* Mobile-Optimized Search Input */}
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isSearching ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (hasActiveSuggestions) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            // Delay hiding suggestions to allow clicks
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 glass border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400 text-base touch-manipulation ${
            isFocused 
              ? 'border-gray-400 shadow-lg shadow-gray-500/20' 
              : 'border-gray-600'
          }`}
        />
        
        {/* Clear Button - Touch-friendly */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-all duration-200 touch-manipulation"
            title="Clear search"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        )}
      </div>

      {/* Mobile-Optimized Search Results Info */}
      {searchTerm && !isSearching && (
        <div className="mt-2 flex items-center justify-between text-sm px-1">
          <span className="text-gray-400">
            {searchStats.totalResults} result{searchStats.totalResults !== 1 ? 's' : ''}
            {searchStats.searchTime > 0 && (
              <span className="ml-2 text-gray-500 hidden sm:inline">
                ({searchStats.searchTime}ms)
              </span>
            )}
          </span>
          
          {searchStats.totalResults === 0 && searchStats.suggestions.length > 0 && (
            <span className="text-gray-500 text-xs">
              Try: {searchStats.suggestions[0]}
            </span>
          )}
        </div>
      )}

      {/* Mobile-Optimized Suggestions Dropdown */}
      {showSuggestions && hasActiveSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 glass border border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden max-h-64 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Suggestions */}
          {searchStats.suggestions.length > 0 && (
            <div className="p-3 border-b border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">Suggestions</span>
              </div>
              <div className="space-y-1">
                {searchStats.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200 capitalize touch-manipulation"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">Recent</span>
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((recent, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(recent)}
                    className="w-full text-left px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-between group touch-manipulation"
                  >
                    <span className="truncate">{recent}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = recentSearches.filter((_, i) => i !== index);
                        setRecentSearches(updated);
                        localStorage.setItem('projx_recent_searches', JSON.stringify(updated));
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all duration-200 touch-manipulation"
                      title="Remove"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No suggestions available */}
          {!hasActiveSuggestions && (
            <div className="p-4 text-center text-gray-400 text-sm">
              No suggestions available
            </div>
          )}
        </div>
      )}
    </div>
  );
};