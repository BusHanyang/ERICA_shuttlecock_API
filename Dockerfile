FROM node:dubnium-alpine

WORKDIR /usr/src/shuttle_API
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
EXPOSE 443

CMD ["node", "index.js"]