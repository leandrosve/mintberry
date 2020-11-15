FROM node:14.13.1-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_NAME=mintberry
ENV DB_TEST_HOST=db_test


ENTRYPOINT ["sh", "-C", "./wait-for.sh", "db:3306", "-t", "120", "--", "sh","./entrypoint.sh"]

EXPOSE 8080
