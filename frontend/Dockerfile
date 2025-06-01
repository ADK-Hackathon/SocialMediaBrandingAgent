FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm i -g serve

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]