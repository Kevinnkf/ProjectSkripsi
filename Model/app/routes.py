from fastapi import APIRouter, HTTPException
from app.models import QueryRequest, QueryResponse
from app.rag import answer_query
from app.utils import logger

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
def query_endpoint(req: QueryRequest):
    try:
        answer = answer_query(req.query)
        return QueryResponse(answer=answer)
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
