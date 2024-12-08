FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using clean install
RUN npm ci

# Copy source code (excluding node_modules due to .dockerignore)
COPY . .

# Build if TypeScript is used
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 