from fastapi import APIRouter, HTTPException, UploadFile, File, Query
from fastapi.responses import JSONResponse
import fitz
import os
import re
from datetime import datetime
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
from qdrant_client.http.models import Filter, FieldCondition, MatchValue
import pandas as pd
import hdbscan
import umap
from collections import Counter, defaultdict
from sklearn.metrics import silhouette_score, davies_bouldin_score
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import pickle
import httpx
import openpyxl
from pathlib import Path

from app.config import QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME

router = APIRouter()

VECTOR_DIM = 1024
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

BASE = Path(__file__).parent

# --- Initialize models globally
# sentence_model = None
# umap_model = None
# hdbscan_model = None
# kmeans_model = None
# faq_data = None

# try:
#     model_data_cluster = joblib.load(BASE / 'faq_cluster_model.pkl')
#     umap_model = joblib.load(BASE / 'umap_model.pkl')
#     hdbscan_model = joblib.load(BASE / 'hdbscan_model.pkl')
#     sentence_model = SentenceTransformer(model_data_cluster["sentence_model_name"])
#     kmeans_model = model_data_cluster["kmeans"]
#     faq_data = model_data_cluster["faq_data"]
#     print("✅ Models loaded successfully.")
# except Exception as e:
#     print("❌ Model loading error:", str(e))

try:
    sentence_model = SentenceTransformer("all-MiniLM-L6-v2")
    embed_model = SentenceTransformer("intfloat/multilingual-e5-large")
    umap_model = joblib.load(BASE / 'umap_model.pkl')
    hdbscan_model = joblib.load(BASE / 'hdbscan_model.pkl')

    if hasattr(hdbscan_model, 'prediction_data_') and hdbscan_model.prediction_data_ is not None:
        print("✅ prediction_data_ is present in hdbscan_model")
    else:
        print("⚠️ prediction_data_ not available in hdbscan_model")

except Exception as e:
    import traceback
    print("❌ Error during model initialization:", str(e))
    traceback.print_exc()

if not client.collection_exists(COLLECTION_NAME):
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE),
    )

# Load model once on startup
# with open("faq_cluster_model.pkl", "rb") as f:
#     model_data_cluster = pickle.load(f)

# kmeans_model = model_data_cluster["kmeans"]
# sentence_model = SentenceTransformer(model_data_cluster["sentence_model_name"])
# faq_data = model_data_cluster["faq_data"]

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
    
    for row in sheet.iter_rows(values_only=True):
        print(row)

# def extract_pdf_creation_date(doc):
#     meta = doc.metadata
#     if meta and "creationDate" in meta and meta["creationDate"]:
#         raw_date = meta["creationDate"]
#         if raw_date.startswith("D:"):
#             raw_date = raw_date[2:]
#         try:
#             return f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:8]}"
#         except Exception:
#             return ""
#     return ""

def extract_pdf_creation_date(doc):
    """
    Extract and parse the creation date from PDF metadata.
    Handles multiple PDF date formats including:
    - D:YYYYMMDDHHmmSSOHH'mm'
    - D:YYYYMMDDHHmmSSZ
    - YYYY-MM-DD
    - Unix timestamps
    - Returns empty string if date cannot be parsed
    """
    try:
        meta = doc.metadata
        if not meta or "creationDate" not in meta or not meta["creationDate"]:
            return ""

        raw_date = meta["creationDate"]
        
        # Handle PDF format like "D:YYYYMMDDHHmmSSOHH'mm'"
        if raw_date.startswith("D:"):
            raw_date = raw_date[2:]  # Remove "D:" prefix
            
            # Basic format: YYYYMMDD
            if len(raw_date) >= 8:
                year = raw_date[:4]
                month = raw_date[4:6] if len(raw_date) >= 6 else "01"
                day = raw_date[6:8] if len(raw_date) >= 8 else "01"
                
                # Validate date components
                if (year.isdigit() and month.isdigit() and day.isdigit() and
                    int(month) <= 12 and int(day) <= 31):
                    return f"{year}-{month}-{day}"
        
        # Handle ISO format (YYYY-MM-DD)
        iso_match = re.match(r"(\d{4})-(\d{2})-(\d{2})", raw_date)
        if iso_match:
            year, month, day = iso_match.groups()
            if int(month) <= 12 and int(day) <= 31:
                return f"{year}-{month}-{day}"
        
        # Handle Unix timestamp
        if raw_date.isdigit():
            try:
                dt = datetime.fromtimestamp(int(raw_date))
                return dt.strftime("%Y-%m-%d")
            except (ValueError, OSError):
                pass
        
        # Try to parse with dateutil if available
        try:
            from dateutil.parser import parse
            dt = parse(raw_date, fuzzy=True)
            return dt.strftime("%Y-%m-%d")
        except (ImportError, ValueError, TypeError):
            pass
        
    except Exception as e:
        # Log the error if you have logging configured
        # logger.warning(f"Failed to parse PDF date: {e}")
        pass
    
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

        # Fetch paginated data
        response = client.scroll(
            collection_name=COLLECTION_NAME,
            offset=offset,
            limit=limit
        )
        points = [r.dict() if hasattr(r, 'dict') else r for r in response[0]]

        # Count total points in the collection
        count_response = client.count(
            collection_name=COLLECTION_NAME,
            exact=True,
            count_filter=Filter(must=[])
        )
        total = count_response.count

        return JSONResponse(status_code=200, content={
            "message": "Success fetching data",
            "data": points,
            "page": page,
            "limit": limit,
            "has_more": len(points) == limit,
            "total": total 
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": "Failed fetching data",
            "error": str(e)
        })
    
@router.get("/search-file")
async def search_by_filename(filename: str = Query(...)):
    try:
        # Fetch all or a lot of points
        response = client.scroll(
            collection_name=COLLECTION_NAME,
            limit=1000
        )

        # Filter manually
        filtered = [
            p.dict() if hasattr(p, 'dict') else p
            for p in response[0]
            if filename.lower() in p.payload.get("filename", "").lower()
        ]

        return JSONResponse(status_code=200, content={
            "message": "Success filtering by filename",
            "data": filtered
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": "Failed filtering data",
            "error": str(e)
        })

@router.post("/predict")
async def predict_from_chat_messages():
    try:
        # Fetch chat data
        async with httpx.AsyncClient(timeout=30.0) as http_client:
            response = await http_client.get("https://be-service-production.up.railway.app/api/chats")
            response.raise_for_status()

        chat_data = response.json()

        # Extract questions and answers
        questions = [chat["user_message"] for chat in chat_data if "user_message" in chat]
        answers = [chat["bot_response"] for chat in chat_data if "bot_response" in chat]

        if not questions or not answers or len(questions) != len(answers):
            raise HTTPException(status_code=400, detail="Invalid or empty question/answer data")

        print(f"Found {len(questions)} valid question-answer pairs.")

        # Generate embeddings
        embeddings = sentence_model.encode(questions, convert_to_numpy=True)

        # UMAP dimensionality reduction
        reducer = umap.UMAP(
            n_neighbors=5,
            n_components=15,
            metric='cosine',
            min_dist=0.0,
            random_state=42
        )
        reduced_embeddings = reducer.fit_transform(embeddings)

        # HDBSCAN clustering
        clusterer = hdbscan.HDBSCAN(min_cluster_size=3, metric='euclidean')
        cluster_labels = clusterer.fit_predict(reduced_embeddings)

        # Build FAQ-style grouped output
        cluster_data = defaultdict(list)
        for q, a, label in zip(questions, answers, cluster_labels):
            if label != -1:  # Ignore noise
                cluster_data[label].append((q, a))

        faq_data = []
        for cluster_id, qa_list in cluster_data.items():
            main_q, main_a = qa_list[0]
            related_qs = [q for q, _ in qa_list[1:]]
            faq_data.append({
                "Cluster": int(cluster_id),
                "Frequency": int(len(qa_list)),
                "Question": main_q,
                "Answer": main_a,
                "Related Questions": related_qs
            })

        # Preview output in desired format (printed to terminal/log)
        for faq in faq_data:
            print(f"\nCluster {faq['Cluster']} (Frequency: {faq['Frequency']})")
            print(f"Q: {faq['Question']}")
            print(f"A: {faq['Answer']}")
            if faq["Related Questions"]:
                print("Related Questions:")
                for rq in faq["Related Questions"]:
                    print(f" - {rq}")
            print("-" * 80)

        return {
            "total_questions": len(questions),
            "clusters_found": len(faq_data),
            "results": faq_data
        }

    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Chat service unavailable: {str(e)}")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")



# @router.post("/predict")
# async def predict_from_chat_messages():
#     try:
#         async with httpx.AsyncClient() as client:
#             # response = await client.get("http://localhost:5000/api/chats")
#             response = await client.get("https://be-service-production.up.railway.app/api/chats")
#             if response.status_code != 200:
#                 raise HTTPException(status_code=response.status_code, detail="Failed to fetch chat data")
#             chat_data = response.json()

#         questions = [chat["user_message"] for chat in chat_data if "user_message" in chat]

#         if not questions:
#             return JSONResponse(status_code=400, content={"error": "No user messages found"})

#         # ✅ Debug logs
#         print("sentence_model:", sentence_model)
#         print("umap_model:", umap_model)
#         print("hdbscan_model:", hdbscan_model)

#         if not all([sentence_model, umap_model, hdbscan_model]):
#             raise HTTPException(status_code=500, detail="Models not properly initialized")
        
#         # Encode user questions
#         embeddings = sentence_model.encode(questions)

#         # UMAP transform
#         reduced_embeddings = umap_model.transform(embeddings)

#         # HDBSCAN prediction
#         cluster_labels, _ = hdbscan.approximate_predict(hdbscan_model, reduced_embeddings)

#         results = []
#         for question, cluster in zip(questions, cluster_labels):
#             results.append({
#                 "question": question,
#                 "cluster_id": int(cluster)
#             })

#         return JSONResponse(content={"results": results})

#     except Exception as e:
#         print("Predict error:", str(e))
#         return JSONResponse(status_code=500, content={"error": str(e)})
    
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

#         # Embed user questions
#         embeddings = sentence_model.encode(questions)

#         # Predict clusters
#         cluster_predictions = kmeans_model.predict(embeddings)

#         # Match predictions to FAQ data
#         results = []
#         for q, cluster_id in zip(questions, cluster_predictions):
#             faq = next((item for item in faq_data if item["Cluster"] == cluster_id), None)
#             if faq:
#                 results.append({
#                     "question": q,
#                     "matched_faq_question": faq["Question"],
#                     "answer": faq["Answer"],
#                     "frequency": faq["Frequency"],
#                     "related_questions": faq["Related Questions"]
#                 })

#         return JSONResponse(content={"results": results})

#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

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
