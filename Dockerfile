# ---------------------------
# 1. Base image
# ---------------------------
FROM node:20-alpine AS base

WORKDIR /app

# ---------------------------
# 2. Install pnpm
# ---------------------------
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---------------------------
# 3. Install dependencies
# ---------------------------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------------------------
# 4. Build the project
# ---------------------------
FROM deps AS build

COPY . .
RUN pnpm run build

# ---------------------------
# 5. Production runtime
# ---------------------------
FROM base AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
