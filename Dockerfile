# Production Dockerfile for Railway Deployment
# Multi-stage build for React (Vite) + Express (Node.js)

# Stage 1: Build the React client frontend
FROM node:20-alpine AS builder
WORKDIR /app/client

# Install frontend dependencies
COPY client/package*.json ./
RUN npm install

# Build client production bundle
COPY client/ ./
RUN npm run build

# Stage 2: Production Express server
FROM node:20-alpine
WORKDIR /app

# Install production server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

# Copy server code
COPY server/ ./server/

# Copy compiled frontend assets from Stage 1 into client/dist
COPY --from=builder /app/client/dist ./client/dist

# Railway provides dynamic PORT via environment variable
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Start server
CMD ["node", "server/index.js"]
