import React, { useState } from 'react';
import { Book, Download, FileText, ArrowRight, Info, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const GdmpVariationModule = () => {
  const [activeTab, setActiveTab] = useState('english');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'purpose': true,
    'scope': false,
    'definitions': false,
    'responsibilities': false,
    'procedure': false,
    'references': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would download the actual PDF
    alert('Downloading GDMP Variation Sub-Module PDF...');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GDMP - Variation Sub-Module</h1>
            <p className="text-gray-500">Project Delivery Management - Variation Management Procedure</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'english'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('english')}
            >
              English
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'arabic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('arabic')}
            >
              العربية
            </button>
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-blue-900">GDMP Procedure Document</p>
              <p className="text-sm text-blue-700 mt-1">
                {activeTab === 'english' 
                  ? 'This document outlines the official procedure for managing variations and change orders in GDMP projects, in compliance with Government Tenders and Procurement Law (Royal Decree No. M/128).' 
                  : 'تحدد هذه الوثيقة الإجراء الرسمي لإدارة التغييرات وأوامر التغيير في مشاريع GDMP، وفقًا لنظام المنافسات والمشتريات الحكومية (المرسوم الملكي رقم م/128).'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm" dir={activeTab === 'arabic' ? 'rtl' : 'ltr'}>
        {/* Purpose Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('purpose')}
          >
            <span>{activeTab === 'english' ? 'Purpose' : 'الغرض'}</span>
            {expandedSections['purpose'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['purpose'] && (
            <div className="mt-4 space-y-4">
              <p>
                {activeTab === 'english' 
                  ? 'This procedure establishes a standardized process for managing variations and change orders in GDMP projects, ensuring compliance with Government Tenders and Procurement Law (Royal Decree No. M/128) and its Implementing Regulations. It provides clear guidelines for identifying, documenting, evaluating, approving, and implementing variations to project scope, schedule, or cost.' 
                  : 'يحدد هذا الإجراء عملية موحدة لإدارة التغييرات وأوامر التغيير في مشاريع GDMP، مع ضمان الامتثال لنظام المنافسات والمشتريات الحكومية (المرسوم الملكي رقم م/128) ولائحته التنفيذية. ويوفر إرشادات واضحة لتحديد وتوثيق وتقييم واعتماد وتنفيذ التغييرات في نطاق المشروع أو الجدول الزمني أو التكلفة.'}
              </p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  {activeTab === 'english' 
                    ? 'Legal Reference: Articles 68, 69, 113, 114 of GTPL RC 128' 
                    : 'المرجع القانوني: المواد 68، 69، 113، 114 من نظام المنافسات والمشتريات الحكومية'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Scope Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('scope')}
          >
            <span>{activeTab === 'english' ? 'Scope' : 'النطاق'}</span>
            {expandedSections['scope'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['scope'] && (
            <div className="mt-4 space-y-4">
              <p>
                {activeTab === 'english' 
                  ? 'This procedure applies to all variations and change orders in GDMP projects, including but not limited to:' 
                  : 'ينطبق هذا الإجراء على جميع التغييرات وأوامر التغيير في مشاريع GDMP، بما في ذلك على سبيل المثال لا الحصر:'}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  {activeTab === 'english' 
                    ? 'Changes to project scope, specifications, or deliverables' 
                    : 'التغييرات في نطاق المشروع أو المواصفات أو المخرجات'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Modifications to project schedule or milestones' 
                    : 'التعديلات على الجدول الزمني للمشروع أو المراحل الرئيسية'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Adjustments to project budget or resource allocation' 
                    : 'التعديلات على ميزانية المشروع أو تخصيص الموارد'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Changes due to unforeseen conditions or external factors' 
                    : 'التغييرات الناتجة عن ظروف غير متوقعة أو عوامل خارجية'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Variations requested by stakeholders or authorities' 
                    : 'التغييرات المطلوبة من قبل أصحاب المصلحة أو السلطات'}
                </li>
              </ul>
              <p>
                {activeTab === 'english' 
                  ? 'This procedure is applicable to all GDMP project teams, contractors, consultants, and stakeholders involved in the variation management process.' 
                  : 'هذا الإجراء قابل للتطبيق على جميع فرق مشاريع GDMP والمقاولين والاستشاريين وأصحاب المصلحة المشاركين في عملية إدارة التغيير.'}
              </p>
            </div>
          )}
        </div>

        {/* Definitions Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('definitions')}
          >
            <span>{activeTab === 'english' ? 'Definitions' : 'التعريفات'}</span>
            {expandedSections['definitions'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['definitions'] && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Variation' : 'التغيير'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'Any change to the scope, schedule, cost, or quality of a project as defined in the contract documents.' 
                      : 'أي تغيير في نطاق أو جدول أو تكلفة أو جودة المشروع كما هو محدد في وثائق العقد.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Change Order' : 'أمر التغيير'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A formal document that authorizes a variation to the contract, signed by all relevant parties.' 
                      : 'وثيقة رسمية تصرح بإجراء تغيير في العقد، موقعة من جميع الأطراف المعنية.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Variation Request (VR)' : 'طلب التغيير'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A formal request to modify the project scope, schedule, or cost, initiated by any project stakeholder.' 
                      : 'طلب رسمي لتعديل نطاق المشروع أو الجدول الزمني أو التكلفة، يبدأه أي من أصحاب المصلحة في المشروع.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Variation Order (VO)' : 'أمر التغيير'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A formal document issued by the Project Manager authorizing a change to the project scope, schedule, or cost.' 
                      : 'وثيقة رسمية يصدرها مدير المشروع تصرح بإجراء تغيير في نطاق المشروع أو الجدول الزمني أو التكلفة.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Responsibilities Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('responsibilities')}
          >
            <span>{activeTab === 'english' ? 'Responsibilities' : 'المسؤوليات'}</span>
            {expandedSections['responsibilities'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['responsibilities'] && (
            <div className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Project Manager' : 'مدير المشروع'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Overall responsibility for variation management process' 
                        : 'المسؤولية الشاملة عن عملية إدارة التغيير'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Evaluating and recommending approval/rejection of variation requests' 
                        : 'تقييم طلبات التغيير والتوصية بالموافقة عليها أو رفضها'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Ensuring compliance with GTPL RC 128 requirements' 
                        : 'ضمان الامتثال لمتطلبات نظام المنافسات والمشتريات الحكومية'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Contractor' : 'المقاول'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Submitting variation requests with proper documentation' 
                        : 'تقديم طلبات التغيير مع الوثائق المناسبة'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Providing cost and schedule impact assessments' 
                        : 'تقديم تقييمات تأثير التكلفة والجدول الزمني'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Implementing approved variations' 
                        : 'تنفيذ التغييرات المعتمدة'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Technical Committee' : 'اللجنة الفنية'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Reviewing technical aspects of variation requests' 
                        : 'مراجعة الجوانب الفنية لطلبات التغيير'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Validating cost estimates and schedule impacts' 
                        : 'التحقق من صحة تقديرات التكلفة وتأثيرات الجدول الزمني'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Providing technical recommendations' 
                        : 'تقديم التوصيات الفنية'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Approval Authority' : 'سلطة الموافقة'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Final approval of variation requests based on delegated authority levels' 
                        : 'الموافقة النهائية على طلبات التغيير بناءً على مستويات السلطة المفوضة'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Ensuring variations comply with GTPL RC 128 Article 69 limits (10% increase, 20% decrease)' 
                        : 'ضمان امتثال التغييرات لحدود المادة 69 من نظام المنافسات والمشتريات الحكومية (زيادة 10٪، نقصان 20٪)'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Procedure Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('procedure')}
          >
            <span>{activeTab === 'english' ? 'Procedure' : 'الإجراء'}</span>
            {expandedSections['procedure'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['procedure'] && (
            <div className="mt-4 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '1. Variation Identification' : '1. تحديد التغيير'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'Any project stakeholder may identify the need for a variation. This could be due to unforeseen conditions, design changes, regulatory requirements, or client requests. The variation must be documented using the standard Variation Request (VR) form.' 
                      : 'يمكن لأي من أصحاب المصلحة في المشروع تحديد الحاجة إلى تغيير. قد يكون ذلك بسبب ظروف غير متوقعة، أو تغييرات في التصميم، أو متطلبات تنظيمية، أو طلبات العميل. يجب توثيق التغيير باستخدام نموذج طلب التغيير القياسي.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '2. Variation Request Submission' : '2. تقديم طلب التغيير'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The initiator submits the VR form to the Project Manager, including detailed description, justification, and preliminary assessment of impacts on scope, schedule, and cost. All supporting documentation must be attached.' 
                      : 'يقدم المبادر نموذج طلب التغيير إلى مدير المشروع، بما في ذلك وصف مفصل، ومبرر، وتقييم أولي للتأثيرات على النطاق والجدول الزمني والتكلفة. يجب إرفاق جميع الوثائق الداعمة.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '3. Variation Evaluation' : '3. تقييم التغيير'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The Project Manager reviews the VR for completeness and forwards it to the Technical Committee for evaluation. The Technical Committee assesses technical feasibility, cost implications, schedule impacts, and compliance with GTPL RC 128 requirements.' 
                      : 'يراجع مدير المشروع طلب التغيير للتأكد من اكتماله ويحيله إلى اللجنة الفنية للتقييم. تقوم اللجنة الفنية بتقييم الجدوى الفنية، وآثار التكلفة، وتأثيرات الجدول الزمني، والامتثال لمتطلبات نظام المنافسات والمشتريات الحكومية.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '4. Variation Approval' : '4. الموافقة على التغيير'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'Based on the Technical Committee\'s recommendation, the Approval Authority decides whether to approve, reject, or request modifications to the variation. Approval levels are determined by the financial value of the variation, in accordance with the Delegation of Authority Matrix.' 
                      : 'بناءً على توصية اللجنة الفنية، تقرر سلطة الموافقة ما إذا كانت ستوافق على التغيير أو ترفضه أو تطلب تعديلات عليه. يتم تحديد مستويات الموافقة حسب القيمة المالية للتغيير، وفقًا لمصفوفة تفويض السلطة.'}
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-yellow-600 mt-1" />
                    <div>
                      <p className="font-medium text-yellow-900">
                        {activeTab === 'english' ? 'GTPL RC 128 Compliance Note' : 'ملاحظة الامتثال لنظام المنافسات والمشتريات الحكومية'}
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">
                        {activeTab === 'english' 
                          ? 'Per Article 69, variations must not exceed 10% increase or 20% decrease of the original contract value. Variations exceeding these limits require special approval procedures.' 
                          : 'وفقًا للمادة 69، يجب ألا تتجاوز التغييرات زيادة بنسبة 10٪ أو نقصان بنسبة 20٪ من قيمة العقد الأصلية. التغييرات التي تتجاوز هذه الحدود تتطلب إجراءات موافقة خاصة.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '5. Variation Implementation' : '5. تنفيذ التغيير'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'Upon approval, the Project Manager issues a Variation Order (VO) to the Contractor. The Contractor implements the variation according to the approved terms. The Project Manager updates the project documentation, including the project plan, schedule, and budget.' 
                      : 'عند الموافقة، يصدر مدير المشروع أمر تغيير إلى المقاول. ينفذ المقاول التغيير وفقًا للشروط المعتمدة. يقوم مدير المشروع بتحديث وثائق المشروع، بما في ذلك خطة المشروع والجدول الزمني والميزانية.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '6. Monitoring and Control' : '6. المراقبة والتحكم'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The Project Manager monitors the implementation of the variation and reports on progress. Any deviations from the approved variation are subject to a new variation request. The Project Manager maintains a Variation Log for all variations.' 
                      : 'يراقب مدير المشروع تنفيذ التغيير ويقدم تقارير عن التقدم المحرز. أي انحرافات عن التغيير المعتمد تخضع لطلب تغيير جديد. يحتفظ مدير المشروع بسجل للتغييرات لجميع التغييرات.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* References Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('references')}
          >
            <span>{activeTab === 'english' ? 'References' : 'المراجع'}</span>
            {expandedSections['references'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['references'] && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Legal References' : 'المراجع القانونية'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'GTPL RC 128 Article 68: Price Adjustment' 
                        : 'المادة 68 من نظام المنافسات والمشتريات الحكومية: تعديل الأسعار'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GTPL RC 128 Article 69: Change Orders Limits' 
                        : 'المادة 69 من نظام المنافسات والمشتريات الحكومية: حدود أوامر التغيير'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GTPL RC 128 Article 113: Contract Price Adjustment' 
                        : 'المادة 113 من نظام المنافسات والمشتريات الحكومية: تعديل أسعار العقود'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GTPL RC 128 Article 114: Additional Works' 
                        : 'المادة 114 من نظام المنافسات والمشتريات الحكومية: الأعمال الإضافية'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Related Procedures' : 'الإجراءات ذات الصلة'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'GDMP-PDM-001: Project Planning Procedure' 
                        : 'GDMP-PDM-001: إجراء تخطيط المشروع'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GDMP-PDM-002: Project Execution Procedure' 
                        : 'GDMP-PDM-002: إجراء تنفيذ المشروع'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GDMP-PDM-003: Project Monitoring and Control Procedure' 
                        : 'GDMP-PDM-003: إجراء مراقبة المشروع والتحكم فيه'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GDMP-PDM-004: Project Closure Procedure' 
                        : 'GDMP-PDM-004: إجراء إغلاق المشروع'}
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  {activeTab === 'english' ? 'Forms and Templates' : 'النماذج والقوالب'}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F001: Variation Request Form' 
                      : 'GDMP-PDM-F001: نموذج طلب التغيير'}
                  </li>
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F002: Variation Order Form' 
                      : 'GDMP-PDM-F002: نموذج أمر التغيير'}
                  </li>
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F003: Variation Log Template' 
                      : 'GDMP-PDM-F003: قالب سجل التغييرات'}
                  </li>
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F004: Variation Impact Assessment Template' 
                      : 'GDMP-PDM-F004: قالب تقييم تأثير التغيير'}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              {activeTab === 'english' 
                ? 'Document ID: GDMP-PDM-VAR-001 | Version: 2.1 | Last Updated: April 2025' 
                : 'معرف المستند: GDMP-PDM-VAR-001 | الإصدار: 2.1 | آخر تحديث: أبريل 2025'}
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <Download size={16} />
                <span>{activeTab === 'english' ? 'Download PDF' : 'تنزيل PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GdmpVariationModule;