from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as api_router
from app.processing_router import router as processing_router

app = FastAPI(title="RAG Retrieval API")

@app.get("/")
async def root():
    return {"message": "RAG service is alive"}

@app.get("/health")
async def health():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(api_router, prefix="/api")
app.include_router(processing_router)
