// src/types/index.ts

/**
 * ドクターの基本構造を定義する型よ
 */
export type DoctorType = {
  id: 'nagi' | 'ryo';
  name: string;
  role: string;
  image: string;
  greeting: string;
  accentColor: string; // ナギならシアン、リョウならインディゴなど、UIの色分け用
};

/**
 * ラボに在籍するドクターたちのデータ
 */
export const DOCTORS: Record<string, DoctorType> = {
  nagi: {
    id: 'nagi',
    name: "ナギ",
    role: "Senior Analyst / Shadow Specialist",
    image: "/dr_male.png",
    greeting: "よう。君の中に溜まったその『毒』、僕に預けてみないか？ 綺麗に解剖してやるよ。",
    accentColor: "#06b6d4", // cyan-500
  },
  ryo: {
    id: 'ryo',
    name: "リョウ",
    role: "Chief Director / Psycho-Architect",
    image: "/dr_female.png",
    greeting: "いらっしゃい。あなたの美しい『闇』、詳しく聞かせてくださるかしら？ 遠慮はいらないわ。",
    accentColor: "#6366f1", // indigo-500
  }
};

/**
 * 将来的に使う、毒分析結果の型定義も用意しておいたわ
 */
export type AnalysisResult = {
  toxinName: string;      // 毒の名前（例：相対的剥奪感の結晶）
  purity: number;         // 純度（0-100）
  description: string;    // 深層心理の解剖結果
  mandalaPrompt: string;  // 曼荼羅生成用のプロンプト
};