# syntax=docker/dockerfile:1
   
FROM public.ecr.aws/docker/library/node:20-alpine

WORKDIR /app

# Set AWS CodeArtifact auth token as env arg from build arg
ARG UTK_CODEARTIFACT_AUTH_TOKEN
ENV UTK_CODEARTIFACT_AUTH_TOKEN=$UTK_CODEARTIFACT_AUTH_TOKEN

# Copy root level files
COPY package.json yarn.lock tsconfig.json .yarnrc.yml .
COPY .yarn .yarn/

# Copy api and shared package files for install
COPY packages/api/package.json ./packages/api/
COPY packages/shared/package.json ./packages/shared/

# Enable corepack/yarn 2
RUN corepack enable && yarn set version berry

# Copy api and shared source files
COPY packages/api ./packages/api
COPY packages/shared ./packages/shared

RUN yarn install

RUN yarn api build

CMD ["yarn", "api", "start"]