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

// Part III clauses data in Arabic
const partIIIClausesArabic: Clause[] = [
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الأول: تقديم العروض",
    clause: "المادة 37",
    text: "1. تقدم العروض مشفرة من خلال البوابة، وفق ما تحدده اللائحة.\n2. تقدم العروض في الموعد المحدد لقبولها، ولا يجوز قبول العروض التي تقدم بخلاف ذلك.\n3. يجوز قبول العروض في ظروف مختومة إذا تعذر تقديمها من خلال البوابة لأسباب فنية.\n4. تعلن الجهة الحكومية عن أسماء الأشخاص الذين تقدموا بعروضهم من خلال البوابة، وإذا تعذر استخدام البوابة لأسباب فنية فتعلن عن ذلك بالوسيلة التي تحددها اللائحة."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الأول: تقديم العروض",
    clause: "المادة 38",
    text: "للجهة الحكومية طلب إرفاق عينة من المشتريات المطلوبة."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الأول: تقديم العروض",
    clause: "المادة 39",
    text: "1. تكون مدة سريان العروض في المنافسات (تسعين) يوماً من التاريخ المحدد لفتح العروض، فإن سحب مقدم العرض عرضه خلال هذه المدة فلا يعاد إليه ضمانه الابتدائي.\n2. يجوز للجهة الحكومية تمديد مدة سريان العروض لمدة (تسعين) يوماً أخرى، وعلى من يرغب من المتنافسين في الاستمرار في المنافسة تمديد مدة سريان ضمانه الابتدائي."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الأول: تقديم العروض",
    clause: "المادة 40",
    text: "1. يجب أن تحدد الأسعار الإجمالية وما يرد عليها من زيادة أو تخفيض في خطاب العرض، ولا يعتد بأي تخفيض يقدم بوساطة خطاب مستقل حتى لو كان مرافقاً للعرض.\n2. لا يجوز للمتنافسين -في غير الحالات التي يجوز التفاوض فيها وفقاً لأحكام النظام- تعديل أسعار عروضهم بالزيادة أو التخفيض بعد تقديمها."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الثاني: الضمان الابتدائي",
    clause: "المادة 41",
    text: "1. يُقدم المتنافس مع عرضه ضماناً ابتدائياً بنسبة تتراوح من (1%) إلى (2%) من قيمة العرض. ويستبعد العرض الذي لم يقدم معه الضمان.\n2. تحدد اللائحة الأحكام المتعلقة بالضمان الابتدائي."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الثاني: الضمان الابتدائي",
    clause: "المادة 42",
    text: "استثناء من حكم المادة (41) من النظام، لا يلزم تقديم الضمان الابتدائي في الحالات الآتية:\n1. الشراء المباشر.\n2. المسابقة.\n3. تعاقدات الجهات الحكومية فيما بينها.\n4. التعاقد مع مؤسسة أو جمعية أهلية أو كيان غير هادف إلى الربح.\n5. التعاقد مع المنشآت الصغيرة والمتوسطة المحلية."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الثالث: فتح العروض",
    clause: "المادة 43",
    text: "تكوّن بقرار من رئيس الجهة الحكومية أو من يفوضه لجنة أو أكثر لفتح العروض، وفقاً لما توضحه اللائحة."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الثالث: فتح العروض",
    clause: "المادة 44",
    text: "1. تفتح العروض بحضور جميع أعضاء اللجنة في موعد انتهاء مدة تلقي العروض، ويعَد محضر بذلك، وفي الحالات التي تتطلب تقديم عرض فني مستقل عن العرض المالي، تفتح العروض الفنية دون المالية، وتحدد اللائحة إجراءات فتح العروض.\n2. لأصحاب العروض حضور جلسات فتح العروض.\n3. على اللجنة خلال (ثلاثة) أيام من تاريخ فتح العروض؛ إحالة محضرها والعروض إلى لجنة فحص العروض."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 45",
    text: "1. تُكوَّن لجنة أو أكثر بقرار من رئيس الجهة الحكومية أو من يفوضه لفحص العروض. تتولى هذه اللجنة فحص العروض وتقديم توصياتها، ويجوز الاستعانة بتقارير فنية.\n2. للجهة المختصة بالشراء الموحد أن تشارك في جلسات اللجنة.\n3. تصدر اللجنة توصياتها وتدونها بمحضر يوضح الرأي المخالف – إن وجد – ويعرض المحضر على صاحب الصلاحية للبت.\n4. لا يجوز الجمع بين رئاسة لجنة فحص العروض وصلاحية البت، أو الجمع بين رئاسة لجنتي الفتح والفحص."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 46",
    text: "1. تفحص العروض حسب معايير وثائق المنافسة وتُستبعد المخالفة، وتُرد ضماناتها.\n2. إذا قدمت العروض بمجلدين أو مظروفين، تُفحص الفنية فقط، وتُرد المالية مع الضمانات للعروض غير المقبولة.\n3. تُفحص العروض المالية للعروض الفنية المقبولة وتُعد التوصيات."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 47",
    text: "للجنة فحص العروض التفاوض مع أفضل عرض ثم من يليه:\n1. إذا ارتفع سعر العرض عن السوق، يُطلب التخفيض كتابياً، وإن امتنع يُفاوض من يليه.\n2. إذا زاد السعر عن الميزانية، يُطلب التخفيض، وإن لم يتحقق يُخفض أو يُلغى بند أو تُلغى المنافسة بعد موافقة الشراء الموحد."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 48",
    text: "لا يُستبعد أي عرض لانخفاض السعر إلا إذا قل (25%) فأكثر عن التكلفة المقدرة، وتُطلب تفاصيل العرض كتابياً. وإذا لم تقتنع اللجنة بقدرة التنفيذ يجوز التوصية بالاستبعاد."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 49",
    text: "على الجهة الحكومية إعلان نتائج المنافسة، وإشعار بقية المتنافسين، وفقاً لما توضحه اللائحة."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 50",
    text: "1. لا يُقبل العرض الوحيد أو المطابق الوحيد إلا بعد موافقة رئيس الجهة الحكومية إذا كان السعر مماثلاً للسوق.\n2. تحدد اللائحة أحكام تساوي العروض."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 51",
    text: "تُلغى المنافسة في الحالات الآتية:\n1. وجود أخطاء جوهرية في الوثائق.\n2. إجراءات مخالفة لا يمكن تصحيحها.\n3. وجود احتيال أو فساد أو تواطؤ.\n4. مخالفة جميع العروض.\n5. إذا اقتضت المصلحة العامة ذلك."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الرابع: فحص العروض وصلاحية التعاقد",
    clause: "المادة 52",
    text: "في حال إلغاء المنافسة، تُرد قيمة الوثائق والضمانات الابتدائية، حسب ما توضحه اللائحة."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل الخامس: فترة التوقف",
    clause: "المادة 53",
    text: "تلتزم الجهة الحكومية بعد إعلان قرار الترسية بفترة توقف لا تقل عن (5) أيام عمل ولا تزيد عن (10) أيام عمل، لا يجوز خلالها توقيع العقد؛ لتمكين المتنافسين من التظلم."
  },
  {
    part: "الباب الثالث: العروض والترسية",
    chapter: "الفصل السادس: الصلاحيات",
    clause: "المادة 54",
    text: "1. لرئيس الجهة الحكومية صلاحية البت في المنافسات بما لا يزيد عن (10) ملايين ريال، وتكليف بالأعمال الإضافية بما لا يتجاوز (5) ملايين ريال أو 10% من قيمة المشروع أيهما أقل.\n2. صلاحية إلغاء المنافسة، وإنهاء العقود، والشراء المباشر (حتى 3 ملايين ريال)، وبيع المنقولات، ويجوز له التفويض.\n3. يجب أن يكون التفويض متدرجاً حسب مسؤولية الشخص المفوض."
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

const GtplRC128PartIIIArabic = () => {
  const { handleModuleChange } = useApp();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partIIIClausesArabic);
  
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
    ? partIIIClausesArabic.filter(clause => 
        clause.clause.includes(searchTerm) ||
        clause.text.includes(searchTerm) ||
        clause.chapter.includes(searchTerm)
      )
    : partIIIClausesArabic;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">نظام المنافسات والمشتريات الحكومية - الباب الثالث</h1>
            <p className="text-gray-500">العروض والترسية</p>
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
              <p className="font-medium text-blue-900">حول الباب الثالث</p>
              <p className="text-sm text-blue-700 mt-1">
                يتناول الباب الثالث من نظام المنافسات والمشتريات الحكومية (GTPL RC 128) العروض والترسية، بما في ذلك تقديم العروض، والضمان الابتدائي، وفتح العروض، وفحص العروض وصلاحية التعاقد، وفترة التوقف، والصلاحيات.
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
                              الباب الثالث - {clause.clause}
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

export default GtplRC128PartIIIArabic;