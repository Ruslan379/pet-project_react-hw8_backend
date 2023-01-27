FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD ["cross-env", "NODE_ENV=development", "nodemon", "./server.js"]
