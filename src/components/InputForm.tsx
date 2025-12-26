// src/components/InputForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface InputFormProps {
  onSubmit: (text: string) => void;
  accentColor?: string;
}

export const InputForm = ({ onSubmit, accentColor = "#6366f1" }: InputFormProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue(""); // 送信後にクリア
  };

  // Enterキーで送信、Shift+Enterで改行できるように調整
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl relative mt-8"
    >
      <div className="relative flex items-center">
        <textarea
          rows={2} // ここで2行分の高さを確保しているわ
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="人には言えないどんな言葉でも受け止めます。今の感情をむき出しにした本音や不満や悪口をここに吐き出して…"
          className="w-full bg-white/5 border-b border-white/20 py-5 px-6 pr-16 rounded-t-xl 
             focus:outline-none focus:border-white/40 focus:bg-white/10
             text-slate-200 transition-all duration-500
             text-sm placeholder:text-[8px] xs:placeholder:text-xs md:placeholder:text-sm
             placeholder:leading-relaxed placeholder:opacity-50
             resize-none overflow-hidden" // 自動で伸び縮みさせたい場合は resize-none に
        />
        
        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={!value.trim()}
          className="absolute right-4 bottom-5 p-2 disabled:opacity-20 group" // bottomで位置を調整
        >
          <motion.div
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 fill-none stroke-current text-white transition-colors"
              style={{ color: value.trim() ? accentColor : 'currentColor' }}
              strokeWidth="1.5"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </button>
      </div>

      {/* 入力欄の下の装飾ライン */}
      <motion.div 
        className="h-[1px] w-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value.length > 0 ? 1 : 0 }}
        style={{ backgroundColor: accentColor }}
        transition={{ duration: 0.5 }}
      />
    </form>
  );
};