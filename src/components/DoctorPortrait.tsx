// src/components/DoctorPortrait.tsx
import React from 'react';

// ドクターの型定義をここで直接行っておけば、外部ファイルのエラーに左右されないわ
export type DoctorType = {
  name: string;
  role: string;
  image: string;
  greeting: string;
};

interface DoctorPortraitProps {
  doctor: DoctorType;
}

export const DoctorPortrait = ({ doctor }: DoctorPortraitProps) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative group">
        {/* 背面の神秘的な光の輪（ネオン・グロウ） */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        {/* 画像コンテナ：光沢感のある二重ボーダー */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-slate-900">
          <img 
            src={doctor.image} 
            alt={doctor.name}
            className="w-full h-full object-cover grayscale-[15%] contrast-[1.1] brightness-[0.9] transition-all duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
          />
          
          {/* 表面の薄いガラスのような反射エフェクト */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
        </div>
      </div>
      
      {/* 名前と肩書きのセクション */}
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-serif tracking-[0.2em] text-white/90 drop-shadow-lg">
          Dr. {doctor.name}
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <span className="h-[1px] w-4 bg-indigo-500/50"></span>
          <p className="text-[10px] tracking-[0.4em] text-indigo-400 uppercase font-medium">
            {doctor.role}
          </p>
          <span className="h-[1px] w-4 bg-indigo-500/50"></span>
        </div>
      </div>
    </div>
  );
};