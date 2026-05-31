import React, { useState, useRef } from 'react';
import { 
  FileText, UploadCloud, Plus, Calendar, Globe, Sparkles, AlertCircle, FileSpreadsheet, Play, Activity, Trash2
} from 'lucide-react';
import { UserReport } from '../types';
import { motion } from 'motion/react';

interface DashboardProps {
  reports: UserReport[];
  userEmail: string | null;
  onAnalyzeReport: (fileName: string, rawText: string, fileData?: string, mimeType?: string) => void;
  onSelectReport: (id: string) => void;
  onDeleteReport: (id: string) => void;
}

export default function Dashboard({ reports, userEmail, onAnalyzeReport, onSelectReport, onDeleteReport }: DashboardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [showTextPaste, setShowTextPaste] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats derivations
  const totalReportsCount = reports.length;
  const analyzedCount = reports.filter(r => r.status === 'analyzed').length;
  const uniqueLanguagesSet = new Set(reports.map(r => r.language));
  const activeLanguagesCount = uniqueLanguagesSet.size || 1;

  // File size formatter helper
  const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setUploadError(null);
    // Limit to 20MB
    if (file.size > 20 * 1024 * 1024) {
      setUploadError("Security Notice: Kura enforces a 20MB maximum file size limit for documents.");
      return;
    }

    const reader = new FileReader();
    const mime = file.type;

    if (mime.startsWith('image/') || mime === 'application/pdf') {
      // Multimodal image processing
      setLocalLoading(true);
      reader.onload = (event) => {
        const base64Data = event.target?.result as string;
        setTimeout(() => {
          setLocalLoading(false);
          onAnalyzeReport(
            file.name, 
            `[Direct Scan Binary Uploaded: ${file.name}]`, 
            base64Data, 
            mime
          );
        }, 1200);
      };
      reader.readAsDataURL(file);
    } else {
      // Text file processing
      setLocalLoading(true);
      reader.onload = (event) => {
        const textContent = event.target?.result as string;
        setTimeout(() => {
          setLocalLoading(false);
          onAnalyzeReport(file.name, textContent);
        }, 800);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    if (!inputText.trim()) {
      setUploadError("Please provide some medical report content to analyze.");
      return;
    }

    const reportLabel = customFileName.trim() || `Manual_Report_Entry_${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
    setLocalLoading(true);
    setTimeout(() => {
      setLocalLoading(false);
      onAnalyzeReport(reportLabel, inputText);
      setInputText('');
      setCustomFileName('');
      setShowTextPaste(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="dashboard-view">
      {/* Welcome Heading */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="cherry-title text-3xl md:text-4xl text-[#0F2744]" id="dashboard-welcome">
            Welcome to Your Hub,
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Secure medical report management powered by Compassionate AI.
          </p>
        </div>
        
        <button 
          onClick={() => setShowTextPaste(!showTextPaste)}
          className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-[#D1E5F4] bg-white text-[#0F2744] hover:bg-[#E5F0FD] transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {showTextPaste ? 'Back to Drag & Drop' : 'Paste Raw Medical Text'}
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8" id="dashboard-kpis">
        <div className="p-6 rounded-3xl bg-white border border-[#D1E5F4] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Reports Vaulted</span>
            <span className="text-2xl font-bold text-[#0F2744] mt-1 block font-mono">{totalReportsCount}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#E5F0FD] text-[#0F2744]"><FileText className="w-6 h-6" /></div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#D1E5F4] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Reports Successfully Decoded</span>
            <span className="text-2xl font-bold text-emerald-600 mt-1 block font-mono">{analyzedCount}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600"><Activity className="w-6 h-6" /></div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#D1E5F4] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Languages Supported</span>
            <span className="text-2xl font-bold text-indigo-600 mt-1 block font-mono">{activeLanguagesCount}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-500"><Globe className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Upload or Input Block */}
      {showTextPaste ? (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-white border border-[#D1E5F4] shadow-sm mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#0F2744]" />
            <h3 className="text-base font-bold text-[#0F2744]">Paste Your Report Details</h3>
          </div>

          <form onSubmit={handlePasteSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Custom File Title (Optional)</label>
              <input 
                type="text"
                value={customFileName}
                onChange={(e) => setCustomFileName(e.target.value)}
                placeholder="e.g. CBC_Blood_Report_May_2026.txt"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F3F8FF] border border-[#D1E5F4] focus:border-[#0F2744] text-xs focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Raw Clinician Terminology / Values</label>
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste ALT, BILIRUBIN, GLUCOSE, LDL values directly here or type out lab notes..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-[#F3F8FF] border border-[#D1E5F4] focus:border-[#0F2744] text-xs focus:outline-none focus:bg-white"
                required
              />
            </div>

            {uploadError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={localLoading}
              className="px-6 py-3 rounded-2xl bg-[#0F2744] hover:bg-[#09182C] text-white text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {localLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Processing Report Elements...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Analyze Paste Text
                </>
              )}
            </button>
          </form>
        </motion.div>
      ) : (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative p-10 rounded-3xl border-2 border-dashed text-center transition-all cursor-pointer mb-10 ${
            dragActive 
              ? 'border-[#0F2744] bg-[#E5F0FD] scale-[1.01]' 
              : 'border-[#D1E5F4] bg-white text-slate-500 hover:border-[#0F2744]'
          }`}
          onClick={triggerFileSelect}
          id="dashboard-drag-drop"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".png,.jpg,.jpeg,.pdf,.txt"
            className="hidden"
          />

          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className={`p-4 rounded-2xl mb-4 transition-transform ${dragActive ? 'bg-[#0F2744] text-white scale-110' : 'bg-[#E5F0FD] text-[#0F2744]'}`}>
              {localLoading ? (
                <span className="w-8 h-8 block border-4 border-slate-300 border-t-[#0F2744] rounded-full animate-spin"></span>
              ) : (
                <UploadCloud className="w-8 h-8 animate-bounce" />
              )}
            </div>

            <h3 className="text-base font-bold text-[#0F2744] mb-1">
              {dragActive ? "Drop your clinical report file here" : "Drag & Drop Report to Start Decoding"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Supports blood chemical panel PDFs, PNG/JPG screenshots, or standard logs up to <strong>20MB</strong> boundary limit.
            </p>

            <span className="inline-block px-4 py-2.5 bg-white border border-[#D1E5F4] text-[#0F2744] font-bold text-xs rounded-xl hover:bg-[#E5F0FD] transition-colors shadow-sm">
              Choose Report File From Computer
            </span>
          </div>

          {uploadError && (
            <div className="mt-4 max-w-lg mx-auto p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 flex gap-2 text-left" onClick={(e) => e.stopPropagation()}>
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}

      {/* Recent Reports Vault */}
      <div className="bg-white rounded-3xl border border-[#D1E5F4] shadow-sm overflow-hidden" id="dashboard-reports-list">
        <div className="p-5 border-b border-[#D1E5F4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#0F2744]" />
            <h3 className="text-base font-bold text-[#0F2744] font-display">Document Literacy Registry</h3>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#0F2744] bg-[#E5F0FD] px-2.5 py-1 rounded-full">{reports.length} Records</span>
        </div>

        {reports.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto opacity-25 mb-3 text-[#0F2744]" />
            <p className="text-sm font-semibold text-[#0F2744]">Your secure clinical database currently contains no documents.</p>
            <p className="text-xs mt-1 text-slate-500 font-medium">Upload a blood test scan or check a demo to trial KURA immediately!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E5F0FD] border-b border-[#D1E5F4] text-[10px] font-bold text-[#0F2744] uppercase tracking-wider">
                  <th className="py-3 px-5">File Identification / Name</th>
                  <th className="py-3 px-5">Vault Date</th>
                  <th className="py-3 px-5">Dynamic Language</th>
                  <th className="py-3 px-5">Storage Weight</th>
                  <th className="py-3 px-5">AI Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D1E5F4]/40 text-xs text-slate-600 font-medium">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-[#E5F0FD] text-[#0F2744] shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#0F2744] truncate max-w-xs block" title={report.fileName}>
                          {report.fileName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {report.date}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-2 py-1 bg-[#E5F0FD]/60 border border-[#D1E5F4]/40 text-[#0F2744] rounded-lg text-[10px] font-bold flex items-center gap-1 w-max uppercase">
                        <Globe className="w-3 h-3 text-[#0F2744]/70" />
                        {report.language}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-400 font-mono text-[10px]">{report.fileSize}</td>
                    <td className="py-4 px-5">
                      {report.status === 'analyzed' ? (
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 text-[10px] font-bold flex items-center gap-1 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Decoded
                        </span>
                      ) : report.status === 'pending' ? (
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-200 text-[10px] font-bold flex items-center gap-1 w-max animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Analyzing...
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-full border border-red-200 text-[10px] font-bold flex items-center gap-1 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => onSelectReport(report.id)}
                          className="px-3.5 py-2 rounded-xl bg-[#0F2744] hover:bg-[#09182C] text-white font-bold text-[10px] flex items-center gap-1 transition-colors border border-transparent shadow-sm cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          View Literacy Analysis
                        </button>
                        <button 
                          onClick={() => onDeleteReport(report.id)}
                          className="p-2 rounded-xl border border-slate-200 hover:border-red-200 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
