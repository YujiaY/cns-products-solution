FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build if TypeScript is used
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 