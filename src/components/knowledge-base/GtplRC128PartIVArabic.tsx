import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight, Download, Search, Info, Scale, Gavel, FileText, Link, Copy, CheckCircle } from 'lucide-react';

// Define the clause structure
interface Clause {
  part: string;
  chapter: string;
  clause: string;
  text: string;
}

// Part IV clauses data in Arabic
const partIVClausesArabic: Clause[] = [
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل الرابع: تعديل الأسعار وأوامر التغيير",
    clause: "المادة 68",
    text: "لا يجوز تعديل أسعار العقود أو الاتفاقيات الإطارية (بالزيادة أو النقص) إلا في الحالات الآتية:\n\n١. تغير أسعار المواد أو الخدمات الرئيسة الداخلة في بنود المنافسة وفقاً لما تحدده اللائحة.\n\n٢. تعديل التعرفة الجمركية أو الرسوم أو الضرائب.\n\n٣. إذا حصلت أثناء تنفيذ العقد صعوبات مادية لم يكن بالإمكان توقعها."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل الرابع: تعديل الأسعار وأوامر التغيير",
    clause: "المادة 69",
    text: "للجهة الحكومية إصدار أوامر تغيير بالزيادة في التزامات المتعاقد معها بما لا يتجاوز (١٠٪) من قيمة العقد، ولها إصدار أوامر تغيير بالتخفيض في التزاماته بما لا يتجاوز (٢٠٪) من قيمة العقد."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل الخامس: التنازل عن العقد والتعاقد من الباطن",
    clause: "المادة 70",
    text: "لا يجوز للمتعاقد معه التنازل عن العقد أو جزء منه لمقاول أو متعهد أو مورّد آخر إلا بعد الحصول على موافقة مكتوبة من الجهة الحكومية والوزارة، وتوضح اللائحة شروط وضوابط التنازل عن العقد أو جزء منه."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل الخامس: التنازل عن العقد والتعاقد من الباطن",
    clause: "المادة 71",
    text: "١. لا يجوز للمتعاقد معه التعاقد من الباطن مع مقاول أو متعهد أو مورّد آخر دون الحصول على موافقة مكتوبة من الجهة الحكومية، وتحدد اللائحة شروط التعاقد من الباطن وضوابطه.\n\n٢. للجهة الحكومية تقديم الدفعات مباشرة إلى المقاول أو المتعهد أو المورّد من الباطن، وتحدد اللائحة شروط وضوابط ذلك.\n\n٣. يكون المتعاقد معه -في جميع الأحوال- مسؤولاً بالتضامن مع المقاول أو المتعهد أو المورّد من الباطن عن تنفيذ العقد وفقاً لشروطه."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل السادس: الغرامات وتمديد العقود",
    clause: "المادة 72",
    text: "إذا تأخر المتعاقد في تنفيذ العقد عن الموعد المحدد، تفرض عليه غرامة تأخير لا تتجاوز (٦٪) من قيمة عقد التوريد، و(٢٠٪) من قيمة العقود الأخرى."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل السادس: الغرامات وتمديد العقود",
    clause: "المادة 73",
    text: "في عقود الخدمات ذات التنفيذ المستمر، تفرض غرامات على المتعاقد إذا أخل بأي من التزاماته التعاقدية، ولا تتجاوز الغرامة (٢٠٪) من قيمة الفاترة الشهرية."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل السادس: الغرامات وتمديد العقود",
    clause: "المادة 74",
    text: "يمدد العقد وتوقف غرامات التأخير في الحالات الآتية:\n\n١. إذا كلف المتعاقد بأعمال إضافية.\n\n٢. إذا كانت الاعتمادات المالية السنوية للمشروع غير كافية.\n\n٣. إذا كان التأخير يعود إلى الجهة الحكومية أو ظروف طارئة."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل السابع: السحب الجزئي والتنفيذ على حساب المتعاقد",
    clause: "المادة 75",
    text: "إذا أخل المتعاقد معه بالتزاماته، جاز للجهة الحكومية -بعد إنذاره- سحب جزء من العقد وتنفيذه على حسابه، وتوضح اللائحة شروط وضوابط ذلك."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل الثامن: إنهاء العقود",
    clause: "المادة 76",
    text: "١. يجب على الجهة الحكومية إنهاء العقد في الحالات الآتية:\nأ- إذا ثبت أن المتعاقد معه قد شرع -بنفسه أو بوساطة غيره بطريق مباشر أو غير مباشر- في رشوة أحد موظفي الجهات الخاضعة لأحكام النظام، أو حصل على العقد عن طريق الرشوة أو الغش أو التحايل أو التزوير أو التلاعب أو مارس أياً من ذلك أثناء تنفيذه للعقد.\nب- إذا أفلس المتعاقد معه، أو طلب إشهار إفلاسه، أو ثبت إعساره، أو صدر أمر بوضعه تحت الحراسة، أو كان شركة وجرى حلها أو تصفيتها.\nج- إذا تنازل المتعاقد معه عن العقد دون موافقة مكتوبة من الجهة الحكومية والوزارة.\n\n٢. يجوز للجهة الحكومية إنهاء العقد في الحالات الآتية:\nأ- إذا تأخر المتعاقد معه عن البدء في العمل، أو تباطأ في تنفيذه، أو أخل بأي شرط من شروط العقد ولم يصحح أوضاعه خلال (خمسة عشر) يوماً من تاريخ إبلاغه كتابة بذلك.\nب- إذا توفي المتعاقد معه. وفي هذه الحالة، يجوز للجهة الحكومية قبول ورثته -إذا توافرت لديهم المؤهلات الفنية والضمانات اللازمة لإكمال تنفيذ العقد- أو إنهاء العقد مع رد الضمان النهائي.\nج- إذا تعاقد المتعاقد معه لتنفيذ العقد من الباطن دون موافقة مكتوبة من الجهة الحكومية.\n\n٣. إذا أُنهي العقد، تقوم الجهة الحكومية بمصادرة الضمان النهائي أو جزء منه بما يتناسب مع الأعمال التي لم تنفذ، وتتخذ الإجراءات اللازمة لطرح المشروع في منافسة جديدة على حساب المتعاقد معه، وتوضح اللائحة الإجراءات المتبعة في هذا الشأن."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل الثامن: إنهاء العقود",
    clause: "المادة 77",
    text: "يجوز للجهة الحكومية -بعد موافقة الوزارة- إنهاء العقد للمصلحة العامة، أو إنهاؤه باتفاق مع المتعاقد معه، وتوضح اللائحة الإجراءات اللازمة لذلك."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل الثامن: إنهاء العقود",
    clause: "المادة 78",
    text: "إذا أُنهي العقد بناءً على الفقرة (١) من المادة (السادسة والسبعين) من النظام، أو بناءً على الفقرة (٢) (أ) أو (ج) من المادة نفسها، تصادر الجهة الحكومية الضمان النهائي، ويكون من حق اللجنة المنصوص عليها في المادة (الثامنة والثمانين) من النظام منع المتعاقد معه من التعامل مع الجهات الحكومية."
  },
  {
    part: "الباب الرابع: إبرام العقود وتنفيذها",
    chapter: "الفصل التاسع: تقييم أداء المتعاقدين",
    clause: "المادة 79",
    text: "تقوم الجهة الحكومية بعد انتهاء العقد بتقييم أداء المتعاقد معها وفقاً لنموذج تقييم الأداء المعتمد، ويصبح التقييم نهائياً بعد مضي (ستين) يوماً من تاريخ إخطار المتعاقد معها بنتيجة التقييم، وتوضح اللائحة الإجراءات اللازمة لتنفيذ أحكام هذه المادة."
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

const GtplRC128PartIVArabic = () => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  const chapters = groupClausesByChapter(partIVClausesArabic);
  
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
    ? partIVClausesArabic.filter(clause => 
        clause.clause.includes(searchTerm) ||
        clause.text.includes(searchTerm) ||
        clause.chapter.includes(searchTerm)
      )
    : partIVClausesArabic;
  
  // Group filtered clauses by chapter
  const filteredChapters = groupClausesByChapter(filteredClauses);

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">نظام المنافسات والمشتريات الحكومية - الباب الرابع</h1>
            <p className="text-gray-500">إبرام العقود وتنفيذها</p>
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
              <p className="font-medium text-blue-900">حول الباب الرابع</p>
              <p className="text-sm text-blue-700 mt-1">
                يتناول الباب الرابع من نظام المنافسات والمشتريات الحكومية (GTPL RC 128) إبرام العقود وتنفيذها، بما في ذلك تعديل الأسعار وأوامر التغيير، والتنازل عن العقد والتعاقد من الباطن، والغرامات وتمديد العقود، والسحب الجزئي والتنفيذ على حساب المتعاقد، وإنهاء العقود، وتقييم أداء المتعاقدين.
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
                              الباب الرابع - {clause.clause}
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

export default GtplRC128PartIVArabic;