# # Use the official Node.js 16 image as a parent image
# FROM node:18

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json (or yarn.lock) from your project into the container
# COPY package*.json ./

# # Install any dependencies
# RUN npm install

# # Copy the rest of your application's code into the container
# COPY . .

# # Specify the command to run on container start
# CMD [ "npm", "start" ]

# # # Syntax=docker/dockerfile:1
# # FROM node:16
# # WORKDIR /usr/src/app
# # COPY package*.json ./
# # RUN npm install
# # COPY . .
# # CMD [ "npm", "start" ]

# Build stage
FROM node:18-slim as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM node:18-slim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist /usr/src/app/dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "8080"]
EXPOSE 8080
