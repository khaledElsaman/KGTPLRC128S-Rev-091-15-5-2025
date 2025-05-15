import React, { useState, useEffect, useRef } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ArrowLeft, Menu, ExternalLink } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { regulationToLawMappings, getRelatedLawArticles } from '../../lib/regulationLawMappings';

// Define the article structure
interface Article {
  id: string;
  article_number: string;
  article_title: string;
  article_body: string;
  part_number: string;
  part_title: string;
  chapter_number: string;
  chapter_title: string;
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

const GtplRC128RegulationViewer = () => {
  const { handleModuleChange } = useApp();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
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
      
      // Mock data for demonstration
      const mockArticles: Article[] = [
        {
          id: '1',
          article_number: 'Article 1',
          article_title: 'Equality and Transparency',
          article_body: '1. The Government Authority shall inform all the bidders of the information related to the work scope of the project...\n\n2. Subject to Clause (1) of Article (12) of the Law, employees and individuals involved in preparing tender documents may not disclose any information before offering.\n\n3. The Government Authority shall inform all the bidders of any changes made to the tender.\n\n4. Amendments to conditions, specifications, and bills of quantities after bid submission are prohibited unless in accordance with the Law and Regulations.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter One',
          chapter_title: 'Equality and Transparency'
        },
        {
          id: '2',
          article_number: 'Article 2',
          article_title: 'Planning Requirements',
          article_body: 'Procurement must fulfill public interest, meet actual needs, ensure quality, and align with strategic plans.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Two',
          chapter_title: 'Advance Planning'
        },
        {
          id: '3',
          article_number: 'Article 3',
          article_title: 'Annual Procurement Plan',
          article_body: '1. Government Authorities shall publish annual plans including type, location, and procurement method of works.\n\n2. Projects related to national security are excluded.\n\n3. Plans shall be published on the E-Portal and remain available until tenders are issued.\n\n4. Information shall be kept continuously updated.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Two',
          chapter_title: 'Advance Planning'
        },
        {
          id: '4',
          article_number: 'Article 4',
          article_title: 'Qualification of Foreign Contractors',
          article_body: '1. Contracting non-licensed foreign entities is subject to E-Portal announcement, Ministry of Investment approval, qualification, and local content preference.\n\n2. Procurement must follow methods outlined in the Law and Regulations.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Three',
          chapter_title: 'Foreign Contractors'
        },
        {
          id: '5',
          article_number: 'Article 5',
          article_title: 'Procurement Outside the Kingdom',
          article_body: 'Exemptions apply to Article (9) and Clause (1) of Article (55) of the Law regarding language use and documentation.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Four',
          chapter_title: 'Works Outside the Kingdom'
        },
        {
          id: '6',
          article_number: 'Article 6',
          article_title: 'Unified Procurement Agency',
          article_body: 'The CSE shall develop procurement strategies, create frequently required works lists, and follow up on procurement data.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Five',
          chapter_title: 'Unified Procurement Agency'
        },
        {
          id: '7',
          article_number: 'Article 7',
          article_title: 'CSE Review Requirements',
          article_body: 'For procurements over 25M SAR, feasibility studies and tender documents must be submitted to CSE for review within 15 working days.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Five',
          chapter_title: 'Unified Procurement Agency'
        },
        {
          id: '8',
          article_number: 'Article 8',
          article_title: 'E-Portal Requirements',
          article_body: '1. The E-Portal must include legal documents, guidelines, plans, procurement frameworks, and notifications.\n\n2. It must enable all procurement lifecycle actions digitally.\n\n3. Failure of the E-Portal for over three days requires offline processing with mandatory upload once restored.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Six',
          chapter_title: 'Electronic Portal'
        },
        {
          id: '9',
          article_number: 'Article 9',
          article_title: 'E-Portal Features',
          article_body: '1. The E-Portal must include usage instructions and ensure data confidentiality.\n\n2. It shall publish full tender details and allow access to bidder inquiries anonymously.\n\n3. It must offer reports and statistics for supervisory oversight.\n\n4. Sensitive security-related procurement may be excluded from E-Portal filing but records must be maintained.\n\n5. Contractor data should be accessible across government entities.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Six',
          chapter_title: 'Electronic Portal'
        },
        {
          id: '13',
          article_number: 'Article 13',
          article_title: 'Required Documents',
          article_body: '1. Entities must submit valid commercial licenses, tax and GOSI certificates, Saudization proof, and other required documents.\n\n2. Documents must be valid at the time of bid opening.\n\n3. Nonprofits must show registration proof.\n\n4. Foreign bidders for works abroad are exempt from all except commercial registration and other required documents.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Seven',
          chapter_title: 'Conditions of Dealing with the Government Authorities'
        },
        {
          id: '14',
          article_number: 'Article 14',
          article_title: 'Prohibited Dealings',
          article_body: '1. Government and contractors are prohibited from dealing with public servants, insolvent individuals, or minors.\n\n2. Certain exceptions apply (e.g., personal use, intellectual property).',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Seven',
          chapter_title: 'Conditions of Dealing with the Government Authorities'
        },
        {
          id: '15',
          article_number: 'Article 15',
          article_title: 'Qualification Requirements',
          article_body: '1. Pre-qualification is required for high-value projects over SAR 50M.\n\n2. Post-qualification is mandatory if pre-qualification is not done.\n\n3. Qualification older than one year is not valid without reassessment.\n\n4. Contest and emergency procurements under SAR 100K may be exempt.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Eight',
          chapter_title: 'Qualifying of Bidders'
        },
        {
          id: '16',
          article_number: 'Article 16',
          article_title: 'Post-Qualification',
          article_body: '1. Post-qualification is mandatory if one year passes since pre-qualification.\n\n2. Failure to qualify results in selection of next bidder.\n\n3. Same criteria from pre-qualification must apply to post-qualification.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Eight',
          chapter_title: 'Qualifying of Bidders'
        },
        {
          id: '17',
          article_number: 'Article 17',
          article_title: 'Qualification Criteria',
          article_body: '1. Qualification must include financial, technical, and administrative criteria and prior performance.\n\n2. Criteria must be objective, non-discriminatory, and serve public interest.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Eight',
          chapter_title: 'Qualifying of Bidders'
        },
        {
          id: '18',
          article_number: 'Article 18',
          article_title: 'Pre-Qualification Announcement',
          article_body: 'Pre-qualification announcements must state entity name, project scope, criteria, deadlines, and announcement date of qualified parties.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Eight',
          chapter_title: 'Qualifying of Bidders'
        },
        {
          id: '19',
          article_number: 'Article 19',
          article_title: 'Qualification Results',
          article_body: '1. If only one party qualifies, the authority may requalify or cancel and use post-qualification.\n\n2. Unsuccessful bidders must be notified with reasons.\n\n3. Qualified bidders proceed to bidding.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Eight',
          chapter_title: 'Qualifying of Bidders'
        },
        {
          id: '20',
          article_number: 'Article 20',
          article_title: 'Qualification Committees',
          article_body: '1. Pre/post-qualification committees must include at least 3 members and one technical expert.\n\n2. Memberships must not overlap with other committees.\n\n3. Committees must be reformed every 3 years.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Eight',
          chapter_title: 'Qualifying of Bidders'
        },
        {
          id: '21',
          article_number: 'Article 21',
          article_title: 'Tender Document Requirements',
          article_body: '1. Tender documents must include bid instructions, specifications, evaluation criteria, and contract terms.\n\n2. They must also include bid bond, framework terms, standstill period, and any additional relevant documents.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Nine',
          chapter_title: 'Tender Documents'
        },
        {
          id: '22',
          article_number: 'Article 22',
          article_title: 'Document Provision',
          article_body: '1. Hard copies of tender documents must be provided when technical limitations prevent digital copies.\n\n2. Soft copies must be numbered.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Nine',
          chapter_title: 'Tender Documents'
        },
        {
          id: '23',
          article_number: 'Article 23',
          article_title: 'Document Pricing',
          article_body: '1. Document cost must reflect only preparation costs.\n\n2. Technical and consulting preparation costs must not be included in pricing.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Nine',
          chapter_title: 'Tender Documents'
        },
        {
          id: '24',
          article_number: 'Article 24',
          article_title: 'Specifications',
          article_body: '1. Specifications must avoid naming specific brands, items, or vendors.\n\n2. Works without defined specifications are not allowed unless legally permitted.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Ten',
          chapter_title: 'Conditions, Specifications & Obligations'
        },
        {
          id: '25',
          article_number: 'Article 25',
          article_title: 'Contract Funding',
          article_body: '1. Contracts may not be signed without allocated funds unless allowed in urgent situations.\n\n2. Tender documents must state that no legal obligations arise before contract signing.\n\n3. Cash flow commitments must be clearly defined for multi-year contracts.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Ten',
          chapter_title: 'Conditions, Specifications & Obligations'
        },
        {
          id: '26',
          article_number: 'Article 26',
          article_title: 'Project Updates',
          article_body: 'Project data, plans, and specifications must be updated before tendering, especially if outdated.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Ten',
          chapter_title: 'Conditions, Specifications & Obligations'
        },
        {
          id: '27',
          article_number: 'Article 27',
          article_title: 'Cost Estimation',
          article_body: '1. Estimated prices must be based on prevailing market rates, previous projects, official references, and must be encrypted.\n\n2. Confidentiality of estimates is mandatory.\n\n3. Tenders must be aborted if estimates are not prepared.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Eleven',
          chapter_title: 'Estimated Cost'
        },
        {
          id: '28',
          article_number: 'Article 28',
          article_title: 'Evaluation Rules',
          article_body: '1. CSE prepares rules for bid evaluation criteria.\n\n2. Evaluation must align with pricing and non-pricing factors.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Twelve',
          chapter_title: 'Bid Evaluation Criteria'
        },
        {
          id: '29',
          article_number: 'Article 29',
          article_title: 'Evaluation Criteria',
          article_body: '1. Criteria must serve public interest, not target specific bidders.\n\n2. For simple procurements, lowest compliant bid may be selected.\n\n3. Consulting services should favor technical evaluation.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Twelve',
          chapter_title: 'Bid Evaluation Criteria'
        },
        {
          id: '30',
          article_number: 'Article 30',
          article_title: 'Tender Division',
          article_body: '1. Division must not circumvent procurement methods.\n\n2. Tender documents must state items to be divided and award method.\n\n3. Division must be logical and serve the public interest.\n\n4. CSE consent is needed for dividing similar items.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Thirteen',
          chapter_title: 'Division of Tender'
        },
        {
          id: '31',
          article_number: 'Article 31',
          article_title: 'Joint Bidding',
          article_body: '1. Joint bids are allowed if based on notarized agreements.\n\n2. All members are jointly liable and must sign the bid.\n\n3. One party must act as legal representative.\n\n4. Amendments require approval; joint bids with member withdrawal may be dismissed unless one member qualifies alone.',
          part_number: 'Part One',
          part_title: 'General Rules',
          chapter_number: 'Chapter Fourteen',
          chapter_title: 'Solidarity'
        },
        {
          id: '113',
          article_number: 'Article 113',
          article_title: 'Contract Price Adjustment',
          article_body: 'Compensation is permissible if:\n\n1. Customs tariffs, fees, taxes, or priced materials/services change after offer submission.\n\n2. Contractor proves actual payment based on new rates.\n\n3. Price increase is not due to contractor\'s delay.\n\nMaterial Price Adjustments:\n• Applies if market price change >10% for materials (cement, iron, asphalt, etc.).\n• Adjustment only if total contract cost impact >3%.\n• Compensation is capped at 20% of total contract value.',
          part_number: 'Part Four',
          part_title: 'Contract Execution',
          chapter_number: 'Chapter Five',
          chapter_title: 'Contract Management'
        },
        {
          id: '114',
          article_number: 'Article 114',
          article_title: 'Additional Works',
          article_body: 'Rules for additional works and amendments:\n\n1. Additional work must be within the general scope of the original contract.\n\n2. Proper funding must be available before approval.\n\n3. If contractor disagrees with pricing, government entity may seek other contractors.',
          part_number: 'Part Four',
          part_title: 'Contract Execution',
          chapter_number: 'Chapter Five',
          chapter_title: 'Contract Management'
        },
        {
          id: '115',
          article_number: 'Article 115',
          article_title: 'Contract Amendments',
          article_body: 'Rules for contract amendments and restrictions:\n\n1. Amendments must be in writing and signed by both parties.\n\n2. Amendments must not alter the nature of the contract.\n\n3. Amendments must be within the limits specified in Article 69 of the Law.',
          part_number: 'Part Four',
          part_title: 'Contract Execution',
          chapter_number: 'Chapter Five',
          chapter_title: 'Contract Management'
        },
        {
          id: '116',
          article_number: 'Article 116',
          article_title: 'Contractor Obligations',
          article_body: 'Rules for modifying contractor obligations:\n\n1. Contractor cannot perform additional works without written approval.\n\n2. No compensation for unauthorized works, even if beneficial to the project.\n\n3. Contractor may be required to remove unauthorized works at their own expense.',
          part_number: 'Part Four',
          part_title: 'Contract Execution',
          chapter_number: 'Chapter Five',
          chapter_title: 'Contract Management'
        },
        {
          id: '153',
          article_number: 'Article 153',
          article_title: 'Grievance Procedures',
          article_body: 'Grievance procedures (guarantee requirement):\n\n1. Grievances must be submitted within the specified timeframe.\n\n2. A financial guarantee may be required for certain types of grievances.\n\n3. The committee shall issue its decision within the period specified in the Law.',
          part_number: 'Part Four',
          part_title: 'Dispute Resolution',
          chapter_number: 'Chapter Seven',
          chapter_title: 'Complaints and Appeals'
        },
        {
          id: '154',
          article_number: 'Article 154',
          article_title: 'Arbitration Agreements',
          article_body: 'Arbitration is only permitted for contracts with a value exceeding SAR 100 million. Prior approval from the Minister of Finance is required before initiating any arbitration proceedings. Arbitration shall be conducted in accordance with the Saudi Arbitration Law and its procedures.',
          part_number: 'Part Four',
          part_title: 'Dispute Resolution',
          chapter_number: 'Chapter Seven',
          chapter_title: 'Complaints and Appeals'
        },
        {
          id: '155',
          article_number: 'Article 155',
          article_title: 'Technical Disputes Council',
          article_body: 'In case of a technical dispute between the government entity and the contractor that could lead to project failure or significant harm to either or both parties, a council shall be formed to consider the dispute, consisting of a representative from the government entity, a representative from the contractor, and a chairperson appointed by the Ministry. The council shall issue its decision within thirty days, which may be extended by fifteen days in case of objections. The council\'s decision shall be binding if accepted by both parties.',
          part_number: 'Part Four',
          part_title: 'Dispute Resolution',
          chapter_number: 'Chapter Seven',
          chapter_title: 'Complaints and Appeals'
        }
      ];
      
      setArticles(mockArticles);
      
      // Generate TOC items
      const toc = generateTocItems(mockArticles);
      setTocItems(toc);
      
      // Expand the first part by default
      if (toc.length > 0) {
        setExpandedSections([toc[0].id]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate TOC items from articles
  const generateTocItems = (articles: Article[]): TocItem[] => {
    const partMap: Record<string, TocItem> = {};
    const chapterMap: Record<string, TocItem> = {};
    const articleMap: Record<string, TocItem> = {};
    
    // First, create parts
    articles.forEach(article => {
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

  const navigateToLawArticle = (lawArticle: string) => {
    // Convert to kebab case for URL
    const articleId = lawArticle.toLowerCase().replace(/\s+/g, '-');
    
    // Navigate to the law article
    handleModuleChange('gtpl-rc128-part-selector', 'Overview');
    
    // Add a hash to the URL to scroll to the specific article
    window.location.hash = articleId;
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
    
    return matchesSearch;
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
            <h2 className="text-lg font-semibold text-gray-900">GTPL RC 128 Regulation</h2>
            {isMobile && (
              <button 
                onClick={() => setShowToc(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <ArrowLeft size={20} className="text-gray-500" />
              </button>
            )}
          </div>
          <div className="flex mt-4">
            <button
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg ${
                language === 'en'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <button
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg ${
                language === 'ar'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setLanguage('ar')}
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
              placeholder={language === 'en' ? "Search articles..." : "البحث في المواد..."}
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
          <div className="space-y-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
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
                const relatedLawArticles = getRelatedLawArticles(article.article_number);
                
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
                      
                      {/* Related Law Articles */}
                      {relatedLawArticles.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="text-md font-medium text-gray-800 mb-3">Related Law Articles</h4>
                          <div className="flex flex-wrap gap-2">
                            {relatedLawArticles.map((lawArticle, index) => (
                              <button
                                key={index}
                                onClick={() => navigateToLawArticle(lawArticle)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                              >
                                <FileText size={14} />
                                <span>{lawArticle}</span>
                                <ExternalLink size={12} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6 text-sm text-gray-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">Part:</span> {article.part_number} - {article.part_title}
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

export default GtplRC128RegulationViewer;