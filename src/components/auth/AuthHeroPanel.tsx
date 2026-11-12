import React from 'react';
import { Shield } from 'lucide-react';

export const AuthHeroPanel: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-[#071329] p-8 md:p-12 lg:p-16 text-white min-h-[460px] lg:min-h-screen">
      {/* Background Image of Indian Merchant in Workshop with Blending Gradients */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src="/assets/merchant_portrait.jpg"
          alt=""
          className="absolute right-0 top-0 h-full w-[60%] md:w-[50%] lg:w-[48%] object-cover object-center opacity-85"
        />
        {/* Navy gradient overlays to recreate the exact emergent visual style */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071329] via-[#071329]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051126] via-[#07193b]/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#0052fe25,transparent_70%)]" />
      </div>

      {/* Top Header: Logo + Brand Name */}
      <div className="relative z-10 flex items-center gap-3">
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005bf8] text-white shadow-lg shadow-blue-600/30 font-bold text-xl select-none"
          aria-hidden="true"
        >
          ₹
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          AI Business Desk
        </span>
      </div>

      {/* Middle Hero Typography */}
      <div className="relative z-10 my-auto py-12 max-w-lg">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-200/90 mb-6 bg-blue-950/40 px-3 py-1 rounded-full border border-blue-500/20 backdrop-blur-sm">
          <Shield className="h-3.5 w-3.5 text-blue-400" />
          <span>Built for Indian small businesses</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.12]">
          More clarity.<br />
          Less paperwork.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-md">
          Keep invoices, customers and payments together, and ask your business records real questions.
        </p>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 pt-4 border-t border-white/5">
        <p className="text-xs text-slate-400 font-normal">
          Private business records, separated by account.
        </p>
      </div>
    </div>
  );
};
