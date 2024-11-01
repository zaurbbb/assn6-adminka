FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

EXPOSE 4001

# Use Vite's development server
CMD ["npm", "run", "dev"]

