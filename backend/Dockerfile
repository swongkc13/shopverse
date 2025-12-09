FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy only if building image (optional)
COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]
