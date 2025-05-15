import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, GitCompare, FileText, Scale, Book, Shield, Globe, Rocket, Database, FileDiff } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

// Define the sidebar structure with color coding
const sidebarStructure = [
  {
    title: "Variations Management Hub",
    collapsible: true,
    style: { color: "#FFD700", fontWeight: "bold", fontSize: "15px", fontFamily: "Times New Roman" },
    icon: GitCompare,
    items: [
      { id: 'variations-management-hub', title: "Variations Management Hub" },
      { id: 'master-variations', title: "Master Variations Dashboard" },
      { id: 'variation-requests', title: "Variation Requests" },
      { id: 'variation-documents', title: "Project Variation Documents" },
      { id: 'contractor-response', title: "Contractor Response" },
      { id: 'variation-analysis', title: "AI-Driven Variations Analysis" },
      { id: 'variation-approval', title: "Variation Approval" },
      { id: 'variations-compliance-guide', title: "Variations Compliance Guide" }
    ]
  },
  {
    title: "Claims Management Hub",
    collapsible: true,
    style: { color: "#FFD700", fontWeight: "bold", fontSize: "15px", fontFamily: "Times New Roman" },
    icon: FileText,
    items: [
      { id: 'claims-management-hub', title: "Claims Management Hub" },
      { id: 'dashboard', title: "Dashboard" },
      { id: 'claims-dashboard', title: "Claims Dashboard" },
      { id: 'master-claims', title: "Master Claims" },
      { id: 'documents', title: "Project Documents" },
      { id: 'notices', title: "Notice of Claims" },
      { id: 'engineer-response', title: "Engineer Response" },
      { id: 'records', title: "Contemporaneous Records" },
      { id: 'detailed-claims', title: "Detailed Claims" },
      { id: 'analysis', title: "Claims Analysis" },
      { id: 'claims-ai', title: "AI Analysis" },
      { id: 'resolution', title: "Claims Resolution" },
      { id: 'claims-compliance-guide', title: "Claims Compliance Guide" }
    ]
  },
  {
    title: "Dispute & Arbitration Hub",
    collapsible: true,
    style: { color: "#FFD700", fontWeight: "bold", fontSize: "15px", fontFamily: "Times New Roman" },
    icon: Scale,
    items: [
      { id: 'dispute-arbitration-guide', title: "Dispute & Arbitration Guide" },
      { id: 'disputes-settlement', title: "Dispute Settlement" },
      { id: 'disputes-arbitration', title: "Arbitration" }
    ]
  },
  {
    title: "Knowledge Base Hub",
    collapsible: true,
    style: { color: "#FFD700", fontWeight: "bold", fontSize: "15px", fontFamily: "Times New Roman" },
    icon: Book,
    items: [
      { id: 'knowledge-base', title: "Knowledge Base" },
      { id: 'system-guide', title: "System Guide" },
      { id: 'gtpl-rc128-table-of-contents', title: "GTPL RC 128 Law – Index (EN-AR)" },
      { id: 'gtpl-rc128-part-selector', title: "GTPL RC 128 Law - (EN-AR)" },
      { id: 'gtpl-rc128-regulation-toc', title: "GTPL RC 128 Regulation - Index (EN-AR)" },
      { id: 'gtpl-rc128-regulation-viewer', title: "GTPL RC 128 Regulation - (EN-AR)" },
      { id: 'gdmp-variation', title: "GDMP - Variation Sub-Module" },
      { id: 'gdmp-claims', title: "GDMP - Claims By 2nd Party" },
      { id: 'gdmp-disputes', title: "GDMP - Disputes and Arbitration" }
    ]
  },
  {
    title: "Deployment",
    collapsible: true,
    style: { color: "#FFD700", fontWeight: "bold", fontSize: "15px", fontFamily: "Times New Roman" },
    icon: Rocket,
    items: [
      { id: 'deployment-status', title: "Deployment Status" }
    ]
  }
];

const Sidebar = () => {
  const { currentView, handleModuleChange } = useApp();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Variations Management Hub": false,
    "Claims Management Hub": false,
    "Dispute & Arbitration Hub": false,
    "Knowledge Base Hub": false,
    "Deployment": false
  });
  const [isMobile, setIsMobile] = useState(false);

  // Initialize expanded sections based on current view
  useEffect(() => {
    // Find which section contains the current view
    const sectionToExpand = sidebarStructure.find(section => 
      section.items.some(item => item.id === currentView)
    );
    
    if (sectionToExpand) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionToExpand.title]: true
      }));
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
  }, [currentView]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleItemClick = (id: string, subModule: string) => {
    handleModuleChange(id as any, subModule);
  };

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-[#1A237E]" style={{ fontFamily: "Times New Roman", fontSize: "14px", fontWeight: "bold" }}>
      {sidebarStructure.map((section, index) => {
        const IconComponent = section.icon;
        const isExpanded = expandedSections[section.title];
        
        return (
          <div key={index} className="sidebar-section">
            <button
              className="sidebar-section-header w-full flex items-center justify-between p-1.5 text-left text-white hover:bg-[#5A68F4] rounded-lg"
              onClick={() => toggleSection(section.title)}
              style={{ fontFamily: "Times New Roman", fontSize: "16px", fontWeight: "bold" }}
            >
              <div className="flex items-center gap-1.5">
                <IconComponent size={16} style={{ color: section.style.color }} />
                <span 
                  className="sidebar-section-header-text overflow-hidden truncate whitespace-nowrap"
                  style={{ color: section.style.color, fontWeight: "bold", fontSize: "16px", fontFamily: "Times New Roman" }}
                >
                  {section.title}
                </span>
              </div>
              {isExpanded ? (
                <ChevronDown size={12} style={{ color: section.style.color }} />
              ) : (
                <ChevronRight size={12} style={{ color: section.style.color }} />
              )}
            </button>
            
            {isExpanded && (
              <div className="mt-0.5 ml-2 space-y-0.5">
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className={`sidebar-item w-full flex items-center p-1.5 rounded-lg ${
                      currentView === item.id ? 'sidebar-item-active bg-[#2C3CD6] font-bold' : 'text-white'
                    }`}
                    onClick={() => handleItemClick(item.id, 'Overview')}
                    style={{ fontFamily: "Times New Roman", fontSize: "16px", fontWeight: "bold" }}
                  >
                    <span className="overflow-hidden truncate whitespace-nowrap">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Sidebar;