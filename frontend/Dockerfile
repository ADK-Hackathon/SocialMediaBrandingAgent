# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
# The build script is taken from package.json: "tsc -b && vite build"
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output from the build stage to Nginx's web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration (optional, but good for SPAs)
# Create a default.conf file in your frontend directory if you need specific Nginx settings
# For a typical Vite SPA, you might want to redirect all 404s to index.html
# Example default.conf:
# server {
#   listen       80;
#   server_name  localhost;
#
#   location / {
#     root   /usr/share/nginx/html;
#     index  index.html index.htm;
#     try_files $uri $uri/ /index.html;
#   }
#
#   error_page   500 502 503 504  /50x.html;
#   location = /50x.html {
#     root   /usr/share/nginx/html;
#   }
# }
# If you create default.conf, uncomment the next line:
# COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"] 