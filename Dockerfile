# Start with official Node.js v18 image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
# where available (yarn.lock is optional)
COPY package*.json yarn.lock ./

# Install yarn globally and install dependencies
RUN npm install -g yarn && yarn install

# Bundle app source
COPY . .

# The application's default port
EXPOSE 8080

# Define the command that should be executed
# when the Docker container starts up
CMD [ "node", "app.js" ]
