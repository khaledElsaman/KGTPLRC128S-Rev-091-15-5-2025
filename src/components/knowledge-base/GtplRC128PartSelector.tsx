import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Globe, Scale, ArrowRight, Download, Info, ExternalLink, ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

type TableOfContentsItem = {
  id: string;
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: TableOfContentsItem[];
}

const GtplRC128PartSelector: React.FC = () => {
  const { handleModuleChange } = useApp();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['part-i']);
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId) 
        : [...prev, sectionId]
    );
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = '/assets/variations_claims_compliance_guide.pdf';
      link.download = `GTPL_RC128_${language === 'en' ? 'English' : 'Arabic'}.pdf`;
      
      // Append to document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const englishTableOfContents: TableOfContentsItem[] = [
    {
      id: 'part-i',
      title: 'Part One: General Provisions',
      path: '/knowledge-base/gtpl-rc128/part-i',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-i-en',
          title: 'English Version',
          path: '/knowledge-base/gtpl-rc128-part-i',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-ii',
      title: 'Part Two: Manner of Contracting',
      path: '/knowledge-base/gtpl-rc128/part-ii',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-ii-en',
          title: 'English Version',
          path: '/knowledge-base/gtpl-rc128-part-ii',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-iii',
      title: 'Part Three: Proposals and Awards',
      path: '/knowledge-base/gtpl-rc128/part-iii',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-iii-en',
          title: 'English Version',
          path: '/knowledge-base/gtpl-rc128-part-iii',
          icon: <FileText className="h-4 w-4" />
        },
        {
          id: 'part-iii-ar',
          title: 'Arabic Version',
          path: '/knowledge-base/gtpl-rc128-part-iii-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-iv',
      title: 'Part Four: Concluding and Executing Contracts',
      path: '/knowledge-base/gtpl-rc128/part-iv',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-iv-en',
          title: 'English Version',
          path: '/knowledge-base/gtpl-rc128-part-iv',
          icon: <FileText className="h-4 w-4" />
        },
        {
          id: 'part-iv-ar',
          title: 'Arabic Version',
          path: '/knowledge-base/gtpl-rc128-part-iv-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-v',
      title: 'Part Five: Sale of Movables',
      path: '/knowledge-base/gtpl-rc128/part-v',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-v-en',
          title: 'English Version',
          path: '/knowledge-base/gtpl-rc128-part-v',
          icon: <FileText className="h-4 w-4" />
        },
        {
          id: 'part-v-ar',
          title: 'Arabic Version',
          path: '/knowledge-base/gtpl-rc128-part-v-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-vi',
      title: 'Part Six: Review of Complaints, Violations, and Appeals',
      path: '/knowledge-base/gtpl-rc128/part-vi',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-vi-en',
          title: 'English Version',
          path: '/knowledge-base/gtpl-rc128-part-vi',
          icon: <FileText className="h-4 w-4" />
        },
        {
          id: 'part-vi-ar',
          title: 'Arabic Version',
          path: '/knowledge-base/gtpl-rc128-part-vi-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-vii',
      title: 'Part Seven: Final Provisions',
      path: '/knowledge-base/gtpl-rc128/part-vii',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-vii-en',
          title: 'English Version',
          path: '/knowledge-base/gtpl-rc128-part-vii',
          icon: <FileText className="h-4 w-4" />
        },
        {
          id: 'part-vii-ar',
          title: 'Arabic Version',
          path: '/knowledge-base/gtpl-rc128-part-vii-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    }
  ];

  const arabicTableOfContents: TableOfContentsItem[] = [
    {
      id: 'part-i-ar',
      title: 'الجزء الأول: أحكام عامة',
      path: '/knowledge-base/gtpl-rc128/part-i-ar',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-i-ar-full',
          title: 'النسخة العربية',
          path: '/knowledge-base/gtpl-rc128-articles-ar',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-ii-ar',
      title: 'الجزء الثاني: طرق التعاقد',
      path: '/knowledge-base/gtpl-rc128/part-ii-ar',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-ii-ar-full',
          title: 'النسخة العربية',
          path: '/knowledge-base/gtpl-rc128-articles-ar',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-iii-ar',
      title: 'الجزء الثالث: العروض والترسية',
      path: '/knowledge-base/gtpl-rc128/part-iii-ar',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-iii-ar-full',
          title: 'النسخة العربية',
          path: '/knowledge-base/gtpl-rc128-part-iii-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-iv-ar',
      title: 'الجزء الرابع: إبرام العقود وتنفيذها',
      path: '/knowledge-base/gtpl-rc128/part-iv-ar',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-iv-ar-full',
          title: 'النسخة العربية',
          path: '/knowledge-base/gtpl-rc128-part-iv-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-v-ar',
      title: 'الجزء الخامس: بيع المنقولات',
      path: '/knowledge-base/gtpl-rc128/part-v-ar',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-v-ar-full',
          title: 'النسخة العربية',
          path: '/knowledge-base/gtpl-rc128-part-v-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-vi-ar',
      title: 'الجزء السادس: النظر في الشكاوى والمخالفات والتظلمات',
      path: '/knowledge-base/gtpl-rc128/part-vi-ar',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-vi-ar-full',
          title: 'النسخة العربية',
          path: '/knowledge-base/gtpl-rc128-part-vi-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'part-vii-ar',
      title: 'الجزء السابع: أحكام ختامية',
      path: '/knowledge-base/gtpl-rc128/part-vii-ar',
      icon: <Book className="h-4 w-4" />,
      children: [
        {
          id: 'part-vii-ar-full',
          title: 'النسخة العربية',
          path: '/knowledge-base/gtpl-rc128-part-vii-arabic',
          icon: <FileText className="h-4 w-4" />
        }
      ]
    }
  ];

  // Filter table of contents based on search term
  const filteredEnglishToc = searchTerm 
    ? englishTableOfContents.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.children?.some(child => child.title.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    : englishTableOfContents;

  const filteredArabicToc = searchTerm 
    ? arabicTableOfContents.filter(item => 
        item.title.includes(searchTerm) ||
        (item.children?.some(child => child.title.includes(searchTerm)))
      )
    : arabicTableOfContents;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GTPL RC 128 Law - Part Selector</h1>
            <p className="text-gray-500">Government Tenders and Procurement Law</p>
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
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg ${
              isDownloading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            <Download size={16} />
            <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-blue-900">About the Law</p>
              <p className="text-sm text-blue-700 mt-1">
                {language === 'en' 
                  ? 'Government Tenders and Procurement Law (GTPL RC 128) issued by Royal Decree No. M/128 dated 13/11/1440H' 
                  : 'نظام المنافسات والمشتريات الحكومية (GTPL RC 128) الصادر بالمرسوم الملكي رقم م/128 وتاريخ 13/11/1440هـ'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Index Button */}
      <div className="mb-6">
        <button 
          onClick={() => handleModuleChange('gtpl-rc128-table-of-contents', 'Overview')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to GTPL RC 128 Law – Index (EN-AR)</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="relative">
          <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`} size={20} />
          <input
            type="text"
            placeholder={language === 'en' ? "Search parts and articles..." : "البحث في الأجزاء والمواد..."}
            className={`${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">GTPL RC 128 Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Info className="text-[#1d4ed8]" size={24} />
              </div>
              <h3 className="text-lg font-medium text-blue-900">Overview</h3>
            </div>
            <p className="text-gray-700 mb-4">Brief overview of the GTPL RC128 structure and purpose.</p>
            <button 
              onClick={() => handleModuleChange('gtpl-rc128-table-of-contents', 'Overview')}
              className="flex items-center gap-2 text-[#1d4ed8] hover:text-blue-800 transition-all ease-in-out"
            >
              <span>View Table of Contents</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <FileText className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-lg font-medium text-indigo-900">{language === 'en' ? 'Part Selector' : 'اختيار الأجزاء'}</h3>
            </div>
            <p className="text-indigo-700 mb-4">
              {language === 'en' 
                ? 'Access all parts with article-level navigation in both languages.' 
                : 'الوصول إلى جميع الأجزاء مع التنقل على مستوى المادة بكلتا اللغتين.'}
            </p>
            <button 
              onClick={() => handleModuleChange('gtpl-rc128-part-selector', 'Overview')}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-all ease-in-out"
            >
              <span>{language === 'en' ? 'Go to Part Selector' : 'الذهاب إلى اختيار الأجزاء'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Law Parts Accordion */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Law Parts' : 'أجزاء النظام'}</h2>
        <p className="text-gray-600 mb-6">
          {language === 'en' 
            ? 'Explore individual parts of the law in English and Arabic' 
            : 'استكشف أجزاء فردية من النظام باللغتين الإنجليزية والعربية'}
        </p>
        
        <div className="space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'en' 
            ? filteredEnglishToc.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#1d4ed8] transition-all ease-in-out">
                  <div 
                    className="p-4 bg-gray-50 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleSection(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-[#1d4ed8]" size={20} />
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    {expandedSections.includes(item.id) ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                  
                  {expandedSections.includes(item.id) && item.children && (
                    <div className="p-4 space-y-2">
                      {item.children.map(child => (
                        <button
                          key={child.id}
                          onClick={() => {
                            const pathParts = child.path.split('/');
                            const moduleId = pathParts[pathParts.length - 1] as any;
                            handleModuleChange(moduleId, 'Overview');
                          }}
                          className="w-full text-left flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-blue-600"
                        >
                          {child.icon}
                          <span>{child.title}</span>
                          <ArrowRight size={16} className="ml-auto" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            : filteredArabicToc.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#1d4ed8] transition-all ease-in-out">
                  <div 
                    className="p-4 bg-gray-50 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleSection(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-[#1d4ed8]" size={20} />
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    {expandedSections.includes(item.id) ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                  
                  {expandedSections.includes(item.id) && item.children && (
                    <div className="p-4 space-y-2">
                      {item.children.map(child => (
                        <button
                          key={child.id}
                          onClick={() => {
                            const pathParts = child.path.split('/');
                            const moduleId = pathParts[pathParts.length - 1] as any;
                            handleModuleChange(moduleId, 'Overview');
                          }}
                          className="w-full text-right flex items-center justify-end gap-2 p-2 hover:bg-gray-50 rounded-lg text-blue-600"
                        >
                          <span>{child.title}</span>
                          {child.icon}
                          <ArrowLeft size={16} className="mr-auto" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
          }
        </div>
      </div>
      
      {/* Table of Contents */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Table of Contents' : 'جدول المحتويات'}</h2>
        <div className="space-y-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'en' 
            ? filteredEnglishToc.map((item) => (
                <TableOfContentsItem key={item.id} item={item} />
              ))
            : filteredArabicToc.map((item) => (
                <TableOfContentsItem key={item.id} item={item} />
              ))
          }
        </div>
      </div>
      
      {/* Resources Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">{language === 'en' ? 'Official Resources' : 'المصادر الرسمية'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://ncar.gov.sa/Documents/Details?Id=oCElQIyvsJ%2FH%2BOwE%2F3cZ1A%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
          >
            <FileText className="text-[#1d4ed8]" size={24} />
            <div>
              <p className="font-medium">GTPL 128 Full Text (Arabic)</p>
              <p className="text-sm text-gray-500">Official government source</p>
            </div>
            <ExternalLink className="ml-auto text-gray-400" size={16} />
          </a>
          
          <a 
            href="https://www.my.gov.sa/wps/portal/snp/servicesDirectory/servicedetails/9503" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
          >
            <FileText className="text-[#1d4ed8]" size={24} />
            <div>
              <p className="font-medium">Government Tenders and Procurement Law</p>
              <p className="text-sm text-gray-500">English Summary</p>
            </div>
            <ExternalLink className="ml-auto text-gray-400" size={16} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">Built under KGTPLRC128S Legal Knowledge Framework • © 2025</p>
      </div>
    </div>
  );
};

const TableOfContentsItem: React.FC<{ item: TableOfContentsItem }> = ({ item }) => {
  const { handleModuleChange } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleClick = () => {
    // Extract the module ID from the path
    const pathParts = item.path.split('/');
    const moduleId = pathParts[pathParts.length - 1] as any;
    
    // Handle navigation based on the item's path
    if (item.children && item.children.length > 0) {
      setIsExpanded(!isExpanded);
    } else {
      handleModuleChange(moduleId, 'Overview');
    }
  };
  
  return (
    <div className="py-1">
      <div
        onClick={handleClick}
        className="flex items-center justify-between gap-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer p-2 rounded-lg hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {item.icon}
          <span>{item.title}</span>
        </div>
        {item.children && item.children.length > 0 && (
          isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />
        )}
      </div>
      
      {isExpanded && item.children && (
        <div className="ml-6 mt-1 border-l-2 border-gray-200 pl-4">
          {item.children.map((child) => (
            <TableOfContentsItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GtplRC128PartSelector;