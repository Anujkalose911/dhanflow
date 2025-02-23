# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY public/ ./public/
COPY src/ ./src/

# Copy environment files if they exist
COPY .env* ./

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Create directory for nginx config
RUN mkdir -p /etc/nginx/conf.d

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Verify nginx config
RUN nginx -t

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]