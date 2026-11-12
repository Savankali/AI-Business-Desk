import React, { useState } from 'react';
import { ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginForm: React.FC = () => {
  const { login, setAuthMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Failed to sign in');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('owner@sharmaelectricals.in');
    setPassword('SharmaPass#2026');
    setError(null);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto px-4 sm:px-6">
      {/* Header section */}
      <div className="mb-6">
        <span className="text-[11px] font-bold tracking-widest text-[#005bf8] uppercase block mb-1">
          WELCOME BACK
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Sign in to your desk
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Your invoices and customer records are waiting.
        </p>
      </div>

      {/* Error notification banner */}
      {error && (
        <div 
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="login-email" 
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbusiness.in"
            className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50/60 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005bf8] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label 
            htmlFor="login-password" 
            className="block text-xs font-semibold text-slate-800 mb-1.5"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50/60 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005bf8] focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 mt-2 bg-[#005bf8] hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch auth mode */}
      <div className="mt-5 text-center">
        <p className="text-xs text-slate-500">
          New to Business Desk?{' '}
          <button
            type="button"
            onClick={() => {
              setError(null);
              setAuthMode('register');
            }}
            className="text-[#005bf8] hover:underline font-semibold focus:outline-none cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>

      {/* Demo helper */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
        <button
          type="button"
          onClick={handleDemoFill}
          className="text-[11px] text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Quick fill demo credentials
        </button>
      </div>

      {/* Privacy & Hash footnote */}
      <div className="mt-6 text-center">
        <p className="text-[11px] leading-relaxed text-slate-400 max-w-xs mx-auto">
          Your account only sees its own business records. Passwords are stored as one-way hashes.
        </p>
      </div>
    </div>
  );
};
