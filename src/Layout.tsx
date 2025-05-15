import React, { useState } from 'react';
import { Menu, Bell, User, Search, ChevronDown, ChevronRight, Home, Shield, Settings, HelpCircle, Info, ArrowRight } from 'lucide-react';
import { useApp } from './contexts/AppContext';
import { useUser } from './contexts/UserContext';
import GlobalSearch from './components/common/GlobalSearch';
import Sidebar from './components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { 
    currentView, 
    currentSubView, 
    notifications, 
    markNotificationAsRead,
    toggleSidebar,
    isSidebarOpen,
    handleModuleChange,
    updateBreadcrumbs
  } = useApp();
  
  const { currentUser, logout } = useUser();
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Get current module name for breadcrumbs
  const getModuleName = () => {
    switch (currentView) {
      // Variations Management Hub
      case 'variations-management-hub': return 'Variations Management Hub';
      case 'variations': return 'Variations Dashboard';
      case 'master-variations': return 'Master Variations Dashboard';
      case 'variation-documents': return 'Project Variation Documents';
      case 'contractor-response': return 'Contractor Response';
      case 'variation-analysis': return 'AI-Driven Variations Analysis';
      case 'variation-approval': return 'Variation Approval';
      case 'variations-compliance-guide': return 'Variations Compliance Guide';
      
      // Claims Management Hub
      case 'claims-management-hub': return 'Claims Management Hub';
      case 'dashboard': return 'Dashboard';
      case 'claims-dashboard': return 'Claims Dashboard';
      case 'master-claims': return 'Master Claims';
      case 'documents': return 'Project Documents';
      case 'notices': return 'Notice of Claims';
      case 'engineer-response': return 'Engineer Response';
      case 'records': return 'Contemporaneous Records';
      case 'detailed-claims': return 'Detailed Claims';
      case 'analysis': return 'Claims Analysis';
      case 'claims-ai': return 'AI Analysis';
      case 'resolution': return 'Claims Resolution';
      case 'claims-compliance-guide': return 'Claims Compliance Guide';
      
      // Dispute & Arbitration Hub
      case 'dispute-arbitration-guide': return 'Dispute & Arbitration Guide';
      case 'disputes-settlement': return 'Dispute Settlement';
      case 'disputes-arbitration': return 'Arbitration';
      
      // Knowledge Base
      case 'knowledge-base': return 'Knowledge Base';
      case 'system-guide': return 'System Guide';
      case 'gtpl-rc128-table-of-contents': return 'GTPL RC 128 Law – Index (EN-AR)';
      case 'gtpl-rc128-articles-en': return 'GTPL RC 128 Law - English';
      case 'gtpl-rc128-articles-ar': return 'GTPL RC 128 Law - Arabic';
      case 'gtpl-rc128-regulation-toc': return 'GTPL RC 128 Regulation - Index (EN-AR)';
      case 'gtpl-rc128-regulation': return 'GTPL RC 128 Regulation';
      case 'gtpl-rc128-regulation-en': return 'GTPL RC 128 Regulation - English';
      case 'gtpl-rc128-regulation-ar': return 'GTPL RC 128 Regulation - Arabic';
      
      default: return 'Dashboard';
    }
  };

  // Get submodules for current view
  const getSubModules = () => {
    switch (currentView) {
      case 'claims-dashboard':
        return ['Overview', 'Insights', 'Trends', 'Notifications', 'Compliance'];
      case 'master-claims':
        return ['Active Claims', 'Pending Claims', 'Archived Claims'];
      case 'documents':
        return ['All Documents', 'Pending Approvals', 'Archived Files'];
      case 'notices':
        return ['Draft Notices', 'Issued Notices', 'Archived Notices'];
      case 'engineer-response':
        return ['All Responses', 'Pending Reviews', 'Approved Responses'];
      case 'records':
        return ['Daily Logs', 'Incident Reports', 'Pending Reviews'];
      case 'detailed-claims':
        return ['Submitted Claims', 'Under Review', 'Rejected Claims'];
      case 'analysis':
        return ['Overview', 'Pending Reviews', 'Insights'];
      case 'claims-ai':
        return ['Trends', 'Predictions', 'Early Warnings', 'Reports'];
      case 'resolution':
        return ['Active Resolutions', 'Completed Cases', 'Committee Approval'];
      case 'variations':
        return ['Overview', 'Price Adjustments', 'Scope Changes', 'Additional Works', 'Variation Requests'];
      case 'variation-analysis':
        return ['Overview', 'Impact Analysis', 'Trends'];
      case 'variation-approval':
        return ['Pending Approval', 'Approved', 'Rejected'];
      case 'disputes-settlement':
        return ['Active Disputes', 'Resolved Disputes', 'Technical Disputes'];
      case 'disputes-arbitration':
        return ['Domestic Arbitration', 'International Arbitration', 'Arbitration Tribunal'];
      default:
        return ['Overview'];
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-[350px] bg-[#1A237E] border-r border-[#5060E6] fixed inset-y-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-4 border-b border-[#5060E6]">
          <h1 className="text-xl font-bold text-white whitespace-nowrap overflow-hidden truncate">KGTPLRC128S</h1>
          <p className="text-sm text-[#B9C7F7] whitespace-nowrap overflow-hidden truncate">Claims & Variations Management</p>
        </div>
        
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-[#1A237E] border-b border-[#5060E6]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button 
                className="p-2 hover:bg-[#5A68F4] rounded-lg md:hidden text-white"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu size={20} />
              </button>
              <GlobalSearch />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Help & Support */}
              <div className="relative">
                <button
                  onClick={() => setShowHelpMenu(!showHelpMenu)}
                  className="p-2 hover:bg-[#5A68F4] rounded-lg flex items-center gap-2 text-white"
                >
                  <HelpCircle size={20} className="text-[#B9C7F7]" />
                  <span className="hidden md:block">Help & Support</span>
                </button>
                {showHelpMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Documentation</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Training Videos</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Contact Support</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">FAQs</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className="p-2 hover:bg-[#5A68F4] rounded-lg flex items-center gap-2 text-white"
                >
                  <Settings size={20} className="text-[#B9C7F7]" />
                  <span className="hidden md:block">Settings</span>
                </button>
                {showSettingsMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">General Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Notifications</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Security</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Preferences</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 hover:bg-[#5A68F4] rounded-lg text-white"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={20} className="text-[#B9C7F7]" />
                  {notifications?.length > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications?.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications?.map(notification => (
                          <div
                            key={notification.id}
                            className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              {notification.type === 'warning' && (
                                <Info className="text-yellow-500" size={20} />
                              )}
                              {notification.type === 'success' && (
                                <CheckCircle className="text-green-500" size={20} />
                              )}
                              {notification.type === 'error' && (
                                <Info className="text-red-500" size={20} />
                              )}
                              <div>
                                <p className="font-medium">{notification.title}</p>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 hover:bg-[#5A68F4] rounded-lg px-3 py-2 text-white"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 bg-[#2C3CD6] rounded-full flex items-center justify-center">
                    <User size={16} className="text-[#B9C7F7]" />
                  </div>
                  <span className="hidden md:block whitespace-nowrap overflow-hidden truncate">Dr.Khaled Elsaman</span>
                  <ChevronDown size={16} className="text-[#B9C7F7]" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                        Profile Settings
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50">
                        Preferences
                      </button>
                      <div className="border-t border-gray-200"></div>
                      <button 
                        onClick={logout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="border-t border-[#5060E6] bg-[#f0f9ff]">
            <div className="flex items-center px-4 py-2">
              <div className="flex items-center text-sm font-medium text-[#1f2937]">
                <button 
                  className="hover:text-[#0c4a6e]"
                  onClick={() => {
                    handleModuleChange('claims-management-hub', 'Overview');
                  }}
                >
                  Home
                </button>
                <ChevronRight size={16} className="mx-2" />
                <span className="font-semibold text-[#1f2937]">{getModuleName()}</span>
              </div>
            </div>
            
            <div className="px-4 overflow-x-auto border-b border-[#dbeafe]">
              <div className="flex space-x-6 py-2">
                {getSubModules().map((subModule) => (
                  <button
                    key={subModule}
                    onClick={() => handleModuleChange(currentView as any, subModule)}
                    className={`relative px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                      currentSubView === subModule
                        ? 'text-[#0c4a6e]'
                        : 'text-[#1f2937] hover:text-[#0c4a6e] hover:bg-[#e0f2fe]'
                    } rounded-md`}
                    style={{ fontSize: '15px' }}
                  >
                    {subModule}
                    {currentSubView === subModule && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0c4a6e]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;