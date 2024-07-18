# Use the official NGINX image from the Docker Hub
FROM nginx:latest

# Copy the NGINX config file to the container
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the application files to the container
COPY . /usr/share/nginx/keyboard-drum

# Expose port 80
EXPOSE 80
