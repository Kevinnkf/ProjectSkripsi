from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import fitz
import os
import re
from datetime import datetime
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
import pandas as pd
import openpyxl

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# config
COLLECTION_NAME = "rag-academics-collection-small"
QDRANT_URL      = "https://48b49ac1-8387-42bb-b0d7-10587d2aa625.eu-west-1-0.aws.cloud.qdrant.io"
QDRANT_API_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.1ugiYzO7TerHdVXROwWBNgIMkv3zMymBGeMrKXVvm68"
VECTOR_DIM      = 384
CHUNK_SIZE      = 1000
CHUNK_OVERLAP   = 200

client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

if not client.collection_exists(COLLECTION_NAME):
    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE),
    )

embed_model = SentenceTransformer('intfloat/multilingual-e5-small')  # or 'e5-large'

# unicode and formatting cleaner
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

# extract creation date from PDF
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

# extract text from PDF bytes
def extract_text_from_pdf_bytes(file_bytes):
    doc = fitz.open(stream=file_bytes.read(), filetype="pdf")
    texts = []
    for page in doc:
        page_text = page.get_text("text")
        page_text = clean_text(page_text)
        texts.append(page_text)
    full_text = "\n".join(texts)
    return full_text.strip(), doc

# split text into chunks
def split_text(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", ".", " ", ""]
    )
    return splitter.split_text(text)

# embed text
def embed_texts(texts):
    formatted = [f"passage: {t}" for t in texts]
    return embed_model.encode(formatted, show_progress_bar=False)

# upload per chunk
def upload_chunks(chunks, pdf_filename, creation_date, doc, start_id):
    vectors = embed_texts(chunks)
    points = []
    for idx, (chunk, vec) in enumerate(zip(chunks, vectors)):
        global_id = start_id + idx
        first_line = next((line.strip() for line in chunk.split("\n") if line.strip()), "")
        # page number
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

# 📌 POST API endpoint
@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # timestamp-based starting ID
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

@app.get("/get-data/")
async def get_data():
    try:
        response = client.scroll(
            collection_name=COLLECTION_NAME,
            limit=5
        )
        return JSONResponse(status_code=200, content={
            "message": "Success fetching data",
            "data": response[0]
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": "Failed fetching data",
            "error": str(e)
        })
