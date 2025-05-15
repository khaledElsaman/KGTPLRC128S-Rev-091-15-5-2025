import React, { createContext, useContext, useState, useCallback } from 'react';
import { useUser } from './UserContext';
import { globalSearch, type SearchResult } from '../lib/search';

type ModuleId = 
  // Variations Management Hub
  | 'variations-management-hub'
  | 'master-variations'
  | 'variation-requests'
  | 'variation-documents'
  | 'contractor-response'
  | 'variation-analysis'
  | 'variation-approval'
  | 'variations-compliance-guide'
  // Claims Management Hub
  | 'claims-management-hub'
  | 'dashboard'
  | 'claims-dashboard'
  | 'master-claims'
  | 'documents'
  | 'notices'
  | 'engineer-response'
  | 'records'
  | 'detailed-claims'
  | 'analysis'
  | 'claims-ai'
  | 'resolution'
  | 'claims-compliance-guide'
  // Dispute & Arbitration Hub
  | 'dispute-arbitration-guide'
  | 'disputes-settlement'
  | 'disputes-arbitration'
  // Knowledge Base
  | 'knowledge-base'
  | 'system-guide'
  | 'gtpl-rc128-table-of-contents'
  | 'gtpl-rc128-part-i'
  | 'gtpl-rc128-part-ii'
  | 'gtpl-rc128-part-iii'
  | 'gtpl-rc128-part-iii-arabic'
  | 'gtpl-rc128-part-iv'
  | 'gtpl-rc128-part-iv-arabic'
  | 'gtpl-rc128-part-v'
  | 'gtpl-rc128-part-v-arabic'
  | 'gtpl-rc128-part-vii'
  | 'gtpl-rc128-part-vii-arabic'
  | 'gtpl-rc128-part-selector'
  | 'gtpl-rc128-regulation-toc'
  | 'gtpl-rc128-regulation'
  | 'gtpl-rc128-regulation-ar'
  | 'gtpl-rc128-regulation-viewer'
  | 'gdmp-variation'
  | 'gdmp-claims'
  | 'gdmp-disputes'
  // Deployment Status
  | 'deployment-status';

type Notification = {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
};

type AppContextType = {
  currentView: ModuleId;
  currentSubView: string;
  notifications: Notification[];
  isSidebarOpen: boolean;
  breadcrumbs: string[];
  handleModuleChange: (moduleId: ModuleId, subModule: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  toggleSidebar: () => void;
  searchGlobal: (query: string) => Promise<SearchResult[]>;
  handleSearchSelect: (result: SearchResult) => void;
  updateBreadcrumbs: (breadcrumbs: string[]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasPermission, currentUser } = useUser();
  const [currentView, setCurrentView] = useState<ModuleId>('variations-management-hub');
  const [currentSubView, setCurrentSubView] = useState('Overview');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(['Home']);

  const handleModuleChange = useCallback((moduleId: ModuleId, subModule: string) => {
    if (!hasPermission(moduleId, 'view')) {
      addNotification({
        type: 'error',
        title: 'Access Denied',
        message: 'You do not have permission to access this module.'
      });
      return;
    }

    setCurrentView(moduleId);
    setCurrentSubView(subModule);
    
    const moduleNames: Record<ModuleId, string> = {
      // Variations Management Hub
      'variations-management-hub': 'Variations Management Hub',
      'master-variations': 'Master Variations',
      'variation-requests': 'Variation Requests',
      'variation-documents': 'Project Variation Documents',
      'contractor-response': 'Contractor Response',
      'variation-analysis': 'Variation Analysis',
      'variation-approval': 'Variation Approval',
      'variations-compliance-guide': 'Variations Compliance Guide',
      
      // Claims Management Hub
      'claims-management-hub': 'Claims Management Hub',
      'dashboard': 'Dashboard',
      'claims-dashboard': 'Claims Dashboard',
      'master-claims': 'Master Claims',
      'documents': 'Project Documents',
      'notices': 'Notice of Claims',
      'engineer-response': 'Engineer Response',
      'records': 'Contemporaneous Records',
      'detailed-claims': 'Detailed Claims',
      'analysis': 'Claims Analysis',
      'claims-ai': 'AI Analysis',
      'resolution': 'Claims Resolution',
      'claims-compliance-guide': 'Claims Compliance Guide',
      
      // Dispute & Arbitration Hub
      'dispute-arbitration-guide': 'Dispute & Arbitration Guide',
      'disputes-settlement': 'Dispute Settlement',
      'disputes-arbitration': 'Arbitration',
      
      // Knowledge Base
      'knowledge-base': 'Knowledge Base',
      'system-guide': 'System Guide',
      'gtpl-rc128-table-of-contents': 'GTPL RC 128 Law – Index (EN-AR)',
      'gtpl-rc128-part-i': 'GTPL RC 128 Law - Part I',
      'gtpl-rc128-part-ii': 'GTPL RC 128 Law - Part II',
      'gtpl-rc128-part-iii': 'GTPL RC 128 Law - Part III',
      'gtpl-rc128-part-iii-arabic': 'GTPL RC 128 Law - Part III (AR)',
      'gtpl-rc128-part-iv': 'GTPL RC 128 Law - Part IV',
      'gtpl-rc128-part-iv-arabic': 'GTPL RC 128 Law - Part IV (AR)',
      'gtpl-rc128-part-v': 'GTPL RC 128 Law - Part V',
      'gtpl-rc128-part-v-arabic': 'GTPL RC 128 Law - Part V (AR)',
      'gtpl-rc128-part-vii': 'GTPL RC 128 Law - Part VII',
      'gtpl-rc128-part-vii-arabic': 'GTPL RC 128 Law - Part VII (AR)',
      'gtpl-rc128-part-selector': 'GTPL RC 128 Law - (EN-AR)',
      'gtpl-rc128-regulation-toc': 'GTPL RC 128 Regulation - Index (EN-AR)',
      'gtpl-rc128-regulation': 'GTPL RC 128 Regulation',
      'gtpl-rc128-regulation-ar': 'GTPL RC 128 Regulation - Arabic',
      'gtpl-rc128-regulation-viewer': 'GTPL RC 128 Regulation - (EN-AR)',
      'gdmp-variation': 'GDMP - Variation Sub-Module',
      'gdmp-claims': 'GDMP - Claims By 2nd Party',
      'gdmp-disputes': 'GDMP - Disputes and Arbitration',
      
      // Deployment Status
      'deployment-status': 'Deployment Status'
    };

    setBreadcrumbs(['Home', moduleNames[moduleId], subModule]);
  }, [hasPermission]);

  // Redirect to appropriate dashboard based on user role
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'employer') { // Authority
        handleModuleChange('variations-management-hub', 'Overview');
      } else if (currentUser.role === 'engineer') { // Consultant
        handleModuleChange('variation-analysis', 'Overview');
      } else if (currentUser.role === 'contractor') { // Contractor
        handleModuleChange('master-variations', 'All Variations');
      }
    }
  }, [currentUser, handleModuleChange]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'time'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2),
      time: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const searchGlobal = useCallback(async (query: string) => {
    if (!query.trim()) return [];
    return await globalSearch(query);
  }, []);

  const handleSearchSelect = useCallback((result: SearchResult) => {
    const moduleId = result.type === 'claim' ? 'master-claims' : 'master-variations';
    handleModuleChange(moduleId, 'Overview');
  }, [handleModuleChange]);

  const updateBreadcrumbs = useCallback((newBreadcrumbs: string[]) => {
    setBreadcrumbs(newBreadcrumbs);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentView,
        currentSubView,
        notifications,
        isSidebarOpen,
        breadcrumbs,
        handleModuleChange,
        addNotification,
        markNotificationAsRead,
        clearNotifications,
        toggleSidebar,
        searchGlobal,
        handleSearchSelect,
        updateBreadcrumbs
      }}
    >
      {children}
    </AppContext.Provider>
  );
};