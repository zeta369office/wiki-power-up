# [Project] WPUS - Wiki Power Up Speed
# [Status] v1.5 Stable | Grok-3/4 Ready

## 1. 系統架構 (Architecture)
[Module: Frontend]  Chrome Extension (Manifest V3) -> ContextMenu & Storage API
[Module: Bridge]    FastAPI (Uvicorn) -> CORS Middleware & Request Routing
[Module: AI-Engine] x.ai API (Grok-3-mini / Grok-4-fast)

## 2. 核心代碼模組 (Core Modules)

### A. 前端配置 (manifest.json)
- permissions: [contextMenus, activeTab, scripting, storage]
- background: service_worker (background.js)
- content_scripts: matches: [https://*.wikipedia.org/*]

### B. 後端邏輯 (wikiPower.py)
- Framework: FastAPI
- Model: "grok-3-mini" (Optimized for speed)
- Timeout: 60s (To prevent HTTPSConnectionPool Read timeout)

## 3. 部署流程 (Deployment)

### 第一階段：環境初始化
```bash
# Install Dependencies
$ pip install fastapi uvicorn requests python-dotenv
