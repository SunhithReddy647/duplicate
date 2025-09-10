import { useState, useEffect, useMemo } from 'react';
import { Project } from '../types';

interface UseSearchProps {
  projects: Project[];
  searchTerm: string;
  selectedCategory: string;
}

interface SearchResult {
  project: Project;
  relevanceScore: number;
  matchedFields: string[];
}

export const useSearch = ({ projects, searchTerm, selectedCategory }: UseSearchProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [searchStats, setSearchStats] = useState({
    totalResults: 0,
    searchTime: 0,
    suggestions: [] as string[]
  });

  // Intelligent search with relevance scoring
  const performSearch = useMemo(() => {
    return (term: string, category: string) => {
      const startTime = performance.now();
      setIsSearching(true);

      if (!term.trim() && !category) {
        const results = projects;
        setSearchResults(results);
        setSearchStats({
          totalResults: results.length,
          searchTime: 0,
          suggestions: []
        });
        setIsSearching(false);
        return;
      }

      const searchTermLower = term.toLowerCase().trim();
      const searchResults: SearchResult[] = [];

      // Generate search suggestions from all projects
      const allTerms = new Set<string>();
      projects.forEach(project => {
        // Add title words
        project.title.toLowerCase().split(/\s+/).forEach(word => {
          if (word.length > 2) allTerms.add(word);
        });
        // Add technologies
        project.technologies.forEach(tech => {
          allTerms.add(tech.toLowerCase());
        });
        // Add category
        allTerms.add(project.category.toLowerCase());
      });

      // Find suggestions for partial matches
      const suggestions = Array.from(allTerms)
        .filter(term => term.includes(searchTermLower) && term !== searchTermLower)
        .slice(0, 5);

      projects.forEach(project => {
        let relevanceScore = 0;
        const matchedFields: string[] = [];

        // Category filter (highest priority)
        if (category && project.category !== category) {
          return; // Skip if category doesn't match
        }

        if (!searchTermLower) {
          // If only category filter is applied
          searchResults.push({ project, relevanceScore: 1, matchedFields: ['category'] });
          return;
        }

        // Title matching (highest weight)
        const titleLower = project.title.toLowerCase();
        if (titleLower.includes(searchTermLower)) {
          relevanceScore += titleLower === searchTermLower ? 100 : 80;
          matchedFields.push('title');
        }

        // Exact title word match
        const titleWords = titleLower.split(/\s+/);
        if (titleWords.some(word => word === searchTermLower)) {
          relevanceScore += 60;
          if (!matchedFields.includes('title')) matchedFields.push('title');
        }

        // Description matching (medium weight)
        const descriptionLower = project.description.toLowerCase();
        if (descriptionLower.includes(searchTermLower)) {
          relevanceScore += 40;
          matchedFields.push('description');
        }

        // Technology matching (high weight for exact match)
        const techMatches = project.technologies.filter(tech => 
          tech.toLowerCase().includes(searchTermLower)
        );
        if (techMatches.length > 0) {
          relevanceScore += techMatches.some(tech => tech.toLowerCase() === searchTermLower) ? 70 : 50;
          matchedFields.push('technologies');
        }

        // Category matching (medium weight)
        if (project.category.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 30;
          matchedFields.push('category');
        }

        // Hackathon code matching (exact match bonus)
        if (project.hackathonCode?.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 60;
          matchedFields.push('hackathonCode');
        }

        // Fuzzy matching for typos (lower weight)
        const fuzzyMatch = calculateFuzzyMatch(searchTermLower, titleLower);
        if (fuzzyMatch > 0.7) {
          relevanceScore += 20;
          if (!matchedFields.includes('title')) matchedFields.push('title');
        }

        // Only include if there's a match
        if (relevanceScore > 0) {
          searchResults.push({ project, relevanceScore, matchedFields });
        }
      });

      // Sort by relevance score (highest first)
      searchResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
      
      const finalResults = searchResults.map(result => result.project);
      const endTime = performance.now();

      setSearchResults(finalResults);
      setSearchStats({
        totalResults: finalResults.length,
        searchTime: Math.round(endTime - startTime),
        suggestions
      });
      setIsSearching(false);
    };
  }, [projects]);

  // Debounced search execution
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm, selectedCategory);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, performSearch]);

  return {
    searchResults,
    isSearching,
    searchStats
  };
};

// Simple fuzzy matching algorithm
function calculateFuzzyMatch(search: string, target: string): number {
  if (search === target) return 1;
  if (search.length === 0) return 0;

  let matches = 0;
  let searchIndex = 0;

  for (let i = 0; i < target.length && searchIndex < search.length; i++) {
    if (target[i] === search[searchIndex]) {
      matches++;
      searchIndex++;
    }
  }

  return matches / search.length;
}