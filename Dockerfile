# FROM node:16.19.0-alpine3.17
FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "start"]
