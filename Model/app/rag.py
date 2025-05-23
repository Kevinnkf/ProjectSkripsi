import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from app.config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME

# Load Qwen2.5-3B —
device = "cuda" if torch.cuda.is_available() else "cpu"
tokenizer = AutoTokenizer.from_pretrained(
    "unsloth/Qwen2.5-3B",
    trust_remote_code=True
)
model = AutoModelForCausalLM.from_pretrained(
    "unsloth/Qwen2.5-3B",
    trust_remote_code=True
).to(device)

# Load your embedding model & Qdrant client —
embed_model   = SentenceTransformer("intfloat/multilingual-e5-large")
qdrant_client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# Ensure the collection exists
existing = [c.name for c in qdrant_client.get_collections().collections]
if COLLECTION_NAME not in existing:
    qdrant_client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=1024, distance=Distance.COSINE)
    )

def retrieve_context(query: str, top_k: int = 3) -> str:
    query_vector = embed_model.encode([query])[0]
    search_result = qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector.tolist(),
        limit=top_k,
    )
    return "\n".join(hit.payload.get("text", "") for hit in search_result)

def generate_qwen_response(prompt: str) -> str:
    device = "cuda" if torch.cuda.is_available() else "cpu"
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    output = model.generate(
        **inputs, 
        max_new_tokens=256,
        do_sample=False,            # <- turn off sampling entirely
        # temperature=0.1,            # <- no randomness
        num_beams=1,                # 1 = pure greedy; >1 = beam search
        # early_stopping=True,
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
    # Extract the generated answer after "Jawaban:"
    answer = full_response.split("Jawaban:")[-1].strip()
    return answer