# Use the latest stable Node.js (Alpine) image
FROM node:24-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install --no-audit --no-fund --progress=false

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Run the development server
CMD ["npm", "run", "dev"]