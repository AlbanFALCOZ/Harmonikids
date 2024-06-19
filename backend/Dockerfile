FROM node:16.20-alpine3.17 AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


FROM node:16.20-alpine3.17

WORKDIR /app

COPY --from=build-stage /app /app
COPY --from=build-stage /app/node_modules /app/node_modules

EXPOSE 9428

CMD ["npm", "run", "dev"]


