FROM node:20-alpine

# install bash and ca-certs (for HTTPS)
RUN apk add --no-cache bash ca-certificates

WORKDIR /app

# copy package.json and lock file, install prod deps
COPY package*.json ./
RUN npm ci --production

# copy the wait-for-it script
# COPY wait-for-it.sh /usr/local/bin/
# RUN chmod +x /usr/local/bin/wait-for-it.sh

# copy source
COPY . .

# expose be port
ENV PORT=5000
EXPOSE 5000

# wait for the DB container to accept connections, then start
CMD ["node", "index.js"]
# CMD [ "sh", "-c", "/usr/local/bin/wait-for-it.sh db:5432 -- node index.js" ]

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
