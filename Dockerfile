FROM node:alpine

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install yarn dependencies
RUN yarn install

# Run the platformer-cli executable
CMD [ "/usr/src/app/bin/run" ]
