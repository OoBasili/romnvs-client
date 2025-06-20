FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/client

# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
COPY package.json yarn.lock* ./


#RUN \
# if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#  elif [ -f package-lock.json ]; then npm ci; \
#  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#  else echo "Lockfile not found." && exit 1; \
#  fi
RUN yarn --frozen-lockfile;

FROM base AS builder
WORKDIR /app/client
COPY --from=deps /app/client/node_modules ./node_modules
COPY . .

#RUN \
#  if [ -f yarn.lock ]; then yarn run build; \
#  elif [ -f package-lock.json ]; then npm run build; \
#  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#  else echo "Lockfile not found." && exit 1; \
#  fi
RUN yarn run build;

FROM base AS runner
WORKDIR /app/client

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user

COPY --from=builder /app/client/public ./public
COPY --from=builder --chown=user:nodejs /app/client/.next/standalone ./
COPY --from=builder --chown=user:nodejs /app/client/.next/static ./.next/static

USER user
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
