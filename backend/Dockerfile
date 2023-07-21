# Use the official Node.js 14 base image
FROM node:14

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your backend listens on (replace 3000 with your port if different)
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
