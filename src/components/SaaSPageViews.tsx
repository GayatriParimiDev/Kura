import React, { useState } from 'react';
import { 
  Sparkles, Shield, Compass, BookOpen, Clock, Heart, Users, CheckCircle, ArrowRight, Info,
  Search, ShieldAlert, CreditCard, Bell, Key, Database, ChevronRight, Mail, MapPin, Phone,
  ChevronDown, ExternalLink, Activity, Award, Check, AlertCircle, FileText, Send
} from 'lucide-react';

/* =========================================================================
   STITCH COMPONENT REUSABLES
   ========================================================================= */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SaaSCard({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-[#D1E5F4] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold text-[#0F2744] bg-[#E5F0FD] border border-[#D1E5F4] rounded-full uppercase tracking-wider">
      {children}
    </span>
  );
}

export function PrimaryButton({ children, onClick, type = 'button', className = '', disabled = false }: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-2xl bg-[#0F2744] hover:bg-[#09182C] text-white font-bold text-xs transition-all active:scale-95 duration-150 flex items-center justify-center gap-2 shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, className = '' }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl bg-white hover:bg-[#E5F0FD] border border-[#D1E5F4] text-[#0F2744] font-bold text-xs transition-colors duration-150 flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

/* =========================================================================
   1. ABOUT PAGE
   ========================================================================= */
export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>OUR MISSION</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-4">Empowering Patients <br />Through Health Literacy</h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          KURA was founded in 2026 to bridge the critical understanding gap between complex clinical testing metrics and families seeking peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <SaaSCard>
          <div className="p-3 bg-[#E5F0FD] rounded-2xl w-max text-[#0F2744] mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0F2744] mb-2">Our Vision</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We operate believing that a highly informed patient undergoes superior care outcomes. By converting medical jargon into plain vocabulary in your native tongue, we help foster true transparency during consultations.
          </p>
        </SaaSCard>

        <SaaSCard>
          <div className="p-3 bg-[#E5F0FD] rounded-2xl w-max text-[#0F2744] mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0F2744] mb-2">Patient Security Guard</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your biological records are processed in sandboxed servers and never persisted for programmatic retraining. We align strictly with healthcare privacy practices to keep your data safe.
          </p>
        </SaaSCard>
      </div>

      <div className="text-center p-8 bg-[#E5F0FD] border border-[#D1E5F4] rounded-3xl">
        <Award className="w-8 h-8 mx-auto text-[#0F2744] mb-3" />
        <h3 className="text-base font-bold text-[#0F2744]">Stitch Healthcare Excellence Standard</h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
          Our systems undergo rigorous clinical prompt testing to maintain safety guard boundaries. Kura never diagnoses nor recommends therapies, empowering patient-doctor relationships securely.
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   2. FEATURES PAGE
   ========================================================================= */
export function FeaturesPage() {
  const highlights = [
    {
      title: "Friendly Readability Decoding",
      desc: "Instantly translates complex diagnostic shorthand into basic plain language suited for everyone.",
      val: "Grade-8 Level"
    },
    {
      title: "Interactive Clinical Dictionary",
      desc: "Demystifies professional clinical slang. Learn exact definitions of markers like Bilirubin or Heme on hover.",
      val: "200+ Bio-Markers"
    },
    {
      title: "Multi-Language Synthesis",
      desc: "Instant conversions between English, Hindi, Gujarati, Tamil, Telugu, and Bengali on the fly.",
      val: "6 Indian Languages"
    },
    {
      title: "Empowering Doctor Question Sheets",
      desc: "Generates tailored talking points to clear up metadata directly with your primary practitioner.",
      val: "Customized Lists"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>PRODUCT CAPABILITIES</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-4">Polished AI-Powered <br />Linguistic Translators</h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Explore the specialized tools built to decode complex pathology, liver, cardiovascular, or metabolic profiles seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {highlights.map((item, idx) => (
          <SaaSCard key={idx} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-[#E5F0FD] text-[#0F2744] font-bold text-xs flex items-center justify-center shrink-0">
              0{idx+1}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-between mb-1.5">
                <h3 className="text-sm font-bold text-[#0F2744]">{item.title}</h3>
                <span className="text-[10px] font-bold text-[#0F2744] bg-[#E5F0FD] px-2 py-0.5 rounded-md border border-[#D1E5F4]/40">{item.val}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </SaaSCard>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   3. PRICING PAGE
   ========================================================================= */
export function PricingPage({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>FLEXIBLE PLANS</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-4">Invest in Your Health Awareness</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Start for free to test our translations or unlock ongoing historical trend comparisons at nominal rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Tier 1 */}
        <SaaSCard className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Standard Option</span>
            <span className="cherry-title text-2xl text-[#0F2744] block">Kura Basic</span>
            <div className="my-4">
              <span className="text-3xl font-bold text-[#0F2744]">$0</span>
              <span className="text-xs text-slate-400"> / Free Forever</span>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-600 border-t border-[#D1E5F4] pt-4 mb-6">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Decode raw pasted medical text</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> English terminology summaries</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Safe doctor questions list</li>
              <li className="flex items-center gap-2 text-slate-300"><Check className="w-4 h-4" /> Multi-language translation switches</li>
              <li className="flex items-center gap-2 text-slate-300"><Check className="w-4 h-4" /> Multi-File Upload Scanning</li>
            </ul>
          </div>
          <SecondaryButton onClick={() => onNavigate('login')} className="w-full">Get Started</SecondaryButton>
        </SaaSCard>

        {/* Tier 2 */}
        <SaaSCard className="border-2 border-[#A8C0DC] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-[#0F2744] text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Best Value
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Enterprise Grade</span>
            <span className="cherry-title text-2xl text-[#0F2744] block">Kura Premium</span>
            <div className="my-4">
              <span className="text-3xl font-bold text-[#0F2744]">$8.50</span>
              <span className="text-xs text-slate-400"> / month</span>
            </div>
            <ul className="space-y-3.5 text-xs text-slate-600 border-t border-[#D1E5F4] pt-4 mb-6">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited file scans (PDF / PNG uploads)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Instant dynamic multi-language translating</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Deep historical metabolic trend comparisons</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Contextual AI Chat Assistant limits completely removed</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 24/7 Premium technical help channel</li>
            </ul>
          </div>
          <PrimaryButton onClick={() => onNavigate('login')} className="w-full">Upgrade Now</PrimaryButton>
        </SaaSCard>
      </div>
    </div>
  );
}

/* =========================================================================
   4. CONTACT PAGE
   ========================================================================= */
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>GET IN TOUCH</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-4">Let's Connect Safely</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Need details regarding technical partnerships or have suggestions? Drop us a prompt query below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-white border border-[#D1E5F4] rounded-3xl overflow-hidden shadow-sm">
        {/* Left column */}
        <div className="md:col-span-2 bg-[#E5F0FD] p-8 text-[#0F2744] flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A8C0DC]" />
                <span>support@kura-literacy.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#A8C0DC]" />
                <span>Mountain View, CA, USA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A8C0DC]" />
                <span>+1 (800) 555-KURA</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-[#0F2744]/70 mt-8">
            Note: We cannot accept physical biological samples. Submit technical database prompts and linguistic queries only.
          </div>
        </div>

        {/* Right column Form */}
        <div className="md:col-span-3 p-8">
          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="cherry-title text-xl text-[#0F2744]">Message Securely Sent</h3>
              <p className="text-xs text-slate-500 mt-2">Thanks! KURA's technical help desk answers inquiries within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0F2744] text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0F2744] text-xs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Inquiry Message</label>
                <textarea required rows={4} placeholder="Type your text regarding partnering with KURA here..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#0F2744] text-xs" />
              </div>
              <PrimaryButton type="submit" className="w-full">
                <Send className="w-3.5 h-3.5" />
                Send Inquiry Message
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. BLOG PAGE
   ========================================================================= */
export function BlogPage() {
  const posts = [
    {
      title: "Understanding AST and ALT Liver Enzymes: The Basics",
      desc: "An informative overview on what liver tests are actually analyzing, and why elevated indices don't always signal danger.",
      date: "May 25, 2026",
      read: "4 min read"
    },
    {
      title: "HDL vs. LDL: Breaking Down Cardiovascular Slang",
      desc: "Why good vs. bad cholesterol definitions were structured this way, and how dynamic trend lines helper files chart changes.",
      date: "May 12, 2026",
      read: "5 min read"
    },
    {
      title: "Democratizing Pathology Reports: Why Native Speech Matters",
      desc: "Exploring patient outcomes where diagnostic explanations are translated instantly into regional Indian languages like Gujarati or Tamil.",
      date: "April 28, 2026",
      read: "7 min read"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>HEALTH LITERACY ARCHIVE</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-4">The Educational Digest</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Insights from clinicians, speech experts, and healthcare programmers mapping true transparency in public diagnostics.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <SaaSCard key={index} className="flex flex-col md:flex-row gap-6 hover:border-[#A8C0DC] hover:-translate-y-0.5 transition-all">
            <div className="md:w-1/4 shrink-0 flex flex-col justify-between text-slate-400 font-semibold font-mono text-[10px]">
              <div>
                <span className="block">{post.date}</span>
                <span className="block mt-0.5">{post.read}</span>
              </div>
              <span className="text-[#0F2744] uppercase tracking-widest mt-4 md:mt-0 font-bold">LITERACY IN DEPTH</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#0F2744] hover:text-[#A8C0DC] cursor-pointer transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{post.desc}</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F2744]">
                Read Entire Article <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </SaaSCard>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   6. HELP CENTER PAGE
   ========================================================================= */
export function HelpCenterPage() {
  const faqs = [
    {
      q: "Who is evaluating my uploaded blood test records?",
      a: "KURA's sandboxed backend evaluators utilize standard non-persistent multimodal models. They act only as direct context dictionary engines and never save your sensitive biological records."
    },
    {
      q: "Why does KURA show safety indicators or error alerts?",
      a: "We emphasize safe limitations. Since Kura is an educational health dictionary, we alert users strictly that we do not authorize diagnostic prescriptions or drug adjustments."
    },
    {
      q: "Can I generate report translations on demand?",
      a: "Yes. By selecting one of our regional languages (Hindi, Bengali, Gujarati, Tamil, Telugu), our processors rearrange terminology references translate-on-the-fly."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>HELP & INFORMATION DESK</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-4">Knowledge & Advice Hub</h1>
        <div className="relative max-w-md mx-auto mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search guides, definitions, and tutorials..." className="w-full pl-10 pr-4 py-3 bg-white border border-[#D1E5F4] rounded-2xl text-xs focus:outline-none focus:border-[#0F2744]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <SaaSCard className="text-center">
          <FileText className="w-7 h-7 mx-auto text-[#0F2744] mb-3" />
          <h4 className="text-sm font-bold text-[#0F2744] mb-1">User Manuals</h4>
          <p className="text-[11px] text-slate-400">PDF outlines explaining how to extract pathology data files.</p>
        </SaaSCard>
        <SaaSCard className="text-center">
          <ShieldAlert className="w-7 h-7 mx-auto text-[#0F2744] mb-3" />
          <h4 className="text-sm font-bold text-[#0F2744] mb-1">Safety Compliances</h4>
          <p className="text-[11px] text-slate-400">Read rules guiding our educational boundaries.</p>
        </SaaSCard>
        <SaaSCard className="text-center">
          <Award className="w-7 h-7 mx-auto text-[#0F2744] mb-3" />
          <h4 className="text-sm font-bold text-[#0F2744] mb-1">Clinician Backing</h4>
          <p className="text-[11px] text-slate-400">Details on clinical prompt validation parameters.</p>
        </SaaSCard>
      </div>

      <SaaSCard>
        <h3 className="cherry-title text-xl text-[#0F2744] mb-4">Tutorials & Common Inquiries</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border-b border-[#D1E5F4]/40 pb-3 last:border-0 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-[#0F2744] transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </SaaSCard>
    </div>
  );
}

/* =========================================================================
   7. USER PROFILE
   ========================================================================= */
export function ProfilePage({ userEmail }: { userEmail: string | null }) {
  const [profileSaved, setProfileSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <SaaSCard>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#E5F0FD] border-2 border-[#A8C0DC] text-[#0F2744] flex items-center justify-center font-bold text-xl mx-auto mb-3">
            {userEmail ? userEmail[0].toUpperCase() : 'P'}
          </div>
          <h2 className="cherry-title text-2xl text-[#0F2744]">Vault Profile Settings</h2>
          <p className="text-xs text-slate-400">Configure parameters for clinical document matching</p>
        </div>

        {profileSaved && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Profile parameters updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
              <input type="text" defaultValue="Gayatri" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
              <input type="text" defaultValue="Parimi" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Authorized Profile Email</label>
            <input disabled type="email" value={userEmail || 'parimigayatri5@gmail.com'} className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Standard Regional Language Profile</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <option>English (US/UK)</option>
              <option>हिन्दी (Hindi)</option>
              <option>ગુજરાતી (Gujarati)</option>
              <option>தமிழ் (Tamil)</option>
              <option>తెలుగు (Telugu)</option>
              <option>বাংলা (Bengali)</option>
            </select>
          </div>

          <PrimaryButton type="submit" className="w-full mt-4">Save Profile Parameters</PrimaryButton>
        </form>
      </SaaSCard>
    </div>
  );
}

/* =========================================================================
   8. GENERAL SETTINGS
   ========================================================================= */
export function SettingsPage() {
  const [opts, setOpts] = useState({
    hints: true,
    smartGlossary: true,
    weeklyDigest: false,
    strictSlayPrivacy: true
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <SaaSCard>
        <h2 className="cherry-title text-2xl text-[#0F2744] mb-1">SaaS Configurations</h2>
        <p className="text-xs text-slate-400 mb-6">Manage data delivery & AI synthesizer styles</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50/40">
            <div>
              <span className="text-xs font-bold text-slate-700 block">Context Diagnostic Hints</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Show educational popups on biochemistry metrics</span>
            </div>
            <input type="checkbox" checked={opts.hints} onChange={(e) => setOpts({...opts, hints: e.target.checked})} className="accent-[#0F2744]" />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50/40">
            <div>
              <span className="text-xs font-bold text-slate-700 block">Persistent Shorthand Glossary</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Pre-calculate ALT/AST definitions during layout</span>
            </div>
            <input type="checkbox" checked={opts.smartGlossary} onChange={(e) => setOpts({...opts, smartGlossary: e.target.checked})} className="accent-[#0F2744]" />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50/40">
            <div>
              <span className="text-xs font-bold text-slate-700 block">Weekly Health News Digest</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Receive safe health dictionaries in subscriber email</span>
            </div>
            <input type="checkbox" checked={opts.weeklyDigest} onChange={(e) => setOpts({...opts, weeklyDigest: e.target.checked})} className="accent-[#0F2744]" />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-[#E5F0FD]/40">
            <div>
              <span className="text-xs font-bold text-[#0F2744] block">Sandboxed Prompt Memory Shield</span>
              <span className="text-[10px] text-slate-600 mt-0.5 block">Strictly block all persistent retraining parameters for HIPAA safety</span>
            </div>
            <input type="checkbox" disabled checked={opts.strictSlayPrivacy} className="accent-[#0F2744] cursor-not-allowed" />
          </div>
        </div>
      </SaaSCard>
    </div>
  );
}

/* =========================================================================
   9. SECURITY SETTINGS
   ========================================================================= */
export function SecurityPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <SaaSCard>
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-[#0F2744]" />
          <h2 className="cherry-title text-2xl text-[#0F2744]">Security & Encryption</h2>
        </div>
        <p className="text-xs text-slate-500 mb-6">All medical records are encrypted using AES-256 standard and shielded with safe multi-session sandboxing.</p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[#D1E5F4] bg-[#F3F8FF] text-xs text-slate-700">
            <strong>System Encryption Active:</strong> Authorized sessions require direct SSL handshakes. No cloud persistent storage is unlocked without active password authentication.
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Update Key Parameters</h4>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Current Password Verification</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">New Secure Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-xs" />
            </div>
            <PrimaryButton className="w-full mt-4">Rotate Encryption Credentials</PrimaryButton>
          </div>
        </div>
      </SaaSCard>
    </div>
  );
}

/* =========================================================================
   10. BILLING PAGE
   ========================================================================= */
export function BillingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <SaaSCard>
        <div className="flex items-center justify-between border-b border-[#D1E5F4] pb-4 mb-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Current Plan Status</span>
            <span className="cherry-title text-2xl text-[#0F2744] mt-0.5 block">Kura Basic Access</span>
          </div>
          <span className="px-3.5 py-1.5 bg-[#E5F0FD] border border-[#D1E5F4] text-[#0F2744] font-bold text-[10px] rounded-full uppercase tracking-widest">
            Free Account
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Monthly Usage Counter</span>
            <span className="text-lg font-bold text-[#0F2744] block mt-1">1 / 5 Explanations Used</span>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Next Reset Date</span>
            <span className="text-lg font-bold text-slate-500 block mt-1">July 1, 2026</span>
          </div>
        </div>

        <div className="p-5 bg-[#E5F0FD]/70 rounded-2xl border border-[#D1E5F4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-[#0F2744]">Support KURA's Mission & Unlock Trends</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Instant unlimited multimodal diagnostics translate features for just $8.50/mo.</p>
          </div>
          <PrimaryButton className="shrink-0">
            <CreditCard className="w-3.5 h-3.5" />
            Upgrade standard Plan
          </PrimaryButton>
        </div>
      </SaaSCard>
    </div>
  );
}

/* =========================================================================
   11. ADMIN DASHBOARD & ANALYTICS
   ========================================================================= */
export function AdminDashboardPage() {
  const systems = [
    { service: "Linguistic Decoder API", status: "Healthy limits", color: "bg-emerald-500" },
    { service: "Multimodal Biochemistry Scan Engine", status: "Healthy limits", color: "bg-emerald-500" },
    { service: "Regional Speech Synths (Gujarati/Tamil/Bengali)", status: "Active sandbox", color: "bg-emerald-500" },
    { service: "Sandbox Patient Privacy Shield", status: "Enabled", color: "bg-emerald-500" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>SYSTEM TELEMETRY</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-1">Platform Admin Oversight</h1>
        <p className="text-sm text-slate-500">Monitor regional synthesis and API pipeline compliance statuses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SaaSCard className="text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">API Inquiries Answered</span>
          <span className="text-3xl font-bold text-[#0F2744] mt-2 block">102,482</span>
          <span className="text-[10px] text-green-600 mt-1 block">▲ 14.2% average daily load</span>
        </SaaSCard>

        <SaaSCard className="text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Accuracy Verification</span>
          <span className="text-3xl font-bold text-[#0F2744] mt-2 block">100.0%</span>
          <span className="text-[10px] text-[#A8C0DC] mt-1 block">Zero hallucinated warnings</span>
        </SaaSCard>

        <SaaSCard className="text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Translators Active</span>
          <span className="text-3xl font-bold text-[#0F2744] mt-2 block">6 Regionals</span>
          <span className="text-[10px] text-[#A8C0DC] mt-1 block">No translation error tickets</span>
        </SaaSCard>
      </div>

      <SaaSCard>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Central Platform Pipeline</h3>
        <div className="space-y-3 text-xs">
          {systems.map((sys, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">{sys.service}</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-slate-600">
                <span className={`w-2 h-2 rounded-full ${sys.color}`}></span>
                {sys.status}
              </span>
            </div>
          ))}
        </div>
      </SaaSCard>
    </div>
  );
}

/* =========================================================================
   12. NOTIFICATIONS PAGE
   ========================================================================= */
export function NotificationsPage() {
  const alerts = [
    {
      title: "Biochemistry Dictionary Recalibrated",
      desc: "KURA's glossary indices have been realigned with latest multi-session academic benchmarks.",
      time: "2 hours ago",
      tag: "Dictionary Update"
    },
    {
      title: "Tamil & Gujarati synthesis refined",
      desc: "Regional translation mapping pipelines have been updated with friendly terms for ALT indicators.",
      time: "1 day ago",
      tag: "Translation Output"
    },
    {
      title: "Safe Patient Sandbox Active",
      desc: "Authorized profiles have cleared previous history cache logs successfully to guarantee offline-first safety.",
      time: "2 days ago",
      tag: "Safety Alerts"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <SaaSCard>
        <div className="flex items-center justify-between border-b border-[#D1E5F4] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0F2744]" />
            <h2 className="cherry-title text-2xl text-[#0F2744]">Alert Stream</h2>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">{alerts.length} Notifications</span>
        </div>

        <div className="space-y-4">
          {alerts.map((alt, index) => (
            <div key={index} className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50/30 transition-colors relative flex gap-3.5 items-start">
              <div className="p-2 bg-[#E5F0FD] rounded-lg text-[#0F2744] mt-0.5 shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-700">{alt.title}</h4>
                  <span className="text-[9px] font-bold text-[#0F2744] bg-[#E5F0FD] px-1.5 py-0.5 rounded border border-[#D1E5F4]/30">{alt.tag}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{alt.desc}</p>
                <span className="text-[10px] text-slate-400 mt-2 block font-medium">{alt.time}</span>
              </div>
            </div>
          ))}
        </div>
      </SaaSCard>
    </div>
  );
}

/* =========================================================================
   13. SAVED INSIGHTS PAGE
   ========================================================================= */
export function SavedInsightsPage() {
  const insights = [
    {
      marker: "Low HDL Cholesterol",
      tip: "Remember that moderate cardiovascular exercises can safely stimulate helper HDL cholesterol levels.",
      consult: "Ask your consultant whether aerobic metrics fit your metabolic baseline parameters."
    },
    {
      marker: "Liver enzymes (ALT/AST)",
      tip: "Elevations may trigger due to simple ibuprofen doses, intensive workouts, or mild seasonal colds.",
      consult: "Take note of any simple drugs consumed within 72 hours of your blood test drawing."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <GlassBadge>SAVED CLINICAL METRICS</GlassBadge>
        <h1 className="cherry-title text-4xl text-[#0F2744] mt-3 mb-2">My Vocabulary Insights</h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">Bookmarks of decoded biomarkers you saved for consultation visits.</p>
      </div>

      <div className="space-y-6">
        {insights.map((ins, idx) => (
          <SaaSCard key={idx} className="relative overflow-hidden border-l-4 border-l-[#A8C0DC]">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-[#E5F0FD] rounded-xl text-[#0F2744] mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#0F2744]">{ins.marker}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Insight Summary:</strong> {ins.tip}
                </p>
                <p className="text-xs text-slate-500 italic bg-[#F3F8FF] p-3 rounded-xl border border-[#D1E5F4]/40 mt-1">
                  💡 <strong>Suggested Doctor Question:</strong> {ins.consult}
                </p>
              </div>
            </div>
          </SaaSCard>
        ))}
      </div>
    </div>
  );
}
