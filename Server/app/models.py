from pydantic import BaseModel
# from typing import List, Dict
# from datetime import datetime
# from sqlmodel import SQLModel, Field

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    # source_docs: List[Dict]
