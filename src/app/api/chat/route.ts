// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, doctorName, doctorRole, turnCount, isFinalAnalysis } = await req.json();

    // 孤独以外の視点を提供するための心理学理論リスト
    const psychologicalFrameworks = [
      "ユングの『影（シャドウ）』：あなたが否定し、抑圧している自分自身の側面",
      "アドラーの『優越性の追求』：無力感を打ち消すための過剰な攻撃性や虚栄心",
      "フロイトの『反動形成』：本心とは正反対の過激な態度をとる防衛本能",
      "自己愛の脆弱性：他者への攻撃の裏に潜む、壊れやすい自尊心の防衛",
      "ラカンの『他者の欲望』：あなたが本当に欲しているのは、他者の眼差しではないかという疑念",
      "エリック・バーンの『心理ゲーム』：あなたが無意識に繰り返す不毛な人間関係のパターン"
    ];

    // 回数に応じて視点を変えることでワンパターン化を防ぐ
    const selectedTheory = psychologicalFrameworks[turnCount % psychologicalFrameworks.length];

    let phaseInstruction = "";

    if (isFinalAnalysis) {
      // 最終分析フェーズ：500文字程度の濃密な結論
      phaseInstruction = `
      【最終分析：真実の結晶化命令】
      あなたはこれまでの対話を統合し、ユーザーの魂の肖像を完成させてください。
      
      指示：
      - 「孤独」や「寂しさ」という安易な結論に逃げることを禁じます。
      - 文字数は500文字程度、重厚かつ美麗な文章で綴ってください。
      - 構成：
        1. [成分分析] ユーザーが吐き出した毒の「本質的な成分（執着や恐怖の正体）」を特定。
        2. [深層の肖像] 心理学的な${selectedTheory}等の視点を用い、なぜこの毒が生成されたのか、その無意識の戦略を暴いてください。
        3. [昇華の光] その毒を、今後どのようなエネルギーに変換すべきか、冷徹ながらも美しい示唆を与えてください。
      - 「解剖」は禁句。知的で神秘的なトーンを極めてください。
      `;
    } else if (turnCount >= 3) {
      // 収束フェーズ：意思確認
      phaseInstruction = `
      【収束フェーズ】
      対話が3回を超えました。
      「かなり純度の高い成分が集まったようね。そろそろ、これらを結晶化させて私の分析（結論）を提示してもいいかしら？ それとも、まだ吐き出したい毒がある？」と、最終提示への意思を確認してください。
      - 文脈に${selectedTheory}の香りを微かに漂わせ、知的好奇心を刺激してください。
      - 120〜150文字程度で。
      `;
    } else {
      // 抽出フェーズ：深掘り
      phaseInstruction = `
      【抽出フェーズ】
      ${selectedTheory}の視点から、ユーザーの言葉の裏にある「澱」を抽出してください。
      - 「寂しいだけでは？」といった表面的な共感は不要です。「その怒りは、あなたが守ろうとしている『聖域』への侵入を恐れているからではないかしら？」といった、鋭い問いを投げてください。
      - 120〜150文字程度で。
      `;
    }

    const systemPrompt = `
    あなたは『Toxic Insight Lab』の分析官、Dr.${doctorName}（${doctorRole}）です。
    
    【基本トーン】
    - 常に知的で神秘的、洗練された言葉遣い。
    - 安易な共感、励まし、断罪は不要。ユーザーを「興味深い精神のサンプル」として扱ってください。
    - 「解剖」という言葉は絶対に使わないこと。
    
    ${phaseInstruction}
    `;

    // 404エラーを回避するため、確実なモデル名（gemini-1.5-flash）を指定
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview", 
    });
    
    const result = await model.generateContent(`${systemPrompt}\n\nユーザーの毒: ${message}`);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "分析器がオーバーヒートしたわ。" }, { status: 500 });
  }
}