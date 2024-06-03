# syntax=docker/dockerfile:1
   
FROM node:20 as builder

WORKDIR /app

# Copy root level files
COPY package.json yarn.lock tsconfig.json .yarnrc.yml .
COPY .yarn .yarn/
COPY bin/set-artifact-token.sh ./bin/set-artifact-token.sh

# Copy api and shared package files for install
COPY packages/api/package.json ./packages/api/
COPY packages/shared/package.json ./packages/shared/

# Enable corepack
RUN ./bin/set-artifact-token.sh && corepack enable && yarn set version berry

# Copy api and shared source files
COPY packages/api ./packages/api
COPY packages/shared ./packages/shared

# Install dependencies for entire monorepo
RUN ./bin/set-artifact-token.sh && \
    yarn install

RUN yarn api build

CMD ["yarn", "api", "start"]