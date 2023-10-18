### Stage: 1 ###
ARG ANGULAR_ENV=prod
FROM node:18 as node
# https://benkyriakou.com/posts/docker-args-empty
ARG ANGULAR_ENV
RUN echo "Building Angular configuration: $ANGULAR_ENV"

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:ssr -c $ANGULAR_ENV

### Stage: 2 ###
FROM node:20-alpine3.17
WORKDIR /app
COPY --from=node /app/package.json /app
COPY --from=node /app/dist /app/dist

EXPOSE 8080

CMD ["npm", "run", "serve:ssr"]
