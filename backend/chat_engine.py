from langchain_community.llms import Ollama
from langchain_community.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
import os

# Load a local text file (you can change this later to load multiple or from PDF)
DOC_PATH = "docs/sample.txt"

# Load the document
loader = TextLoader(DOC_PATH)
documents = loader.load()

# Split the document into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(documents)

# Create embeddings using a HuggingFace model
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Create vector store using Chroma (stored in ./chroma_db folder)
vectordb = Chroma.from_documents(chunks, embedding=embeddings, persist_directory="./chroma_db")
vectordb.persist()  # Optional: persist to disk

# Load the LLM from Ollama
llm = Ollama(model="llama3")

# Create RetrievalQA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectordb.as_retriever()
)

# Function to answer questions
def answer_question(query: str) -> str:
    return qa_chain.run(query)
