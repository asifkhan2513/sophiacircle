FROM node:24-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3000

# Set the host to 0.0.0.0 so it's accessible outside the container
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Use npm run dev as requested
CMD ["npm", "run", "dev"]