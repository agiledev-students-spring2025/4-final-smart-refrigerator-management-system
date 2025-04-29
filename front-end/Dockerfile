FROM node:18

# Set working directory inside container
WORKDIR /app

# Install dependencies first (separate layer for caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Expose React dev server port
EXPOSE 3000

# Start in development mode with hot reload
CMD ["npm", "start"]
