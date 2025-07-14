# 🤖 AskBuddy

AskBuddy is a **local LLM-powered chatbot** built with **FastAPI**, **LangChain**, **Ollama**, and **React**. It supports document-based question answering using **RAG (Retrieval-Augmented Generation)** and runs entirely on your machine—no paid APIs needed!

---

## 🚀 Features

- 🔒 Secure FastAPI backend
- 🤝 CORS-enabled API for frontend-backend communication
- 🧠 LangChain-powered RAG using local documents
- 📚 Embeddings with HuggingFace (`all-MiniLM-L6-v2`)
- 🗂️ Vector store with ChromaDB (persisted locally)
- 💬 Local LLM responses via Ollama (supports LLaMA 3)
- 🖥️ React frontend interface

---

## 🧱 Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | React (Vite), Axios |
| Backend    | FastAPI, Pydantic |
| Embeddings | HuggingFace, Sentence-Transformers |
| Vector DB  | Chroma |
| LLM        | Ollama + LLaMA 3 |
| Infra      | Python 3.11, Node.js, Git |
