# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10 as build-stage

MAINTAINER Vitalii Strimbanu
ARG environment=dev

WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/
RUN yarn install --frozen-lockfile

COPY ./ /app/
COPY ./ecs/.env.config-$environment /app/.env.local

RUN yarn build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /www/client

COPY --from=build-stage /app/ecs/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
