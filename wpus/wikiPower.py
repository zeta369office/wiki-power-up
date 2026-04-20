import os
import requests
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TermRequest(BaseModel):
    term: str
    api_key: str

@app.post("/explain")
async def explain_term(request: TermRequest):
    print(f"📡 收到請求：{request.term}")
    active_key = request.api_key.strip()
    
    if not active_key:
        return JSONResponse(content={"explanation": "❌ API Key 未設定。"})

    url = "https://api.x.ai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {active_key}"
    }

    # 使用 grok-3-mini 追求最快回應速度
    payload = {
        "model": "grok-3-mini", 
        "messages": [
            {"role": "system", "content": "你是一個 WPUS 導師。請用繁體中文提供一秒代入、核心拆解的術語解釋。"},
            {"role": "user", "content": f"引導我學習：{request.term}"}
        ],
        "temperature": 0.7
    }

    try:
        print(f"🚀 正在呼叫 Grok-3 (請耐心等待，已設定 60 秒超時)...")
        # 關鍵修正：將 timeout 提高到 60
        response = requests.post(url, headers=headers, json=payload, timeout=60)
        
        if response.status_code != 200:
            return JSONResponse(content={"explanation": f"❌ API 錯誤：{response.text}"})
        
        data = response.json()
        return JSONResponse(content={"explanation": data['choices'][0]['message']['content']})
    except requests.exceptions.Timeout:
        return JSONResponse(content={"explanation": "❌ Grok 思考太久了（超過 60 秒），請再試一次。"})
    except Exception as e:
        return JSONResponse(content={"explanation": f"❌ 連線失敗: {str(e)}"})

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)