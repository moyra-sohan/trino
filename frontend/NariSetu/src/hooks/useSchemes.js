import { useState, useMemo } from 'react';
import { schemeService } from '../services/schemeService';

export function useSchemes(schemesData) {
  const categories = schemesData?.categories || [];
  const defaultCategory = categories[0] || 'All Schemes';

  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = useMemo(() => {
    return schemeService.filterSchemes(
      schemesData?.list || [],
      activeCategory,
      defaultCategory,
      searchQuery
    );
  }, [schemesData, activeCategory, defaultCategory, searchQuery]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredSchemes,
    totalCount: schemesData?.list?.length || 0,
    filteredCount: filteredSchemes.length
  };
}
