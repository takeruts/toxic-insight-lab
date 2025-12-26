// src/utils/share.ts などに配置

export const generateShareText = (doctorName: string, resultText: string) => {
  // 分析結果が長すぎる場合はSNS用に少し短くカット
  const shortResult = resultText.length > 80 ? resultText.slice(0, 80) + "..." : resultText;

  const text = `【TOXIC INSIGHT LAB / 分析結果報告】\n\n` +
               `分析官：Dr.${doctorName}\n` +
               `「${shortResult}」\n\n` +
               `私の心の毒から、隠された真実が抽出されました。\n`;
  
  const url = "https://www.toxic-insight.com/";
  const hashtags = "TOXIC_INSIGHT_LAB,AI診断,深層心理";

  // X (Twitter) 用のシェアURLを作成
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
};