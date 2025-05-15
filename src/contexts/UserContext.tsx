import React, { createContext, useContext, useState, useCallback } from 'react';

type UserRole = 'employer' | 'engineer' | 'contractor';

type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  projects: string[];
  lastLogin: string;
  status: 'active' | 'inactive';
};

type UserContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (module: string, action: string) => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    // Mock login - replace with actual authentication
    let mockUser: User;
    
    if (email.toLowerCase() === 'ksaman001@aiseccm.com') {
      mockUser = {
        id: 'KSAMAN001',
        username: 'Dr. Khaled Elsaman',
        email: email,
        role: 'employer', // Authority
        projects: ['PRJ-001', 'PRJ-002'],
        lastLogin: new Date().toISOString(),
        status: 'active'
      };
    } else if (email.toLowerCase() === 'isebage001@aiseccm.com') {
      mockUser = {
        id: 'ISEBAGE001',
        username: 'Eng. Islam Sebage',
        email: email,
        role: 'engineer', // Consultant
        projects: ['PRJ-001', 'PRJ-002'],
        lastLogin: new Date().toISOString(),
        status: 'active'
      };
    } else if (email.toLowerCase() === 'contractor001@example.com') {
      mockUser = {
        id: 'CONTRACTOR001',
        username: 'Contractor Example',
        email: email,
        role: 'contractor',
        projects: ['PRJ-001'],
        lastLogin: new Date().toISOString(),
        status: 'active'
      };
    } else if (email.toLowerCase() === 'khelsaman@gmail.com' && password === 'K@16121967s') {
      // Special case for the specific email and password
      mockUser = {
        id: 'KSAMAN001',
        username: 'Dr. Khaled Elsaman',
        email: 'Ksaman001@AISECCM.com', // Use the standard email internally
        role: 'employer', // Authority
        projects: ['PRJ-001', 'PRJ-002'],
        lastLogin: new Date().toISOString(),
        status: 'active'
      };
    } else {
      throw new Error('Invalid credentials');
    }
    
    setCurrentUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const hasPermission = useCallback((module: string, action: string): boolean => {
    if (!currentUser) return false;
    
    // Role-based permissions
    if (currentUser.role === 'employer') {
      // Authority has full access
      return true;
    }
    
    if (currentUser.role === 'engineer') {
      // Consultant permissions
      const consultantModules = [
        'variations', 'variation-analysis', 'engineer-notices', 
        'claims-dashboard', 'master-claims', 'documents', 
        'engineer-response', 'analysis', 'gtpl-guide'
      ];
      
      if (consultantModules.includes(module)) {
        return true;
      }
      
      // Restricted from approvals
      if (module === 'variation-approval' && action === 'approve') {
        return false;
      }
    }
    
    if (currentUser.role === 'contractor') {
      // Contractor permissions
      const contractorModules = [
        'master-variations', 'contractor-response', 'documents',
        'claims-dashboard', 'master-claims', 'notices', 'gtpl-guide'
      ];
      
      if (contractorModules.includes(module)) {
        return true;
      }
    }
    
    return false;
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, login, logout, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};