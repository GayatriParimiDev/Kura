import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AnalysisPage from './components/AnalysisPage';
import { UserReport, ReportAnalysis } from './types';
import { DEMO_REPORTS } from './utils/demoData';
import { 
  AboutPage, FeaturesPage, PricingPage, ContactPage, BlogPage, HelpCenterPage, 
  ProfilePage, SettingsPage, SecurityPage, BillingPage, AdminDashboardPage, 
  NotificationsPage, SavedInsightsPage 
} from './components/SaaSPageViews';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [reports, setReports] = useState<UserReport[]>(DEMO_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  
  // Quick user validation states. Preloaded as unauthenticated to display the beautiful Landing page first,
  // allowing immediate click view of demo files or instant mock log of the given developer email.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Auto-fill health analytics ping upon boot
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => console.log('[KURA Health Check Status]:', data))
      .catch(err => console.error('[KURA Connection check response]:', err));
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleAuthSuccess = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setCurrentView('landing');
  };

  /**
   * [1] CALLS THE SECURE EXPRESS BACKEND TO DECODE BIOMARKERS WITH GEMINI API
   */
  const handleAnalyzeReport = async (fileName: string, rawText: string, fileData?: string, mimeType?: string) => {
    // Generate placeholder report
    const newReportId = `rep-${Date.now()}`;
    const newReport: UserReport = {
      id: newReportId,
      fileName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileSize: fileData ? 'Image Scan' : `${(rawText.length / 1024).toFixed(1)} KB`,
      language: 'English',
      status: 'pending',
      rawText: rawText,
      chatHistory: [
        {
          id: `msg-${Date.now()}`,
          role: 'model',
          text: `Hi seeker. KURA has securely accepted your uploaded report parameters. Analyzing key biomarkers in plain English...`,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setReports(prev => [newReport, ...prev]);
    setCurrentView('dashboard');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: rawText,
          fileData,
          mimeType,
          language: 'English'
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.analysis) {
        throw new Error(data.error || 'Server processing error');
      }

      setReports(prev => prev.map(rep => {
        if (rep.id === newReportId) {
          return {
            ...rep,
            status: 'analyzed',
            analysis: data.analysis,
            comparisonMetrics: [
              {
                marker: data.analysis.key_findings?.[0]?.marker || "Biochemical Indices",
                trend: "Established fresh baseline parameters",
                changePercent: 100,
                direction: "up",
                sentiment: "neutral"
              }
            ]
          };
        }
        return rep;
      }));
    } catch (err: any) {
      console.error('Failed to analyze report:', err);
      setReports(prev => prev.map(rep => {
        if (rep.id === newReportId) {
          return { ...rep, status: 'failed' };
        }
        return rep;
      }));
    }
  };

  /**
   * [2] ONSNAP SHOT TRANSLATIONS SWITCHER
   * Calls the Express route with dynamic translation configurations
   */
  const handleTranslateReport = async (reportId: string, language: string) => {
    const reportToTranslate = reports.find(r => r.id === reportId);
    if (!reportToTranslate) return;

    if (reportToTranslate.language === language) return;

    setIsTranslating(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: reportToTranslate.rawText || reportToTranslate.analysis?.simple_summary,
          language: language
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.analysis) {
        throw new Error(data.error || 'Translation request failed');
      }

      setReports(prev => prev.map(rep => {
        if (rep.id === reportId) {
          return {
            ...rep,
            language: language,
            analysis: data.analysis
          };
        }
        return rep;
      }));
    } catch (err) {
      console.error('Failed to translate report context:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  /**
   * [3] CONTEXTUAL CHAT INTERACTION
   * Proxies current reports status back for full-scale conversational advice
   */
  const handleSendMessage = async (reportId: string, text: string): Promise<string> => {
    const activeReport = reports.find(r => r.id === reportId);
    if (!activeReport) return 'Error resolving report elements.';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportContext: activeReport.analysis,
          history: activeReport.chatHistory?.filter(m => m.id !== 'msg-init-1' && m.id !== 'msg-init-2'),
          userMessage: text
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Chat processing error');
      }

      return data.reply;
    } catch (err: any) {
      console.error('Chat failed:', err);
      throw err;
    }
  };

  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    if (selectedReportId === id) {
      setSelectedReportId(null);
      setCurrentView('dashboard');
    }
  };

  const handleOpenDemoReport = (id: string) => {
    setSelectedReportId(id);
    setCurrentView(`analysis-${id}`);
  };

  // Find active selected report
  const selectedReport = reports.find(r => r.id === selectedReportId);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Header */}
      <Header 
        currentView={currentView} 
        userEmail={userEmail} 
        onNavigate={handleNavigate} 
        onLogout={handleLogout} 
      />

      {/* Main Dynamic Viewport router */}
      <main className="flex-grow">
        {currentView === 'landing' && (
          <LandingPage 
            onNavigate={handleNavigate} 
            onOpenDemo={handleOpenDemoReport} 
            isAuthenticated={isAuthenticated}
          />
        )}
        
        {currentView === 'login' && (
          <AuthPage 
            initialMode="login" 
            onAuthSuccess={handleAuthSuccess} 
            onBackToLanding={() => handleNavigate('landing')} 
          />
        )}

        {currentView === 'register' && (
          <AuthPage 
            initialMode="register" 
            onAuthSuccess={handleAuthSuccess} 
            onBackToLanding={() => handleNavigate('landing')} 
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            reports={reports} 
            userEmail={userEmail} 
            onAnalyzeReport={handleAnalyzeReport}
            onSelectReport={(id) => {
              setSelectedReportId(id);
              setCurrentView(`analysis-${id}`);
            }}
            onDeleteReport={handleDeleteReport}
          />
        )}

        {currentView.startsWith('analysis') && selectedReport && (
          <AnalysisPage 
            report={selectedReport} 
            onBack={() => handleNavigate(isAuthenticated ? 'dashboard' : 'landing')} 
            onTranslate={handleTranslateReport} 
            onSendMessage={handleSendMessage}
            isTranslating={isTranslating}
          />
        )}

        {currentView === 'about' && <AboutPage />}
        {currentView === 'features' && <FeaturesPage />}
        {currentView === 'pricing' && <PricingPage onNavigate={handleNavigate} />}
        {currentView === 'blog' && <BlogPage />}
        {currentView === 'help' && <HelpCenterPage />}
        {currentView === 'contact' && <ContactPage />}
        
        {currentView === 'profile' && <ProfilePage userEmail={userEmail} />}
        {currentView === 'settings' && <SettingsPage />}
        {currentView === 'security-settings' && <SecurityPage />}
        {currentView === 'billing' && <BillingPage />}
        {currentView === 'admin-dashboard' && <AdminDashboardPage />}
        {currentView === 'notifications' && <NotificationsPage />}
        {currentView === 'saved-insights' && <SavedInsightsPage />}
      </main>
    </div>
  );
}
