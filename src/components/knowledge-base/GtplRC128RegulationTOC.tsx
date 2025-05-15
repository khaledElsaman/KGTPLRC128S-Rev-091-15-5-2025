import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ArrowLeft, Menu } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../contexts/AppContext';

// Define the structure for TOC items
interface TocItem {
  id: string;
  title: string;
  type: 'part' | 'chapter' | 'article';
  partNumber?: string;
  chapterNumber?: string;
  articleNumber?: string;
  children?: TocItem[];
}

// English TOC structure
const tocDataEN = [
  {
    part_number: "Part One",
    part_title: "General Rules",
    chapters: [
      {
        chapter_number: "Chapter One",
        chapter_title: "Equality and Transparency",
        articles: ["Article 1: Equal Opportunity"]
      },
      {
        chapter_number: "Chapter Two",
        chapter_title: "Advance Planning",
        articles: ["Article 2: Planning Requirements", "Article 3: Annual Procurement Plan"]
      },
      {
        chapter_number: "Chapter Three",
        chapter_title: "Foreign Contractors",
        articles: ["Article 4: Qualification of Foreign Contractors"]
      },
      {
        chapter_number: "Chapter Four",
        chapter_title: "Works Outside the Kingdom",
        articles: ["Article 5: Procurement Outside the Kingdom"]
      },
      {
        chapter_number: "Chapter Five",
        chapter_title: "Unified Procurement Agency",
        articles: ["Article 6", "Article 7"]
      },
      {
        chapter_number: "Chapter Six",
        chapter_title: "Electronic Portal",
        articles: ["Article 8", "Article 9", "Article 10", "Article 12"]
      },
      {
        chapter_number: "Chapter Seven",
        chapter_title: "Conditions for Dealing with Government Authorities",
        articles: ["Article 13", "Article 14"]
      },
      {
        chapter_number: "Chapter Eight",
        chapter_title: "Bidder Qualification",
        articles: ["Article 15", "Article 16", "Article 17", "Article 18", "Article 19", "Article 20"]
      },
      {
        chapter_number: "Chapter Nine",
        chapter_title: "Tender Documents",
        articles: ["Article 21", "Article 22", "Article 23"]
      },
      {
        chapter_number: "Chapter Ten",
        chapter_title: "Conditions, Specifications & Obligations",
        articles: ["Article 24", "Article 25", "Article 26"]
      },
      {
        chapter_number: "Chapter Eleven",
        chapter_title: "Estimated Cost",
        articles: ["Article 27"]
      },
      {
        chapter_number: "Chapter Twelve",
        chapter_title: "Bid Evaluation Criteria",
        articles: ["Article 28", "Article 29"]
      },
      {
        chapter_number: "Chapter Thirteen",
        chapter_title: "Division of Tender",
        articles: ["Article 30"]
      },
      {
        chapter_number: "Chapter Fourteen",
        chapter_title: "Solidarity",
        articles: ["Article 31"]
      }
    ]
  },
  {
    part_number: "Part Two",
    part_title: "Contracting Methods",
    chapters: [
      {
        chapter_number: "Chapter One",
        chapter_title: "Contracting Methods",
        articles: ["Article 32"]
      },
      {
        chapter_number: "Chapter Two",
        chapter_title: "General Tender",
        articles: ["Article 33", "Article 34", "Article 35"]
      },
      {
        chapter_number: "Chapter Three",
        chapter_title: "Selective Tender",
        articles: ["Article 36", "Article 37", "Article 38", "Article 39", "Article 40", "Article 41"]
      },
      {
        chapter_number: "Chapter Four",
        chapter_title: "2-Phase Tender",
        articles: ["Article 42", "Article 43"]
      },
      {
        chapter_number: "Chapter Five",
        chapter_title: "Direct Procurement",
        articles: ["Article 44", "Article 45", "Article 46", "Article 47", "Article 48"]
      },
      {
        chapter_number: "Chapter Six",
        chapter_title: "Framework Agreement",
        articles: ["Article 49", "Article 50", "Article 51", "Article 52", "Article 53"]
      },
      {
        chapter_number: "Chapter Seven",
        chapter_title: "Online Reverse Auction",
        articles: ["Article 54", "Article 55", "Article 56", "Article 57"]
      },
      {
        chapter_number: "Chapter Eight",
        chapter_title: "Industry Localization and Knowledge Transfer",
        articles: ["Article 58"]
      },
      {
        chapter_number: "Chapter Nine",
        chapter_title: "Contest (Competition)",
        articles: ["Article 59"]
      }
    ]
  },
  {
    part_number: "Part Three",
    part_title: "Proposals and Awards",
    chapters: [
      {
        chapter_number: "Chapter One",
        chapter_title: "Bid Submission",
        articles: ["Article 60", "Article 61", "Article 62", "Article 63", "Article 64", "Article 65", "Article 66", "Article 67", "Article 68"]
      },
      {
        chapter_number: "Chapter Two",
        chapter_title: "Drafting of Bid Quotation",
        articles: ["Article 69"]
      },
      {
        chapter_number: "Chapter Three",
        chapter_title: "Bid Bond",
        articles: ["Article 70"]
      },
      {
        chapter_number: "Chapter Four",
        chapter_title: "Opening of Bids",
        articles: ["Article 71", "Article 72", "Article 73"]
      },
      {
        chapter_number: "Chapter Five",
        chapter_title: "Examining of Bids",
        articles: ["Article 74", "Article 75", "Article 76", "Article 77", "Article 78", "Article 79", "Article 80"]
      },
      {
        chapter_number: "Chapter Six",
        chapter_title: "Correction of Bids",
        articles: ["Article 81", "Article 82"]
      },
      {
        chapter_number: "Chapter Seven",
        chapter_title: "Negotiating with Bidders",
        articles: ["Article 83", "Article 84"]
      },
      {
        chapter_number: "Chapter Eight",
        chapter_title: "Announcing the Tender Results",
        articles: ["Article 85"]
      },
      {
        chapter_number: "Chapter Nine",
        chapter_title: "Refund of Tender Documents Cost",
        articles: ["Article 86"]
      },
      {
        chapter_number: "Chapter Ten",
        chapter_title: "Standstill Period",
        articles: ["Article 87"]
      }
    ]
  },
  {
    part_number: "Part Four",
    part_title: "Conclusion and Execution of Contracts",
    chapters: [
      {
        chapter_number: "Chapter One",
        chapter_title: "General Provisions",
        articles: ["Article 88", "Article 89", "Article 90", "Article 91", "Article 92", "Article 93"]
      },
      {
        chapter_number: "Chapter Two",
        chapter_title: "Contracting Types",
        articles: ["Article 94", "Article 95"]
      },
      {
        chapter_number: "Chapter Three",
        chapter_title: "Receipt of Sites",
        articles: ["Article 96", "Article 97"]
      },
      {
        chapter_number: "Chapter Four",
        chapter_title: "Responsibility of Contractor with the Government",
        articles: ["Article 98", "Article 99"]
      },
      {
        chapter_number: "Chapter Five",
        chapter_title: "Performance Bond",
        articles: ["Article 100", "Article 101"]
      },
      {
        chapter_number: "Chapter Six",
        chapter_title: "Advance Payment Guarantee",
        articles: ["Article 102"]
      },
      {
        chapter_number: "Chapter Seven",
        chapter_title: "Extension of Guarantees",
        articles: ["Article 103"]
      },
      {
        chapter_number: "Chapter Eight",
        chapter_title: "Confiscation of Guarantees",
        articles: ["Article 104"]
      },
      {
        chapter_number: "Chapter Nine",
        chapter_title: "General Provisions concerning the Guarantees",
        articles: ["Article 105", "Article 106"]
      },
      {
        chapter_number: "Chapter Ten",
        chapter_title: "Cash Security Deposit",
        articles: ["Article 107"]
      },
      {
        chapter_number: "Chapter Eleven",
        chapter_title: "Payment of Financial Consideration",
        articles: ["Article 108", "Article 109", "Article 110", "Article 111", "Article 112"]
      },
      {
        chapter_number: "Chapter Twelve",
        chapter_title: "Adjustment of Contract Prices",
        articles: ["Article 113"]
      },
      {
        chapter_number: "Chapter Thirteen",
        chapter_title: "Increase or Decrease of the Contractor's Obligations",
        articles: ["Article 114", "Article 115", "Article 116"]
      },
      {
        chapter_number: "Chapter Fourteen",
        chapter_title: "Contract Assignment",
        articles: ["Article 117"]
      },
      {
        chapter_number: "Chapter Fifteen",
        chapter_title: "Subcontracting",
        articles: ["Article 118"]
      },
      {
        chapter_number: "Chapter Sixteen",
        chapter_title: "Penalties",
        articles: ["Article 119", "Article 120", "Article 121", "Article 122", "Article 123"]
      },
      {
        chapter_number: "Chapter Seventeen",
        chapter_title: "Extension of Contracts, Exemption of Delay Penalty, and Suspension of Works",
        articles: ["Article 124", "Article 125", "Article 126"]
      },
      {
        chapter_number: "Chapter Eighteen",
        chapter_title: "Receipt of Works",
        articles: ["Article 127", "Article 128", "Article 129", "Article 130"]
      },
      {
        chapter_number: "Chapter Nineteen",
        chapter_title: "Contract Termination",
        articles: ["Article 131", "Article 132", "Article 133", "Article 134", "Article 135"]
      },
      {
        chapter_number: "Chapter Twenty",
        chapter_title: "Partial Withdrawal",
        articles: ["Article 136", "Article 137", "Article 138", "Article 139"]
      },
      {
        chapter_number: "Chapter Twenty-One",
        chapter_title: "Assessment of Contractor's Performance",
        articles: ["Article 140"]
      }
    ]
  },
  {
    part_number: "Part Four",
    part_title: "Contract Execution",
    chapters: [
      {
        chapter_number: "Chapter Five",
        chapter_title: "Contract Management",
        articles: [
          "Article 113: Contract Price Adjustment",
          "Article 114: Additional Works",
          "Article 115: Contract Amendments",
          "Article 116: Contractor Obligations"
        ]
      }
    ]
  },
  {
    part_number: "Part Four",
    part_title: "Dispute Resolution",
    chapters: [
      {
        chapter_number: "Chapter Seven",
        chapter_title: "Complaints and Appeals",
        articles: [
          "Article 153: Grievance Procedures",
          "Article 154: Arbitration Agreements",
          "Article 155: Technical Disputes Council"
        ]
      }
    ]
  }
];

// Arabic TOC structure
const tocDataAR = [
  {
    part_number: "الباب الأول",
    part_title: "القواعد العامة",
    chapters: [
      {
        chapter_number: "الفصل الأول",
        chapter_title: "المساواة والشفافية",
        articles: ["المادة الأولى: تكافؤ الفرص"]
      },
      {
        chapter_number: "الفصل الثاني",
        chapter_title: "التخطيط المسبق",
        articles: ["المادة الثانية: متطلبات التخطيط", "المادة الثالثة: خطة المشتريات السنوية"]
      },
      {
        chapter_number: "الفصل الثالث",
        chapter_title: "المتعاقدون الأجانب",
        articles: ["المادة الرابعة: تأهيل المتعاقدين الأجانب"]
      },
      {
        chapter_number: "الفصل الرابع",
        chapter_title: "الأعمال خارج المملكة",
        articles: ["المادة الخامسة: المشتريات خارج المملكة"]
      },
      {
        chapter_number: "الفصل الخامس",
        chapter_title: "جهة الشراء الموحد",
        articles: ["المادة السادسة", "المادة السابعة"]
      },
      {
        chapter_number: "الفصل السادس",
        chapter_title: "البوابة الإلكترونية",
        articles: ["المادة الثامنة", "المادة التاسعة", "المادة العاشرة", "المادة الثانية عشرة"]
      },
      {
        chapter_number: "الفصل السابع",
        chapter_title: "شروط التعامل مع الجهات الحكومية",
        articles: ["المادة الثالثة عشرة", "المادة الرابعة عشرة"]
      },
      {
        chapter_number: "الفصل الثامن",
        chapter_title: "تأهيل المتنافسين",
        articles: ["المادة الخامسة عشرة", "المادة السادسة عشرة", "المادة السابعة عشرة", "المادة الثامنة عشرة", "المادة التاسعة عشرة", "المادة العشرون"]
      },
      {
        chapter_number: "الفصل التاسع",
        chapter_title: "وثائق المنافسة",
        articles: ["المادة الحادية والعشرون", "المادة الثانية والعشرون", "المادة الثالثة والعشرون"]
      },
      {
        chapter_number: "الفصل العاشر",
        chapter_title: "الشروط والمواصفات والالتزامات",
        articles: ["المادة الرابعة والعشرون", "المادة الخامسة والعشرون", "المادة السادسة والعشرون"]
      },
      {
        chapter_number: "الفصل الحادي عشر",
        chapter_title: "التكلفة التقديرية",
        articles: ["المادة السابعة والعشرون"]
      },
      {
        chapter_number: "الفصل الثاني عشر",
        chapter_title: "معايير تقييم العروض",
        articles: ["المادة الثامنة والعشرون", "المادة التاسعة والعشرون"]
      },
      {
        chapter_number: "الفصل الثالث عشر",
        chapter_title: "تجزئة المنافسة",
        articles: ["المادة الثلاثون"]
      },
      {
        chapter_number: "الفصل الرابع عشر",
        chapter_title: "التضامن",
        articles: ["المادة الحادية والثلاثون"]
      }
    ]
  },
  {
    part_number: "الباب الثاني",
    part_title: "أساليب التعاقد",
    chapters: [
      {
        chapter_number: "الفصل الأول",
        chapter_title: "أساليب التعاقد",
        articles: ["المادة الثانية والثلاثون"]
      },
      {
        chapter_number: "الفصل الثاني",
        chapter_title: "المنافسة العامة",
        articles: ["المادة الثالثة والثلاثون", "المادة الرابعة والثلاثون", "المادة الخامسة والثلاثون"]
      },
      {
        chapter_number: "الفصل الثالث",
        chapter_title: "المنافسة المحدودة",
        articles: ["المادة السادسة والثلاثون", "المادة السابعة والثلاثون", "المادة الثامنة والثلاثون", "المادة التاسعة والثلاثون", "المادة الأربعون", "المادة الحادية والأربعون"]
      },
      {
        chapter_number: "الفصل الرابع",
        chapter_title: "المنافسة على مرحلتين",
        articles: ["المادة الثانية والأربعون", "المادة الثالثة والأربعون"]
      },
      {
        chapter_number: "الفصل الخامس",
        chapter_title: "الشراء المباشر",
        articles: ["المادة الرابعة والأربعون", "المادة الخامسة والأربعون", "المادة السادسة والأربعون", "المادة السابعة والأربعون", "المادة الثامنة والأربعون"]
      },
      {
        chapter_number: "الفصل السادس",
        chapter_title: "الاتفاقية الإطارية",
        articles: ["المادة التاسعة والأربعون", "المادة الخمسون", "المادة الحادية والخمسون", "المادة الثانية والخمسون", "المادة الثالثة والخمسون"]
      },
      {
        chapter_number: "الفصل السابع",
        chapter_title: "المزايدة العكسية الإلكترونية",
        articles: ["المادة الرابعة والخمسون", "المادة الخامسة والخمسون", "المادة السادسة والخمسون", "المادة السابعة والخمسون"]
      },
      {
        chapter_number: "الفصل الثامن",
        chapter_title: "توطين الصناعة ونقل المعرفة",
        articles: ["المادة الثامنة والخمسون"]
      },
      {
        chapter_number: "الفصل التاسع",
        chapter_title: "المسابقة (المنافسة)",
        articles: ["المادة التاسعة والخمسون"]
      }
    ]
  },
  {
    part_number: "الباب الثالث",
    part_title: "تنفيذ العقود",
    chapters: [
      {
        chapter_number: "الفصل الخامس",
        chapter_title: "إدارة العقود",
        articles: [
          "المادة 113: تعديل أسعار العقود",
          "المادة 114: الأعمال الإضافية",
          "المادة 115: تعديلات العقد",
          "المادة 116: التزامات المتعاقد"
        ]
      }
    ]
  },
  {
    part_number: "الباب الرابع",
    part_title: "تسوية المنازعات",
    chapters: [
      {
        chapter_number: "الفصل السابع",
        chapter_title: "الشكاوى والتظلمات",
        articles: [
          "المادة 153: إجراءات التظلم",
          "المادة 154: اتفاقيات التحكيم",
          "المادة 155: مجلس الخلافات الفنية"
        ]
      }
    ]
  }
];

const GtplRC128RegulationTOC = () => {
  const { handleModuleChange } = useApp();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated] = useState('April 15, 2025');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showToc, setShowToc] = useState(true);
  const articleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tocRef = useRef<HTMLDivElement>(null);

  const tocItems = language === 'en' ? tocDataEN : tocDataAR;

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) 
        ? prev.filter(sectionId => sectionId !== id) 
        : [...prev, id]
    );
  };

  const copyLinkToClipboard = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleArticleClick = (articleId: string) => {
    setActiveArticleId(articleId);
    
    // Navigate to the article
    handleModuleChange(language === 'en' ? 'gtpl-rc128-regulation-viewer' : 'gtpl-rc128-regulation-ar', 'Article Details');
    
    // Add a URL parameter or hash to navigate to the specific article
    window.location.hash = articleId;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Regulation – Index</h1>
            <p className="text-gray-500">Navigate the Government Tenders and Procurement Law Implementing Regulations</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                language === 'ar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setLanguage('ar')}
            >
              العربية
            </button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'en' ? "Search articles..." : "البحث في المواد..."}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">{language === 'en' ? 'Table of Contents' : 'جدول المحتويات'}</h2>
          </div>
          <div className="p-4 max-h-[600px] overflow-y-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {tocItems.map((part, partIndex) => (
              <div key={partIndex} className="mb-4">
                <button
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg font-medium"
                  onClick={() => toggleSection(`part-${partIndex}`)}
                >
                  <span>{part.part_number}: {part.part_title}</span>
                  {expandedSections.includes(`part-${partIndex}`) ? (
                    <ChevronDown size={16} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-500" />
                  )}
                </button>
                
                {expandedSections.includes(`part-${partIndex}`) && (
                  <div className="ml-4 mt-2 space-y-2">
                    {part.chapters.map((chapter, chapterIndex) => (
                      <div key={chapterIndex}>
                        {chapter.chapter_title && (
                          <button
                            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                            onClick={() => toggleSection(`chapter-${partIndex}-${chapterIndex}`)}
                          >
                            <span className="font-medium">{chapter.chapter_number}: {chapter.chapter_title}</span>
                            {expandedSections.includes(`chapter-${partIndex}-${chapterIndex}`) ? (
                              <ChevronDown size={16} className="text-gray-500" />
                            ) : (
                              <ChevronRight size={16} className="text-gray-500" />
                            )}
                          </button>
                        )}
                        
                        {(expandedSections.includes(`chapter-${partIndex}-${chapterIndex}`) || !chapter.chapter_title) && (
                          <div className="ml-4 mt-1 space-y-1">
                            {chapter.articles.map((article, articleIndex) => {
                              const articleId = article.split(':')[0].replace(/\s+/g, '-').toLowerCase();
                              
                              return (
                                <div key={articleIndex} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                  <button
                                    className="text-left text-blue-600 hover:underline flex-grow"
                                    onClick={() => handleArticleClick(articleId)}
                                  >
                                    {article}
                                  </button>
                                  <button
                                    onClick={() => copyLinkToClipboard(articleId)}
                                    className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600"
                                    title={language === 'en' ? "Copy link to article" : "نسخ رابط المادة"}
                                  >
                                    {copySuccess === articleId ? (
                                      <CheckCircle size={14} className="text-green-500" />
                                    ) : (
                                      <Link size={14} />
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated}
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => handleModuleChange(language === 'en' ? 'gtpl-rc128-regulation-viewer' : 'gtpl-rc128-regulation-ar', 'Overview')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FileText size={16} />
              <span>{language === 'en' ? 'View Full Regulation' : 'عرض اللائحة الكاملة'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GtplRC128RegulationTOC;