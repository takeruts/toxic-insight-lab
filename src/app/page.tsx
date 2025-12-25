// src/app/page.tsx
"use client"; // クライアントサイドでの動きを有効にするわ

import { useState } from "react";
import { DoctorPortrait } from "../components/DoctorPortrait";
import { MessageWindow } from "../components/MessageWindow";
import { DOCTORS, DoctorType } from "../types";
import { motion, AnimatePresence } from "framer-motion"; // アニメーション用

export default function Home() {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-lab-gradient text-slate-200">
      <AnimatePresence mode="wait">
        {!selectedDoctor ? (
          // --- ステップ1: ドクター選択画面 ---
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-12"
          >
            <h1 className="text-3xl md:text-4xl font-serif tracking-[0.3em] text-white/80">
              TOXIC INSIGHT LAB
            </h1>
            <p className="text-sm tracking-widest text-indigo-400/80">あなたの性別を教えてちょうだい</p>
            
            <div className="flex flex-col md:flex-row gap-12 mt-12">
              {/* 男性ユーザー → リョウを召喚 */}
              <button 
                onClick={() => setSelectedDoctor(DOCTORS.ryo)}
                className="group flex flex-col items-center space-y-4 p-6 rounded-2xl transition-all hover:bg-white/5"
              >
                <div className="w-24 h-24 rounded-full border border-white/20 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg group-hover:shadow-indigo-500/20">
                  <img src="/dr_female.png" alt="Ryo" className="object-cover w-full h-full" />
                </div>
                <span className="text-sm tracking-widest group-hover:text-indigo-400">男性として入室</span>
              </button>

              {/* 女性ユーザー → ナギを召喚 */}
              <button 
                onClick={() => setSelectedDoctor(DOCTORS.nagi)}
                className="group flex flex-col items-center space-y-4 p-6 rounded-2xl transition-all hover:bg-white/5"
              >
                <div className="w-24 h-24 rounded-full border border-white/20 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg group-hover:shadow-cyan-500/20">
                  <img src="/dr_male.png" alt="Nagi" className="object-cover w-full h-full" />
                </div>
                <span className="text-sm tracking-widest group-hover:text-cyan-400">女性として入室</span>
              </button>
            </div>
          </motion.div>
        ) : (
          // --- ステップ2: ラボ入室後 ---
          <motion.div 
            key="lab"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-12"
          >
            <DoctorPortrait doctor={selectedDoctor} />
            <MessageWindow text={selectedDoctor.greeting} />
            
            <button 
              onClick={() => setSelectedDoctor(null)}
              className="text-xs text-white/20 hover:text-white/60 transition-colors uppercase tracking-widest"
            >
              Exit Lab
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}