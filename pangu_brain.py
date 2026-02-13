import os
import json
import requests
import re

def generate_idea(user_input, api_key=None):
    """
    Calls DeepSeek API to generate a hackathon story card JSON based on user input.
    """
    if not api_key:
        api_key = os.environ.get("DEEPSEEK_API_KEY")
        
    if not api_key:
        print("Warning: DEEPSEEK_API_KEY environment variable not set.")
        # For testing purposes without a key, you might want to return None or raise an error.
        # But per requirements, we'll proceed assuming it's there or fail gracefully.
        return {"error": "Missing API Key"}

    # Updated to use Alibaba Cloud Bailian (DeepSeek V3) endpoint
    url = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
    
    system_prompt = """{
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
}"""

    payload = {
        "model": "deepseek-v3",  # Alibaba Cloud Bailian model name for DeepSeek V3
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input}
        ],
        "stream": False,
        "temperature": 1.3  # High creativity for brainstorming
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        result = response.json()
        content = result['choices'][0]['message']['content']
        
        # Clean up Markdown code blocks if present
        # Match ```json ... ``` or just ``` ... ```
        json_match = re.search(r'```(?:json)?\s*(.*?)\s*```', content, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = content.strip()
            
        # Parse JSON
        parsed_data = json.loads(json_str)
        return parsed_data

    except requests.exceptions.RequestException as e:
        print(f"API Request Error: {e}")
        return {"error": str(e)}
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        print(f"Raw content was: {content}")
        return {"error": "Invalid JSON response", "raw_content": content}
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return {"error": str(e)}

def main():
    print("=== 盘古创新·黑客松故事卡生成器 ===")
    
    # Check if API Key is set for the test run
    test_key = os.environ.get("DEEPSEEK_API_KEY")
    if not test_key:
        # Fallback to the provided key for testing convenience
        test_key = "sk-65e100e6bc9a45309351592b7872f81e"
        print("Note: Using hardcoded key for testing.")
        
    while True:
        print("\n请输入你的创业想法 (输入 'q' 或 'quit' 退出):")
        user_input = input("> ").strip()
        
        if user_input.lower() in ['q', 'quit', 'exit']:
            print("再见！")
            break
            
        if not user_input:
            continue
            
        print(f"\n正在调用盘古大脑生成方案: '{user_input}'...")
        result = generate_idea(user_input, api_key=test_key)
        
        print("\n--- 生成结果 (JSON) ---")
        print(json.dumps(result, ensure_ascii=False, indent=2))
        
        if "error" not in result:
            print("\n✅ JSON 结构验证通过 (基础检查)")

if __name__ == "__main__":
    main()
