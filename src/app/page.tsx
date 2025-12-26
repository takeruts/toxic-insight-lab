// src/app/page.tsx
"use client";

import { useState } from "react";
import { DoctorPortrait } from "@/components/DoctorPortrait";
import { MessageWindow } from "@/components/MessageWindow";
import { InputForm } from "@/components/InputForm";
import { DOCTORS, DoctorType } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

// 履歴の型定義
type HistoryItem = {
  role: "user" | "doctor";
  text: string;
  turn: number;
};

export default function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [showAnalysisButton, setShowAnalysisButton] = useState(false); 
  const [chatHistory, setChatHistory] = useState<HistoryItem[]>([]); // 履歴を保存

  const handleSelectDoctor = (doctor: DoctorType) => {
    setSelectedDoctor(doctor);
    setCurrentMessage(doctor.greeting);
    setTurnCount(0);
    setShowAnalysisButton(false);
    setChatHistory([]); // リセット
  };

  const handlePoisonSubmit = async (text: string, isFinal = false) => {
    if (!selectedDoctor) return;
    
    setIsLoading(true);
    const nextTurn = isFinal ? turnCount : turnCount + 1;
    if (!isFinal) setTurnCount(nextTurn);
    
    // ユーザーの発言を履歴に追加（新しい順なので先頭に入れる）
    setChatHistory(prev => [{ role: "user", text, turn: nextTurn }, ...prev]);

    if (selectedDoctor.id === 'nagi') {
      setCurrentMessage("……へぇ、興味深いな。その感情の裏側を分析してやるから、少し待ってろ。");
    } else {
      setCurrentMessage("……ふふ、興味深いわ。その感情の裏側を分析してあげるから、少し待っててちょうだい。");
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text, 
          doctorName: selectedDoctor.name,
          doctorRole: selectedDoctor.role,
          turnCount: nextTurn,
          isFinalAnalysis: isFinal 
        }),
      });

      const data = await response.json();
      setCurrentMessage(data.text);
      
      // 博士の回答を履歴に追加
      setChatHistory(prev => [{ role: "doctor", text: data.text, turn: nextTurn }, ...prev]);

      if (nextTurn >= 3 && !isFinal) {
        setShowAnalysisButton(true);
      }
      if (isFinal) {
        setShowAnalysisButton(false);
      }
    } catch (error) {
      setCurrentMessage("あら、毒が強すぎて分析器がエラーを起こしたみたい。もう一度試して？");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-6 bg-lab-gradient text-slate-200 overflow-y-auto">
      <AnimatePresence mode="wait">
        {!selectedDoctor ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center max-w-2xl w-full text-center space-y-16 mt-20"
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-serif tracking-[0.3em] text-white/80">TOXIC INSIGHT LAB</h1>
              <p className="text-xs tracking-[0.4em] text-indigo-400/80 uppercase">あなたの毒吐きから深層心理を判断します</p>
            </div>
            <div className="space-y-8 w-full">
              <p className="text-sm tracking-widest text-slate-500 italic">あなたの性別を教えて下さい</p>
              <div className="flex justify-center items-center gap-4 md:gap-8">
                <button onClick={() => handleSelectDoctor(DOCTORS.ryo)} className="w-32 md:w-40 py-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-indigo-500/50 group">
                  <span className="text-sm tracking-[0.3em] text-slate-400 group-hover:text-indigo-400 transition-colors">男性</span>
                </button>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <button onClick={() => handleSelectDoctor(DOCTORS.nagi)} className="w-32 md:w-40 py-6 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-cyan-500/50 group">
                  <span className="text-sm tracking-[0.3em] text-slate-400 group-hover:text-cyan-400 transition-colors">女性</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="lab"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-10 w-full max-w-4xl pb-20"
          >
            <DoctorPortrait doctor={selectedDoctor} />
            <MessageWindow text={currentMessage} />
            
            {!showAnalysisButton ? (
              <InputForm onSubmit={(text) => handlePoisonSubmit(text)} accentColor={selectedDoctor.accentColor} />
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center space-y-6 w-full max-w-md">
                <button 
                  onClick={() => handlePoisonSubmit("これまでの成分を元に、最終的な真実を提示してちょうだい。", true)}
                  className="w-full px-10 py-5 rounded-xl border bg-white/10 hover:bg-white/20 transition-all text-sm tracking-[0.2em] font-bold shadow-lg shadow-white/5"
                  style={{ borderColor: selectedDoctor.accentColor }}
                >
                  最終的な真実を抽出する
                </button>
                <button onClick={() => setShowAnalysisButton(false)} className="text-xs text-slate-500 hover:text-white transition-colors uppercase tracking-[0.3em] border-b border-white/10 hover:border-white/40 pb-1">
                  まだ吐き出したい毒がある
                </button>
              </motion.div>
            )}

            {/* --- ここから対話履歴エリア --- */}
            <div className="w-full space-y-8 mt-16 pt-10 border-t border-white/5">
              <h2 className="text-center text-[10px] tracking-[0.5em] text-white/30 uppercase font-serif">対話履歴</h2>
              <div className="space-y-6">
                {chatHistory.map((item, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex flex-col ${item.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[9px] tracking-widest text-slate-600 mb-2 uppercase">
                      {item.role === 'user' ? `Your Toxicity #${item.turn}` : `Dr.${selectedDoctor.name}'s Insight`}
                    </span>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed tracking-wider ${
                      item.role === 'user' 
                        ? 'bg-white/5 text-slate-400 border border-white/5 rounded-tr-none' 
                        : 'bg-indigo-500/5 text-indigo-200 border border-indigo-500/10 rounded-tl-none'
                    }`}>
                      {item.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <button onClick={() => setSelectedDoctor(null)} className="mt-8 text-[10px] text-white/20 hover:text-white/60 transition-colors uppercase tracking-[0.5em] border-b border-transparent hover:border-white/20 pb-1">ラボを退室</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}