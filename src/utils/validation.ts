/**
 * AI Business Desk - Input Validation & Formatting Utilities
 * Specially tailored for Indian MSMEs
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateBusinessName(name: string): ValidationResult {
  const trimmed = name?.trim() ?? '';
  if (!trimmed) {
    return { isValid: false, error: 'Business name is required' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Business name must be at least 2 characters' };
  }
  if (trimmed.length > 100) {
    return { isValid: false, error: 'Business name must not exceed 100 characters' };
  }
  return { isValid: true };
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email?.trim() ?? '';
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required' };
  }
  // Standard email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. you@yourbusiness.in)' };
  }
  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters' };
  }
  return { isValid: true };
}

/**
 * Validates Indian 15-character Goods and Services Tax Identification Number (GSTIN)
 * Format: 2 digits (state) + 10 chars (PAN) + 1 digit (entity) + 1 char ('Z') + 1 check digit
 */
export function validateGSTIN(gstin: string): ValidationResult {
  const trimmed = gstin?.trim().toUpperCase() ?? '';
  if (!trimmed) {
    return { isValid: true }; // GSTIN is optional for micro businesses under ₹40L/₹20L threshold
  }
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstinRegex.test(trimmed)) {
    return { isValid: false, error: 'Invalid GSTIN format. Expected 15-character alphanumeric (e.g. 27AAPFU0939F1ZV)' };
  }
  return { isValid: true };
}

/**
 * Formats a number to Indian Rupee (INR) currency representation
 * e.g. 150000 -> ₹1,50,000
 */
export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  if (compact && Math.abs(amount) >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (compact && Math.abs(amount) >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
