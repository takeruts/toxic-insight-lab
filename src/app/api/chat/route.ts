import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, doctorName, doctorRole, turnCount, isFinalAnalysis } = await req.json();

    let phaseInstruction = "";

    if (isFinalAnalysis) {
      // 【最終分析】比喩を多用し、わかりやすくも深い総括
      phaseInstruction = `
      【最終結晶化：魂の肖像】
      これまでの対話から、ユーザーの精神構造を「一つの物語」や「一つの現象」に例えて総括してください。
      
      指示：
      - 「孤独」「寂しさ」という言葉を安易に使わず、もっと具体的な比喩（例：鏡の迷路、錆びついた鍵、底のない砂時計、過剰な盾など）を用いてください。
      - 構成：
        1. [毒成分の特定] 今のあなたが抱えている毒を「〇〇という成分」と定義してください。
        2. [無意識の構造] なぜその毒が必要だったのか。あなたが自分を守るために築いた「心の城壁」の正体を暴きます。
        3. [解毒への昇華] その毒をどう飼い慣らすか。明日からのあなたの呼吸が少し楽になるような、現実的で美しい示唆。
      - 500文字程度で、文学的かつ「あ、私のことだ」と直感的に理解できる表現を心がけてください。
      `;
    } else {
      // 【対話フェーズ】多面的な誘導と鋭い問いかけ
      const angles = [
        "防衛：その毒で、あなたは本当は何を隠そうとしているのかしら？",
        "渇望：その毒の裏には、認めたくないどんな『欲』が隠れているの？",
        "美学：あなたがその毒を吐くことで守っている『自分の美学』はなにかしら？",
        "支配：その言葉で、あなたは誰（または何）をコントロールしたいのかしら？"
      ];
      const selectedAngle = angles[turnCount % angles.length];

      phaseInstruction = `
      【多面的抽出：第${turnCount}段階】
      今回の切り口は「${selectedAngle}」です。
      
      指示：
      - 抽象的な心理学用語は避け、ユーザーが「ドキッとする」ような具体的な問いかけを1つだけ投げてください。
      - 例：「あなたがその人を否定するのは、その人があなたの『なりたかった姿』を鏡のように映しているからじゃない？」
      - 120〜150文字程度で、次の一言を引き出してください。
      `;
    }

    const systemPrompt = `
    あなたは『Toxic Insight Lab』の分析官、Dr.${doctorName}（${doctorRole}）です。
    
    【分析官の心得】
    - **脱・ワンパターン**: 常に「もしこの毒が、寂しさではなく『特権意識』や『美学』から来ているとしたら？」と裏を読んでください。
    - **比喩の魔法**: 精神の状態を、物理的なもの（建物、天候、宝石、毒薬、機械など）に例えて説明してください。
    - **執拗な誘導**: ユーザーが自分自身を「解剖」するのを手伝うのではなく、博士であるあなたが「静かに、しかし容赦なく」真実に光を当てる様子を演じてください。
    - 禁止用語：解剖、孤独、寂しい
    
    ${phaseInstruction}
    `;

    // 安定稼働のために models/ を付与したモデル名を指定
    const model = genAI.getGenerativeModel({ 
        model: "models/gemini-1.5-flash", 
    });
    
    const result = await model.generateContent(`${systemPrompt}\n\nユーザーの毒: ${message}`);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "分析器がオーバーヒートしたわ。" }, { status: 500 });
  }
}