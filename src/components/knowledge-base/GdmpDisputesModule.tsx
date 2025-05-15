import React, { useState, useEffect } from 'react';
import { Book, Download, FileText, ArrowRight, Info, Globe, ChevronDown, ChevronUp, Scale, AlertCircle, Gavel } from 'lucide-react';

const GdmpDisputesModule = () => {
  const [activeTab, setActiveTab] = useState('english');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'purpose': true,
    'definitions': false,
    'responsibilities': false,
    'process': false,
    'process-4-1': false,
    'process-4-2': false,
    'process-4-3': false,
    'process-4-4': false,
    'process-4-5': false,
    'process-4-6': false,
    'process-4-7': false,
    'attachments': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would download the actual PDF
    alert('Downloading GDMP Disputes and Arbitration Procedure PDF...');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Gavel className="text-blue-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">GDMP – Disputes and Arbitration Procedure</h1>
            <p className="text-gray-500">إجراء التحكيم وفض النزاعات • Based on MMR-CAE-KD0-PR-000024, Rev. 000</p>
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
                  ? 'This document outlines procedures for resolving disputes and arbitration in MoMRA-managed projects, in compliance with Government Tenders and Procurement Law (Royal Decree No. M/128).' 
                  : 'توضح هذه الوثيقة إجراءات حل النزاعات والتحكيم في المشاريع التي تديرها وزارة الشؤون البلدية والقروية والإسكان، وفقًا لنظام المنافسات والمشتريات الحكومية (المرسوم الملكي رقم م/128).'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6" dir={activeTab === 'arabic' ? 'rtl' : 'ltr'}>
        <h2 className="text-lg font-semibold mb-4">{activeTab === 'english' ? 'Table of Contents' : 'جدول المحتويات'}</h2>
        <div className="space-y-2">
          <button 
            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
            onClick={() => toggleSection('purpose')}
          >
            <span>{activeTab === 'english' ? '1.0 PURPOSE' : '1.0 الغرض'}</span>
            {expandedSections['purpose'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <button 
            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
            onClick={() => toggleSection('definitions')}
          >
            <span>{activeTab === 'english' ? '2.0 DEFINITIONS' : '2.0 التعريفات'}</span>
            {expandedSections['definitions'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <button 
            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
            onClick={() => toggleSection('responsibilities')}
          >
            <span>{activeTab === 'english' ? '3.0 ROLES & RESPONSIBILITIES' : '3.0 المهام والمسؤوليات'}</span>
            {expandedSections['responsibilities'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          <button 
            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
            onClick={() => toggleSection('process')}
          >
            <span>{activeTab === 'english' ? '4.0 PROCESS' : '4.0 الإجراءات'}</span>
            {expandedSections['process'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections['process'] && (
            <div className="ml-6 space-y-2">
              <button 
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                onClick={() => toggleSection('process-4-1')}
              >
                <span>{activeTab === 'english' ? '4.1 Formation of DAB' : '4.1 تشكيل مجلس فض النزاعات'}</span>
                {expandedSections['process-4-1'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                onClick={() => toggleSection('process-4-2')}
              >
                <span>{activeTab === 'english' ? '4.2 DAB Area of Application' : '4.2 مجال تطبيق مجلس فض النزاعات'}</span>
                {expandedSections['process-4-2'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                onClick={() => toggleSection('process-4-3')}
              >
                <span>{activeTab === 'english' ? '4.3 Challenging Procedures' : '4.3 إجراءات الطعن'}</span>
                {expandedSections['process-4-3'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                onClick={() => toggleSection('process-4-4')}
              >
                <span>{activeTab === 'english' ? '4.4 Contract Provisions and Violations Committee' : '4.4 لجنة أحكام العقود والمخالفات'}</span>
                {expandedSections['process-4-4'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                onClick={() => toggleSection('process-4-5')}
              >
                <span>{activeTab === 'english' ? '4.5 Contract\'s Parties Obligations' : '4.5 التزامات أطراف العقد'}</span>
                {expandedSections['process-4-5'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                onClick={() => toggleSection('process-4-6')}
              >
                <span>{activeTab === 'english' ? '4.6 Arbitration Conditions' : '4.6 شروط التحكيم'}</span>
                {expandedSections['process-4-6'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
                onClick={() => toggleSection('process-4-7')}
              >
                <span>{activeTab === 'english' ? '4.7 Arbitration' : '4.7 التحكيم'}</span>
                {expandedSections['process-4-7'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          )}
          
          <button 
            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg"
            onClick={() => toggleSection('attachments')}
          >
            <span>{activeTab === 'english' ? '5.0 ATTACHMENTS' : '5.0 المرفقات'}</span>
            {expandedSections['attachments'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
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
            <span>{activeTab === 'english' ? '1.0 PURPOSE' : '1.0 الغرض'}</span>
            {expandedSections['purpose'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['purpose'] && (
            <div className="mt-4 space-y-4">
              <p>
                {activeTab === 'english' 
                  ? 'This procedure establishes a standardized process for resolving disputes and conducting arbitration in GDMP projects. It ensures fair, transparent, and consistent handling of disputes in compliance with Government Tenders and Procurement Law (Royal Decree No. M/128) and its Implementing Regulations.' 
                  : 'يحدد هذا الإجراء عملية موحدة لحل النزاعات وإجراء التحكيم في مشاريع GDMP. ويضمن التعامل العادل والشفاف والمتسق مع النزاعات وفقًا لنظام المنافسات والمشتريات الحكومية (المرسوم الملكي رقم م/128) ولائحته التنفيذية.'}
              </p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  {activeTab === 'english' 
                    ? 'Legal Reference: Articles 86, 87, 88, 154, 155 of GTPL RC 128' 
                    : 'المرجع القانوني: المواد 86، 87، 88، 154، 155 من نظام المنافسات والمشتريات الحكومية'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Definitions Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('definitions')}
          >
            <span>{activeTab === 'english' ? '2.0 DEFINITIONS' : '2.0 التعريفات'}</span>
            {expandedSections['definitions'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['definitions'] && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Dispute' : 'النزاع'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'Any disagreement or conflict arising between the parties to a contract regarding the interpretation, execution, or termination of the contract.' 
                      : 'أي خلاف أو صراع ينشأ بين أطراف العقد بشأن تفسير العقد أو تنفيذه أو إنهائه.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'DAB' : 'مجلس فض النزاعات'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'Dispute Adjudication Board: A panel formed to resolve technical disputes between the parties to a contract.' 
                      : 'مجلس فض النزاعات: لجنة تشكل لحل النزاعات الفنية بين أطراف العقد.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Arbitration' : 'التحكيم'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A method of dispute resolution where an independent third party (arbitrator) makes a binding decision on the dispute.' 
                      : 'طريقة لحل النزاعات حيث يقوم طرف ثالث مستقل (المحكم) باتخاذ قرار ملزم بشأن النزاع.'}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Technical Dispute' : 'النزاع الفني'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {activeTab === 'english' 
                      ? 'A dispute related to technical aspects of the project that could lead to project failure or significant harm to either or both parties.' 
                      : 'نزاع متعلق بالجوانب الفنية للمشروع يمكن أن يؤدي إلى فشل المشروع أو ضرر كبير لأحد الطرفين أو كليهما.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Roles & Responsibilities Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('responsibilities')}
          >
            <span>{activeTab === 'english' ? '3.0 ROLES & RESPONSIBILITIES' : '3.0 المهام والمسؤوليات'}</span>
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
                        ? 'Initial assessment of disputes' 
                        : 'التقييم الأولي للنزاعات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Coordinating the dispute resolution process' 
                        : 'تنسيق عملية حل النزاعات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Implementing DAB decisions' 
                        : 'تنفيذ قرارات مجلس فض النزاعات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Maintaining dispute records and documentation' 
                        : 'الحفاظ على سجلات ووثائق النزاعات'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Dispute Adjudication Board (DAB)' : 'مجلس فض النزاعات'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Reviewing and evaluating technical disputes' 
                        : 'مراجعة وتقييم النزاعات الفنية'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Issuing decisions on technical disputes within 30 days' 
                        : 'إصدار قرارات بشأن النزاعات الفنية خلال 30 يومًا'}
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
                    {activeTab === 'english' ? 'Legal Department' : 'الإدارة القانونية'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Providing legal advice on disputes' 
                        : 'تقديم المشورة القانونية بشأن النزاعات'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Reviewing arbitration requests' 
                        : 'مراجعة طلبات التحكيم'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Representing the organization in arbitration proceedings' 
                        : 'تمثيل المنظمة في إجراءات التحكيم'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Ensuring compliance with legal requirements' 
                        : 'ضمان الامتثال للمتطلبات القانونية'}
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {activeTab === 'english' ? 'Ministry of Finance' : 'وزارة المالية'}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>
                      {activeTab === 'english' 
                        ? 'Approving arbitration requests for contracts exceeding SAR 100 million' 
                        : 'الموافقة على طلبات التحكيم للعقود التي تتجاوز قيمتها 100 مليون ريال سعودي'}
                    </li>
                    <li>
                      {activeTab === 'english' 
                        ? 'Appointing chairperson for technical dispute councils' 
                        : 'تعيين رئيس مجالس النزاعات الفنية'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Process Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('process')}
          >
            <span>{activeTab === 'english' ? '4.0 PROCESS' : '4.0 الإجراءات'}</span>
            {expandedSections['process'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['process'] && (
            <div className="mt-4 space-y-6">
              {/* 4.1 Formation of DAB */}
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-2 text-left font-medium text-base border-b border-gray-100"
                  onClick={() => toggleSection('process-4-1')}
                >
                  <span>{activeTab === 'english' ? '4.1 Formation of DAB' : '4.1 تشكيل مجلس فض النزاعات'}</span>
                  {expandedSections['process-4-1'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections['process-4-1'] && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      {activeTab === 'english' 
                        ? 'In case of a technical dispute between the government entity and the contractor that could lead to project failure or significant harm to either or both parties, a Dispute Adjudication Board (DAB) shall be formed to consider the dispute, consisting of:' 
                        : 'في حالة نشوء خلاف فني بين الجهة الحكومية والمتعاقد معها، يكون من شأنه أن يؤدي إلى تعثر المشروع أو إلحاق ضرر بالطرفين أو بأحدهما، يشكل مجلس لفض النزاعات للنظر في الخلاف، يتكون من:'}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      <li>
                        {activeTab === 'english' 
                          ? 'A representative from the government entity' 
                          : 'ممثل عن الجهة الحكومية'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'A representative from the contractor' 
                          : 'ممثل عن المتعاقد'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'A chairperson appointed by the Ministry of Finance' 
                          : 'رئيس يعينه وزارة المالية'}
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          {activeTab === 'english' 
                            ? 'The DAB shall be formed within 14 days of the dispute notification. Each party shall nominate their representative within 7 days of the dispute notification.' 
                            : 'يتم تشكيل مجلس فض النزاعات خلال 14 يومًا من إخطار النزاع. يجب على كل طرف تعيين ممثله خلال 7 أيام من إخطار النزاع.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 4.2 DAB Area of Application */}
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-2 text-left font-medium text-base border-b border-gray-100"
                  onClick={() => toggleSection('process-4-2')}
                >
                  <span>{activeTab === 'english' ? '4.2 DAB Area of Application' : '4.2 مجال تطبيق مجلس فض النزاعات'}</span>
                  {expandedSections['process-4-2'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections['process-4-2'] && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      {activeTab === 'english' 
                        ? 'The DAB shall consider technical disputes that could lead to project failure or significant harm. Technical disputes include, but are not limited to:' 
                        : 'ينظر مجلس فض النزاعات في الخلافات الفنية التي قد تؤدي إلى فشل المشروع أو ضرر كبير. تشمل النزاعات الفنية، على سبيل المثال لا الحصر:'}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      <li>
                        {activeTab === 'english' 
                          ? 'Disputes related to technical specifications and standards' 
                          : 'النزاعات المتعلقة بالمواصفات والمعايير الفنية'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Disputes related to quality of materials and workmanship' 
                          : 'النزاعات المتعلقة بجودة المواد والعمل'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Disputes related to project schedule and delays' 
                          : 'النزاعات المتعلقة بجدول المشروع والتأخيرات'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Disputes related to technical aspects of variations and change orders' 
                          : 'النزاعات المتعلقة بالجوانب الفنية للتغييرات وأوامر التغيير'}
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          {activeTab === 'english' 
                            ? 'The DAB shall not consider disputes related to contract interpretation, legal matters, or financial claims that are not of a technical nature.' 
                            : 'لا ينظر مجلس فض النزاعات في النزاعات المتعلقة بتفسير العقد أو المسائل القانونية أو المطالبات المالية التي ليست ذات طبيعة فنية.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 4.3 Challenging Procedures */}
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-2 text-left font-medium text-base border-b border-gray-100"
                  onClick={() => toggleSection('process-4-3')}
                >
                  <span>{activeTab === 'english' ? '4.3 Challenging Procedures' : '4.3 إجراءات الطعن'}</span>
                  {expandedSections['process-4-3'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections['process-4-3'] && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      {activeTab === 'english' 
                        ? 'Bidders and contractors may challenge decisions through the following procedures:' 
                        : 'يمكن للمتنافسين والمتعاقدين الطعن في القرارات من خلال الإجراءات التالية:'}
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                      <li>
                        {activeTab === 'english' 
                          ? 'Submit a written appeal to the Appeal Committee formed by the Minister of Finance within 3 days of notification of the decision.' 
                          : 'تقديم تظلم كتابي إلى لجنة التظلمات المشكلة من وزير المالية خلال 3 أيام من الإخطار بالقرار.'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'The appeal must include all supporting documents and a guarantee equal to half the amount of the initial guarantee.' 
                          : 'يجب أن يتضمن التظلم جميع المستندات الداعمة وضمانًا يساوي نصف مبلغ الضمان الابتدائي.'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'The Appeal Committee shall decide on the appeal within 15 working days from the date of filing.' 
                          : 'تبت لجنة التظلمات في التظلم خلال 15 يوم عمل من تاريخ التقديم.'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'The Committee\'s decision shall be binding on all government agencies.' 
                          : 'يكون قرار اللجنة ملزمًا لجميع الجهات الحكومية.'}
                      </li>
                    </ol>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          {activeTab === 'english' 
                            ? 'The guarantee shall be returned to the appellant if the appeal is successful.' 
                            : 'يعاد الضمان إلى المتظلم إذا ثبت صحة التظلم.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 4.4 Contract Provisions and Violations Committee */}
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-2 text-left font-medium text-base border-b border-gray-100"
                  onClick={() => toggleSection('process-4-4')}
                >
                  <span>{activeTab === 'english' ? '4.4 Contract Provisions and Violations Committee' : '4.4 لجنة أحكام العقود والمخالفات'}</span>
                  {expandedSections['process-4-4'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections['process-4-4'] && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      {activeTab === 'english' 
                        ? 'The Minister shall form one or more committees to consider contractor violations. The committee shall:' 
                        : 'يشكل الوزير لجنة أو أكثر للنظر في مخالفات المتعاقدين. تقوم اللجنة بما يلي:'}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      <li>
                        {activeTab === 'english' 
                          ? 'Consider violations by contractors' 
                          : 'النظر في مخالفات المتعاقدين'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Impose penalties on violators' 
                          : 'فرض عقوبات على المخالفين'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Maintain a register of violating contractors' 
                          : 'الاحتفاظ بسجل للمتعاقدين المخالفين'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Publish the list of violating contractors on the Portal' 
                          : 'نشر قائمة المتعاقدين المخالفين على البوابة'}
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-red-700">
                          {activeTab === 'english' 
                            ? 'Penalties may include temporary or permanent prohibition from dealing with government agencies.' 
                            : 'قد تشمل العقوبات الحظر المؤقت أو الدائم من التعامل مع الجهات الحكومية.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 4.5 Contract's Parties Obligations */}
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-2 text-left font-medium text-base border-b border-gray-100"
                  onClick={() => toggleSection('process-4-5')}
                >
                  <span>{activeTab === 'english' ? '4.5 Contract\'s Parties Obligations' : '4.5 التزامات أطراف العقد'}</span>
                  {expandedSections['process-4-5'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections['process-4-5'] && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {activeTab === 'english' ? 'Government Entity Obligations' : 'التزامات الجهة الحكومية'}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          <li>
                            {activeTab === 'english' 
                              ? 'Fulfill contractual obligations' 
                              : 'الوفاء بالالتزامات التعاقدية'}
                          </li>
                          <li>
                            {activeTab === 'english' 
                              ? 'Pay contractor entitlements according to the contract' 
                              : 'دفع مستحقات المتعاقد وفقًا للعقد'}
                          </li>
                          <li>
                            {activeTab === 'english' 
                              ? 'Provide necessary information and documents' 
                              : 'توفير المعلومات والوثائق اللازمة'}
                          </li>
                          <li>
                            {activeTab === 'english' 
                              ? 'Cooperate in dispute resolution' 
                              : 'التعاون في حل النزاعات'}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {activeTab === 'english' ? 'Contractor Obligations' : 'التزامات المتعاقد'}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          <li>
                            {activeTab === 'english' 
                              ? 'Execute the contract according to specifications' 
                              : 'تنفيذ العقد وفقًا للمواصفات'}
                          </li>
                          <li>
                            {activeTab === 'english' 
                              ? 'Adhere to project schedule' 
                              : 'الالتزام بجدول المشروع'}
                          </li>
                          <li>
                            {activeTab === 'english' 
                              ? 'Provide required documentation' 
                              : 'تقديم الوثائق المطلوبة'}
                          </li>
                          <li>
                            {activeTab === 'english' 
                              ? 'Cooperate in dispute resolution' 
                              : 'التعاون في حل النزاعات'}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          {activeTab === 'english' 
                            ? 'Both parties must continue to perform their obligations under the contract during the dispute resolution process, unless otherwise directed by the DAB or arbitration tribunal.' 
                            : 'يجب على كلا الطرفين الاستمرار في أداء التزاماتهما بموجب العقد أثناء عملية حل النزاع، ما لم يوجه مجلس فض النزاعات أو هيئة التحكيم بخلاف ذلك.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 4.6 Arbitration Conditions */}
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-2 text-left font-medium text-base border-b border-gray-100"
                  onClick={() => toggleSection('process-4-6')}
                >
                  <span>{activeTab === 'english' ? '4.6 Arbitration Conditions' : '4.6 شروط التحكيم'}</span>
                  {expandedSections['process-4-6'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections['process-4-6'] && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      {activeTab === 'english' 
                        ? 'Arbitration is only permitted under the following conditions:' 
                        : 'لا يسمح بالتحكيم إلا بموجب الشروط التالية:'}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                      <li>
                        {activeTab === 'english' 
                          ? 'The contract value exceeds SAR 100 million' 
                          : 'تتجاوز قيمة العقد 100 مليون ريال سعودي'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Prior approval from the Minister of Finance is obtained' 
                          : 'الحصول على موافقة مسبقة من وزير المالية'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Arbitration is conducted in accordance with the Saudi Arbitration Law' 
                          : 'يتم إجراء التحكيم وفقًا لنظام التحكيم السعودي'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Saudi law is the governing law for the arbitration' 
                          : 'القانون السعودي هو القانون الحاكم للتحكيم'}
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-red-700">
                          {activeTab === 'english' 
                            ? 'Arbitration is not permitted for disputes arising from contracts with a value of less than SAR 100 million.' 
                            : 'لا يسمح بالتحكيم للنزاعات الناشئة عن العقود التي تقل قيمتها عن 100 مليون ريال سعودي.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 4.7 Arbitration */}
              <div className="space-y-4">
                <button 
                  className="w-full flex items-center justify-between p-2 text-left font-medium text-base border-b border-gray-100"
                  onClick={() => toggleSection('process-4-7')}
                >
                  <span>{activeTab === 'english' ? '4.7 Arbitration' : '4.7 التحكيم'}</span>
                  {expandedSections['process-4-7'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedSections['process-4-7'] && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 mb-4">
                      {activeTab === 'english' 
                        ? 'The arbitration process shall follow these steps:' 
                        : 'تتبع عملية التحكيم هذه الخطوات:'}
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                      <li>
                        {activeTab === 'english' 
                          ? 'Submit a request for arbitration to the Ministry of Finance, including all relevant documents and justifications.' 
                          : 'تقديم طلب التحكيم إلى وزارة المالية، بما في ذلك جميع المستندات والمبررات ذات الصلة.'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Upon approval, prepare an arbitration agreement in accordance with the Saudi Arbitration Law.' 
                          : 'عند الموافقة، إعداد اتفاقية تحكيم وفقًا لنظام التحكيم السعودي.'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Appoint arbitrators according to the agreed procedure.' 
                          : 'تعيين المحكمين وفقًا للإجراء المتفق عليه.'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Conduct arbitration proceedings in accordance with the Saudi Arbitration Law.' 
                          : 'إجراء إجراءات التحكيم وفقًا لنظام التحكيم السعودي.'}
                      </li>
                      <li>
                        {activeTab === 'english' 
                          ? 'Implement the arbitral award once it becomes final.' 
                          : 'تنفيذ حكم التحكيم بمجرد أن يصبح نهائيًا.'}
                      </li>
                    </ol>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Scale size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          {activeTab === 'english' 
                            ? 'The arbitral award shall be enforced through the competent court in Saudi Arabia in accordance with the Saudi Arbitration Law.' 
                            : 'يتم تنفيذ حكم التحكيم من خلال المحكمة المختصة في المملكة العربية السعودية وفقًا لنظام التحكيم السعودي.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Attachments Section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between p-2 text-left font-bold text-lg border-b border-gray-200"
            onClick={() => toggleSection('attachments')}
          >
            <span>{activeTab === 'english' ? '5.0 ATTACHMENTS' : '5.0 المرفقات'}</span>
            {expandedSections['attachments'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {expandedSections['attachments'] && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="https://www.nazaha.gov.sa/ar/Pages/GTPL_RoyalDecree_M128.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FileText size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">
                      {activeTab === 'english' 
                        ? 'Saudi Government Tenders and Procurement Law (2019) - Royal Decree No. M/128' 
                        : 'نظام المنافسات والمشتريات الحكومية السعودي (2019) - م/128'}
                    </p>
                    <p className="text-sm text-gray-500">PDF</p>
                  </div>
                  <ArrowRight className="ml-auto text-gray-400" size={16} />
                </a>
                
                <a 
                  href="https://www.nazaha.gov.sa/ar/Pages/GTPL_Regulations_1242.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FileText size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">
                      {activeTab === 'english' 
                        ? 'Implementing Regulations of the GTPL - Ministerial Decision No. 1242' 
                        : 'اللائحة التنفيذية لنظام المنافسات - قرار وزاري رقم 1242'}
                    </p>
                    <p className="text-sm text-gray-500">PDF</p>
                  </div>
                  <ArrowRight className="ml-auto text-gray-400" size={16} />
                </a>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-blue-900">
                      {activeTab === 'english' ? 'Additional Resources' : 'موارد إضافية'}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {activeTab === 'english' 
                        ? 'For more information on dispute resolution and arbitration, please refer to the GTPL RC 128 Law and its Implementing Regulations.' 
                        : 'لمزيد من المعلومات حول حل النزاعات والتحكيم، يرجى الرجوع إلى نظام المنافسات والمشتريات الحكومية ولائحته التنفيذية.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              {activeTab === 'english' 
                ? 'Document ID: GDMP-PDM-DIS-001 | Version: 2.0 | Last Updated: April 2025' 
                : 'معرف المستند: GDMP-PDM-DIS-001 | الإصدار: 2.0 | آخر تحديث: أبريل 2025'}
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

export default GdmpDisputesModule;