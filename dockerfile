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

# Render uses ONE port → we use 3000
EXPOSE 3000

# run both
CMD sh -c "cd /app/backend && node server.js & cd /app/frontend && npm start -- --host 0.0.0.0 --port 3000"