import React, { useState } from 'react';
import { 
  ArrowLeft, Globe, HelpCircle, Activity, Heart, ShieldAlert, BookOpen, Clock, Check, ChevronDown, ChevronUp, AlertCircle, Info, Sparkles
} from 'lucide-react';
import { UserReport, KeyFinding } from '../types';
import ChatAssistant from './ChatAssistant';
import { motion, AnimatePresence } from 'motion/react';

interface AnalysisPageProps {
  report: UserReport;
  onBack: () => void;
  onTranslate: (reportId: string, language: string) => void;
  onSendMessage: (reportId: string, text: string) => Promise<string>;
  isTranslating: boolean;
}

export default function AnalysisPage({ report, onBack, onTranslate, onSendMessage, isTranslating }: AnalysisPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(report.language || 'English');
  const [activeTermIndex, setActiveTermIndex] = useState<number | null>(null);

  const languages = [
    { code: 'English', label: 'English' },
    { code: 'Hindi', label: 'हिन्दी (Hindi)' },
    { code: 'Gujarati', label: 'ગુજરાતી (Gujarati)' },
    { code: 'Tamil', label: 'தமிழ் (Tamil)' },
    { code: 'Telugu', label: 'తెలుగు (Telugu)' },
    { code: 'Bengali', label: 'বাংলা (Bengali)' }
  ];

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    onTranslate(report.id, lang);
  };

  // Status styling maps
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-50 text-red-700 border-red-200',
          dot: 'bg-red-500',
          label: 'Elevated'
        };
      case 'low':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: 'Low'
        };
      case 'attention':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Requires Review'
        };
      default:
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'In Healthy Limits'
        };
    }
  };

  const toggleTerm = (idx: number) => {
    if (activeTermIndex === idx) {
      setActiveTermIndex(null);
    } else {
      setActiveTermIndex(idx);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="analysis-page-view">
      {/* Top action block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 bg-white border border-slate-200/80 px-4 py-2 rounded-xl transition-colors shadow-sm self-start"
          id="btn-back-to-dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Multi-Language Switcher Sticky Toggle Panel */}
        <div className="flex items-center gap-2.5 bg-white border border-[#D1E5F4] px-4 py-2 rounded-2xl shadow-sm self-stretch sm:self-auto" id="language-switcher-bar">
          <Globe className="w-4 h-4 text-[#0F2744] animate-spin-slow shrink-0" />
          <span className="text-xs font-bold text-[#0F2744] hidden sm:inline">Translate Decoded Text:</span>
          <div className="flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                disabled={isTranslating}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  selectedLanguage === lang.code
                    ? 'bg-[#0F2744] text-white'
                    : 'bg-slate-50 text-[#0F2744] hover:bg-[#E5F0FD] border border-[#D1E5F4]/40'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isTranslating ? (
        /* Reassurance loading screen designed for premium HIPAA-certified feel */
        <div className="min-h-[450px] flex flex-col items-center justify-center text-center p-8 bg-white border border-[#D1E5F4] rounded-3xl shadow-sm" id="translating-loading-skeleton">
          <div className="w-16 h-16 rounded-full border-4 border-[#D1E5F4] border-t-[#0F2744] animate-spin mb-6"></div>
          <Sparkles className="w-6 h-6 text-[#0F2744] animate-ping absolute" />
          <h3 className="cherry-title text-2xl text-[#0F2744] mb-2">Translating Medical Context...</h3>
          <p className="text-sm text-slate-500 max-w-md mb-4 font-medium">
            Gemini is realigning shorthand chemical terms, reference indices, and medical guidelines natively into <strong>{selectedLanguage}</strong>.
          </p>
          <div className="max-w-sm px-4 py-3 bg-[#E5F0FD] rounded-2xl border border-[#D1E5F4] text-xs text-slate-600 font-medium">
            <strong>Did you know?</strong> Elevated liver enzymes (ALT/AST) can react to minor triggers like muscle exercise, a standard cold, or common tablets like aspirin.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Columns - Report Analytics dashboards */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* D. CRITICAL SAFETY DISCLAIMER BOX */}
            <div className="p-4 rounded-2xl bg-amber-50/85 border border-amber-200/90 flex gap-3 shadow-sm" id="disclaimer-alert-box">
              <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Educational Literacy Disclaimer</h4>
                <p className="text-xs text-amber-700 leading-relaxed mt-1">
                  KURA operates purely as a vocabulary translation companion. <strong>We do not substitute medical advice, treatments, or diagnostics.</strong> Never alter prescribed drugs, doses, or physical therapies without a direct clinical consultation with a licensed practitioner.
                </p>
              </div>
            </div>

            {/* A. SIMPLE SUMMARY (15yo readability text) */}
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#D1E5F4] shadow-sm relative overflow-hidden" id="report-simple-summary">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5F0FD]/40 rounded-full blur-3xl -z-10"></div>
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 rounded-xl bg-[#E5F0FD] text-[#0F2744]"><Info className="w-4 h-4" /></span>
                <h3 className="text-base font-bold text-[#0F2744]">Simple Literacy Summary</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                {report.analysis?.simple_summary || "Unable to extract summary parameters for this record."}
              </p>
            </div>

            {/* B. KEY FINDINGS CARD GRID */}
            <div className="bg-white rounded-3xl border border-[#D1E5F4] shadow-sm p-6" id="report-key-findings">
              <div className="flex items-center gap-2 mb-5">
                <span className="p-2 rounded-xl bg-[#E5F0FD] text-[#0F2744]"><Activity className="w-4 h-4" /></span>
                <h3 className="text-base font-bold text-[#0F2744]">Diagnostic Parameters & Status</h3>
              </div>

              {report.analysis?.key_findings && report.analysis.key_findings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.analysis.key_findings.map((item, index) => {
                    const status = getStatusStyle(item.status);
                    return (
                      <div 
                        key={index} 
                        className="p-5 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50/50 transition-colors flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-xs font-bold text-slate-700">{item.marker}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${status.bg} flex items-center gap-1 shrink-0`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                            {status.label}
                          </span>
                        </div>

                        <div className="my-2.5">
                          <span className="text-lg font-bold text-slate-800 font-mono tracking-tight">{item.value}</span>
                          {item.normalRange && (
                            <span className="text-[10px] text-slate-400 font-mono font-medium block mt-0.5">Reference limits: {item.normalRange}</span>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-500 leading-relaxed border-t border-dashed border-slate-150 pt-2 mt-1">
                          {item.meaning}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">No specific metrics extracted.</div>
              )}
            </div>

            {/* F. REPORT TREND COMPARISON COMPONENT */}
            {report.comparisonMetrics && report.comparisonMetrics.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#D1E5F4] shadow-sm p-6" id="trends-comparison-container">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 rounded-xl bg-[#E5F0FD] text-[#0F2744]"><Heart className="w-4 h-4" /></span>
                  <h3 className="text-base font-bold text-[#0F2744]">Historical Trend Comparisons (vs. Previous Vault)</h3>
                </div>

                <div className="space-y-3.5">
                  {report.comparisonMetrics.map((met, index) => (
                    <div key={index} className="flex items-center justify-between p-3.5 rounded-xl border border-[#D1E5F4]/40 bg-slate-50/40">
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">{met.marker}</span>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">{met.trend}</span>
                      </div>

                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                          met.sentiment === 'better'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {met.direction === 'up' ? '▲' : '▼'} {met.changePercent}%
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1 uppercase tracking-wider font-bold">
                          {met.sentiment === 'better' ? 'Stabilizing' : 'Fluctuating'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* C. MEDICAL TERM EXPLANATIONS (DICTIONARY) */}
            {report.analysis?.term_definitions && report.analysis.term_definitions.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#D1E5F4] shadow-sm p-6" id="medical-terms-glossary">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 rounded-xl bg-[#E5F0FD] text-[#0F2744]"><BookOpen className="w-4 h-4" /></span>
                  <h3 className="text-base font-bold text-[#0F2744]">Clinical Shorthand Dictionary</h3>
                </div>
                <p className="text-[11px] text-slate-400 mb-4 font-medium">Click below to expand terms found in this document.</p>

                <div className="space-y-2.5">
                  {report.analysis.term_definitions.map((def, idx) => {
                    const isOpen = activeTermIndex === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`rounded-2xl border transition-all ${
                          isOpen 
                            ? 'border-[#0F2744] bg-[#E5F0FD]/20' 
                            : 'border-slate-100 bg-slate-50/20 hover:bg-slate-50/40'
                        }`}
                      >
                        <button
                          onClick={() => toggleTerm(idx)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none cursor-pointer"
                        >
                          <span className="text-xs font-bold text-slate-700">{def.term}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-[#0F2744]" /> : <ChevronDown className="w-4 h-4 text-[#0F2744]" />}
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden border-t border-slate-100/60"
                            >
                              <p className="p-4 text-xs text-slate-500 leading-relaxed font-normal">
                                {def.definition}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Persistently inline Chat box */}
          <div className="space-y-6">
            <div className="sticky top-20">
              <ChatAssistant 
                report={report} 
                onSendMessage={(text) => onSendMessage(report.id, text)} 
              />

              {/* Empowering Doctor questions list */}
              {report.analysis?.doctor_questions && (
                <div className="mt-6 p-5 rounded-3xl bg-[#E5F0FD] border border-[#D1E5F4] shadow-sm">
                  <h4 className="text-xs font-bold text-[#0F2744] uppercase tracking-wider mb-3">Questions For Your Practitioner</h4>
                  <p className="text-[10px] text-[#0F2744] mb-3.5 font-medium">Bring these empowering direct talking points to your next physical appointment:</p>
                  
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {report.analysis.doctor_questions.map((q, idx) => (
                      <li key={idx} className="flex gap-2 items-start bg-white p-3 rounded-2xl border border-[#D1E5F4]/40 shadow-sm">
                        <span className="text-[#0F2744] font-bold">Q{idx+1}.</span>
                        <p className="leading-relaxed text-[11px] font-medium text-slate-700">{q}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
