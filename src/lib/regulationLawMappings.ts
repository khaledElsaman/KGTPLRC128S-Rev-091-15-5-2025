import { GitCompare, Clock, DollarSign, Calendar, FileText, AlertTriangle } from 'lucide-react';

// Mapping between GTPL RC 128 Regulation Articles and their corresponding Law Articles
export const regulationToLawMappings: Record<string, string[]> = {
  "Article 113": ["Article 68"],
  "Article 114": ["Article 69"],
  "Article 115": ["Article 69"],
  "Article 116": ["Article 74"],
  "Article 117": ["Article 70"],
  "Article 118": ["Article 72"],
  "Article 119": ["Article 73"],
  "Article 124": ["Article 74"],
  "Article 125": ["Article 74"],
  "Article 153": ["Article 86", "Article 87"],
  "Article 154": ["Article 92"],
  "Article 155": ["Article 92"]
};

// Mapping from Law Articles to Regulation Articles (reverse mapping)
export const lawToRegulationMappings: Record<string, string[]> = {};

// Initialize the reverse mapping
Object.entries(regulationToLawMappings).forEach(([regulationArticle, lawArticles]) => {
  lawArticles.forEach(lawArticle => {
    if (!lawToRegulationMappings[lawArticle]) {
      lawToRegulationMappings[lawArticle] = [];
    }
    lawToRegulationMappings[lawArticle].push(regulationArticle);
  });
});

// Helper function to get related law articles for a regulation article
export const getRelatedLawArticles = (regulationArticle: string): string[] => {
  return regulationToLawMappings[regulationArticle] || [];
};

// Helper function to get related regulation articles for a law article
export const getRelatedRegulationArticles = (lawArticle: string): string[] => {
  return lawToRegulationMappings[lawArticle] || [];
};

// Helper function to format article reference for display
export const formatArticleReference = (articleNumber: string): string => {
  return articleNumber.replace(/Article\s+/i, 'Art. ');
};