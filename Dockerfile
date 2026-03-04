FROM node:24-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* ./

RUN npm install

# Copy the rest of the project files
COPY . .

# Next.js dev server port
EXPOSE 3000

# Environment variables
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=development

# Run Next.js dev server
CMD ["npm", "run", "dev"]