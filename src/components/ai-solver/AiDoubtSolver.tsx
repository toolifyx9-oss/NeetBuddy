'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  BookMarked, 
  RotateCcw,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRE_FILLED_DOUBTS, PREBUILT_AI_RESPONSES } from '@/data/mockData';

interface DoubtMessage {
  id: string;
  sender: 'user' | 'ai';
  text?: string;
  response?: {
    concept: string;
    solutionSteps: string[];
    formulas: string[];
    proTip: string;
  };
  timestamp: string;
}

export default function AiDoubtSolver() {
  const { showToast } = useStore();

  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<DoubtMessage[]>([
    {
      id: 'welcome_01',
      sender: 'ai',
      response: {
        concept: "Welcome to NEET AI Doubt Solver! Ask any Physics numerical, Chemistry reaction mechanism, or Biology conceptual pathway.",
        solutionSteps: [
          "1. NCERT Alignment: Every solution is verified against the official NTA 2026 syllabus.",
          "2. Step-by-Step Derivation: Full mathematical breakdowns with SI units and free-body diagrams.",
          "3. Common Mistake Traps: Highlights exactly where 80% of students lose marks."
        ],
        formulas: [
          "Physics: v² = u² + 2as, F_net = m·a, V = I·R, E = h·ν",
          "Chemistry: ΔG° = -RT ln K, pH = -log[H⁺], PV = nRT",
          "Biology: p² + 2pq + q² = 1, B.O = ½(Nb - Na)"
        ],
        proTip: "Try clicking any of the pre-filled high-yield NEET prompts below to see an instant demonstration!"
      },
      timestamp: 'Just now'
    }
  ]);

  const handleAskDoubt = (promptToSubmit?: string) => {
    const text = (promptToSubmit || inputPrompt).trim();
    if (!text || isGenerating) return;

    const userMsg: DoubtMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsGenerating(true);

    // Pick best response from knowledge bank
    const lower = text.toLowerCase();
    let matchedKey = 'default';
    if (lower.includes('friction') || lower.includes('newton') || lower.includes('acceleration')) {
      matchedKey = 'friction';
    } else if (lower.includes('meiosis') || lower.includes('crossing over') || lower.includes('cell')) {
      matchedKey = 'meiosis';
    } else if (lower.includes('sn1') || lower.includes('sn2') || lower.includes('substitution')) {
      matchedKey = 'sn1_sn2';
    } else if (lower.includes('carnot') || lower.includes('efficiency') || lower.includes('thermo')) {
      matchedKey = 'carnot';
    } else if (lower.includes('hardy') || lower.includes('frequency') || lower.includes('carrier')) {
      matchedKey = 'hardy';
    }

    const matchedResponse = PREBUILT_AI_RESPONSES[matchedKey] || PREBUILT_AI_RESPONSES.default;

    // Simulate AI thinking and streaming
    setTimeout(() => {
      const aiMsg: DoubtMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        response: matchedResponse,
        timestamp: 'Just now'
      };
      setChatHistory((prev) => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/30 border border-indigo-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base font-bold text-[#F0F6FC]">
              AI NEET 2026 Doubt Solver & Concept Deriver
            </h2>
            <p className="text-xs text-[#8B949E]">
              Trained on NCERT line-by-line textbooks, 36 years of NEET/AIPMT papers, and AIIMS conceptual reasoning.
            </p>
          </div>
        </div>

        {/* Pre-filled prompt pills */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
          <span className="text-[11px] font-semibold text-[#8B949E] uppercase tracking-wider">
            High-Yield Topics to Ask
          </span>
          <div className="flex flex-wrap gap-2">
            {PRE_FILLED_DOUBTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleAskDoubt(item.prompt)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-white/[0.08] text-xs text-[#8B949E] hover:text-[#F0F6FC] transition-all text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Conversation Scroll Area */}
      <div className="space-y-4 min-h-[420px]">
        {chatHistory.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {msg.sender === 'user' ? (
              <div className="flex items-start gap-3 justify-end">
                <div className="max-w-2xl p-4 rounded-2xl bg-indigo-600 text-white text-xs leading-relaxed shadow-lg shadow-indigo-600/10">
                  <p className="font-medium">{msg.text}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  <User className="w-4 h-4 text-[#8B949E]" />
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 text-white">
                  <Bot className="w-4 h-4" />
                </div>

                <div className="flex-1 max-w-3xl p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] space-y-4">
                  {/* Concept Title */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-xs font-bold text-[#F0F6FC]">
                        {msg.response?.concept}
                      </h4>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          msg.id,
                          `${msg.response?.concept}\n\n` +
                            msg.response?.solutionSteps.join('\n') +
                            '\n\nFormulas:\n' +
                            msg.response?.formulas.join('\n')
                        )
                      }
                      className="text-[#8B949E] hover:text-[#F0F6FC] transition-colors p-1"
                      title="Copy solution"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Step by Step Breakdown */}
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-indigo-300">Detailed NCERT Solution:</p>
                    <div className="space-y-1.5 text-[#8B949E] leading-relaxed">
                      {msg.response?.solutionSteps.map((step, sIdx) => (
                        <p key={sIdx} className="bg-white/[0.015] p-2.5 rounded-lg border border-white/[0.03]">
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Formula Box */}
                  {msg.response?.formulas && msg.response.formulas.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1.5">
                      <p className="font-bold text-indigo-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        Key Formulas to Memorize:
                      </p>
                      {msg.response.formulas.map((f, fIdx) => (
                        <p key={fIdx} className="font-mono text-indigo-200">
                          • {f}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Pro Tip Alert */}
                  {msg.response?.proTip && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <p className="font-bold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Common NEET Exam Trap:
                      </p>
                      <p className="text-amber-200/90 leading-relaxed">
                        {msg.response.proTip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isGenerating && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2 text-xs text-[#8B949E]">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span>Analyzing NCERT line-by-line and deriving step-by-step solution...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form Bar */}
      <div className="sticky bottom-4 z-10 p-2 rounded-2xl bg-[#161B22]/90 backdrop-blur-md border border-white/[0.1] shadow-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskDoubt();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Type your NEET question (e.g., 'Derive acceleration on inclined plane with friction' or paste text)..."
            className="flex-1 py-3 px-4 bg-transparent text-xs text-[#F0F6FC] placeholder-[#484F58] outline-none"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isGenerating}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
