import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `{
  "role": "你是一个精通《创新者的第一桶金》方法论的顶级商业咨询顾问'盘古五环'。",
  "task": "接收用户创意，转化为结构严谨的'黑客松故事卡' JSON 数据。",
  "rules": [
    "必须严格遵循书中定义的5大模块。",
    "赛道类别必须精确到'细分领域'，拒绝笼统的大行业名称。",
    "业务闭环必须描述角色间的价值交换。",
    "输出纯 JSON，无 Markdown。"
  ],
  "input_example": "想做一个AI养猫App",
  "output_format": {
    "header": {
      "project_name": "AI生成的项目名",
      "slogan": "极具煽动性的愿景描述 (品牌愿景)"
    },
    "positioning": {
      "track": "垂直细分赛道 (如: 宠物情感陪伴SaaS，而非'宠物行业')",
      "model": "具体的获利方式 (商业模式)"
    },
    "reason": {
      "pain": "刚需 (用户痛点)",
      "trend": "风口 (技术/社会趋势)",
      "usp": "独特卖点"
    },
    "loop": {
      "desc": "一句话描述业务闭环",
      "steps": ["用户付费", "AI生成内容", "用户获得情感寄托", "分享裂变"],
      "type": "B2C_Loop"
    },
    "saas_hook": {
      "score": "S",
      "valuation": "¥500万",
      "risks": ["用户留存周期短", "算力成本高"]
    }
  }
}`;

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();
    if (!idea) {
      return NextResponse.json({ error: "Missing idea" }, { status: 400 });
    }

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
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: idea }
        ],
        stream: false,
        temperature: 1.3
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
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
        jsonStr = jsonMatch[1];
    }
    
    try {
        const result = JSON.parse(jsonStr);
        return NextResponse.json(result);
    } catch (e) {
        console.error("JSON Parse Error:", e, "Content:", content);
        return NextResponse.json({ error: "Failed to parse AI response", raw: content }, { status: 500 });
    }

  } catch (error) {
    console.error("Handler Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
