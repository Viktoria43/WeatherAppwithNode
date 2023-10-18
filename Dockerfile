FROM node:20-alpine3.17

WORKDIR /usr/src/app
COPY package*.json ./



COPY public ./public
COPY views ./views
COPY index.js ./index.js

EXPOSE 4000

RUN npm install


CMD [ "node" , "index.js" ]