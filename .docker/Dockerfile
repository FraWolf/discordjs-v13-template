# Create the image based on the official Node 16 image from Dockerhub
FROM node:16-alpine as bot_client

# Create a new directory
RUN mkdir -p /bot

# Change directory so that our commands run inside this new directory
WORKDIR /bot

# Copy dependency definitions
COPY package.json /bot

# Install dependencies using npm
RUN yarn install

# Get all the code needed to run the ap
COPY . /bot