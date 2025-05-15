import React, { useState } from 'react';
import { Book, Download, FileText, ArrowRight, Info, Globe, ChevronDown, ChevronUp, Scale, AlertCircle } from 'lucide-react';

const GdmpClaimsModule = () => {
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
    alert('Downloading GDMP Claims By 2nd Party Sub-Module PDF...');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Book className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GDMP - Claims By 2nd Party Sub-Module</h1>
            <p className="text-gray-500">Project Delivery Management - Claims Management Procedure</p>
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
                  ? 'This document outlines procedures for analyzing and resolving claims submitted by contractors, consultants, or suppliers (2nd Parties) under MoMRA-managed projects, in compliance with Government Tenders and Procurement Law (Royal Decree No. M/128).' 
                  : 'توضح هذه الوثيقة إجراءات تحليل وحل المطالبات المقدمة من المقاولين أو الاستشاريين أو الموردين (الأطراف الثانية) في إطار المشاريع التي تديرها وزارة الشؤون البلدية والقروية والإسكان، وفقًا لنظام المنافسات والمشتريات الحكومية (المرسوم الملكي رقم م/128).'}
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
                  ? 'This procedure establishes a standardized process for receiving, analyzing, evaluating, and resolving claims submitted by contractors, consultants, or suppliers (2nd Parties) in GDMP projects. It ensures fair, transparent, and consistent handling of claims in compliance with Government Tenders and Procurement Law (Royal Decree No. M/128) and its Implementing Regulations.' 
                  : 'يحدد هذا الإجراء عملية موحدة لاستلام وتحليل وتقييم وحل المطالبات المقدمة من المقاولين أو الاستشاريين أو الموردين (الأطراف الثانية) في مشاريع GDMP. ويضمن التعامل العادل والشفاف والمتسق مع المطالبات وفقًا لنظام المنافسات والمشتريات الحكومية (المرسوم الملكي رقم م/128) ولائحته التنفيذية.'}
              </p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  {activeTab === 'english' 
                    ? 'Legal Reference: Articles 86, 87, 88 of GTPL RC 128' 
                    : 'المرجع القانوني: المواد 86، 87، 88 من نظام المنافسات والمشتريات الحكومية'}
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
                  ? 'This procedure applies to all claims submitted by 2nd Parties in GDMP projects, including but not limited to:' 
                  : 'ينطبق هذا الإجراء على جميع المطالبات المقدمة من الأطراف الثانية في مشاريع GDMP، بما في ذلك على سبيل المثال لا الحصر:'}
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  {activeTab === 'english' 
                    ? 'Claims for additional costs due to changes in scope or conditions' 
                    : 'المطالبات بتكاليف إضافية بسبب التغييرات في النطاق أو الظروف'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Claims for time extensions due to delays not attributable to the 2nd Party' 
                    : 'المطالبات بتمديد الوقت بسبب التأخيرات التي لا تعزى إلى الطرف الثاني'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Claims related to price adjustments due to market fluctuations' 
                    : 'المطالبات المتعلقة بتعديلات الأسعار بسبب تقلبات السوق'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Claims for compensation due to unforeseen conditions' 
                    : 'المطالبات بالتعويض بسبب الظروف غير المتوقعة'}
                </li>
                <li>
                  {activeTab === 'english' 
                    ? 'Claims related to contractual disputes or interpretations' 
                    : 'المطالبات المتعلقة بالنزاعات التعاقدية أو التفسيرات'}
                </li>
              </ul>
              <p>
                {activeTab === 'english' 
                  ? 'This procedure is applicable to all GDMP project teams, contractors, consultants, suppliers, and stakeholders involved in the claims management process.' 
                  : 'هذا الإجراء قابل للتطبيق على جميع فرق مشاريع GDMP والمقاولين والاستشاريين والموردين وأصحاب المصلحة المشاركين في عملية إدارة المطالبات.'}
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
                    {activeTab === 'english' ? 'Claim' : 'المطالبة'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A formal request by a 2nd Party for additional compensation, time extension, or other relief due to events or circumstances they believe entitle them to such relief under the contract.' 
                      : 'طلب رسمي من الطرف الثاني للحصول على تعويض إضافي، أو تمديد للوقت، أو إغاثة أخرى بسبب أحداث أو ظروف يعتقدون أنها تخولهم الحصول على مثل هذه الإغاثة بموجب العقد.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Notice of Claim' : 'إشعار المطالبة'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A formal notification by a 2nd Party of their intention to submit a claim, typically required within a specified timeframe after the event giving rise to the claim.' 
                      : 'إخطار رسمي من الطرف الثاني بنيته تقديم مطالبة، عادة ما يكون مطلوبًا خلال إطار زمني محدد بعد الحدث الذي أدى إلى المطالبة.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Claim Determination' : 'تحديد المطالبة'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The formal decision issued by the Claims Committee regarding the validity and resolution of a claim.' 
                      : 'القرار الرسمي الصادر عن لجنة المطالبات بشأن صحة وحل المطالبة.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Claims Committee' : 'لجنة المطالبات'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A committee formed in accordance with Article 86 of GTPL RC 128 to review and decide on claims submitted by 2nd Parties.' 
                      : 'لجنة تشكلت وفقًا للمادة 86 من نظام المنافسات والمشتريات الحكومية لمراجعة واتخاذ قرار بشأن المطالبات المقدمة من الأطراف الثانية.'}
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
                        ? 'Initial receipt and review of claims' 
                        : 'الاستلام والمراجعة الأولية للمطالبات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Coordinating the claims evaluation process' 
                        : 'تنسيق عملية تقييم المطالبات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Implementing claim determinations' 
                        : 'تنفيذ قرارات المطالبات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Maintaining claims records and documentation' 
                        : 'الحفاظ على سجلات ووثائق المطالبات'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Claims Committee' : 'لجنة المطالبات'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Reviewing and evaluating claims' 
                        : 'مراجعة وتقييم المطالبات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Determining the validity and merit of claims' 
                        : 'تحديد صحة وجدارة المطالبات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Issuing formal claim determinations' 
                        : 'إصدار قرارات رسمية بشأن المطالبات'}
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
                    {activeTab === 'english' ? 'Technical Team' : 'الفريق الفني'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Providing technical analysis of claims' 
                        : 'تقديم التحليل الفني للمطالبات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Assessing the impact of claims on project scope, schedule, and cost' 
                        : 'تقييم تأثير المطالبات على نطاق المشروع والجدول الزمني والتكلفة'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Recommending technical solutions or mitigations' 
                        : 'التوصية بالحلول الفنية أو التخفيفات'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Legal Team' : 'الفريق القانوني'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Reviewing contractual and legal aspects of claims' 
                        : 'مراجعة الجوانب التعاقدية والقانونية للمطالبات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Advising on legal implications and risks' 
                        : 'تقديم المشورة بشأن الآثار والمخاطر القانونية'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Ensuring compliance with applicable laws and regulations' 
                        : 'ضمان الامتثال للقوانين واللوائح المعمول بها'}
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
                  {activeTab === 'english' ? '1. Notice of Claim' : '1. إشعار المطالبة'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The 2nd Party must submit a Notice of Claim to the Project Manager within 60 days of the event giving rise to the claim, as required by Article 113 of GTPL RC 128. The notice must include a brief description of the claim, the basis for entitlement, and an initial estimate of time and/or cost impacts.' 
                      : 'يجب على الطرف الثاني تقديم إشعار المطالبة إلى مدير المشروع خلال 60 يومًا من الحدث الذي أدى إلى المطالبة، كما هو مطلوب بموجب المادة 113 من نظام المنافسات والمشتريات الحكومية. يجب أن يتضمن الإشعار وصفًا موجزًا للمطالبة، وأساس الاستحقاق، وتقديرًا أوليًا لتأثيرات الوقت و/أو التكلفة.'}
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-600 mt-1" />
                    <div>
                      <p className="font-medium text-yellow-900">
                        {activeTab === 'english' ? 'Important Timeline Requirement' : 'متطلب الجدول الزمني المهم'}
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">
                        {activeTab === 'english' 
                          ? 'Failure to submit the Notice of Claim within the 60-day period may result in the claim being rejected, as per Article 113 of GTPL RC 128.' 
                          : 'قد يؤدي عدم تقديم إشعار المطالبة خلال فترة الـ 60 يومًا إلى رفض المطالبة، وفقًا للمادة 113 من نظام المنافسات والمشتريات الحكومية.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '2. Claim Submission' : '2. تقديم المطالبة'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'Following the Notice of Claim, the 2nd Party must submit a detailed claim within 30 days, including all supporting documentation, detailed cost breakdown, schedule analysis, and any other relevant information. The claim must be submitted using the standard Claim Submission Form (GDMP-PDM-F005).' 
                      : 'بعد إشعار المطالبة، يجب على الطرف الثاني تقديم مطالبة مفصلة خلال 30 يومًا، بما في ذلك جميع الوثائق الداعمة، وتفصيل التكلفة، وتحليل الجدول الزمني، وأي معلومات أخرى ذات صلة. يجب تقديم المطالبة باستخدام نموذج تقديم المطالبة القياسي (GDMP-PDM-F005).'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '3. Initial Review' : '3. المراجعة الأولية'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The Project Manager reviews the claim for completeness and compliance with submission requirements. If the claim is incomplete, the Project Manager requests additional information from the 2nd Party. Once complete, the Project Manager forwards the claim to the Claims Committee for evaluation.' 
                      : 'يراجع مدير المشروع المطالبة للتأكد من اكتمالها وامتثالها لمتطلبات التقديم. إذا كانت المطالبة غير مكتملة، يطلب مدير المشروع معلومات إضافية من الطرف الثاني. بمجرد اكتمالها، يحيل مدير المشروع المطالبة إلى لجنة المطالبات للتقييم.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '4. Claim Evaluation' : '4. تقييم المطالبة'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The Claims Committee evaluates the claim with input from the Technical and Legal Teams. The evaluation includes assessment of entitlement, causation, and quantum. The Claims Committee may request additional information or clarification from the 2nd Party during this process.' 
                      : 'تقوم لجنة المطالبات بتقييم المطالبة بمدخلات من الفرق الفنية والقانونية. يشمل التقييم تقييم الاستحقاق والسببية والكمية. قد تطلب لجنة المطالبات معلومات إضافية أو توضيحًا من الطرف الثاني خلال هذه العملية.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '5. Claim Determination' : '5. تحديد المطالبة'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'The Claims Committee issues a formal Claim Determination within 15 working days from the date of receiving the complete claim, as required by Article 87 of GTPL RC 128. The determination may be to approve (in full or in part), reject, or request further negotiation of the claim.' 
                      : 'تصدر لجنة المطالبات قرارًا رسميًا بشأن المطالبة خلال 15 يوم عمل من تاريخ استلام المطالبة الكاملة، كما هو مطلوب بموجب المادة 87 من نظام المنافسات والمشتريات الحكومية. قد يكون القرار بالموافقة (كليًا أو جزئيًا)، أو الرفض، أو طلب مزيد من التفاوض بشأن المطالبة.'}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Scale size={20} className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">
                        {activeTab === 'english' ? 'GTPL RC 128 Compliance Note' : 'ملاحظة الامتثال لنظام المنافسات والمشتريات الحكومية'}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {activeTab === 'english' 
                          ? 'Per Article 87, the Claims Committee must decide on filed appeals within 15 working days from the date of filing. The committee may extend this period for a similar period if necessary.' 
                          : 'وفقًا للمادة 87، يجب على لجنة المطالبات أن تبت في الاستئنافات المقدمة خلال 15 يوم عمل من تاريخ التقديم. يمكن للجنة تمديد هذه الفترة لفترة مماثلة إذا لزم الأمر.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '6. Implementation' : '6. التنفيذ'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'If the claim is approved, the Project Manager implements the determination by issuing the appropriate documentation (e.g., Variation Order, Time Extension, or Payment Certificate). The Project Manager updates the project documentation, including the project plan, schedule, and budget.' 
                      : 'إذا تمت الموافقة على المطالبة، ينفذ مدير المشروع القرار من خلال إصدار الوثائق المناسبة (مثل أمر التغيير، أو تمديد الوقت، أو شهادة الدفع). يقوم مدير المشروع بتحديث وثائق المشروع، بما في ذلك خطة المشروع والجدول الزمني والميزانية.'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  {activeTab === 'english' ? '7. Appeal Process' : '7. عملية الاستئناف'}
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'If the 2nd Party disagrees with the Claim Determination, they may appeal to the Ministry\'s Appeal Committee within 3 days of being notified of the determination, as per Article 87 of GTPL RC 128. The Appeal Committee shall decide on the appeal within 15 working days from the date of filing.' 
                      : 'إذا لم يوافق الطرف الثاني على قرار المطالبة، يمكنه الاستئناف إلى لجنة الاستئناف بالوزارة خلال 3 أيام من إخطاره بالقرار، وفقًا للمادة 87 من نظام المنافسات والمشتريات الحكومية. تبت لجنة الاستئناف في الاستئناف خلال 15 يوم عمل من تاريخ التقديم.'}
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
                        ? 'GTPL RC 128 Article 86: Committee for Complaints and Grievances' 
                        : 'المادة 86 من نظام المنافسات والمشتريات الحكومية: لجنة النظر في الشكاوى والتظلمات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GTPL RC 128 Article 87: Appeal Procedures' 
                        : 'المادة 87 من نظام المنافسات والمشتريات الحكومية: إجراءات التظلم'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GTPL RC 128 Article 88: Violations by Contractors' 
                        : 'المادة 88 من نظام المنافسات والمشتريات الحكومية: مخالفات المتعاقدين'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GTPL RC 128 Article 113: Contract Price Adjustment' 
                        : 'المادة 113 من نظام المنافسات والمشتريات الحكومية: تعديل أسعار العقود'}
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
                        ? 'GDMP-PDM-VAR-001: Variation Management Procedure' 
                        : 'GDMP-PDM-VAR-001: إجراء إدارة التغيير'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GDMP-PDM-DIS-001: Dispute Resolution Procedure' 
                        : 'GDMP-PDM-DIS-001: إجراء حل النزاعات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'GDMP-PDM-CON-001: Contract Management Procedure' 
                        : 'GDMP-PDM-CON-001: إجراء إدارة العقود'}
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
                      ? 'GDMP-PDM-F005: Claim Submission Form' 
                      : 'GDMP-PDM-F005: نموذج تقديم المطالبة'}
                  </li>
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F006: Notice of Claim Form' 
                      : 'GDMP-PDM-F006: نموذج إشعار المطالبة'}
                  </li>
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F007: Claim Evaluation Form' 
                      : 'GDMP-PDM-F007: نموذج تقييم المطالبة'}
                  </li>
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F008: Claim Determination Form' 
                      : 'GDMP-PDM-F008: نموذج قرار المطالبة'}
                  </li>
                  <li>
                    {activeTab === 'english' 
                      ? 'GDMP-PDM-F009: Claim Appeal Form' 
                      : 'GDMP-PDM-F009: نموذج استئناف المطالبة'}
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
                ? 'Document ID: GDMP-PDM-CLM-001 | Version: 2.0 | Last Updated: April 2025' 
                : 'معرف المستند: GDMP-PDM-CLM-001 | الإصدار: 2.0 | آخر تحديث: أبريل 2025'}
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

export default GdmpClaimsModule;