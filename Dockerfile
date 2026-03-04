FROM node:24-alpine

WORKDIR /app

# Reduce noisy/slow npm behavior in CI
ENV NODE_ENV=development
ENV npm_config_loglevel=warn
ENV npm_config_progress=false

COPY package.json package-lock.json* ./

# CI-friendly install (faster + reproducible)
RUN npm ci --no-audit --no-fund

COPY . .

EXPOSE 3000
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

CMD ["npm", "run", "dev"]