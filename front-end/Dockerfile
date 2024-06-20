# Étape 1: Build de l'application avec Node.js
FROM node:18.13-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG ENVIRONMENT

COPY . .

RUN npm run build:$ENVIRONMENT 

# Étape 2: Serveur Nginx pour servir l'application

FROM nginx:alpine

COPY --from=builder /app/dist/front-end /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 80
