### Stage: 1 ###
ARG ANGULAR_ENV=prod
FROM node:22 AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

# https://benkyriakou.com/posts/docker-args-empty
ARG ANGULAR_ENV
RUN echo "Building Angular configuration: $ANGULAR_ENV"

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:ssr:$ANGULAR_ENV

### Stage: 2 ###
FROM node:22
WORKDIR /app
COPY --from=builder /app/package.json /app
COPY --from=builder /app/dist /app/dist

EXPOSE 8080

CMD ["node", "/app/dist/chalender-frontend/server/server.mjs"]
