FROM node:18

# Set working directory inside container
WORKDIR /app

# Install dependencies first (separate layer for caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . .

RUN npm run build

# Install serve (to serve static files)
RUN npm install -g serve

# Expose React dev server port
EXPOSE 3000

# Start in development mode with hot reload
CMD ["serve", "-s", "build", "-l", "3000"]
