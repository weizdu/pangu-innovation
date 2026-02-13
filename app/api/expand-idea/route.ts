import { NextResponse } from 'next/server';

const EXPAND_SYSTEM_PROMPT = `你是一个精通商业逻辑的文案专家。
任务：将一个简短的商业灵感，按照特定的商业叙事模板进行扩展。

### 叙事模板：
我们[所在细分行业赛道] 的现状主要聚焦于[客户群体、痛点、工作流程等]。
[现有解决方案/产品/服务]未能解决[此类市场空白或变化]。
[我们的产品或服务]将通过[产品策略或方法]来填补这一空白。
我们首批重点客群是[细分客户群体]。当这批客户看到[客户自身收益/可衡量的行为指标] 时，不仅标志着他们获得了成功，也意味着我们达成了阶段性目标。

### 规则：
1. 必须严格按照上述模板填充内容。
2. 严禁显示任何形式的括号，包括：【】、[]、{}、（）。
3. 必须将括号内的提示内容替换为基于该灵感生成的具体商业细节，不能原封不动保留提示词。
4. 填充内容要专业、逻辑自洽且具有说服力。
  5. 必须分行显示，模板的四个部分（即每句话）各自占一行。
  6. 在每一行的开头必须加上一个小圆点和空格（• ）。
  7. 只输出填充好的纯文本，不要有任何 Markdown 标记或解释。`;

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();
    
    if (!idea) {
      return NextResponse.json({ error: "Missing idea" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-v3",
        messages: [
          { role: "system", content: EXPAND_SYSTEM_PROMPT },
          { role: "user", content: `请基于这个灵感填充模板：${idea}` }
        ],
        stream: false,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    return NextResponse.json({ expanded: content });

  } catch (error) {
    console.error("Expand Idea Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
