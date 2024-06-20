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

<<<<<<< HEAD
CMD ["npm", "start"]

=======
CMD ["npm", "start"]
>>>>>>> ba93741524d386cc698856281a452ad72cd9ea2f
