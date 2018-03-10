FROM node:8.9-alpine

WORKDIR /server

# leverage layers by installing node_modules in a seperate step than copying the server files.
# if no changes were made package.json - cache will be used - fatster builds
COPY package.json package-lock.json* npm-shrinkwrap.json* /server
RUN npm i 

COPY ./dist ./
# EXPOSE - informational ony
EXPOSE 4000 
ENTRYPOINT npm start