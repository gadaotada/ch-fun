FROM node:19.9.0-alpine

# Install tzdata package for timezone data
RUN apk add --no-cache tzdata

# Set the timezone to Sofia
ENV TZ=Europe/Sofia
RUN ln -sf /usr/share/zoneinfo/Europe/Sofia /etc/localtime && echo "Europe/Sofia" > /etc/timezone

# Create the application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies and clean npm cache
RUN npm install && npm cache clean --force

# Copy the application files
COPY . .

# Set environment variables
ENV NODE_ENV production
ENV PORT 80

# Expose the application port
EXPOSE 80

# Start the application
CMD ["npm", "start"]