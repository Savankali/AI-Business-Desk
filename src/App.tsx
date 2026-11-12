import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthLayout } from './components/auth/AuthLayout';
import { AppLayout } from './components/layout/AppLayout';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading, login, setAuthMode } = useAuth();

  // Support ?autostart=1 or ?mode=register from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'register') {
      setAuthMode('register');
    } else if (params.get('mode') === 'login') {
      setAuthMode('login');
    }

    if (params.get('autostart') === '1' && !isAuthenticated) {
      // Auto-start into demo workspace for automated testing
      login('owner@sharmaelectricals.in', 'SharmaPass#2026');
    }
  }, [isAuthenticated, login, setAuthMode]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#071329] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#005bf8] text-2xl font-bold">
            ₹
          </div>
          <p className="text-sm font-semibold tracking-tight">AI Business Desk</p>
          <div className="h-1 w-24 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-full origin-left-right animate-pulse bg-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <AppLayout /> : <AuthLayout />;
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
