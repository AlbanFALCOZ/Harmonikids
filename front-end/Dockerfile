# Étape 1: Build de l'application avec Node.js
FROM node:18.13-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Étape 2: Serveur Nginx pour servir l'application

FROM nginx:alpine

COPY --from=builder /app/dist/front-end /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]