/**
 * Logic service for scheme searching, categorization, and eligibility matching
 */

export const schemeService = {
  /**
   * Filter scheme list by active category pill and search query
   */
  filterSchemes(schemesList, activeCategory, allCategoriesLabel, searchQuery = '') {
    if (!Array.isArray(schemesList)) return [];

    const query = searchQuery.trim().toLowerCase();

    return schemesList.filter((scheme) => {
      // Check category match
      const isAll = !activeCategory || activeCategory === allCategoriesLabel;
      const matchesCategory =
        isAll ||
        scheme.category?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        scheme.secondaryTag?.toLowerCase().includes(activeCategory.toLowerCase());

      if (!matchesCategory) return false;

      // Check search match
      if (!query) return true;

      const titleMatch = scheme.title?.toLowerCase().includes(query);
      const categoryMatch = scheme.category?.toLowerCase().includes(query);
      const tagMatch = scheme.secondaryTag?.toLowerCase().includes(query);
      const highlightMatch = scheme.highlights?.some((h) =>
        h.toLowerCase().includes(query)
      );
      const amountMatch = scheme.amount?.toLowerCase().includes(query);

      return titleMatch || categoryMatch || tagMatch || highlightMatch || amountMatch;
    });
  },

  /**
   * Generates a unique tracking reference number for online applications
   */
  generateApplicationId() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `NS-${year}-${random}`;
  }
};
