FROM node:18

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

# ---------- Serve frontend via backend ----------
# copy build into backend public folder
RUN mkdir -p /app/backend/public
RUN cp -r /app/frontend/build/* /app/backend/public/

# ---------- Final run ----------
WORKDIR /app/backend

EXPOSE 5000

CMD ["npm", "start"]