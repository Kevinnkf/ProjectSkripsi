FROM python:3.10-slim

WORKDIR /app/app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set Hugging Face cache dir
ENV HF_HOME=/workspace/models

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files (assumes you run docker build from Model/)
COPY . .

# Healthcheck
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Expose FastAPI port
EXPOSE 8000

# Launch FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


# FROM python:3.11-slim

# WORKDIR /app

# # 1) Install Python deps
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # 2) Install debugging & healthcheck tools
# RUN apt-get update && \
#     apt-get install -y --no-install-recommends procps curl && \
#     rm -rf /var/lib/apt/lists/*

# # 3) Copy app code
# COPY . .

# EXPOSE 8000

# # 4) Healthcheck: must pass /health
# HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
#   CMD curl -f http://localhost:8000/health || exit 1

# # 5) Start Uvicorn immediately (no blocking imports)
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
