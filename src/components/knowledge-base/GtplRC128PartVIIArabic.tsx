import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle } from 'lucide-react';

// Define the clause structure
interface Clause {
  part: string;
  chapter: string;
  clause: string;
  text: string;
}

// Part VII clauses data in Arabic
const partVIIClausesArabic: Clause[] = [
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 89",
    text: "يجوز للجهات الحكومية التعاقد فيما بينها بالاتفاق المباشر، بشرط أن تتولى تنفيذ الأعمال أو المشتريات بنفسها. ويجوز لها أن تنوب عن بعضها في إجراءات التعاقد."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 90",
    text: "يتم التعاقد مباشرة مع الأشخاص المرخصين دون وسطاء. ولا يعد الموزعون أو الوكلاء المعتمدون من المنتجين الأصليين وسطاء."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 91",
    text: "تستخدم الجهة الحكومية النماذج المعتمدة للعقود ووثائق المنافسة ووثائق التأهيل المسبق وتقييم أداء المتعاقدين وأي وثائق أخرى تتطلبها طبيعة الأعمال أو المشتريات."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 92",
    text: "١. يجب على الجهة الحكومية الوفاء بالتزاماتها التعاقدية. وإذا أخلت بذلك، جاز للمتعاقد معها التقدم إلى المحكمة الإدارية للمطالبة بالتعويض. ٢. يجوز للجهة الحكومية -بعد موافقة الوزير- الاتفاق على اللجوء إلى التحكيم، وفقاً لما توضحه اللائحة. ٣. تحدد اللائحة الطرق الأخرى لتسوية الخلافات التي قد تنشأ أثناء تنفيذ العقود."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 93",
    text: "تلتزم الشركات التي تتولى تنفيذ الأعمال والمشتريات نيابة عن الجهات الحكومية بأحكام النظام."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 94",
    text: "يخضع أي موظف يخالف أياً من أحكام النظام للمساءلة التأديبية، وفقاً لنظام تأديب الموظفين ونظام العمل والأنظمة الجزائية ذات الصلة. وللجهة الحكومية -عند الاقتضاء- رفع دعوى مدنية."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 95",
    text: "إذا نشأت حاجة إلى استثناء أي حكم من أحكام النظام، يرفع طلب بذلك إلى رئيس مجلس الوزراء لتشكيل لجنة لا يقل عدد أعضائها عن ثلاثة، من بينهم الوزير ورئيس مجلس إدارة الهيئة ورئيس الجهة المعنية. وتتولى اللجنة دراسة طلب الاستثناء وتسبيبه ورفع ما تراه إلى رئيس مجلس الوزراء للبت فيه."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 96",
    text: "تعد الوزارة اللوائح الآتية: ١. لائحة تنظيم تعارض المصالح. ٢. لائحة قواعد السلوك وأخلاقيات المهنة. ٣. لائحة تفضيل المحتوى المحلي والمنشآت الصغيرة والمتوسطة المحلية والشركات المدرجة في السوق المالية. وتحدد هذه اللوائح طرق التفضيل والعقوبات المقررة، وتصدر من مجلس الوزراء خلال (مائة وعشرين) يوماً من تاريخ نشر النظام في الجريدة الرسمية، وتدخل حيز النفاذ مع النظام."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 97",
    text: "يصدر الوزير اللائحة التنفيذية خلال (مائة وعشرين) يوماً من تاريخ نشر النظام في الجريدة الرسمية، وتدخل حيز النفاذ مع النظام."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 98",
    text: "يحل هذا النظام محل نظام المنافسات والمشتريات الحكومية الصادر بالمرسوم الملكي رقم (م/٥٨) وتاريخ ٤/٩/١٤٢٧هـ، ويلغي ما يتعارض معه من أحكام."
  },
  {
    part: "الباب السابع: أحكام ختامية",
    chapter: "الفصل الأول: الأحكام الختامية والانتقالية",
    clause: "المادة 99",
    text: "يعمل بهذا النظام بعد مضي (مائة وعشرين) يوماً من تاريخ نشره في الجريدة الرسمية."
  }
];

// Group clauses by chapter
const groupClausesByChapter = (clauses: Clause[]) => {
  const chapters: Record<string, Clause[]> = {};
  
  clauses.forEach(clause => {
    if (!chapters[clause.chapter]) {
      chapters[clause.chapter] = [];
    }
    chapters[clause.chapter].push(clause);
  });
  
  return chapters;
};

const GtplRC128PartVIIArabic = () => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partVIIClausesArabic);
  
  const toggleChapter = (chapter: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapter) 
        ? prev.filter(c => c !== chapter) 
        : [...prev, chapter]
    );
  };
  
  const toggleClause = (clause: string) => {
    setExpandedClauses(prev => 
      prev.includes(clause) 
        ? prev.filter(c => c !== clause) 
        : [...prev, clause]
    );
  };
  
  const copyToClipboard = (text: string, clause: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(clause);
      setTimeout(() => setCopySuccess(null), 2000);
    });
  };
  
  // Filter clauses based on search term
  const filteredClauses = searchTerm 
    ? partVIIClausesArabic.filter(clause => 
        clause.clause.includes(searchTerm) ||
        clause.text.includes(searchTerm) ||
        clause.chapter.includes(searchTerm)
      )
    : partVIIClausesArabic;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">نظام المنافسات والمشتريات الحكومية - الباب السابع</h1>
            <p className="text-gray-500">الأحكام الختامية</p>
          </div>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="البحث في المواد..."
            className="pr-10 pl-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <div>
              <p className="font-medium text-blue-900">حول الباب السابع</p>
              <p className="text-sm text-blue-700 mt-1">
                يتناول الباب السابع من نظام المنافسات والمشتريات الحكومية (GTPL RC 128) الأحكام الختامية، بما في ذلك الأحكام الختامية والانتقالية، وآليات تسوية المنازعات، والجدول الزمني لتنفيذ النظام.
              </p>
            </div>
            <Info size={20} className="text-blue-600 mt-1" />
          </div>
        </div>
      </div>
      
      {/* Chapters and Clauses */}
      <div className="space-y-6">
        {Object.entries(filteredChapters).length === 0 ? (
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500">لم يتم العثور على مواد تطابق بحثك.</p>
          </div>
        ) : (
          Object.entries(filteredChapters).map(([chapter, clauses]) => (
            <div key={chapter} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div 
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleChapter(chapter)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {expandedChapters.includes(chapter) ? (
                      <ChevronDown size={20} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">{chapter}</h2>
                    <Scale size={20} className="text-blue-600" />
                  </div>
                </div>
              </div>
              
              {expandedChapters.includes(chapter) && (
                <div className="p-4 space-y-4">
                  {clauses.map((clause) => (
                    <div 
                      key={clause.clause} 
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleClause(clause.clause)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {expandedClauses.includes(clause.clause) ? (
                              <ChevronDown size={16} className="text-gray-400" />
                            ) : (
                              <ChevronRight size={16} className="text-gray-400" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(clause.text, clause.clause);
                              }}
                              className="p-1 hover:bg-gray-100 rounded-md"
                              title="نسخ نص المادة"
                            >
                              {copySuccess === clause.clause ? (
                                <CheckCircle size={16} className="text-green-500" />
                              ) : (
                                <Copy size={16} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{clause.clause}</h3>
                            <Gavel size={16} className="text-blue-600" />
                          </div>
                        </div>
                      </div>
                      
                      {expandedClauses.includes(clause.clause) && (
                        <div className="p-4 bg-gray-50">
                          <div className="whitespace-pre-line text-gray-700 text-right">
                            {clause.text.split('\n').map((paragraph, idx) => (
                              <p key={idx} className="mb-2">{paragraph}</p>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyToClipboard(clause.text, clause.clause)}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                              >
                                <span>نسخ النص</span>
                                <Copy size={14} />
                              </button>
                              <button
                                onClick={() => copyToClipboard(`${clause.part} - ${clause.chapter} - ${clause.clause}`, clause.clause)}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                              >
                                <span>نسخ المرجع</span>
                                <Link size={14} />
                              </button>
                            </div>
                            <div className="text-sm text-gray-500">
                              الباب السابع - {clause.clause}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-8 text-left">
        <p className="text-sm text-gray-500">المصدر: نظام المنافسات والمشتريات الحكومية (GTPL RC 128)</p>
      </div>
    </div>
  );
};

export default GtplRC128PartVIIArabic;