import React, { useState } from 'react';
import { Shield, LayoutDashboard, LogOut, LogIn, Sparkles, ChevronDown, User, Settings, CreditCard, ShieldAlert, BookOpen, MessageSquare, Bell } from 'lucide-react';
import { KuraLogoIcon } from './KuraLogo';

interface HeaderProps {
  currentView: string;
  userEmail: string | null;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export default function Header({ currentView, userEmail, onNavigate, onLogout }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLandingMenu, setShowLandingMenu] = useState(false);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setShowProfileMenu(false);
    setShowLandingMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 bg-[#F3F8FF]/90 backdrop-blur-md border-b border-[#D1E5F4]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('landing')} 
          className="flex items-center gap-2.5 cursor-pointer group active:scale-95 transition-transform"
          id="kura-logo-container"
        >
          <div className="w-11 h-11 rounded-2xl bg-white border border-[#D1E5F4] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <KuraLogoIcon size={34} />
          </div>
          <div>
            <span className="cherry-title text-2xl text-[#0F2744] tracking-wide transition-colors">KURA</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold tracking-wider text-[#38BDF8] uppercase bg-[#E5F0FD] px-2.5 py-0.5 rounded-full border border-[#D1E5F4]/40">
              Healthcare AI SaaS
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Tabs (Center) */}
        {!userEmail ? (
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/60 p-1 rounded-full border border-[#D1E5F4] shadow-sm">
            <button 
              onClick={() => handleNavClick('about')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${currentView === 'about' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('features')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${currentView === 'features' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('pricing')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${currentView === 'pricing' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavClick('blog')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${currentView === 'blog' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              Blog
            </button>
            <button 
              onClick={() => handleNavClick('help')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${currentView === 'help' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              Help Center
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors ${currentView === 'contact' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              Contact
            </button>
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-1 bg-white/60 p-1 rounded-full border border-[#D1E5F4] shadow-sm">
            <button 
              onClick={() => handleNavClick('dashboard')}
              className={`text-xs font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1 ${currentView === 'dashboard' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard Hub
            </button>
            <button 
              onClick={() => handleNavClick('saved-insights')}
              className={`text-xs font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1 ${currentView === 'saved-insights' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Saved Insights
            </button>
            <button 
              onClick={() => handleNavClick('admin-dashboard')}
              className={`text-xs font-bold px-4 py-1.5 rounded-full transition-colors flex items-center gap-1 ${currentView === 'admin-dashboard' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin & Analytics
            </button>
            <button 
              onClick={() => handleNavClick('notifications')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 relative ${currentView === 'notifications' ? 'bg-[#0F2744] text-white' : 'text-[#0F2744] hover:bg-[#E5F0FD]'}`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-0 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white animate-pulse"></span>
            </button>
          </nav>
        )}

        {/* Navigation Action Hub */}
        <div className="flex items-center gap-3" id="navigation-action-hub">
          {userEmail ? (
            <div className="flex items-center gap-2 relative">
              {/* Dynamic User Email Tagline */}
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-[#0F2744] bg-white border border-[#D1E5F4] px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {userEmail}
              </span>

              {/* Profile Config Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border border-[#D1E5F4] bg-white text-[#0F2744] hover:bg-[#E5F0FD]/80 transition-all select-none"
                  id="profile-dropdown-btn"
                >
                  <User className="w-3.5 h-3.5 text-[#0F2744]" />
                  Settings
                  <ChevronDown className={`w-3 h-3 text-[#0F2744] transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-[#D1E5F4] shadow-lg py-2.5 z-50 animate-in fade-in slide-in-from-top-1 text-slate-700 text-xs">
                    <button 
                      onClick={() => handleNavClick('profile')}
                      className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold text-slate-700 flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <User className="w-4 h-4 text-[#A8C0DC]" />
                      User Profile
                    </button>
                    <button 
                      onClick={() => handleNavClick('settings')}
                      className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold text-slate-700 flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-[#A8C0DC]" />
                      General Settings
                    </button>
                    <button 
                      onClick={() => handleNavClick('security-settings')}
                      className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold text-slate-700 flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <ShieldAlert className="w-4 h-4 text-[#A8C0DC]" />
                      Security & Privacy
                    </button>
                    <button 
                      onClick={() => handleNavClick('billing')}
                      className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold text-slate-700 flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-[#A8C0DC]" />
                      Billing & Plans
                    </button>
                    <div className="border-t border-slate-100 my-1.5"></div>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-bold flex items-center gap-2 border-none bg-transparent cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Navigation Drawer Toggle */}
              <button 
                onClick={() => handleNavClick('dashboard')}
                className="lg:hidden p-2 rounded-xl border border-[#D1E5F4] bg-white text-[#0F2744] hover:bg-[#E5F0FD]"
                title="Go to Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Dropdown for Mobile Learn More items */}
              <div className="relative">
                <button 
                  onClick={() => setShowLandingMenu(!showLandingMenu)}
                  className="lg:hidden text-xs font-bold text-[#0F2744] hover:bg-[#E5F0FD] px-3 py-2 rounded-xl border border-[#D1E5F4] flex items-center gap-1 transition-colors bg-white"
                >
                  Pages
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                
                {showLandingMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-[#D1E5F4] shadow-lg py-2 z-50 animate-in fade-in text-slate-700 text-xs">
                    <button onClick={() => handleNavClick('about')} className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold">About</button>
                    <button onClick={() => handleNavClick('features')} className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold">Features</button>
                    <button onClick={() => handleNavClick('pricing')} className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold">Pricing</button>
                    <button onClick={() => handleNavClick('blog')} className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold">Blog</button>
                    <button onClick={() => handleNavClick('help')} className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold">Help Center</button>
                    <button onClick={() => handleNavClick('contact')} className="w-full text-left px-4 py-2 hover:bg-[#E5F0FD] font-semibold">Contact</button>
                  </div>
                )}
              </div>

              <button 
                onClick={() => handleNavClick('landing')}
                className="hidden lg:inline-block text-xs font-bold text-[#0F2744] hover:text-[#A8C0DC] px-3.5 py-2 rounded-xl transition-colors"
              >
                Product Home
              </button>
              
              <button 
                onClick={() => handleNavClick('login')}
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl bg-[#0F2744] hover:bg-[#09182C] text-white transition-all shadow-sm active:scale-95"
                id="btn-login-header"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
