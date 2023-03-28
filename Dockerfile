# In Cuba for download from uclv proxy
FROM docker.uclv.cu/node:18.15.0
# Out or with VPN
# FROM node:18.15.0

ARG BUILD_CONTEXT

LABEL maintainer="victor.98.javier@gmail.com"

RUN mkdir -p /home/app

WORKDIR /home/app
COPY package.json yarn.lock ./

RUN yarn install

COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

COPY .env /.

RUN yarn start


