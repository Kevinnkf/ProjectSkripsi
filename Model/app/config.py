import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

QDRANT_URL      = os.getenv("QDRANT_URL")
QDRANT_API_KEY  = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "rag-academics-collection-large")

BACKEND_URL = os.getenv("BACKEND_URL")
