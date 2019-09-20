FROM node:11.15.0
WORKDIR /usr/app

COPY package*.json ./

RUN npm install




