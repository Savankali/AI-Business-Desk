import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DashboardOverview } from '../dashboard/DashboardOverview';
import { InvoicesView } from '../dashboard/InvoicesView';
import { CustomersView } from '../dashboard/CustomersView';
import { PaymentsView } from '../dashboard/PaymentsView';
import { AiDeskView } from '../dashboard/AiDeskView';
import { RecordsView } from '../dashboard/RecordsView';
import { SettingsView } from '../dashboard/SettingsView';
import { NavItemKey } from '../../types';

export const AppLayout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavItemKey>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <DashboardOverview onNavigate={(tab) => setCurrentTab(tab)} />;
      case 'invoices':
        return <InvoicesView />;
      case 'customers':
        return <CustomersView />;
      case 'payments':
        return <PaymentsView />;
      case 'ai-desk':
        return <AiDeskView />;
      case 'records':
        return <RecordsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview onNavigate={(tab) => setCurrentTab(tab)} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main content column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          currentTab={currentTab}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNewAction={() => setCurrentTab('invoices')}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
