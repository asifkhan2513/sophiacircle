FROM node:24-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install --no-audit --no-fund

COPY . .

EXPOSE 3000
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]