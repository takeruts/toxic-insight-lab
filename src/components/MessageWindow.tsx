// src/components/MessageWindow.tsx
"use client";

import { motion } from "framer-motion";

interface MessageWindowProps {
  text: string;
}

export const MessageWindow = ({ text }: { text: string }) => {
  return (
    <div className="relative w-full max-w-2xl group">
      {/* 背景のグロウ効果 */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur opacity-75"></div>
      
      {/* メインウィンドウ：ガラスモーフィズム */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
        
        {/* 装飾：左上のラボ・タグ */}
        <div className="absolute top-0 left-10 -translate-y-1/2 bg-indigo-600 px-3 py-1 rounded-full shadow-lg">
          <span className="text-[10px] tracking-[0.2em] font-bold text-white uppercase">Analysis Output</span>
        </div>

        {/* メッセージ本文：フェードインアニメーション */}
        <motion.p 
          key={text} // テキストが変わるたびに再アニメーション
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl leading-relaxed text-slate-200 font-light tracking-wide first-letter:text-2xl first-letter:font-serif first-letter:text-indigo-400"
        >
          {text}
        </motion.p>
        
        {/* 装飾：右下のスキャンラインのような意匠 */}
        <div className="absolute bottom-4 right-6 flex space-x-1">
          <div className="w-12 h-[1px] bg-white/10"></div>
          <div className="w-2 h-[1px] bg-indigo-500/50 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};