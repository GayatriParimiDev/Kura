import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, HelpCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import { ChatMessage, UserReport } from '../types';

interface ChatAssistantProps {
  report: UserReport;
  onSendMessage: (text: string) => Promise<string>;
}

export default function ChatAssistant({ report, onSendMessage }: ChatAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(report.chatHistory || []);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Sync with report history changes
  useEffect(() => {
    if (report.chatHistory) {
      setMessages(report.chatHistory);
    }
  }, [report.id, report.chatHistory]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userQuery = inputText;
    setInputText('');

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: userQuery,
      timestamp: new Date().toISOString()
    };

    // Update state & report object local copy
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    report.chatHistory = updatedMessages; // Sync inline immediately

    setIsTyping(true);

    try {
      const assistantText = await onSendMessage(userQuery);
      
      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'model',
        text: assistantText,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      report.chatHistory = finalMessages; // Sync inline immediately
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: "Kura is experiencing temporary communication limits. For your safety, remember we recommend carrying active health indexes directly to your physician.",
        timestamp: new Date().toISOString()
      };
      const finalErr = [...updatedMessages, errorMessage];
      setMessages(finalErr);
      report.chatHistory = finalErr;
    } finally {
      setIsTyping(false);
    }
  };

  const selectSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="flex flex-col h-[550px] bg-white rounded-3xl border border-[#D1E5F4] overflow-hidden shadow-sm" id="chat-assistant-container">
      {/* Header and Disclaimer warning */}
      <div className="p-4 bg-[#E5F0FD] border-b border-[#D1E5F4]/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2744] flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F2744]">KURA Contextual Helper</h4>
            <p className="text-[10px] text-slate-500 font-medium">Ask questions regarding this report</p>
          </div>
        </div>
        
        {/* Safety Indicator Dot */}
        <span className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-lg border border-amber-200/60 text-[10px] font-bold text-amber-700">
          <ShieldAlert className="w-3.5 h-3.5" />
          Safe Guard
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-messages-scrollable">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-slate-400 max-w-sm mx-auto">
            <HelpCircle className="w-8 h-8 mx-auto text-[#0F2744] opacity-35 mb-2" />
            <h5 className="text-xs font-bold text-slate-600">No Chat Questions Selected</h5>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-medium">
              Ask about markers, what indices mean, or select one of Kura's precompiled physician template questions below!
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium ${
                  msg.role === 'user' 
                    ? 'bg-[#0F2744] text-white rounded-tr-none' 
                    : 'bg-[#F3F8FF] border border-[#D1E5F4]/50 text-slate-700 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1 font-bold">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-[#F3F8FF] border border-[#D1E5F4]/40 rounded-2xl rounded-tl-none px-4 py-3">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#0F2744] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#0F2744] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#0F2744] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef}></div>
      </div>

      {/* Suggestion Prompts Section (if the report has doctor questions) */}
      {report.analysis?.doctor_questions && (
        <div className="p-3 border-t border-slate-100 bg-[#F3F8FF]/50">
          <span className="text-[9px] font-bold text-[#0F2744] uppercase tracking-wider block mb-1.5">Suggested Literacy Trails:</span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 select-none">
            {report.analysis.doctor_questions.slice(0, 3).map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectSuggestedQuestion(q)}
                className="shrink-0 text-[10px] font-bold text-[#0F2744] bg-white border border-[#D1E5F4] px-3 py-1.5 rounded-full hover:bg-[#E5F0FD] transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                {q.length > 40 ? q.slice(0, 40) + '...' : q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex gap-2" id="chat-input-form">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question..."
          disabled={isTyping}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-[#D1E5F4] focus:border-[#0F2744] text-xs focus:outline-none focus:bg-white disabled:opacity-50 text-slate-700 font-medium"
        />
        <button 
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="p-3 rounded-xl bg-[#0F2744] hover:bg-[#09182C] text-white transition-colors disabled:opacity-40 cursor-pointer shadow-sm"
          id="btn-chat-send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
