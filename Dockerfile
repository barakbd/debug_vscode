FROM node:8.9-alpine

ENV NODE_ENV production
WORKDIR /server
# leverage layers by installing node_modules in a seperate step than copying the server files.
# if no changes were made package.json - cache will be used - fatster builds
COPY package.json package-lock.json* npm-shrinkwrap.json* ./
RUN npm install --production --silent && mv node_modules ../
COPY ./dist ./
# EXPOSE - informational ony
EXPOSE 3000 
ENTRYPOINT npm start