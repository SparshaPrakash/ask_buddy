from langchain_community.llms import Ollama
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import TextLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
import os

# ======== Load Documents ========
DOC_PATH = "docs/sample.txt"
loader = TextLoader(DOC_PATH)
documents = loader.load()

# ======== Split into chunks ========
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(documents)

# ======== Create Embeddings ========
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# ======== Vector Store (Chroma) ========
vectordb = Chroma.from_documents(chunks, embedding=embeddings, persist_directory="./chroma_db")
vectordb.persist()

# ======== LLM ========
llm = Ollama(model="llama3")

# ======== Memory for Chat History ========
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# ======== Conversational RAG Chain ========
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=vectordb.as_retriever(),
    memory=memory,
    verbose=False  # change to True if you want debug logs
)

# ======== Function to answer questions ========
def answer_question(query: str) -> str:
    result = qa_chain({"question": query})
    return result["answer"]
