import { GitCompare, Clock, DollarSign, Calendar, FileText, AlertTriangle } from 'lucide-react';

export interface VariationTypeInfo {
  variationType: string;
  description: string;
  legalBasis: string;
  remarks: string;
  icon?: React.ElementType;
  color?: string;
  tooltip?: string;
}

export const variationTypes: VariationTypeInfo[] = [
  {
    variationType: "تمديد مدة العقد لعدم كفاية السيولة | Contract Extension Due to Insufficient Financial Liquidity",
    description: "Extension due to delay in disbursing certified payments by the entity",
    legalBasis: "GTPL Law Article 74, Regulation Article 124, Ministerial Circular No. 28437",
    remarks: "Requires proof of payment delay and calculated extension",
    icon: DollarSign,
    color: "pink",
    tooltip: "مستند قانوني: المادة 74 من النظام، المادة 124 من اللائحة، التعميم الوزاري رقم 28437"
  },
  {
    variationType: "تمديد مدة العقد نتيجة إيقاف جزئى أوكلى | Contract Extension Due to Partial or Full Suspension of Works",
    description: "Extension due to partial or full site suspension",
    legalBasis: "GTPL Law Article 74, Regulation Article 125",
    remarks: "Supported by suspension documentation",
    icon: Clock,
    color: "yellow",
    tooltip: "مستند قانوني: المادة 74 من النظام، المادة 125 من اللائحة"
  },
  {
    variationType: "تعديل جدول الكميات بنفس مدة وقيمة العقد | Bill of Quantities Adjustment Without Change to Contract Value or Duration",
    description: "BoQ adjustments without affecting contract duration or value",
    legalBasis: "GTPL Law Article 69, Regulation Article 114",
    remarks: "Requires technical justification and bid comparison",
    icon: GitCompare,
    color: "blue",
    tooltip: "مستند قانوني: المادة 69 من النظام، المادة 114 من اللائحة التنفيذية"
  },
  {
    variationType: "أعمال إضافية بنسبة 10 من قيمة العقد أو مدة العقد | Additional Works Within 10% of Contract Value or Duration",
    description: "Adding completely new items not in original contract",
    legalBasis: "GTPL Law Articles 68 & 69, Regulation Articles 113 & 114",
    remarks: "Must not alter the contract's nature or balance",
    icon: FileText,
    color: "purple",
    tooltip: "مستند قانوني: المواد 68 و69 من النظام، المواد 113 و114 من اللائحة"
  }
];

// Helper function to get variation type info by name
const getVariationTypeInfo = (typeName: string): VariationTypeInfo | undefined => {
  return variationTypes.find(type => type.variationType === typeName);
};

// Helper function to get all legal basis references
const getAllLegalBasisReferences = (): string[] => {
  const allReferences = variationTypes.flatMap(type => 
    type.legalBasis.split(', ').map(ref => ref.trim())
  );
  return [...new Set(allReferences)]; // Remove duplicates
};

// Group variation types by legal basis
const getVariationTypesByLegalBasis = (): Record<string, VariationTypeInfo[]> => {
  const grouped: Record<string, VariationTypeInfo[]> = {};
  
  variationTypes.forEach(type => {
    const bases = type.legalBasis.split(', ');
    bases.forEach(basis => {
      const key = basis.trim();
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(type);
    });
  });
  
  return grouped;
};