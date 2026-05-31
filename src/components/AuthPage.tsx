import React, { useState } from 'react';
import { Mail, Lock, LogIn, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { KuraLogoIcon } from './KuraLogo';

interface AuthPageProps {
  initialMode: 'login' | 'register';
  onAuthSuccess: (email: string) => void;
  onBackToLanding: () => void;
}

export default function AuthPage({ initialMode, onAuthSuccess, onBackToLanding }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('parimigayatri5@gmail.com'); // Pre-fill with the user email for exceptional helper UX
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please specify a valid clinical-record email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    // Simulate secure network timing
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess(email);
    }, 850);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess(email || 'patient.user@gmail.com');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto pt-16 pb-24 px-4" id="auth-page">
      <button 
        onClick={onBackToLanding}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200/80 px-3 py-1.5 rounded-full mb-6 transition-colors shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Landing Page
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="kura-glass-card p-8 rounded-3xl border border-[#D1E5F4] bg-white shadow-sm"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#D1E5F4] flex items-center justify-center shadow-sm mx-auto mb-3">
            <KuraLogoIcon size={44} />
          </div>
          <h2 className="cherry-title text-2xl text-[#0F2744]">
            {mode === 'login' ? 'Welcome Back To KURA' : 'Register Secure Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 font-medium">
            {mode === 'login' ? 'Review past panels & translate jargon safely' : 'Get started decoding high-complexity medical reports'}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" id="auth-form">
          <div>
            <label className="block text-xs font-bold text-[#0F2744] mb-1.5 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-[#D1E5F4] focus:border-[#0F2744] focus:outline-none text-sm transition-all focus:bg-white"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F2744] mb-1.5 uppercase tracking-wider">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 border border-[#D1E5F4] focus:border-[#0F2744] focus:outline-none text-sm transition-all focus:bg-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#0F2744] hover:bg-[#09182C] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
            id="btn-auth-submit"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </>
            )}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D1E5F4]"></div></div>
          <span className="relative bg-white px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400">or play immediately</span>
        </div>

        {/* Dynamic Multi-Provider Auth Buttons */}
        <button 
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-white border border-[#D1E5F4] hover:bg-[#E5F0FD] text-[#0F2744] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          id="btn-google-auth"
        >
          {/* Static SVG Google Logo */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.125C18.232 1.764 15.485.8 12.24.8 5.76.8.5 6.06.5 12.5s5.26 11.7 11.74 11.7c6.766 0 11.272-4.755 11.272-11.47 0-.77-.08-1.36-.18-1.945H12.24z"/>
          </svg>
          Sign In with Google (Fast Bypass)
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#0F2744]/75 font-medium">
            {mode === 'login' ? "Don't have a secure Kura account?" : "Already have a Kura account?"}{' '}
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-[#0F2744] font-extrabold hover:underline bg-transparent border-none cursor-pointer"
            >
              {mode === 'login' ? 'Register Now' : 'Sign In Now'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
