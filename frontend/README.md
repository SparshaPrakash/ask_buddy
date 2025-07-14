# 🤖 AskBuddy

AskBuddy is a local, privacy-friendly AI chatbot powered by open-source LLMs like LLaMA3 via Ollama, and orchestrated through LangChain and FastAPI. This app allows users to ask questions from a given knowledge base (RAG) and get contextual answers — all running completely offline.

## 🛠 Tech Stack

| Layer       | Tools Used                                 |
|-------------|---------------------------------------------|
| Frontend    | React (Vite), TailwindCSS                   |
| Backend     | FastAPI, LangChain                          |
| LLM         | Ollama (e.g., LLaMA3, Mistral, etc.)        |
| Vector DB   | ChromaDB                                    |
| Embeddings  | HuggingFace (`all-MiniLM-L6-v2`)            |

---

## ✅ Features (Implemented So Far)
- AskBuddy React UI with stylish dark mode
- `/chat` API endpoint using FastAPI
- LangChain-based RAG pipeline
- Local LLM integration using Ollama (`llama3`)
- CORS support for frontend/backend interaction
- Swagger UI for backend testing

---

## 🚧 Planned Features
- 📂 **Custom PDF/CSV/Text file upload** (injecting your own context)
- 💾 **Chat history** storage using SQLite/PostgreSQL
- 📱 **Mobile app support** (via React Native or Flutter)
- 🧠 **Multiple model support**: Mistral, Phi, Code LLaMA, etc.
- 📦 **Dockerized deployment**
- 🔍 **Semantic search**
- 🔒 **Authentication (JWT or OAuth2)**

---

## 🚀 Getting Started

### Start Ollama
```bash
ollama run llama3
Run Backend (FastAPI)
bash
Copy
Edit
cd backend
uvicorn main:app --reload
Run Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm run dev