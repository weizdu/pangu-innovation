import { NextResponse } from 'next/server';

const INSPIRE_SYSTEM_PROMPT = `你是一个极具创意的商业策划专家。
任务：基于用户提供的“赛道”、“身份”和“核心能力/资源”，生成3个极具创新性、可行性且符合《创新者的第一桶金》方法论的商业点子。
规则：
1. 每个点子必须结合用户提供的所有要素。
2. 语言简练，具有吸引力，每个点子不超过25个字。
3. 必须输出纯 JSON 数组格式，包含且仅包含3个字符串点子。
4. 严禁输出 Markdown 代码块或其他任何文字说明。
示例输入：赛道=供应链金融, 身份=家庭主妇, 资源=硬件研发能力
示例输出：["基于硬件加密的家庭主妇信用借贷平台", "家庭闲置硬件资产数字化融资工具", "主妇众包的硬件供应链质检金融服务"]
`;

export async function POST(req: Request) {
  try {
    const { track, role, asset } = await req.json();
    
    const prompt = `赛道: ${Array.isArray(track) ? track.join(', ') : track}
身份: ${Array.isArray(role) ? role.join(', ') : role}
核心能力/资源: ${Array.isArray(asset) ? asset.join(', ') : asset}`;

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
    }

    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-v3",
        messages: [
          { role: "system", content: INSPIRE_SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ],
        stream: false,
        temperature: 1.2
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`Upstream API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Clean markdown if present
    let jsonStr = content.trim();
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
        jsonStr = jsonMatch[1];
    }
    
    try {
        const result = JSON.parse(jsonStr);
        if (Array.isArray(result)) {
            return NextResponse.json(result.slice(0, 3));
        }
        throw new Error("Invalid response format from AI");
    } catch (e) {
        console.error("JSON Parse Error:", e, "Content:", content);
        return NextResponse.json({ error: "Failed to parse AI response", raw: content }, { status: 500 });
    }

  } catch (error) {
    console.error("Inspire Handler Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
