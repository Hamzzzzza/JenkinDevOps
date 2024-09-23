# Use an official Node.js image from Docker Hub
FROM node:14

# Create a working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application code to the container
COPY . .

# Expose the app on port 3000
EXPOSE 3001

# Start the application
CMD [ "node", "app.js" ]
