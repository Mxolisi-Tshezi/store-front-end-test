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

# Fix the empty cart page file
RUN echo '"use client";\n\nexport default function CartPage() {\n  return <div>Cart Page</div>;\n}' > src/app/\(main\)/cart/page.tsx

# Fix the empty contact page file
RUN echo '"use client";\n\nexport default function ContactPage() {\n  return <div>Contact Page</div>;\n}' > src/app/\(main\)/contact/page.tsx

# Fix the empty products page file
RUN echo '"use client";\n\nexport default function ProductsPage() {\n  return <div>Products Page</div>;\n}' > src/app/\(main\)/products/page.tsx

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Add a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the correct environment variables
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Command to run the application
CMD ["node", "server.js"]