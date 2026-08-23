FROM node:16.13.0

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}


# Create app directory
WORKDIR /var/www/html

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "node", "server.js" ]