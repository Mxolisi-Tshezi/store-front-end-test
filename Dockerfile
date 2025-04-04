# # Build stage
# FROM node:18-alpine AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm ci

# # Copy project files
# COPY . .

# # Build the Next.js application
# RUN npm run build

# # Production stage
# FROM node:18-alpine AS runner

# WORKDIR /app

# # Set to production environment
# ENV NODE_ENV=development

# # Copy necessary files from builder stage
# # COPY --from=builder /app/next.config.ts ./
# COPY --from=builder /app/next.config.ts ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# # Expose the port the app runs on
# EXPOSE 80

# # Command to run the application
# CMD ["npm", "start"]



# # Build stage
# FROM node:18-alpine AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm ci

# # Copy project files
# COPY . .

# # Fix file encoding issues before building
# RUN apk add --no-cache dos2unix && \
#     find src/app/\(main\) -name "*.tsx" -type f -exec dos2unix {} \;

# # Build the Next.js application
# RUN npm run build

# # Production stage
# FROM node:18-alpine AS runner

# WORKDIR /app

# # Set to production environment
# ENV NODE_ENV=development

# # Copy necessary files from builder stage
# COPY --from=builder /app/next.config.ts ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# # Expose the port the app runs on
# EXPOSE 80

# # Command to run the application
# CMD ["npm", "start"]



# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Fix file encoding issues
# RUN apk add --no-cache dos2unix && \
#     find src/app/\(main\) -name "*.tsx" -type f -exec dos2unix {} \;

RUN apk add --no-cache dos2unix && \
    find src -name "*.tsx" -type f -exec dos2unix {} \; && \
    find src -name "*.ts" -type f -exec dos2unix {} \;

# Build the Next.js application with linting disabled
RUN npm run build -- --no-lint

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV=development

# Copy necessary files from builder stage
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["npm", "start"]