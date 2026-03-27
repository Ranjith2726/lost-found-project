FROM node:20

WORKDIR /app

# ---------- Backend ----------
WORKDIR /app/backend
COPY lost-found-backend/package*.json ./
RUN npm install
COPY lost-found-backend .

# ---------- Frontend ----------
WORKDIR /app/frontend
COPY lost-found-frontend/package*.json ./
RUN npm install
COPY lost-found-frontend .

# install concurrently
RUN npm install -g concurrently

EXPOSE 3000

CMD concurrently ^
"cd /app/backend && node index.js" ^
"cd /app/frontend && npm run dev -- --host 0.0.0.0"