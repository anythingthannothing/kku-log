FROM nginx:1.23.3-alpine

WORKDIR /etc/nginx

COPY nginx.conf .

WORKDIR /public

COPY src/public .