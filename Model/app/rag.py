import os
os.environ["HF_HOME"] = os.getenv("HF_HOME", "/workspace/models")

# app/rag.py
import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig
)
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from app.config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME

# 4-bit quantization config 
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

# load Qwen2.5-3B with quantization 
tokenizer = AutoTokenizer.from_pretrained(
    "unsloth/Qwen2.5-3B",
    trust_remote_code=True
)
model = AutoModelForCausalLM.from_pretrained(
    "unsloth/Qwen2.5-3B",
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True
)

# embedding model & Qdrant client 
embed_model   = SentenceTransformer("intfloat/multilingual-e5-small")
qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# collection exists
existing = [c.name for c in qdrant_client.get_collections().collections]
if COLLECTION_NAME not in existing:
    qdrant_client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE)
    )

def retrieve_context(query: str, top_k: int = 3) -> str:
    query_vector = embed_model.encode([query])[0]
    hits = qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector.tolist(),
        limit=top_k,
    )
    return "\n".join(hit.payload.get("text", "") for hit in hits)

def generate_qwen_response(prompt: str) -> str:
    device = model.device            # uses the GPU if available
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    output = model.generate(
        **inputs,
        max_new_tokens=256,
        do_sample=False,
        num_beams=1,
        eos_token_id=tokenizer.eos_token_id,
        pad_token_id=tokenizer.eos_token_id
    )
    return tokenizer.decode(output[0], skip_special_tokens=True)

def build_prompt(context: str, question: str) -> str:
    return f"""Ini adalah chatbot layanan akademik Politeknik Negeri Jakarta. Berikan jawaban yang ringkas, akurat dan jelas dalam Bahasa Indonesia menggunakan informasi yang tersedia.

Konteks:
{context}

Pertanyaan: {question}

Jawaban harus:
- Hanya menggunakan informasi dari konteks
- Dalam Bahasa Indonesia
- Ringkas, Jelas dan mudah dimengerti
- Format paragraf profesional

Jawaban:"""

def answer_query(question: str) -> str:
    context = retrieve_context(question)
    prompt = build_prompt(context, question)
    full_response = generate_qwen_response(prompt)
    return full_response.split("Jawaban:")[-1].strip()

# import os
# import torch
# from transformers import AutoTokenizer, AutoModelForCausalLM
# from sentence_transformers import SentenceTransformer
# from qdrant_client import QdrantClient
# from qdrant_client.models import Distance, VectorParams

# from app.config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME

# # Load Qwen2.5-3B —
# device = "cuda" if torch.cuda.is_available() else "cpu"
# tokenizer = AutoTokenizer.from_pretrained(
#     "unsloth/Qwen2.5-3B",
#     trust_remote_code=True
# )
# model = AutoModelForCausalLM.from_pretrained(
#     "unsloth/Qwen2.5-3B",
#     trust_remote_code=True
# ).to(device)

# # Load your embedding model & Qdrant client —
# embed_model   = SentenceTransformer("intfloat/multilingual-e5-small")
# qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# # Ensure the collection exists
# existing = [c.name for c in qdrant_client.get_collections().collections]
# if COLLECTION_NAME not in existing:
#     qdrant_client.create_collection(
#         collection_name=COLLECTION_NAME,
#         vectors_config=VectorParams(size=384, distance=Distance.COSINE)
#     )

# def retrieve_context(query: str, top_k: int = 3) -> str:
#     query_vector = embed_model.encode([query])[0]
#     search_result = qdrant_client.search(
#         collection_name=COLLECTION_NAME,
#         query_vector=query_vector.tolist(),
#         limit=top_k,
#     )
#     return "\n".join(hit.payload.get("text", "") for hit in search_result)

# def generate_qwen_response(prompt: str) -> str:
#     device = "cuda" if torch.cuda.is_available() else "cpu"
#     inputs = tokenizer(prompt, return_tensors="pt").to(device)
#     output = model.generate(
#         **inputs, 
#         max_new_tokens=256,
#         do_sample=False,            # <- turn off sampling entirely
#         # temperature=0.1,            # <- no randomness
#         num_beams=1,                # 1 = pure greedy; >1 = beam search
#         # early_stopping=True,
#         eos_token_id=tokenizer.eos_token_id,
#         pad_token_id=tokenizer.eos_token_id
#         )
#     return tokenizer.decode(output[0], skip_special_tokens=True)

# def build_prompt(context: str, question: str) -> str:
#     return f"""Ini adalah chatbot layanan akademik Politeknik Negeri Jakarta. Berikan jawaban yang ringkas, akurat dan jelas dalam Bahasa Indonesia menggunakan informasi yang tersedia.

# Konteks:
# {context}

# Pertanyaan: {question}

# Jawaban harus:
# - Hanya menggunakan informasi dari konteks
# - Dalam Bahasa Indonesia
# - Ringkas, Jelas dan mudah dimengerti
# - Format paragraf profesional

# Jawaban:"""

# def answer_query(question: str) -> str:
#     context = retrieve_context(question)
#     prompt = build_prompt(context, question)
#     full_response = generate_qwen_response(prompt)
#     # Extract the generated answer after "Jawaban:"
#     answer = full_response.split("Jawaban:")[-1].strip()
#     return answer



# import torch
# from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig, pipeline
# from langchain.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain.llms import HuggingFacePipeline
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_qdrant import QdrantVectorStore
# from qdrant_client import QdrantClient

# from app.config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME

# # ── Config
# model_name = "unsloth/Qwen2.5-3B"
# embedding_model_name = "intfloat/multilingual-e5-large"

# # ── Prompt Template
# indonesian_template = """Ini adalah chatbot layanan akademik PNJ yang hanya boleh menjawab dalam Bahasa Indonesia.
# Gunakan informasi berikut sebagai konteks dan berikan jawaban yang ringkas, jelas, dan akurat.

# Konteks:
# {context}

# Pertanyaan:
# {question}

# Jawaban:"""
# prompt = PromptTemplate(template=indonesian_template, input_variables=["context", "question"])

# # ── Embedding + Vector DB
# embedding_model = HuggingFaceEmbeddings(model_name=embedding_model_name)
# qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
# vectorstore = QdrantVectorStore(client=qdrant_client, collection_name=COLLECTION_NAME, embedding=embedding_model)
# retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# # ── LLM Setup
# bnb_config = BitsAndBytesConfig(
#     load_in_4bit=True,
#     bnb_4bit_quant_type="nf4",
#     bnb_4bit_compute_dtype=torch.float16,
#     bnb_4bit_use_double_quant=True
# )
# model = AutoModelForCausalLM.from_pretrained(model_name, trust_remote_code=True, device_map="auto", quantization_config=bnb_config)
# tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
# pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, return_full_text=False, max_new_tokens=256)
# llm = HuggingFacePipeline(pipeline=pipe)

# # ── QA Chain
# qa_chain = RetrievalQA.from_chain_type(
#     llm=llm,
#     chain_type="stuff",
#     retriever=retriever,
#     return_source_documents=True,
#     chain_type_kwargs={"prompt": prompt}
# )

# FALLBACK = "Maaf pertanyaan Anda tidak ada di pencarian dokumen kami, silakan hubungi akademik@pnj.ac.id untuk pertanyaan lebih lanjut. Terima kasih."
# SIMILARITY_THRESHOLD = 0.8

# def answer_query(question: str) -> dict:
#     docs_with_scores = vectorstore.similarity_search_with_score(question, k=3)
#     if not any(score >= SIMILARITY_THRESHOLD for _, score in docs_with_scores):
#         return {"answer": FALLBACK, "source": None}

#     result = qa_chain.invoke({"query": question})
#     response = result['result'].strip()
#     if response.lower().startswith("ini adalah chatbot layanan akademik") or "Jawaban:" in response:
#         response = response.split("Jawaban:")[-1].strip()

#     source = result['source_documents'][0].metadata.get("source") if result['source_documents'] else None
#     return {"answer": response, "source": source}