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
RUN npm run build

# ---------- Move frontend build into backend ----------
RUN mkdir -p /app/backend/public
RUN cp -r /app/frontend/build/* /app/backend/public/

# ---------- Run backend ----------
WORKDIR /app/backend

EXPOSE 5000

CMD ["npm", "start"]