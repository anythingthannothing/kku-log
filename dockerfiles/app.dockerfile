FROM node:18.14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_PORT=8000

ENV PORT=${DEFAULT_PORT}

EXPOSE $PORT

CMD [ "npm", "run", "start" ]