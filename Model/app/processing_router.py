from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi import Query
import fitz
import os
import re
from datetime import datetime
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
import pandas as pd
import pickle
import joblib
import httpx
import openpyxl
from pathlib import Path

from app.config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME

router = APIRouter()

VECTOR_DIM = 384
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

BASE = Path(__file__).parent  
vectorizer = joblib.load(BASE / 'tfidf_vectorizer.pkl')
model      = joblib.load(BASE / 'faq_classifier_model.pkl')

# vectorizer = joblib.load('./tfidf_vectorizer.pkl')
# model = joblib.load('./faq_classifier_model.pkl')

if not client.collection_exists(COLLECTION_NAME):
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE),
    )

embed_model = SentenceTransformer('intfloat/multilingual-e5-small')

# Load model once on startup
with open("faq_cluster_model.pkl", "rb") as f:
    model_data_cluster = pickle.load(f)

kmeans_model = model_data_cluster["kmeans"]
sentence_model = SentenceTransformer(model_data_cluster["sentence_model_name"])
faq_data = model_data_cluster["faq_data"]

def clean_text(text):
    chars_to_space = [
        '\u202a', '\u202b', '\u202c', '\u202d', '\u202e',
        '\u200e', '\u200f',
        '\u2066', '\u2067', '\u2068', '\u2069',
        '\u200b', '\ufeff',
    ]
    for char in chars_to_space:
        text = text.replace(char, ' ')
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' {2,}', ' ', text)
    return text.strip()

# Extract from excel
def extract_text_from_excel():
    wb = openpyxl.load_workbook()
    sheet = wb.active

    for sheet in wb:
        print (sheet.title)
    
    for row in sheet.itter_rows(values_only=True):
        print(row)

def extract_pdf_creation_date(doc):
    meta = doc.metadata
    if meta and "creationDate" in meta and meta["creationDate"]:
        raw_date = meta["creationDate"]
        if raw_date.startswith("D:"):
            raw_date = raw_date[2:]
        try:
            return f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:8]}"
        except Exception:
            return ""
    return ""

def extract_text_from_pdf_bytes(file_bytes):
    doc = fitz.open(stream=file_bytes.read(), filetype="pdf")
    texts = []
    for page in doc:
        page_text = page.get_text("text")
        page_text = clean_text(page_text)
        texts.append(page_text)
    full_text = "\n".join(texts)
    return full_text.strip(), doc

def split_text(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", ".", " ", ""]
    )
    return splitter.split_text(text)

def embed_texts(texts):
    formatted = [f"passage: {t}" for t in texts]
    return embed_model.encode(formatted, show_progress_bar=False)

def upload_chunks(chunks, pdf_filename, creation_date, doc, start_id):
    vectors = embed_texts(chunks)
    points = []
    for idx, (chunk, vec) in enumerate(zip(chunks, vectors)):
        global_id = start_id + idx
        first_line = next((line.strip() for line in chunk.split("\n") if line.strip()), "")
        page_number = 1
        for page_idx in range(len(doc)):
            if first_line in clean_text(doc[page_idx].get_text("text")):
                page_number = page_idx + 1
                break
        chunk_title = first_line

        points.append({
            "id": global_id,
            "vector": vec.tolist(),
            "payload": {
                "text": chunk,
                "filename": pdf_filename,
                "page": page_number,
                "title": chunk_title,
                "date": creation_date,
            }
        })
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )
    return len(points)

@router.post("/upload-bk/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        start_id = int(datetime.now().timestamp() * 1000)
        pdf_filename = file.filename
        text, doc = extract_text_from_pdf_bytes(file.file)
        creation_date = extract_pdf_creation_date(doc)
        chunks = split_text(text)
        num_uploaded = upload_chunks(chunks, pdf_filename, creation_date, doc, start_id)
        return JSONResponse(status_code=200, content={
            "message": "Upload success",
            "filename": pdf_filename,
            "total_chunks": num_uploaded,
            "creation_date": creation_date
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": "Upload failed",
            "error": str(e)
        })

@router.get("/get-data")
async def get_data(page: int = Query(1, ge=1), limit: int = Query(5, ge=1)):
    try:
        offset = (page - 1) * limit

        response = client.scroll(
            collection_name=COLLECTION_NAME,
            offset=offset,
            limit=limit
        )

        points = [r.dict() if hasattr(r, 'dict') else r for r in response[0]]

        return JSONResponse(status_code=200, content={
            "message": "Success fetching data",
            "data": points,
            "page": page,
            "limit": limit,
            "has_more": len(points) == limit  # for frontend to know if there's more
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": "Failed fetching data",
            "error": str(e)
        })
    
@router.post("/predict")
async def predict_from_chat_messages():
    try:
        BACKEND_URL = os.getenv("BACKEND_URL", "https://be-service-production.up.railway.app")
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{BACKEND_URL}/api/chats")
            chat_data = response.json()

        questions = [chat["user_message"] for chat in chat_data if "user_message" in chat]

        if not questions:
            return JSONResponse(status_code=400, content={"error": "No user messages found"})

        # Embed user questions
        embeddings = sentence_model.encode(questions)

        # Predict clusters
        cluster_predictions = kmeans_model.predict(embeddings)

        # Match predictions to FAQ data
        results = []
        for q, cluster_id in zip(questions, cluster_predictions):
            faq = next((item for item in faq_data if item["Cluster"] == cluster_id), None)
            if faq:
                results.append({
                    "question": q,
                    "matched_faq_question": faq["Question"],
                    "answer": faq["Answer"],
                    "frequency": faq["Frequency"],
                    "related_questions": faq["Related Questions"]
                })

        return JSONResponse(content={"results": results})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# @router.post("/predict")
# async def predict_from_chat_messages():
#     try:
#         BACKEND_URL = os.getenv("BACKEND_URL", "https://be-service-production.up.railway.app")

#         async with httpx.AsyncClient() as client:
#             response = await client.get(f"{BACKEND_URL}/api/chats")
#             chat_data = response.json()

#         questions = [chat["user_message"] for chat in chat_data if "user_message" in chat]

#         if not questions:
#             return JSONResponse(status_code=400, content={"error": "No user messages found"})

#         vec_questions = vectorizer.transform(questions)
#         predictions = model.predict(vec_questions)

#         return JSONResponse(content={
#             "questions": questions,
#             "predicted_categories": predictions.tolist()
#         })

#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})


# from fastapi import APIRouter, UploadFile, File
# from fastapi.responses import JSONResponse
# import fitz
# import os
# import re
# import tempfile
# from datetime import datetime
# from langchain.document_loaders import PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_qdrant import QdrantVectorStore
# from langchain_huggingface import HuggingFaceEmbeddings
# import httpx
# import joblib
# from app.config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME

# router = APIRouter()

# VECTOR_DIM = 1024
# CHUNK_SIZE = 1000
# CHUNK_OVERLAP = 200

# embed_model = HuggingFaceEmbeddings(model_name="intfloat/multilingual-e5-large")

# vectordb = QdrantVectorStore(
#     url=QDRANT_URL,
#     api_key=QDRANT_API_KEY,
#     collection_name=COLLECTION_NAME,
#     embedding=embed_model,
# )

# vectorizer = joblib.load('tfidf_vectorizer.pkl')
# model = joblib.load('faq_classifier_model.pkl')

# def clean_text(text):
#     chars_to_space = [
#         '\u202a', '\u202b', '\u202c', '\u202d', '\u202e',
#         '\u200e', '\u200f', '\u2066', '\u2067', '\u2068', '\u2069',
#         '\u200b', '\ufeff'
#     ]
#     for char in chars_to_space:
#         text = text.replace(char, ' ')
#     text = re.sub(r'[ \t]+', ' ', text)
#     text = re.sub(r'\n{3,}', '\n\n', text)
#     text = re.sub(r' {2,}', ' ', text)
#     return text.strip()

# def extract_pdf_creation_date(doc):
#     meta = doc.metadata
#     raw_date = meta.get("creationDate") or ""
#     if raw_date.startswith("D:"):
#         raw_date = raw_date[2:]
#     try:
#         return f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:8]}"
#     except Exception:
#         return ""

# @router.post("/upload-bk/")
# async def upload_pdf(file: UploadFile = File(...)):
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#             tmp.write(await file.read())
#             pdf_path = tmp.name

#         loader = PyPDFLoader(pdf_path)
#         documents = loader.load()

#         doc_fitz = fitz.open(pdf_path)
#         creation_date = extract_pdf_creation_date(doc_fitz)

#         splitter = RecursiveCharacterTextSplitter(
#             chunk_size=CHUNK_SIZE,
#             chunk_overlap=CHUNK_OVERLAP,
#             separators=["\n\n", "\n", ".", " ", ""]
#         )
#         chunks = splitter.split_documents(documents)

#         for chunk in chunks:
#             chunk.metadata.update({
#                 "creation_date": creation_date,
#                 "total_pages": len(doc_fitz)
#             })

#         vectordb.add_documents(documents=chunks)

#         return JSONResponse(status_code=200, content={
#             "message": "Upload success",
#             "filename": file.filename,
#             "total_chunks": len(chunks),
#             "metadata_summary": chunks[0].metadata if chunks else {}
#         })
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"message": "Upload failed", "error": str(e)})

# @router.get("/get-data")
# async def get_data():
#     try:
#         docs = vectordb.similarity_search("dummy", k=5)
#         result = [
#             {
#                 "content": doc.page_content,
#                 "source": doc.metadata.get("source"),
#                 "title": doc.metadata.get("title"),
#                 "page": doc.metadata.get("page"),
#                 "total_pages": doc.metadata.get("total_pages")
#             }
#             for doc in docs
#         ]
#         return JSONResponse(status_code=200, content={"message": "Success fetching data", "data": result})
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"message": "Failed fetching data", "error": str(e)})

# @router.post("/predict")
# async def predict_from_chat_messages():
#     try:
#         BACKEND_URL = os.getenv("BACKEND_URL", "https://be-service-production.up.railway.app")

#         async with httpx.AsyncClient() as client:
#             response = await client.get(f"{BACKEND_URL}/api/chats")
#             chat_data = response.json()

#         questions = [chat["user_message"] for chat in chat_data if "user_message" in chat]
#         if not questions:
#             return JSONResponse(status_code=400, content={"error": "No user messages found"})

#         vec_questions = vectorizer.transform(questions)
#         predictions = model.predict(vec_questions)

#         return JSONResponse(content={
#             "questions": questions,
#             "predicted_categories": predictions.tolist()
#         })
#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})
