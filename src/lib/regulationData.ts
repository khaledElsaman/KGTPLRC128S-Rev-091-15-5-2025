// GTPL RC 128 Regulation Data
// This file contains mock data for the GTPL RC 128 Regulation

export interface RegulationArticle {
  id: string;
  chapter: string;
  article_number: string;
  article_title_en: string;
  article_title_ar: string;
  article_text_en: string;
  article_text_ar: string;
}

// Sample regulation articles for demonstration
export const sampleRegulationArticles: RegulationArticle[] = [
  {
    id: '1',
    chapter: 'Chapter 1: General Provisions',
    article_number: 'Article 1',
    article_title_en: 'Definitions',
    article_title_ar: 'التعريفات',
    article_text_en: 'In these Regulations, the following terms shall have the meanings assigned thereto unless the context requires otherwise:\n\n1. Law: Government Tenders and Procurement Law.\n\n2. Regulations: Implementing Regulations of the Law.\n\n3. Minister: Minister of Finance.\n\n4. Ministry: Ministry of Finance.\n\n5. Authority: Local Content and Government Procurement Authority.\n\n6. Unified Procurement Agency: The agency in charge of unified strategic procurement which is determined pursuant to a resolution by the Council of Ministers.',
    article_text_ar: 'يقصد بالألفاظ والعبارات الآتية -أينما وردت في هذه اللائحة- المعاني المبينة أمام كل منها، ما لم يقتض السياق غير ذلك:\n\n1. النظام: نظام المنافسات والمشتريات الحكومية.\n\n2. اللائحة: اللائحة التنفيذية للنظام.\n\n3. الوزير: وزير المالية.\n\n4. الوزارة: وزارة المالية.\n\n5. الهيئة: هيئة المحتوى المحلي والمشتريات الحكومية.\n\n6. جهة الشراء الموحد: الجهة المكلفة بالشراء الاستراتيجي الموحد، التي تحدد بقرار من مجلس الوزراء.'
  },
  {
    id: '113',
    chapter: 'Chapter 12: Contract Price Adjustment',
    article_number: 'Article 113',
    article_title_en: 'Contract Price Adjustment',
    article_title_ar: 'تعديل أسعار العقود',
    article_text_en: 'Compensation is permissible if:\n\n1. Customs tariffs, fees, taxes, or priced materials/services change after offer submission.\n\n2. Contractor proves actual payment based on new rates.\n\n3. Price increase is not due to contractor\'s delay.\n\nMaterial Price Adjustments:\n• Applies if market price change >10% for materials (cement, iron, asphalt, etc.).\n• Adjustment only if total contract cost impact >3%.\n• Compensation is capped at 20% of total contract value.',
    article_text_ar: 'يجوز التعويض في الحالات الآتية:\n\n1. تغير التعريفات الجمركية أو الرسوم أو الضرائب أو المواد أو الخدمات المسعرة رسمياً بعد تقديم العرض.\n\n2. إثبات المتعاقد دفع مبالغ إضافية نتيجة تعديل التعريفات الجمركية أو الرسوم أو الضرائب أو المواد أو الخدمات المسعرة رسمياً.\n\n3. ألا يكون تحمل المتعاقد لهذه المبالغ ناتجاً عن تأخره في التنفيذ.\n\nتعديلات أسعار المواد:\n• تطبق إذا كان تغير سعر السوق >10% للمواد (الأسمنت، الحديد، الأسفلت، إلخ).\n• التعديل فقط إذا كان تأثير تكلفة العقد الإجمالية >3%.\n• يقتصر التعويض على 20% من إجمالي قيمة العقد.'
  },
  {
    id: '114',
    chapter: 'Chapter 13: Additional Works',
    article_number: 'Article 114',
    article_title_en: 'Additional Works',
    article_title_ar: 'الأعمال الإضافية',
    article_text_en: 'Rules for additional works and amendments:\n\n1. Additional work must be within the general scope of the original contract.\n\n2. Proper funding must be available before approval.\n\n3. If contractor disagrees with pricing, government entity may seek other contractors.',
    article_text_ar: 'قواعد الأعمال الإضافية والتعديلات:\n\n1. يجب أن تكون الأعمال الإضافية ضمن النطاق العام للعقد الأصلي.\n\n2. يجب توفر التمويل المناسب قبل الموافقة.\n\n3. إذا لم يوافق المتعاقد على التسعير، يجوز للجهة الحكومية البحث عن متعاقدين آخرين.'
  },
  {
    id: '115',
    chapter: 'Chapter 13: Contract Amendments',
    article_number: 'Article 115',
    article_title_en: 'Contract Amendments',
    article_title_ar: 'تعديلات العقد',
    article_text_en: 'Rules for contract amendments and restrictions:\n\n1. Amendments must be in writing and signed by both parties.\n\n2. Amendments must not alter the nature of the contract.\n\n3. Amendments must be within the limits specified in Article 69 of the Law.',
    article_text_ar: 'قواعد تعديلات العقد والقيود:\n\n1. يجب أن تكون التعديلات مكتوبة وموقعة من قبل الطرفين.\n\n2. يجب ألا تغير التعديلات طبيعة العقد.\n\n3. يجب أن تكون التعديلات ضمن الحدود المحددة في المادة 69 من النظام.'
  },
  {
    id: '116',
    chapter: 'Chapter 13: Contractor Obligations',
    article_number: 'Article 116',
    article_title_en: 'Contractor Obligations',
    article_title_ar: 'التزامات المتعاقد',
    article_text_en: 'Rules for modifying contractor obligations:\n\n1. Contractor cannot perform additional works without written approval.\n\n2. No compensation for unauthorized works, even if beneficial to the project.\n\n3. Contractor may be required to remove unauthorized works at their own expense.',
    article_text_ar: 'قواعد تعديل التزامات المتعاقد:\n\n1. لا يجوز للمتعاقد تنفيذ أعمال إضافية دون موافقة كتابية.\n\n2. لا تعويض عن الأعمال غير المصرح بها، حتى لو كانت مفيدة للمشروع.\n\n3. قد يُطلب من المتعاقد إزالة الأعمال غير المصرح بها على نفقته الخاصة.'
  },
  {
    id: '153',
    chapter: 'Chapter 7: Grievance Procedures',
    article_number: 'Article 153',
    article_title_en: 'Grievance Procedures',
    article_title_ar: 'إجراءات التظلم',
    article_text_en: 'Grievance procedures (guarantee requirement):\n\n1. Grievances must be submitted within the specified timeframe.\n\n2. A financial guarantee may be required for certain types of grievances.\n\n3. The committee shall issue its decision within the period specified in the Law.',
    article_text_ar: 'إجراءات التظلم (متطلبات الضمان):\n\n1. يجب تقديم التظلمات خلال الإطار الزمني المحدد.\n\n2. قد يكون مطلوباً ضمان مالي لأنواع معينة من التظلمات.\n\n3. تصدر اللجنة قرارها خلال المدة المحددة في النظام.'
  },
  {
    id: '154',
    chapter: 'Chapter 7: Arbitration Agreements',
    article_number: 'Article 154',
    article_title_en: 'Arbitration Agreements',
    article_title_ar: 'اتفاقيات التحكيم',
    article_text_en: 'Arbitration is only permitted for contracts with a value exceeding SAR 100 million. Prior approval from the Minister of Finance is required before initiating any arbitration proceedings. Arbitration shall be conducted in accordance with the Saudi Arbitration Law and its procedures.',
    article_text_ar: 'لا يسمح بالتحكيم إلا للعقود التي تتجاوز قيمتها 100 مليون ريال سعودي. يجب الحصول على موافقة مسبقة من وزير المالية قبل بدء أي إجراءات تحكيم. يتم إجراء التحكيم وفقاً لنظام التحكيم السعودي وإجراءاته.'
  },
  {
    id: '155',
    chapter: 'Chapter 7: Technical Disputes Council',
    article_number: 'Article 155',
    article_title_en: 'Technical Disputes Council',
    article_title_ar: 'مجلس الخلافات الفنية',
    article_text_en: 'In case of a technical dispute between the government entity and the contractor that could lead to project failure or significant harm to either or both parties, a council shall be formed to consider the dispute, consisting of a representative from the government entity, a representative from the contractor, and a chairperson appointed by the Ministry. The council shall issue its decision within thirty days, which may be extended by fifteen days in case of objections. The council\'s decision shall be binding if accepted by both parties.',
    article_text_ar: 'في حال نشوء خلاف فني بين الجهة الحكومية والمتعاقد معها، يكون من شأنه أن يؤدي إلى تعثر المشروع أو إلحاق ضرر بالطرفين أو بأحدهما، يشكل مجلس للنظر في الخلاف يضم ممثلاً عن الجهة الحكومية وممثلاً عن المتعاقد ورئيساً من الوزارة. ويصدر المجلس قراره خلال ثلاثين يوماً، ويكون قراره ملزماً إذا قبله الطرفان.'
  }
];

// Helper function to get regulation article by ID
export const getRegulationArticleById = (id: string): RegulationArticle | undefined => {
  return sampleRegulationArticles.find(article => article.id === id);
};

// Helper function to get regulation article by article number
export const getRegulationArticleByNumber = (articleNumber: string): RegulationArticle | undefined => {
  return sampleRegulationArticles.find(article => article.article_number === articleNumber);
};

// Helper function to get all regulation articles
export const getAllRegulationArticles = (): RegulationArticle[] => {
  return [...sampleRegulationArticles];
};

// Group regulation articles by chapter
export const getRegulationArticlesByChapter = (): Record<string, RegulationArticle[]> => {
  const grouped: Record<string, RegulationArticle[]> = {};
  
  sampleRegulationArticles.forEach(article => {
    if (!grouped[article.chapter]) {
      grouped[article.chapter] = [];
    }
    grouped[article.chapter].push(article);
  });
  
  return grouped;
};