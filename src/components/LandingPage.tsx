import React from 'react';
import { 
  Sparkles, FileText, BookOpen, Clock, Heart, Users, CheckCircle, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { KuraLogoIcon } from './KuraLogo';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenDemo: (id: string) => void;
  isAuthenticated: boolean;
}

export default function LandingPage({ onNavigate, onOpenDemo, isAuthenticated }: LandingPageProps) {
  
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#0F2744]" />,
      title: "Friendly Readability Level",
      desc: "Instantly translates complex diagnostic parameters into a level highly accessible to individuals, families, and high schoolers."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#0F2744]" />,
      title: "Interactive Medical Glossary",
      desc: "Demystifies professional clinical slang. Learn exact definitions of markers like ALT, creatinine, AST, and cholesterol on demand."
    },
    {
      icon: <FileText className="w-6 h-6 text-[#0F2744]" />,
      title: "Multi-Language Compatibility",
      desc: "Switch dynamically on the fly between English, Hindi, Gujarati, Tamil, Telugu, and Bengali to comprehend reports in your native tongue."
    },
    {
      icon: <Users className="w-6 h-6 text-[#0F2744]" />,
      title: "Empowering Doctor Checklists",
      desc: "Generates custom follow-up questions specialized for your report to bring directly to your next primary consultation."
    },
    {
      icon: <Heart className="w-6 h-6 text-[#0F2744]" />,
      title: "Historical Trend Comparisons",
      desc: "Chart fluctuations between past and present values to understand whether metabolic patterns are stabilizing over time."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0F2744]" />,
      title: "Strict Medical Safety Guards",
      desc: "Built solely for literacy education. Programmed strictly never to diagnose conditions or dictate treatments, keeping health professionals in the loop."
    }
  ];

  return (
    <div className="pb-16" id="landing-page">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 text-center overflow-hidden bg-gradient-to-b from-[#F5F9FD] to-white border-b border-[#D1E5F4] rounded-b-[40px] md:rounded-b-[56px]">
        {/* Advanced Medical HUD Background Image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.14] mix-blend-overlay pointer-events-none"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070')"
          }}
        ></div>
        
        {/* Tech grid and premium radial gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,39,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,39,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5F0FD]/80 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/3 left-10 w-48 h-48 rounded-full bg-[#D1E5F4]/40 blur-2xl -z-10"></div>

        {/* Floating Telemetry Biostatical Cards (Desktop HUD display mimicking user image) */}
        <div className="hidden lg:block absolute left-4 xl:left-12 top-1/4 max-w-[200px] text-left pointer-events-none z-10 space-y-4">
          {/* Heart Rate Metric */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-2xl bg-white/95 border border-[#D1E5F4] shadow-sm backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
              <span className="text-lg animate-pulse">❤️</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pulse Rate</span>
              <span className="text-lg font-extrabold text-[#0F2744] font-mono leading-none">89 <span className="text-[10px] font-medium text-slate-500">bpm</span></span>
            </div>
          </motion.div>

          {/* Blood Pressure Metric */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-2xl bg-white/95 border border-[#D1E5F4] shadow-sm backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <span className="text-lg">📊</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sys / Dia</span>
              <span className="text-base font-extrabold text-[#0F2744] font-mono leading-none">108/68 <span className="text-[9px] font-medium text-slate-500">mmHg</span></span>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:block absolute right-4 xl:right-12 top-1/4 max-w-[200px] text-left pointer-events-none z-10 space-y-4">
          {/* SpO2 Oxygen Metric */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="p-4 rounded-2xl bg-white/95 border border-[#D1E5F4] shadow-sm backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <span className="text-lg">💧</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SpO2 Level</span>
              <span className="text-lg font-extrabold text-[#0F2744] font-mono leading-none">99 <span className="text-[10px] font-medium text-slate-500">%</span></span>
            </div>
          </motion.div>

          {/* Body Temperature Metric */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 rounded-2xl bg-white/95 border border-[#D1E5F4] shadow-sm backdrop-blur-md flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 shrink-0">
              <span className="text-lg">🌡️</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Body Temp</span>
              <span className="text-lg font-extrabold text-[#0F2744] font-mono leading-none">36.8 <span className="text-[10px] font-medium text-slate-500">°C</span></span>
            </div>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-6 text-xs font-bold text-[#0F2744] bg-[#E5F0FD] border border-[#D1E5F4] rounded-full shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            AI-POWERED CLINICAL HELPER & LITERACY SAAS
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-[#0F2744] leading-tight mb-6 tracking-tight"
          >
            Your Medical Reports <br />
            <span className="cherry-title text-[#38BDF8] drop-shadow-xs font-bold">Explained in Plain Language.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-semibold"
          >
            Upload blood panels, lipid profiles, metabolic records, and clinical logs. 
            KURA translates medical jargon into highly digestible, multilingual, empathetic explanations so you can own your next doctor's visit.
          </motion.p>

          {/* Small Embedded Biometric Telemetry Segment on Mobile */}
          <div className="lg:hidden grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10 text-left">
            <div className="p-3.5 rounded-2xl bg-white border border-[#D1E5F4] shadow-sm flex items-center gap-2.5">
              <span className="text-xl animate-pulse shrink-0">❤️</span>
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Pulse</span>
                <span className="text-sm font-extrabold text-[#0F2744] font-mono">89 bpm</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#D1E5F4] shadow-sm flex items-center gap-2.5">
              <span className="text-xl shrink-0">💧</span>
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase">O2 level</span>
                <span className="text-sm font-extrabold text-[#0F2744] font-mono">99% SpO2</span>
              </div>
            </div>
          </div>

          {/* Primary CTA Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            id="hero-cta-group"
          >
            <button 
              onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'login')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F2744] hover:bg-[#09182C] text-white font-bold text-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-md shadow-[#0F2744]/20 cursor-pointer"
              id="cta-analyze"
            >
              Start Free Analysis
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onOpenDemo('demo-lipid-panel-2026')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#F3F8FF] text-[#0F2744] border-2 border-[#D1E5F4] font-bold text-sm transition-all duration-200 cursor-pointer shadow-xs"
              id="cta-view-demo"
            >
              Explore Sample Demo Report
            </button>
          </motion.div>

          {/* Core Disclaimer Warning Banner */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto p-5 rounded-3xl bg-amber-50/70 border border-amber-200/80 text-left flex gap-3 shadow-sm mb-4"
          >
            <span className="text-xl">⚠️</span>
            <div>
              <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-0.5">Crucial Medical Safety Shield</h5>
              <p className="text-xs text-amber-700 leading-relaxed font-semibold">
                KURA is strictly an educational tool to foster health literacy and vocabulary comprehension. <strong>It is not a diagnostic platform.</strong> It does not replace, change, or prescribe medical treatments, nor does it substitute for consultation with a licensed clinical practitioner.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Structured Demo Entry Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-16" id="quick-demo-selectors">
        <h3 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 font-semibold">Or Choose A Precompiled Demo To Test Live</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div 
            onClick={() => onOpenDemo('demo-lipid-panel-2026')}
            className="p-5 rounded-3xl bg-white border border-[#D1E5F4] hover:border-[#0F2744] cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 group flex items-start gap-4 shadow-sm"
          >
            <div className="p-3 rounded-2xl bg-[#E5F0FD] text-[#0F2744] group-hover:scale-105 transition-transform shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F2744] group-hover:text-[#A8C0DC] transition-colors">Cardiovascular Lipid Panel</h4>
              <p className="text-xs text-slate-500 mt-1">Check cholesterol trend charts, bad vs. good HDL/LDL ratios, and native Bengali/Gujarati options.</p>
            </div>
          </div>
 
          <div 
            onClick={() => onOpenDemo('demo-liver-function-2026')}
            className="p-5 rounded-3xl bg-white border border-[#D1E5F4] hover:border-[#0F2744] cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 group flex items-start gap-4 shadow-sm"
          >
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F2744] group-hover:text-[#A8C0DC] transition-colors">Hepatic Enzyme Panel</h4>
              <p className="text-xs text-slate-500 mt-1">Interpret ALT/AST liver variables simply without medical stress or diagnostic alarm bells.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Segment */}
      <section className="bg-white/60 py-20 border-y border-[#D1E5F4] px-4" id="features-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="cherry-title text-3xl text-[#0F2744] mb-3">Designed for True Accessibility</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">KURA replaces cryptic clinician terminology with safe, interactive patient interfaces.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div 
                key={i} 
                className="p-6 rounded-3xl bg-white border border-[#D1E5F4] hover:border-[#0F2744] transition-all hover:shadow-sm flex flex-col items-start"
              >
                <div className="p-3 rounded-2xl bg-[#E5F0FD] mb-4">
                  {feat.icon}
                </div>
                <h4 className="text-base font-bold text-[#0F2744] mb-2">{feat.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="max-w-6xl mx-auto px-4 py-20" id="workflow-section">
        <div className="text-center mb-16">
          <h2 className="cherry-title text-3xl text-[#0F2744] mb-3">How KURA Empowers You</h2>
          <p className="text-slate-500 text-sm font-medium">Four seamless steps to clear clinical understanding.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="absolute top-1/2 left-0 h-0.5 bg-[#D1E5F4] w-full -z-10 hidden lg:block"></div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E5F0FD] border-2 border-[#A8C0DC] flex items-center justify-center font-bold text-[#0F2744] text-sm shadow-sm mb-4">1</div>
            <h5 className="text-sm font-bold text-[#0F2744] mb-1">Upload Report</h5>
            <p className="text-xs text-slate-500 max-w-xs px-4">Drag-and-drop your health document, blood result scan, or copy text logs.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E5F0FD] border-2 border-[#A8C0DC] flex items-center justify-center font-bold text-[#0F2744] text-sm shadow-sm mb-4">2</div>
            <h5 className="text-sm font-bold text-[#0F2744] mb-1">Gemini Decoding</h5>
            <p className="text-xs text-slate-500 max-w-xs px-4">Gemini securely breaks down complex shorthand medical markers from the payload.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#E5F0FD] border-2 border-[#A8C0DC] flex items-center justify-center font-bold text-[#0F2744] text-sm shadow-sm mb-4">3</div>
            <h5 className="text-sm font-bold text-[#0F2744] mb-1">Review Literacy Dashboard</h5>
            <h6 className="hidden">Empty Header</h6>
            <p className="text-xs text-slate-500 max-w-xs px-4">Read summaries in English, Hindi, Gujarati, Tamil, Telugu, or Bengali with interactive hover definitions.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#0F2744] border-2 border-white flex items-center justify-center font-bold text-white text-sm shadow-md mb-4">4</div>
            <h5 className="text-sm font-bold text-[#0F2744] mb-1">Empowered Consultation</h5>
            <p className="text-xs text-slate-500 max-w-xs px-4">Bring the auto-generated clinical questions list to explore comfortably with your doctor.</p>
          </div>
        </div>
      </section>

      {/* Accessible SaaS Mock FAQ dropdown list */}
      <section className="max-w-3xl mx-auto px-4 py-8 mb-12 font-medium">
        <h3 className="cherry-title text-2xl text-center text-[#0F2744] mb-8">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <details className="group p-5 rounded-3xl bg-white border border-[#D1E5F4] [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center font-bold text-[#0F2744] cursor-pointer text-sm">
              <span>Is my sensitive healthcare data private?</span>
              <span className="transition group-open:rotate-180 text-[#0F2744]">👇</span>
            </summary>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Yes, entirely. KURA processes all reports in standard sandboxed memory contexts. We do not store or sell your sensitive biological assets, ensuring strict compliance with educational privacy guidelines.
            </p>
          </details>
          <details className="group p-5 rounded-3xl bg-white border border-[#D1E5F4] [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex justify-between items-center font-bold text-[#0F2744] cursor-pointer text-sm">
              <span>Which languages does KURA support?</span>
              <span className="transition group-open:rotate-180 text-[#0F2744]">👇</span>
            </summary>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              KURA generates instant explanations translated perfectly into English, Hindi, Gujarati, Tamil, Telugu, and Bengali.
            </p>
          </details>
        </div>
      </section>

      {/* Footer Segment */}
      <footer className="max-w-6xl mx-auto px-4 pt-12 border-t border-[#D1E5F4] flex flex-col md:flex-row items-center justify-between text-slate-400 text-xs gap-4">
        <div className="flex items-center gap-2">
          <KuraLogoIcon size={20} />
          <span className="cherry-title text-base font-bold text-[#0F2744] mr-2">KURA</span>
          <span className="font-medium">© 2026 KURA Literacy SaaS Inc. All rights reserved.</span>
        </div>
        <div className="flex gap-6 font-semibold text-slate-500">
          <a href="#privacy" className="hover:text-[#0F2744] transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-[#0F2744] transition-colors">Terms of Service</a>
          <a href="#contact" className="hover:text-[#0F2744] transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
