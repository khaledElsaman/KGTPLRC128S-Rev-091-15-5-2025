import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// Define the clause structure
interface Clause {
  part: string;
  chapter: string;
  clause: string;
  text: string;
}

// Part V clauses data in Arabic
const partVClausesArabic: Clause[] = [
  {
    part: "الباب الخامس: بيع المنقولات",
    chapter: "الفصل الأول: بيع المنقولات",
    clause: "المادة 80",
    text: "للجهة الحكومية التنازل عما تستغني عنه من منقولات إلى الجهات الحكومية والجهات التابعة لها، على أن تشعر الوزارة بذلك. وعلى الجهة المالكة للمنقولات أن تعلن عنها في البوابة، وتبين أنواعها وكمياتها، وتحدد مدة لإبداء الرغبة فيها. وإذا لم تبد أي جهة رغبتها في المنقولات خلال المدة المحددة، جاز بيعها عن طريق المزايدة العامة إذا بلغت قيمتها التقديرية (مائتي ألف) ريال فأكثر، وذلك بعد الإعلان عنها في البوابة وفي الموقع الإلكتروني للجهة، وفقاً لقواعد الإعلان عن المنافسة العامة."
  },
  {
    part: "الباب الخامس: بيع المنقولات",
    chapter: "الفصل الأول: بيع المنقولات",
    clause: "المادة 81",
    text: "تباع المنقولات التي تقل قيمتها التقديرية عن (مائتي ألف) ريال إما بالمزايدة العامة أو بأي طريقة أخرى تراها الجهة الحكومية محققة للمصلحة، على أن تتيح الفرصة لأكبر عدد ممكن من المزايدين."
  },
  {
    part: "الباب الخامس: بيع المنقولات",
    chapter: "الفصل الأول: بيع المنقولات",
    clause: "المادة 82",
    text: "١. في المزايدة بالظرف المختوم، يقدم المزايد مع عرضه ضماناً ابتدائياً بنسبة (2%) من قيمة العرض.\n\n٢. يجب على من ترسو عليه المزايدة رفع ضمانه إلى (5%) من قيمة عرضه خلال (خمسة عشر) يوم عمل من تاريخ الترسية، فإن لم يفعل فلا يعاد إليه الضمان الابتدائي. ولا يفرج عن هذا الضمان إلا بعد تسديد كامل قيمة المنقولات وتكاليف نقلها. وتعاد الضمانات إلى من لم ترس عليهم المزايدة.\n\n٣. في المزايدة العلنية، يقدم من ترسو عليه المزايدة ضماناً بنسبة (5%) من قيمتها. ويجوز قبول شيك مصرفي أو مبلغ نقدي كضمان في هذه المزايدات."
  },
  {
    part: "الباب الخامس: بيع المنقولات",
    chapter: "الفصل الأول: بيع المنقولات",
    clause: "المادة 83",
    text: "إذا لم يتقدم أحد للمزايدة المعلن عنها، يعاد الإعلان عنها مرة أخرى. فإذا لم يتقدم أحد بعد الإعلان الثاني، جاز لصاحب الصلاحية عرض بيع تلك الأصناف على التجار المختصين. فإذا لم يتقدم أحد بسعر مناسب، جاز التبرع بتلك المنقولات للجمعيات أو المؤسسات الأهلية أو أي كيان غير هادف إلى الربح، على أن تشعر الوزارة بذلك."
  },
  {
    part: "الباب الخامس: بيع المنقولات",
    chapter: "الفصل الأول: بيع المنقولات",
    clause: "المادة 84",
    text: "تحدد اللائحة إجراءات المزايدة وتشكيل لجان البيع."
  },
  {
    part: "الباب الخامس: بيع المنقولات",
    chapter: "الفصل الأول: بيع المنقولات",
    clause: "المادة 85",
    text: "يجوز للجهة الحكومية تأمين بعض احتياجاتها عن طريق استئجارها، أو عن طريق مبادلة منقولاتها بمنقولات جديدة، وفقاً لما توضحه اللائحة."
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

const GtplRC128PartVArabic = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partVClausesArabic);
  
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
    ? partVClausesArabic.filter(clause => 
        clause.clause.includes(searchTerm) ||
        clause.text.includes(searchTerm) ||
        clause.chapter.includes(searchTerm)
      )
    : partVClausesArabic;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">نظام المنافسات والمشتريات الحكومية - الباب الخامس</h1>
            <p className="text-gray-500">بيع المنقولات</p>
          </div>
        </div>
        
        {/* Back button */}
        <button 
          onClick={() => handleModuleChange('gtpl-rc128-part-selector', 'Overview')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 mb-4"
        >
          <ArrowLeft size={16} />
          <span>العودة إلى نظام المنافسات والمشتريات الحكومية – (EN-AR)</span>
        </button>
        
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
              <p className="font-medium text-blue-900">حول الباب الخامس</p>
              <p className="text-sm text-blue-700 mt-1">
                يتناول الباب الخامس من نظام المنافسات والمشتريات الحكومية (GTPL RC 128) بيع المنقولات، بما في ذلك إجراءات البيع والتصرف، ومتطلبات المزايدات، والضمانات، والطرق البديلة للتعامل مع الأصول الحكومية.
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
                            {clause.text.split('\n\n').map((paragraph, idx) => (
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
                              الباب الخامس - {clause.clause}
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

export default GtplRC128PartVArabic;