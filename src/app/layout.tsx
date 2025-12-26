import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOXIC INSIGHT LAB - あなたの毒を真実に変える場所",
  description: "誰にも言えない不満や悪口をAI分析官リョウとナギが受け止め、あなたの深層心理を暴き出します。心の毒を吐き出して、真実の自分に出会いましょう。",
  keywords: ["AI診断", "悩み相談", "ストレス解消", "毒吐き", "深層心理"],
  authors: [{ name: "Your Name / Lab Manager" }],
  
  // SNSでシェアされた時の見え方（OGP設定）
  openGraph: {
    title: "TOXIC INSIGHT LAB",
    description: "AI分析官があなたの本音を解き明かす、ミステリアスな深層心理ラボ。",
    url: "https://www.toxic-insight.com/",
    siteName: "TOXIC INSIGHT LAB",
    images: [
      {
        url: "/ogp-image.png", // publicフォルダに置いたOGP用画像
        width: 1200,
        height: 630,
        alt: "リョウとナギが待つTOXIC INSIGHT LAB",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },

  // X (旧Twitter) 専用の設定
  twitter: {
    card: "summary_large_image",
    title: "TOXIC INSIGHT LAB",
    description: "あなたの『毒』から真実を抽出します。AI分析官リョウ＆ナギによる深層心理診断。",
    images: ["/ogp-image.png"], // Xで表示したい画像
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
