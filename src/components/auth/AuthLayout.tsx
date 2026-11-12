import React from 'react';
import { AuthHeroPanel } from './AuthHeroPanel';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuth } from '../../context/AuthContext';

export const AuthLayout: React.FC = () => {
  const { authMode } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left panel: Dark navy and blue gradient panel with Indian merchant photo & typography */}
      <section 
        aria-label="AI Business Desk overview"
        className="w-full lg:w-[52%] lg:min-h-screen"
      >
        <AuthHeroPanel />
      </section>

      {/* Right panel: Crisp white authentication panel */}
      <section 
        aria-label="Account authentication"
        className="w-full lg:w-[48%] flex flex-col justify-center items-center py-12 px-6 sm:px-10 lg:px-16 bg-white min-h-[500px]"
      >
        {authMode === 'login' ? <LoginForm /> : <RegisterForm />}
      </section>
    </div>
  );
};
