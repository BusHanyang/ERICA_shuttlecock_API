FROM node:dubnium-alpine

WORKDIR /usr/src/shuttle_API
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000
# EXPOSE 443

CMD ["node", "index.js"]