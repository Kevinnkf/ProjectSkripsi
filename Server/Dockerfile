# Server/Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package manifests and install deps
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Expose and run
EXPOSE 5000
CMD ["node", "index.js"]

# FROM node:20-alpine

# # working directory
# WORKDIR /app

# # install dependencies
# COPY package*.json ./
# RUN npm ci --production

# # copy rest of the code
# COPY . .

# # expose backend port
# EXPOSE 3000

# # run server
# CMD ["node", "index.js"]
