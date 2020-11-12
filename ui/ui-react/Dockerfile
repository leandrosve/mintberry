FROM node:14.13.1-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -s

COPY . ./

ARG HOST_URL
ENV REACT_APP_HOST_URL=${HOST_URL}

RUN npm run build

FROM nginx:1.17.0-alpine

COPY --from=build /app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3030

ENTRYPOINT ["nginx","-g","daemon off;"]