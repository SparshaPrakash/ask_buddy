from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chat_engine import answer_question
from chat_engine import reset_memory

app = FastAPI()

# CORS setup to allow any frontend origin (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (safe for dev only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model for /chat
class ChatRequest(BaseModel):
    question: str

# POST endpoint that receives structured JSON input
@app.post("/chat")
async def chat(request: ChatRequest):
    answer = answer_question(request.question)
    return {"answer": answer}

@app.post("/reset")
async def reset():
    reset_memory()
    return {"status": "chat history cleared"}
