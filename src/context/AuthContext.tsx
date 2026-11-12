import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthMode, SyncBackendStatus, User, Workspace } from '../types';
import { validateBusinessName, validateEmail, validatePassword } from '../utils/validation';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_USER = 'ai_business_desk_user';
const LOCAL_STORAGE_KEY_WORKSPACE = 'ai_business_desk_workspace';
const LOCAL_STORAGE_KEY_ACCOUNTS = 'ai_business_desk_registered_accounts';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [backendStatus, setBackendStatus] = useState<SyncBackendStatus>('local_session');

  // Load existing session and check backend capabilities
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      const storedWorkspace = localStorage.getItem(LOCAL_STORAGE_KEY_WORKSPACE);

      if (storedUser && storedWorkspace) {
        setUser(JSON.parse(storedUser));
        setWorkspace(JSON.parse(storedWorkspace));
      }
    } catch (e) {
      console.warn('Failed to restore session from storage:', e);
    } finally {
      setIsLoading(false);
    }

    // Check backend health/status
    fetch('/api/auth/status')
      .then(res => res.json())
      .then(data => {
        if (data.supabaseConfigured) {
          setBackendStatus('supabase_configured');
        } else {
          setBackendStatus('pending_env');
        }
      })
      .catch(() => {
        setBackendStatus('local_session');
      });
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return { success: false, error: emailValidation.error };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.error };
    }

    // Check registered accounts in local storage
    try {
      const accountsJson = localStorage.getItem(LOCAL_STORAGE_KEY_ACCOUNTS);
      const accounts = accountsJson ? JSON.parse(accountsJson) : [];
      
      const found = accounts.find((acc: { email: string }) => acc.email.toLowerCase() === email.trim().toLowerCase());
      
      let loggedUser: User;
      let loggedWorkspace: Workspace;

      if (found) {
        loggedUser = {
          id: found.userId,
          email: found.email,
          fullName: found.fullName || found.businessName,
          createdAt: found.createdAt || new Date().toISOString(),
        };
        loggedWorkspace = {
          id: found.workspaceId || 'ws-' + Date.now(),
          name: found.businessName || 'My Business Desk',
          ownerId: loggedUser.id,
          currency: 'INR',
          createdAt: found.createdAt || new Date().toISOString(),
        };
      } else {
        // First-time or demo login: generate a workspace based on email domain or business handle
        const prefix = email.split('@')[0];
        const businessName = prefix.charAt(0).toUpperCase() + prefix.slice(1) + ' Enterprises';
        loggedUser = {
          id: 'usr-' + Math.random().toString(36).substring(2, 9),
          email: email.trim().toLowerCase(),
          createdAt: new Date().toISOString(),
        };
        loggedWorkspace = {
          id: 'ws-' + Math.random().toString(36).substring(2, 9),
          name: businessName,
          ownerId: loggedUser.id,
          currency: 'INR',
          createdAt: new Date().toISOString(),
        };
      }

      setUser(loggedUser);
      setWorkspace(loggedWorkspace);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(loggedUser));
      localStorage.setItem(LOCAL_STORAGE_KEY_WORKSPACE, JSON.stringify(loggedWorkspace));

      return { success: true };
    } catch {
      return { success: false, error: 'Failed to process login' };
    }
  };

  const registerWorkspace = async (
    businessName: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const nameVal = validateBusinessName(businessName);
    if (!nameVal.isValid) {
      return { success: false, error: nameVal.error };
    }

    const emailVal = validateEmail(email);
    if (!emailVal.isValid) {
      return { success: false, error: emailVal.error };
    }

    const passVal = validatePassword(password);
    if (!passVal.isValid) {
      return { success: false, error: passVal.error };
    }

    try {
      const newUserId = 'usr-' + Math.random().toString(36).substring(2, 9);
      const newWorkspaceId = 'ws-' + Math.random().toString(36).substring(2, 9);
      const now = new Date().toISOString();

      const newUser: User = {
        id: newUserId,
        email: email.trim().toLowerCase(),
        fullName: businessName.trim(),
        createdAt: now,
      };

      const newWorkspace: Workspace = {
        id: newWorkspaceId,
        name: businessName.trim(),
        ownerId: newUserId,
        currency: 'INR',
        createdAt: now,
      };

      // Save to registered accounts list
      const accountsJson = localStorage.getItem(LOCAL_STORAGE_KEY_ACCOUNTS);
      const accounts = accountsJson ? JSON.parse(accountsJson) : [];
      accounts.push({
        userId: newUserId,
        workspaceId: newWorkspaceId,
        businessName: businessName.trim(),
        email: email.trim().toLowerCase(),
        createdAt: now,
      });
      localStorage.setItem(LOCAL_STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));

      // Save current active session
      setUser(newUser);
      setWorkspace(newWorkspace);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(LOCAL_STORAGE_KEY_WORKSPACE, JSON.stringify(newWorkspace));

      return { success: true };
    } catch {
      return { success: false, error: 'Failed to create workspace' };
    }
  };

  const logout = () => {
    setUser(null);
    setWorkspace(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
    localStorage.removeItem(LOCAL_STORAGE_KEY_WORKSPACE);
    setAuthMode('login');
  };

  const updateWorkspace = (updates: Partial<Workspace>) => {
    if (!workspace) return;
    const updated = { ...workspace, ...updates };
    setWorkspace(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY_WORKSPACE, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        isAuthenticated: !!user && !!workspace,
        isLoading,
        authMode,
        backendStatus,
        setAuthMode,
        login,
        registerWorkspace,
        logout,
        updateWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
