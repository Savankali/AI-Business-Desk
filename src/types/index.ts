/**
 * AI Business Desk - Core TypeScript Definitions
 */

export interface User {
  id: string;
  email: string;
  fullName?: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  businessType?: string;
  gstin?: string;
  state?: string;
  city?: string;
  currency: 'INR';
  createdAt: string;
}

export type AuthMode = 'login' | 'register';

export type SyncBackendStatus = 'local_session' | 'supabase_configured' | 'pending_env';

export interface AuthContextType {
  user: User | null;
  workspace: Workspace | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMode: AuthMode;
  backendStatus: SyncBackendStatus;
  setAuthMode: (mode: AuthMode) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerWorkspace: (businessName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateWorkspace: (updates: Partial<Workspace>) => void;
}

export type NavItemKey = 
  | 'overview' 
  | 'invoices' 
  | 'customers' 
  | 'payments' 
  | 'ai-desk' 
  | 'records' 
  | 'settings';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  gstin?: string;
  balanceDue: number;
  totalBilled: number;
  status: 'active' | 'overdue' | 'clear';
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // 0, 5, 12, 18, 28
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  gstTotal: number;
  grandTotal: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  paymentMode?: string;
}

export interface PaymentRecord {
  id: string;
  invoiceId?: string;
  customerName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'UPI' | 'NEFT/RTGS' | 'Cash' | 'Cheque';
  referenceNumber?: string;
  status: 'verified' | 'pending';
}

export interface DashboardMetrics {
  totalRevenueMonth: number;
  pendingReceivables: number;
  invoicesCountMonth: number;
  activeCustomersCount: number;
  collectedThisWeek: number;
}
