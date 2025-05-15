import React, { useState, useEffect } from 'react';
import { Book, ChevronDown, ChevronUp, Download, Search, Info, Scale, Gavel, FileText, AlertCircle, CheckCircle, Clock, Copy, Link, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../contexts/AppContext';

// Define the article structure
interface Article {
  id: string;
  article_number: string;
  article_title_en: string;
  article_title_ar: string;
  article_body_en: string;
  article_body_ar: string;
  source_type: string;
  linked_articles: string[] | null;
}

const DisputeArbitrationGuide = () => {
  const { handleModuleChange } = useApp();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchArticles();
    
    // Check if there's a hash in the URL to auto-expand that section
    const hash = window.location.hash;
    if (hash) {
      const articleId = hash.substring(1);
      setActiveSection(articleId);
      setExpandedArticles(prev => [...prev, articleId]);
      
      // Scroll to the section after a short delay to ensure it's rendered
      setTimeout(() => {
        const element = document.getElementById(articleId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gtpl_dispute_arbitration_guide')
        .select('*')
        .order('article_number');

      if (error) throw error;
      setArticles(data || []);
      
      // Auto-expand the first article if none is expanded
      if (data && data.length > 0 && !window.location.hash) {
        setExpandedArticles([data[0].article_number]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Use mock data if database fetch fails
      const mockArticles = [
        {
          id: '1',
          article_number: 'Article 86',
          article_title_en: 'Committee for Complaints and Grievances',
          article_title_ar: 'المادة (86): لجنة النظر في الشكاوى والتظلمات',
          article_body_en: '1. Pursuant to a decision by the Minister, one or more committees shall be formed for a term of three years, each composed of at least five specialists. Said decision shall designate the committee chairman and deputy and shall name one or more substitute members. Membership of such committees may be renewed. A decision issued by the Minister shall specify committee work procedures and determine remunerations of committee members and secretary.\n\n2. The committee shall consider the following:\na) Appeals filed by bidders against the awarding decision or any decision or action taken by the government agency prior to the awarding decision.\nb) Appeals filed by contractors against performance assessment decisions.\nc) Price adjustment requests, in accordance with Article 68 of this Law.\n\n3. Committee decisions shall be binding to government agencies.\n\n4. An appellant shall submit a guarantee, equal to half the amount of the initial guarantee. Such guarantee shall be returned if the appeal is successful.',
          article_body_ar: '1. تكوّن بقرار من الوزير لجنة أو أكثر من المختصين، لا يقل عددهم عن خمسة ويحدد فيه رئيس اللجنة ونائبه، ويُنص في القرار على عضو احتياطي أو أكثر. ويعاد تشكيل هذه اللجنة كل ثلاث سنوات، ويجوز تجديد العضوية فيها. ويصدر الوزير قراراً يحدد قواعد عمل اللجنة وإجراءاتها، ويحدد مكافآت أعضائها وسكرتيرها.\n\n2. تختص اللجنة بما يلي:\nأ- النظر في تظلمات المتنافسين من قرار الترسية أو من أي قرار أو إجراء تتخذه الجهة الحكومية قبل قرار الترسية.\nب- النظر في تظلمات المتعاقد معهم من قرارات تقييم الأداء.\nج- النظر في طلبات تعديل الأسعار وفقاً لأحكام المادة (الثامنة والستين) من النظام.\n\n3. تكون قرارات اللجنة ملزمة للجهة الحكومية.\n\n4. يقدم المتظلم ضماناً يساوي نصف قيمة الضمان الابتدائي؛ يعاد إليه إذا ثبت صحة التظلم.',
          source_type: 'GTPL RC128 Law',
          linked_articles: ['Article 153']
        },
        {
          id: '2',
          article_number: 'Article 87',
          article_title_en: 'Grievance Procedures',
          article_title_ar: 'المادة (87): إجراءات التظلم',
          article_body_en: 'The Implementing Regulations shall specify the procedures for filing and considering grievances, the time limits for filing and deciding on them, and the fees for filing grievances.',
          article_body_ar: 'تحدد اللائحة التنفيذية إجراءات تقديم التظلمات والنظر فيها، والمدد الزمنية اللازمة لتقديمها والبت فيها، ومقابل تقديم التظلمات.',
          source_type: 'GTPL RC128 Law',
          linked_articles: ['Article 153']
        },
        {
          id: '3',
          article_number: 'Article 88',
          article_title_en: 'Violations by Contractors',
          article_title_ar: 'المادة (88): مخالفات المتعاقدين',
          article_body_en: 'The Implementing Regulations shall specify the procedures for considering violations by contractors, the committee or committees that consider them, and the penalties that may be imposed on violators.',
          article_body_ar: 'تحدد اللائحة التنفيذية إجراءات النظر في مخالفات المتعاقدين، واللجنة أو اللجان التي تتولى النظر فيها، والعقوبات التي يجوز توقيعها على المخالفين.',
          source_type: 'GTPL RC128 Law',
          linked_articles: ['Article 154']
        },
        {
          id: '4',
          article_number: 'Article 154',
          article_title_en: 'Arbitration Provisions',
          article_title_ar: 'المادة (154): أحكام التحكيم',
          article_body_en: 'Government entities may not resort to arbitration for resolving disputes arising from their contracts except after obtaining the approval of the Minister. Arbitration shall be conducted in accordance with the Saudi Arbitration Law and its procedures. Arbitration is not permitted for disputes arising from contracts with a value of less than one hundred million riyals.',
          article_body_ar: 'لا يجوز للجهات الحكومية اللجوء إلى التحكيم لفض المنازعات التي تنشأ عن عقودها إلا بعد موافقة الوزير، ويكون التحكيم وفقاً لنظام التحكيم السعودي وإجراءاته. ولا يجوز قبول التحكيم في المنازعات الناشئة عن العقود التي تقل قيمتها عن مائة مليون ريال.',
          source_type: 'GTPL RC128 Regulation',
          linked_articles: ['Article 86', 'Article 87']
        },
        {
          id: '5',
          article_number: 'Article 155',
          article_title_en: 'Technical Dispute Resolution',
          article_title_ar: 'المادة (155): تسوية المنازعات الفنية',
          article_body_en: 'In case of a technical dispute between the government entity and the contractor that could lead to project failure or significant harm to either or both parties, a council shall be formed to consider the dispute, consisting of a representative from the government entity, a representative from the contractor, and a chairperson appointed by the Ministry. The council shall issue its decision within thirty days, which may be extended by fifteen days in case of objections. The council\'s decision shall be binding if accepted by both parties.',
          article_body_ar: 'في حال نشوء خلاف فني بين الجهة الحكومية والمتعاقد معها، يكون من شأنه أن يؤدي إلى تعثر المشروع أو إلحاق ضرر بالطرفين أو بأحدهما، يشكل مجلس للنظر في الخلاف يضم ممثلاً عن الجهة الحكومية وممثلاً عن المتعاقد ورئيساً من الوزارة. ويصدر المجلس قراره خلال ثلاثين يوماً، ويكون قراره ملزماً إذا قبله الطرفان.',
          source_type: 'GTPL RC128 Regulation',
          linked_articles: ['Article 86', 'Article 87']
        }
      ];
      setArticles(mockArticles as any);
      
      // Auto-expand the first article if none is expanded
      if (mockArticles.length > 0) {
        setExpandedArticles([mockArticles[0].article_number]);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleArticle = (articleNumber: string) => {
    setExpandedArticles(prev => 
      prev.includes(articleNumber)
        ? prev.filter(a => a !== articleNumber)
        : [...prev, articleNumber]
    );
  };

  const copyLinkToClipboard = (articleNumber: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${articleNumber.replace(' ', '-').toLowerCase()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(articleNumber);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    
    // Simulate PDF generation/download process
    setTimeout(() => {
      // In a real implementation, this would be a link to an actual PDF file
      const element = document.createElement('a');
      element.href = '/assets/dispute_arbitration_guide.pdf';
      element.download = 'GTPL_RC128_Dispute_Arbitration_Guide.pdf';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setIsDownloading(false);
    }, 1500);
  };

  // Format content with proper paragraph breaks
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4 text-gray-700">
        {paragraph}
      </p>
    ));
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter(article => {
    const searchLower = searchTerm.toLowerCase();
    return (
      article.article_number.toLowerCase().includes(searchLower) ||
      article.article_title_en.toLowerCase().includes(searchLower) ||
      article.article_title_ar.toLowerCase().includes(searchLower) ||
      article.article_body_en.toLowerCase().includes(searchLower) ||
      article.article_body_ar.toLowerCase().includes(searchLower)
    );
  });

  // Group articles by source type
  const lawArticles = filteredArticles.filter(article => article.source_type === 'GTPL RC128 Law');
  const regulationArticles = filteredArticles.filter(article => article.source_type === 'GTPL RC128 Regulation');

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Sidebar - Table of Contents */}
      <div className="w-full lg:w-1/4 lg:h-full lg:overflow-y-auto border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200 bg-blue-600 text-white">
          <h2 className="text-lg font-semibold">Table of Contents</h2>
        </div>
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Law Articles Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 py-2 px-3 bg-blue-50 rounded-lg mb-2">
              <Scale size={18} className="text-blue-600" />
              <h3 className="font-medium text-blue-800">GTPL RC 128 Law</h3>
            </div>
            <ul className="space-y-2 pl-2">
              {lawArticles.map(article => (
                <li key={article.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                      expandedArticles.includes(article.article_number)
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleArticle(article.article_number)}
                    id={article.article_number.replace(' ', '-').toLowerCase()}
                  >
                    <span>{article.article_number}</span>
                    {expandedArticles.includes(article.article_number) ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Regulation Articles Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 py-2 px-3 bg-purple-50 rounded-lg mb-2">
              <Gavel size={18} className="text-purple-600" />
              <h3 className="font-medium text-purple-800">GTPL RC 128 Regulation</h3>
            </div>
            <ul className="space-y-2 pl-2">
              {regulationArticles.map(article => (
                <li key={article.id}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                      expandedArticles.includes(article.article_number)
                        ? 'bg-purple-50 text-purple-600'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleArticle(article.article_number)}
                    id={article.article_number.replace(' ', '-').toLowerCase()}
                  >
                    <span>{article.article_number}</span>
                    {expandedArticles.includes(article.article_number) ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Additional Sections */}
          <div className="mb-4">
            <div className="flex items-center gap-2 py-2 px-3 bg-green-50 rounded-lg mb-2">
              <FileText size={18} className="text-green-600" />
              <h3 className="font-medium text-green-800">Additional Resources</h3>
            </div>
            <ul className="space-y-2 pl-2">
              <li>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => toggleArticle('arbitration-workflow')}
                  id="arbitration-workflow"
                >
                  <span>Arbitration Workflow</span>
                  {expandedArticles.includes('arbitration-workflow') ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => toggleArticle('best-practices')}
                  id="best-practices"
                >
                  <span>Best Practices</span>
                  {expandedArticles.includes('best-practices') ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </button>
              </li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDownloading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isDownloading ? (
                <>
                  <Clock size={16} className="animate-spin" />
                  <span>Preparing PDF...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Download Guide PDF</span>
                </>
              )}
            </button>
            <button 
              onClick={() => handleModuleChange('claims-management-hub', 'Overview')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              <span>Back to Claims Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-2xl font-bold">Dispute & Arbitration Guide</h1>
          <p className="mt-2">GTPL RC 128 Dispute Resolution and Arbitration Provisions</p>
          
          <div className="flex items-center mt-4 space-x-4">
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                language === 'en'
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white'
              }`}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                language === 'ar'
                  ? 'bg-white text-blue-600'
                  : 'bg-blue-700 text-white'
              }`}
              onClick={() => setLanguage('ar')}
            >
              العربية
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-8 px-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Introduction Section */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 mb-4">
                  The Saudi Government Tenders and Procurement Law (GTPL) RC 128 provides comprehensive frameworks for dispute resolution and arbitration in government contracts. This guide outlines the key provisions related to grievances, complaints, arbitration, and technical dispute resolution.
                </p>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Important Note</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Proper understanding and application of these provisions is essential for effective contract management and dispute resolution. Always consult with legal experts when dealing with complex disputes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Law Articles */}
              {lawArticles.map(article => (
                <div 
                  key={article.id} 
                  className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${
                    expandedArticles.includes(article.article_number) ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Scale size={24} className="text-blue-600" />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{article.article_number}</h2>
                        <p className="text-sm text-gray-500">GTPL RC 128 Law</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyLinkToClipboard(article.article_number)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Copy link to article"
                      >
                        {copySuccess === article.article_number ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <Link size={16} className="text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleArticle(article.article_number)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        {expandedArticles.includes(article.article_number) ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    {language === 'en' ? article.article_title_en : article.article_title_ar}
                  </h3>

                  {expandedArticles.includes(article.article_number) && (
                    <div className="mt-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* English Content */}
                        <div className={language === 'ar' ? 'order-2' : 'order-1'}>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">English</h4>
                            <div className="text-blue-900">
                              {formatContent(article.article_body_en)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Arabic Content */}
                        <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2 text-right">العربية</h4>
                            <div className="text-blue-900 text-right" dir="rtl">
                              {formatContent(article.article_body_ar)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Linked Articles */}
                      {article.linked_articles && article.linked_articles.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-700 mb-2">Related Articles</h4>
                          <div className="flex flex-wrap gap-2">
                            {article.linked_articles.map((linkedArticle, index) => (
                              <button
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                                onClick={() => {
                                  const element = document.getElementById(linkedArticle.replace(' ', '-').toLowerCase());
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                    setExpandedArticles(prev => 
                                      prev.includes(linkedArticle) ? prev : [...prev, linkedArticle]
                                    );
                                  }
                                }}
                              >
                                {linkedArticle}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Regulation Articles */}
              {regulationArticles.map(article => (
                <div 
                  key={article.id} 
                  className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${
                    expandedArticles.includes(article.article_number) ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Gavel size={24} className="text-purple-600" />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{article.article_number}</h2>
                        <p className="text-sm text-gray-500">GTPL RC 128 Regulation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyLinkToClipboard(article.article_number)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Copy link to article"
                      >
                        {copySuccess === article.article_number ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <Link size={16} className="text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleArticle(article.article_number)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        {expandedArticles.includes(article.article_number) ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    {language === 'en' ? article.article_title_en : article.article_title_ar}
                  </h3>

                  {expandedArticles.includes(article.article_number) && (
                    <div className="mt-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* English Content */}
                        <div className={language === 'ar' ? 'order-2' : 'order-1'}>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-medium text-purple-800 mb-2">English</h4>
                            <div className="text-purple-900">
                              {formatContent(article.article_body_en)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Arabic Content */}
                        <div className={language === 'ar' ? 'order-1' : 'order-2'}>
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-medium text-purple-800 mb-2 text-right">العربية</h4>
                            <div className="text-purple-900 text-right" dir="rtl">
                              {formatContent(article.article_body_ar)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Linked Articles */}
                      {article.linked_articles && article.linked_articles.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-700 mb-2">Related Articles</h4>
                          <div className="flex flex-wrap gap-2">
                            {article.linked_articles.map((linkedArticle, index) => (
                              <button
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                                onClick={() => {
                                  const element = document.getElementById(linkedArticle.replace(' ', '-').toLowerCase());
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                    setExpandedArticles(prev => 
                                      prev.includes(linkedArticle) ? prev : [...prev, linkedArticle]
                                    );
                                  }
                                }}
                              >
                                {linkedArticle}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Arbitration Workflow Section */}
              <div 
                className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${
                  expandedArticles.includes('arbitration-workflow') ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText size={24} className="text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Arbitration Workflow</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyLinkToClipboard('arbitration-workflow')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Copy link to section"
                    >
                      {copySuccess === 'arbitration-workflow' ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Link size={16} className="text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleArticle('arbitration-workflow')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {expandedArticles.includes('arbitration-workflow') ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedArticles.includes('arbitration-workflow') && (
                  <div className="mt-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-medium text-green-800 mb-4">GTPL RC 128 Arbitration Process</h3>
                      
                      <div className="space-y-6">
                        <div className="relative pl-8 pb-6 border-l-2 border-green-300">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                          <h4 className="font-medium text-green-700">1. Ministerial Approval</h4>
                          <p className="text-green-800 mt-2">
                            Government entity must obtain approval from the Minister of Finance before initiating arbitration proceedings.
                          </p>
                        </div>
                        
                        <div className="relative pl-8 pb-6 border-l-2 border-green-300">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                          <h4 className="font-medium text-green-700">2. Contract Value Verification</h4>
                          <p className="text-green-800 mt-2">
                            Verify that the contract value exceeds SAR 100 million, as arbitration is only permitted for contracts above this threshold.
                          </p>
                        </div>
                        
                        <div className="relative pl-8 pb-6 border-l-2 border-green-300">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                          <h4 className="font-medium text-green-700">3. Arbitration Agreement</h4>
                          <p className="text-green-800 mt-2">
                            Draft and sign an arbitration agreement that complies with the Saudi Arbitration Law, specifying the scope, applicable law, and procedural rules.
                          </p>
                        </div>
                        
                        <div className="relative pl-8 pb-6 border-l-2 border-green-300">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                          <h4 className="font-medium text-green-700">4. Arbitrator Selection</h4>
                          <p className="text-green-800 mt-2">
                            Appoint arbitrators according to the agreed procedure, typically one appointed by each party and a chairperson appointed by agreement or by an appointing authority.
                          </p>
                        </div>
                        
                        <div className="relative pl-8 pb-6 border-l-2 border-green-300">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                          <h4 className="font-medium text-green-700">5. Arbitration Proceedings</h4>
                          <p className="text-green-800 mt-2">
                            Conduct arbitration proceedings in accordance with the Saudi Arbitration Law and the agreed procedural rules.
                          </p>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                          <h4 className="font-medium text-green-700">6. Award Enforcement</h4>
                          <p className="text-green-800 mt-2">
                            Enforce the arbitral award through the competent court in accordance with the Saudi Arbitration Law.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Best Practices Section */}
              <div 
                className={`bg-white p-6 rounded-lg border border-gray-200 shadow-sm ${
                  expandedArticles.includes('best-practices') ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={24} className="text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Best Practices</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyLinkToClipboard('best-practices')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="Copy link to section"
                    >
                      {copySuccess === 'best-practices' ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Link size={16} className="text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleArticle('best-practices')}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {expandedArticles.includes('best-practices') ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedArticles.includes('best-practices') && (
                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-3">For Grievances & Complaints</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-blue-700">Submit grievances within the specified timeframes (typically 5-10 days from the decision date)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-blue-700">Provide comprehensive documentation supporting your position</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-blue-700">Include all relevant facts, dates, and reference numbers</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-blue-700">Submit the required guarantee with your grievance</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-medium text-purple-800 mb-3">For Arbitration</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-purple-600 mt-1 flex-shrink-0" />
                            <span className="text-purple-700">Ensure contract value exceeds SAR 100 million before considering arbitration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-purple-600 mt-1 flex-shrink-0" />
                            <span className="text-purple-700">Obtain ministerial approval before initiating arbitration proceedings</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-purple-600 mt-1 flex-shrink-0" />
                            <span className="text-purple-700">Draft clear arbitration agreements that comply with Saudi Arbitration Law</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-purple-600 mt-1 flex-shrink-0" />
                            <span className="text-purple-700">Select qualified arbitrators with relevant expertise</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-medium text-green-800 mb-3">For Technical Disputes</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-green-700">Consider technical dispute resolution for faster resolution (30-45 days)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-green-700">Appoint qualified technical representatives to the dispute council</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-green-700">Prepare comprehensive technical reports with supporting evidence</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-green-700">Continue project work during the dispute resolution process</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h3 className="font-medium text-red-800 mb-3">Common Pitfalls to Avoid</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-red-700">Missing submission deadlines for grievances and appeals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-red-700">Failing to obtain necessary ministerial approvals for arbitration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-red-700">Attempting arbitration for contracts below SAR 100 million</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-red-700">Stopping work during dispute resolution processes</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary Table */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary Table</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left">Mechanism</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Applicable For</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Timeline</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Key Requirements</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-medium">Grievance Committee</td>
                        <td className="border border-gray-200 px-4 py-2">Bidding disputes, Performance assessment, Price adjustments</td>
                        <td className="border border-gray-200 px-4 py-2">As specified in regulations</td>
                        <td className="border border-gray-200 px-4 py-2">Guarantee equal to half the initial guarantee</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 font-medium">Arbitration</td>
                        <td className="border border-gray-200 px-4 py-2">Contracts over SAR 100M</td>
                        <td className="border border-gray-200 px-4 py-2">As per Saudi Arbitration Law</td>
                        <td className="border border-gray-200 px-4 py-2">Ministerial approval, Saudi law application</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-medium">Technical Dispute Council</td>
                        <td className="border border-gray-200 px-4 py-2">Technical disputes affecting project progress</td>
                        <td className="border border-gray-200 px-4 py-2">30 days (+ 15 days extension)</td>
                        <td className="border border-gray-200 px-4 py-2">Representatives from both parties + Ministry chair</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* References Section */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">References</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href="https://ncar.gov.sa/Documents/Details?Id=oCElQIyvsJ%2FH%2BOwE%2F3cZ1A%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                  >
                    <FileText size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">GTPL 128 Full Text (Arabic)</p>
                      <p className="text-sm text-gray-500">Official government publication</p>
                    </div>
                  </a>
                  <a 
                    href="https://www.my.gov.sa/wps/portal/snp/servicesDirectory/servicedetails/9503" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3"
                  >
                    <FileText size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium">Government Tenders and Procurement Law – English Summary</p>
                      <p className="text-sm text-gray-500">Translated reference guide</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeArbitrationGuide;