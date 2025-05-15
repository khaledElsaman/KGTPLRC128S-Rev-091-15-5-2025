import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle } from 'lucide-react';

// Define the regulation article structure
interface RegulationArticle {
  article_no: string;
  title: string;
  text: string;
}

interface Chapter {
  chapter: string;
  articles: RegulationArticle[];
}

interface Part {
  part: string;
  chapters: Chapter[];
}

// GTPL RC 128 Regulation Part One in Arabic
const gtplRC128RegulationPartOne: Part = {
  part: "الباب الأول: أحكام عامة",
  chapters: [
    {
      chapter: "الفصل الأول: التعريفات",
      articles: [
        {
          article_no: "المادة 1",
          title: "التعريفات",
          text: "يقصد بالألفاظ والعبارات الآتية -أينما وردت في هذه اللائحة- المعاني المبينة أمام كل منها، ما لم يقتض السياق غير ذلك:\n\nالنظام: نظام المنافسات والمشتريات الحكومية.\n\nالوزير: وزير المالية.\n\nالوزارة: وزارة المالية.\n\nالهيئة: هيئة المحتوى المحلي والمشتريات الحكومية.\n\nجهة الشراء الموحد: الجهة المكلفة بالشراء الاستراتيجي الموحد، التي تحدد بقرار من مجلس الوزراء.\n\nالجهات الحكومية: الوزارات والأجهزة والمصالح والهيئات والمؤسسات العامة، وغيرها من الجهات ذات الشخصية المعنوية العامة المستقلة.\n\nرئيس الجهة الحكومية: الوزير أو الرئيس أو المحافظ أو المسؤول الأول في الجهة الحكومية.\n\nالبوابة: البوابة الإلكترونية الموحدة للمشتريات الحكومية الخاضعة لإشراف الوزارة."
        }
      ]
    },
    {
      chapter: "الفصل الثاني: نطاق التطبيق",
      articles: [
        {
          article_no: "المادة 2",
          title: "نطاق التطبيق",
          text: "تسري أحكام هذه اللائحة على جميع الجهات الحكومية الخاضعة للنظام. وتطبق أحكام هذه اللائحة على الأعمال والمشتريات التي تنفذ خارج المملكة، مع مراعاة ما يلي:\n\n1. يجوز للجهة الحكومية عند الضرورة استثناء الأعمال والمشتريات التي تنفذ خارج المملكة من بعض أحكام هذه اللائحة، بشرط ألا يخل ذلك الاستثناء بمبادئ المنافسة العادلة وتكافؤ الفرص والشفافية.\n\n2. على الجهة الحكومية عند استثناء الأعمال والمشتريات التي تنفذ خارج المملكة من بعض أحكام هذه اللائحة، توثيق أسباب ذلك الاستثناء."
        }
      ]
    },
    {
      chapter: "الفصل الثالث: التخطيط المسبق",
      articles: [
        {
          article_no: "المادة 3",
          title: "التخطيط المسبق",
          text: "1. تنشر الجهة الحكومية في بداية كل سنة مالية خطة مشترياتها في البوابة. وتتضمن الخطة المعلومات الآتية:\nأ) نوع الأعمال أو المشتريات.\nب) وصفها.\nج) قيمتها التقديرية.\nد) أسلوب طرحها.\nهـ) الوقت المقترح للطرح.\n\n2. تحدّث الجهة الحكومية خطة مشترياتها كلما دعت الحاجة إلى ذلك."
        }
      ]
    }
  ]
};

const GtplRC128RegulationAR = () => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = gtplRC128RegulationPartOne.chapters;
  
  const toggleChapter = (chapter: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapter) 
        ? prev.filter(c => c !== chapter) 
        : [...prev, chapter]
    );
  };
  
  const toggleArticle = (article: string) => {
    setExpandedArticles(prev => 
      prev.includes(article) 
        ? prev.filter(a => a !== article) 
        : [...prev, article]
    );
  };
  
  const copyToClipboard = (text: string, article: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(article);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };
  
  // Filter chapters and articles based on search term
  const filteredChapters = gtplRC128RegulationPartOne.chapters.map(chapter => {
    const filteredArticles = chapter.articles.filter(article => 
      article.title.includes(searchTerm) || 
      article.text.includes(searchTerm) ||
      article.article_no.includes(searchTerm)
    );
    
    return {
      ...chapter,
      articles: filteredArticles
    };
  }).filter(chapter => chapter.articles.length > 0 || chapter.chapter.includes(searchTerm));

  // Format text with proper line breaks
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="p-6" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">لائحة نظام المنافسات والمشتريات الحكومية</h1>
        <div className="flex items-center gap-2">
          <Book className="text-blue-600" size={24} />
          <span className="text-blue-600 font-medium">الباب الأول: أحكام عامة</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="البحث في اللوائح..."
            className="pr-10 pl-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <div>
            <p className="font-medium text-blue-900">حول اللائحة</p>
            <p className="text-sm text-blue-700 mt-1">
              اللائحة التنفيذية لنظام المنافسات والمشتريات الحكومية (GTPL RC 128) الصادرة بقرار وزاري رقم 1242 بتاريخ 21/3/1441هـ
            </p>
          </div>
          <Info size={20} className="text-blue-600 mt-1" />
        </div>
      </div>

      <div className="space-y-6">
        {filteredChapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div 
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleChapter(chapter.chapter)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {expandedChapters.includes(chapter.chapter) ? (
                    <ChevronDown size={20} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">{chapter.chapter}</h2>
                  <Scale size={20} className="text-blue-600" />
                </div>
              </div>
            </div>

            {expandedChapters.includes(chapter.chapter) && (
              <div className="p-4 space-y-4">
                {chapter.articles.map((article, articleIndex) => (
                  <div key={articleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleArticle(`${chapter.chapter}-${article.article_no}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {expandedArticles.includes(`${chapter.chapter}-${article.article_no}`) ? (
                            <ChevronDown size={16} className="text-gray-400" />
                          ) : (
                            <ChevronRight size={16} className="text-gray-400" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(article.text, article.article_no);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-md"
                            title="نسخ نص المادة"
                          >
                            {copySuccess === article.article_no ? (
                              <CheckCircle size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} className="text-gray-400" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{article.article_no}: {article.title}</h3>
                          <FileText size={16} className="text-blue-600" />
                        </div>
                      </div>
                    </div>

                    {expandedArticles.includes(`${chapter.chapter}-${article.article_no}`) && (
                      <div className="p-4 bg-gray-50">
                        <div className="prose max-w-none text-gray-700 text-right">
                          {formatText(article.text)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredChapters.length === 0 && (
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">لا توجد نتائج تطابق بحثك. يرجى تعديل مصطلحات البحث.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GtplRC128RegulationAR;