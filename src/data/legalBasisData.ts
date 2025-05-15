import { GitCompare, Clock, DollarSign, Calendar, FileText, AlertTriangle } from 'lucide-react';

export interface LegalBasisInfo {
  id: string;
  title: string;
  description: string;
  articles: string[];
  icon?: React.ElementType;
  color?: string;
}

export const legalBasisOptions: LegalBasisInfo[] = [
  {
    id: "quantity-amendments",
    title: "GTPL Art. 69 / IR Art. 114 – Quantity Amendments",
    description: "Adjustments to BoQ items based on actual site needs",
    articles: ["GTPL Art. 69", "IR Art. 114"],
    icon: GitCompare,
    color: "blue"
  },
  {
    id: "new-work-items",
    title: "GTPL Arts. 68 & 69 / IR Arts. 113 & 114 – New Work Items",
    description: "Adding completely new items not in original contract",
    articles: ["GTPL Art. 68", "GTPL Art. 69", "IR Art. 113", "IR Art. 114"],
    icon: FileText,
    color: "purple"
  },
  {
    id: "time-extension",
    title: "GTPL Art. 74(1) / IR Art. 125(1) – Time Extension",
    description: "Time added for additional approved works",
    articles: ["GTPL Art. 74(1)", "IR Art. 125(1)"],
    icon: Clock,
    color: "green"
  },
  {
    id: "force-majeure",
    title: "GTPL Art. 74 / IR Art. 125(2) – Force Majeure",
    description: "Extension due to unforeseen suspension not caused by the contractor",
    articles: ["GTPL Art. 74", "IR Art. 125(2)"],
    icon: AlertTriangle,
    color: "red"
  },
  {
    id: "partial-suspension",
    title: "GTPL Art. 74 / IR Art. 125 – Partial Suspension",
    description: "Extension for portions of work suspended",
    articles: ["GTPL Art. 74", "IR Art. 125"],
    icon: Clock,
    color: "yellow"
  },
  {
    id: "delayed-payment",
    title: "GTPL Art. 74 / IR Arts. 124 & 153 / Circ. 284 – Delayed Payment",
    description: "Extension due to delay in disbursement of certified payments by the entity",
    articles: ["GTPL Art. 74", "IR Art. 124", "IR Art. 153", "Ministerial Circular No. 284"],
    icon: DollarSign,
    color: "pink"
  }
];

// Helper function to get legal basis info by ID
export const getLegalBasisById = (id: string): LegalBasisInfo | undefined => {
  return legalBasisOptions.find(option => option.id === id);
};

// Helper function to get legal basis info by title
export const getLegalBasisByTitle = (title: string): LegalBasisInfo | undefined => {
  return legalBasisOptions.find(option => option.title === title);
};

// Helper function to get all articles referenced
export const getAllArticles = (): string[] => {
  const allArticles = legalBasisOptions.flatMap(option => option.articles);
  return [...new Set(allArticles)]; // Remove duplicates
};

// Group legal basis options by article
export const getLegalBasisByArticle = (article: string): LegalBasisInfo[] => {
  return legalBasisOptions.filter(option => 
    option.articles.some(a => a.includes(article))
  );
};