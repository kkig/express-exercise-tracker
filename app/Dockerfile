# syntax=docker/dockerfile:1

FROM node:18-alpine as base

WORKDIR /app

COPY package*.json /app

FROM base as prod
RUN npm ci --production

COPY . /app
CMD ["node", "src/server.js"]

EXPOSE 3000
