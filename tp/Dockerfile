FROM node:alpine AS builder

WORKDIR /app

COPY . .
RUN npm install
EXPOSE 4200

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/nginx.conf etc/nginx/conf.d/default.conf

