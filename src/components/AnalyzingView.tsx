"use client";

import { motion } from "framer-motion";

export const AnalyzingView = ({ accentColor = "#a855f7" }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      {/* 鼓動するように光る円のエフェクト */}
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 blur-2xl rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        
        {/* 3つのドットが跳ねるアニメーション */}
        <div className="flex space-x-2 relative z-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "white" }}
            />
          ))}
        </div>
      </div>

      {/* テキスト表示 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-xs tracking-[0.3em] text-slate-300 font-light"
      >
        分析中...
      </motion.p>
    </div>
  );
};