FROM node:19-alpine3.16

RUN mkdir -p /code/front

WORKDIR /code/front

COPY .  .

WORKDIR /code/front/app

RUN npm install

EXPOSE 3000

