# ⚡ Mohammad Saquib — AI Engineering Portfolio

A modern, full-stack, production-grade developer portfolio featuring an **interactive 3D user experience** and an **autonomous AI Representative** powered by real-time streaming LLM inference.

🌐 **Live Website**: [https://ai-portfolio-pi-flax.vercel.app](https://ai-portfolio-pi-flax.vercel.app)  
⚙️ **Live Backend API**: [https://saquib-portfolio-backend.onrender.com](https://saquib-portfolio-backend.onrender.com)

---

## 🌟 Key Highlights & Features

1. **Autonomous AI Representative**:
   - Live AI conversational assistant grounded strictly on parsed candidate profile data (`candidate_profile.json`).
   - Real-time token streaming via **Server-Sent Events (SSE)** using FastAPI and Groq Cloud.
   - Guardrails against hallucination: strictly refuses fabricated skills/experience and dynamically steers toward proven strengths.

2. **Interactive 3D Perspective Hero & Expertise Showcase**:
   - Perspective-based mouse tracking parallax effect.
   - **Auto-rotating 5-card expertise slideshow** cycling every 3 seconds:
     - 🧠 **GenAI / LLMs**: LangChain, LangGraph, Azure OpenAI, Prompt Engineering, ReAct loops.
     - 📦 **RAG Systems**: Vector databases (ChromaDB, Pinecone), Hybrid search, sub-7s latency.
     - 🗄️ **Data Engineering**: Azure Databricks, SQL Warehouse, DLT Pipelines, DuckDB, PostgreSQL.
     - 🔌 **Backend & APIs**: FastAPI, Pydantic, RESTful SSE, WSO2 IAM, Docker.
     - 📊 **Analytics & Tooling**: Power BI, custom DAX metrics, Text-to-SQL, Hugging Face.
   - Interactive dot indicators and automatic pause-on-hover.

3. **In-Depth Architectural Project Breakdowns**:
   - **Agentic Resume Analyzer**:
     - 3-node LangGraph stateful graph with conditional routing.
     - Multi-query RAG fused via Reciprocal Rank Fusion (RRF) over ChromaDB.
     - FastAPI backend with SSE streaming, Pydantic validation, and SHA-256 caching.
     - Local privacy-first inference via Ollama (Qwen 2.5 3B).
   - **Chess Analytics ETL Pipeline**:
     - End-to-end automated ingestion of 6.5M+ game records from Chess.com API via DLT.
     - Analytical storage in DuckDB & persistent MySQL.
     - Interactive Power BI dashboard with 10+ custom DAX performance measures.

4. **Zero-Cost High-Performance Cloud Architecture**:
   - **Frontend**: React 19 + Vite deployed to **Vercel** with global edge CDN, automatic HTTPS, and SPA rewrites.
   - **Backend**: Python 3.12 + FastAPI deployed as a free cloud web service on **Render**.
   - **Decoupled Architecture**: Fully separated frontend and backend communicating via CORS-enabled REST endpoints.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Role in Architecture |
|---|---|---|
| **Frontend Framework** | React 19 (Vite) | Lightning-fast client-side UI rendering with sub-second HMR. |
| **Styling & 3D Effects** | CSS Modules + Custom 3D CSS | Scoped styling, 3D perspective transforms (`rotateX`, `rotateY`), custom keyframe animations. |
| **Markdown Rendering** | `react-markdown` | Renders AI responses with formatted code blocks, bold text, and lists. |
| **Backend Framework** | FastAPI (Python 3.12) | High-performance asynchronous API framework handling REST and SSE streams. |
| **LLM Inference** | Groq Cloud SDK | Ultra-low latency model inference delivering token streaming. |
| **Data Validation** | Pydantic v2 | Strict schema validation for requests, responses, and candidate profiles. |
| **Resume Parser** | `pypdf` | Server-side PDF extraction for automated resume ingestion. |
| **Process Manager** | Uvicorn (ASGI) | Production ASGI web server running FastAPI. |
| **Hosting & CI/CD** | Vercel & Render | Git-integrated automated build and continuous deployment pipelines. |

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.12+) or `uv`
- Groq API Key ([console.groq.com](https://console.groq.com))

### 1. Clone Repository
```bash
git clone https://github.com/msaquib21/ai-portfolio.git
cd ai-portfolio
```

### 2. Backend Setup
```bash
# Navigate to project root or backend
cd backend

# Create virtual environment and install dependencies
pip install -r requirements.txt

# Create a .env file inside backend/
echo GROQ_API_KEY=your_actual_groq_key_here > .env

# Start FastAPI server with live reload
uvicorn main:app --reload --port 8000
```
*Backend runs locally at: `http://127.0.0.1:8000`*

### 3. Frontend Setup
```bash
# In a new terminal window, navigate to frontend
cd frontend

# Install packages
npm install

# Start Vite dev server
npm run dev
```
*Frontend runs locally at: `http://localhost:5173`*

---

## 🚢 Deployment Architecture

- **Backend (Render)**:
  - Root directory: `backend`
  - Build command: `pip install -r requirements.txt`
  - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
  - Environment variable: `GROQ_API_KEY`
- **Frontend (Vercel)**:
  - Root directory: `frontend`
  - Framework preset: `Vite`
  - Environment variable: `VITE_API_URL=https://saquib-portfolio-backend.onrender.com`

---

## 👤 Author

**Mohammad Saquib**  
- **Role**: Data & Application Engineer at Reliance Industries  
- **Email**: [m.saquib419@gmail.com](mailto:m.saquib419@gmail.com)  
- **GitHub**: [@msaquib21](https://github.com/msaquib21)  
- **LinkedIn**: [Mohammad Saquib](https://linkedin.com/in/msaquib21)  
