import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ChevronLeft, Menu } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Define the article structure
interface LawArticle {
  id: string;
  part_number: string;
  part_title: string;
  chapter_number: string;
  chapter_title: string;
  article_number: string;
  article_title: string;
  article_body: string;
  effective_date: string;
  language: string;
}

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

const GtplLawArticles = () => {
  const [articles, setArticles] = useState<LawArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showToc, setShowToc] = useState(true);
  const articleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchArticles();
    
    // Check if there's a hash in the URL to auto-expand that section
    const hash = window.location.hash;
    if (hash) {
      const articleId = hash.substring(1);
      setActiveArticleId(articleId);
      
      // Scroll to the article after a short delay to ensure it's rendered
      setTimeout(() => {
        const element = document.getElementById(articleId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }

    // Check if we're on mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gtpl_law_articles')
        .select('*')
        .order('part_number', { ascending: true })
        .order('chapter_number', { ascending: true })
        .order('article_number', { ascending: true });

      if (error) throw error;
      
      // If no data from database, use mock data
      if (!data || data.length === 0) {
        const mockArticles = generateMockArticles();
        setArticles(mockArticles);
        
        // Generate TOC items
        const toc = generateTocItems(mockArticles);
        setTocItems(toc);
        
        // Expand the first part by default
        if (toc.length > 0) {
          setExpandedSections([toc[0].id]);
        }
      } else {
        // Filter out Article 2 (Objectives of the Law), Article 3 (Contractor and Competitor Guidelines),
        // and Article 4 (Equal Opportunities)
        const filteredData = data.filter(article => 
          !(article.article_number === 'Article 2' || article.article_number === 'المادة 2' || 
            article.article_number === 'Article 3' || article.article_number === 'المادة 3' ||
            article.article_number === 'Article 4' || article.article_number === 'المادة 4')
        );
        
        setArticles(filteredData);
        
        // Generate TOC items
        const toc = generateTocItems(filteredData);
        setTocItems(toc);
        
        // Expand the first part by default
        if (toc.length > 0) {
          setExpandedSections([toc[0].id]);
        }
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Use mock data if there's an error
      const mockArticles = generateMockArticles();
      setArticles(mockArticles);
      
      // Generate TOC items
      const toc = generateTocItems(mockArticles);
      setTocItems(toc);
      
      // Expand the first part by default
      if (toc.length > 0) {
        setExpandedSections([toc[0].id]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate mock articles for testing
  const generateMockArticles = (): LawArticle[] => {
    const mockArticles: LawArticle[] = [];
    
    // English articles
    mockArticles.push({
      id: '1',
      part_number: 'Part One',
      part_title: 'General Provisions',
      chapter_number: 'Chapter 1',
      chapter_title: 'Definitions',
      article_number: 'Article 1',
      article_title: 'Definitions',
      article_body: 'In this Law, the following terms shall have the meanings assigned thereto unless the context requires otherwise:\n\nLaw: Government Tenders and Procurement Law.\n\nRegulations: Implementing Regulations of the Law.\n\nMinister: Minister of Finance.\n\nMinistry: Ministry of Finance.\n\nAuthority: Local Content and Government Procurement Authority.\n\nUnified Procurement Agency: The agency in charge of unified strategic procurement which is determined pursuant to a resolution by the Council of Ministers.\n\nGovernment Agencies: Ministries, government bodies, public agencies, authorities, and institutions, and other entities with an independent public corporate personality.\n\nHead of Government Agency: Minister, president, governor, or principal officer of a government agency.\n\nPortal: The electronic portal designated for government procurements which is under the Ministry\'s supervision.',
      effective_date: '2019-07-16',
      language: 'EN'
    });
    
    // Skip Article 2 (Objectives of the Law)
    
    // Skip Article 3 (Contractor and Competitor Guidelines)
    
    // Skip Article 4 (Equal Opportunities)
    
    // Add Article 5
    mockArticles.push({
      id: '5',
      part_number: 'Part One',
      part_title: 'General Provisions',
      chapter_number: 'Chapter 3',
      chapter_title: 'Fundamental Principles',
      article_number: 'Article 5',
      article_title: 'Competition Information',
      article_body: 'Bidders shall be provided with clear and uniform information on the required works and procurements and shall be given access to such information at a specified time.',
      effective_date: '2019-07-16',
      language: 'EN'
    });
    
    // Arabic articles
    mockArticles.push({
      id: '6',
      part_number: 'الباب الأول',
      part_title: 'أحكام عامة',
      chapter_number: 'الفصل الأول',
      chapter_title: 'التعريفات',
      article_number: 'المادة 1',
      article_title: 'التعريفات',
      article_body: 'يقصد بالألفاظ والعبارات الآتية -أينما وردت في هذا النظام- المعاني المبينة أمام كل منها، ما لم يقتض السياق غير ذلك:\n\nالنظام: نظام المنافسات والمشتريات الحكومية.\n\nاللائحة: اللائحة التنفيذية للنظام.\n\nالوزير: وزير المالية.\n\nالوزارة: وزارة المالية.\n\nالهيئة: هيئة المحتوى المحلي والمشتريات الحكومية.\n\nجهة الشراء الموحد: الجهة المكلفة بالشراء الاستراتيجي الموحد، التي تحدد بقرار من مجلس الوزراء.\n\nالجهات الحكومية: الوزارات والأجهزة والمصالح والهيئات والمؤسسات العامة، وغيرها من الجهات ذات الشخصية المعنوية العامة المستقلة.\n\nرئيس الجهة الحكومية: الوزير أو الرئيس أو المحافظ أو المسؤول الأول في الجهة الحكومية.\n\nالبوابة: البوابة الإلكترونية الموحدة للمشتريات الحكومية الخاضعة لإشراف الوزارة.',
      effective_date: '2019-07-16',
      language: 'AR'
    });
    
    // Skip Article 2 (Objectives of the Law) in Arabic
    
    // Skip Article 3 (Contractor and Competitor Guidelines) in Arabic
    
    // Skip Article 4 (Equal Opportunities) in Arabic
    
    // Add Article 5 in Arabic
    mockArticles.push({
      id: '10',
      part_number: 'الباب الأول',
      part_title: 'أحكام عامة',
      chapter_number: 'الفصل الثالث',
      chapter_title: 'المبادئ الأساسية',
      article_number: 'المادة 5',
      article_title: 'معلومات المنافسة',
      article_body: 'تزود الجهة الحكومية المتنافسين بمعلومات واضحة وموحدة عن الأعمال والمشتريات المطلوبة، وتمكنهم من الاطلاع عليها في وقت محدد.',
      effective_date: '2019-07-16',
      language: 'AR'
    });
    
    return mockArticles;
  };

  // Generate TOC items from articles
  const generateTocItems = (articles: LawArticle[]): TocItem[] => {
    const partMap: Record<string, TocItem> = {};
    const chapterMap: Record<string, TocItem> = {};
    const articleMap: Record<string, TocItem> = {};
    
    // Group by language
    const filteredArticles = articles.filter(article => 
      article.language === 'EN' // Use English for TOC structure
    );
    
    // First, create parts
    filteredArticles.forEach(article => {
      const partId = `part-${article.part_number.replace(/\s+/g, '-').toLowerCase()}`;
      
      if (!partMap[partId]) {
        partMap[partId] = {
          id: partId,
          title: `${article.part_number}: ${article.part_title}`,
          type: 'part',
          partNumber: article.part_number,
          children: []
        };
      }
      
      const chapterId = `chapter-${article.part_number.replace(/\s+/g, '-').toLowerCase()}-${article.chapter_number.replace(/\s+/g, '-').toLowerCase()}`;
      
      if (!chapterMap[chapterId]) {
        chapterMap[chapterId] = {
          id: chapterId,
          title: `${article.chapter_number}: ${article.chapter_title}`,
          type: 'chapter',
          partNumber: article.part_number,
          chapterNumber: article.chapter_number,
          children: []
        };
        
        // Add chapter to part
        partMap[partId].children?.push(chapterMap[chapterId]);
      }
      
      // Add article to chapter
      const articleId = `article-${article.article_number.replace(/\s+/g, '-').toLowerCase()}`;
      
      if (!articleMap[articleId]) {
        articleMap[articleId] = {
          id: articleId,
          title: `${article.article_number}: ${article.article_title}`,
          type: 'article',
          partNumber: article.part_number,
          chapterNumber: article.chapter_number,
          articleNumber: article.article_number
        };
        
        // Add article to chapter
        chapterMap[chapterId].children?.push(articleMap[articleId]);
      }
    });
    
    return Object.values(partMap);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) 
        ? prev.filter(sectionId => sectionId !== id) 
        : [...prev, id]
    );
  };

  const handleArticleClick = (articleId: string) => {
    setActiveArticleId(articleId);
    
    // Find the article in the list
    const articleNumber = articleId.replace('article-', '').replace(/-/g, ' ');
    const article = articles.find(a => 
      a.article_number.toLowerCase() === articleNumber && a.language === language
    );
    
    if (article) {
      // Find the chapter for this article
      const chapterId = `chapter-${article.part_number.replace(/\s+/g, '-').toLowerCase()}-${article.chapter_number.replace(/\s+/g, '-').toLowerCase()}`;
      setActiveChapterId(chapterId);
      
      // Make sure the part and chapter are expanded
      const partId = `part-${article.part_number.replace(/\s+/g, '-').toLowerCase()}`;
      setExpandedSections(prev => {
        const newSections = [...prev];
        if (!newSections.includes(partId)) {
          newSections.push(partId);
        }
        if (!newSections.includes(chapterId)) {
          newSections.push(chapterId);
        }
        return newSections;
      });
      
      // Scroll to the article
      const element = document.getElementById(articleId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const copyLinkToClipboard = (articleId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${articleId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(articleId);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  // Auto-scroll TOC to keep active chapter visible
  useEffect(() => {
    if (activeChapterId && tocRef.current) {
      const activeElement = document.getElementById(activeChapterId);
      if (activeElement) {
        const tocRect = tocRef.current.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        
        if (activeRect.top < tocRect.top || activeRect.bottom > tocRect.bottom) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [activeChapterId]);

  // Filter articles based on search term and language
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.article_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.article_body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.article_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = article.language === language;
    
    return matchesSearch && matchesLanguage;
  });

  // Format content with proper paragraph breaks
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4 text-gray-700">
        {paragraph}
      </p>
    ));
  };

  // Render TOC item
  const renderTocItem = (item: TocItem, level: number = 0) => {
    const isExpanded = expandedSections.includes(item.id);
    const isActive = activeArticleId === item.id || activeChapterId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div key={item.id} className="toc-item">
        <div 
          className={`flex items-center py-2 px-2 rounded-md transition-colors ${
            isActive 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
              : 'hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          id={item.id}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSection(item.id);
              }}
              className="p-1 mr-1 rounded-md hover:bg-gray-100 flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronDown size={14} className="text-gray-500" />
              ) : (
                <ChevronRight size={14} className="text-gray-500" />
              )}
            </button>
          )}
          
          {!hasChildren && <div className="w-6 flex-shrink-0"></div>}
          
          <button
            className={`text-left truncate ${
              item.type === 'part' 
                ? 'font-bold text-base' 
                : item.type === 'chapter' 
                  ? 'font-medium text-sm' 
                  : 'text-sm'
            } ${isActive ? 'text-blue-600' : 'text-gray-700'}`}
            onClick={() => {
              if (item.type === 'article') {
                handleArticleClick(item.id);
              } else {
                toggleSection(item.id);
              }
            }}
            style={{ maxWidth: 'calc(100% - 40px)' }}
            title={item.title}
          >
            {item.title}
          </button>
          
          {item.type === 'article' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyLinkToClipboard(item.id);
              }}
              className="p-1 ml-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex-shrink-0"
              title="Copy link to article"
            >
              {copySuccess === item.id ? (
                <CheckCircle size={14} className="text-green-500" />
              ) : (
                <Link size={14} />
              )}
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {item.children!.map(child => renderTocItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Table of Contents */}
      <div 
        className={`${showToc ? 'w-1/4' : 'w-0'} h-full overflow-y-auto border-r border-gray-200 transition-all duration-300 ${isMobile ? 'absolute z-10 bg-white' : 'relative'}`}
        ref={tocRef}
      >
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">GTPL RC 128 Law – Table of Contents</h2>
            {isMobile && (
              <button 
                onClick={() => setShowToc(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <ChevronLeft size={20} className="text-gray-500" />
              </button>
            )}
          </div>
          <div className="flex mt-4">
            <button
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg ${
                language === 'EN'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setLanguage('EN')}
            >
              English
            </button>
            <button
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg ${
                language === 'AR'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setLanguage('AR')}
            >
              العربية
            </button>
          </div>
        </div>
        <div className="p-4 border-b border-gray-200 sticky top-[105px] bg-white z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'EN' ? "Search articles..." : "البحث في المواد..."}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="p-2 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            tocItems.map(item => renderTocItem(item))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {isMobile && !showToc && (
          <div className="sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
            <button 
              onClick={() => setShowToc(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg"
            >
              <Menu size={16} />
              <span>Show Table of Contents</span>
            </button>
          </div>
        )}
        <div className="max-w-3xl mx-auto py-8 px-6">
          <div className="space-y-8" dir={language === 'AR' ? 'rtl' : 'ltr'}>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredArticles.map(article => {
                const articleId = `article-${article.article_number.replace(/\s+/g, '-').toLowerCase()}`;
                
                return (
                  <div 
                    key={article.id} 
                    id={articleId}
                    ref={el => articleRefs.current[articleId] = el}
                    className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${
                      activeArticleId === articleId ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Scale size={20} className="text-blue-600" />
                          <h2 className="text-xl font-semibold text-gray-900">
                            {article.article_number}
                          </h2>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyLinkToClipboard(articleId)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="Copy link to article"
                          >
                            {copySuccess === articleId ? (
                              <CheckCircle size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} className="text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        {article.article_title}
                      </h3>
                      
                      <div className="prose max-w-none">
                        {formatContent(article.article_body)}
                      </div>
                      
                      <div className="mt-6 text-sm text-gray-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Part:</span> {article.part_number} - {article.part_title}
                          </div>
                          <div>
                            <span className="font-medium">Effective Date:</span> {new Date(article.effective_date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-1">
                          <span className="font-medium">Chapter:</span> {article.chapter_number} - {article.chapter_title}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GtplLawArticles;