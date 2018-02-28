FROM node:8.9-alpine

ENV NODE_ENV production
WORKDIR /user

# leverage layers by installing node_modules in a seperate step than copying the server files.
# if no changes were made package.json - cache will be used - fatster builds
COPY package.json package-lock.json* npm-shrinkwrap.json* src ./
RUN npm i 
RUN npm run build

COPY ./dist ./
# EXPOSE - informational ony
EXPOSE 4000 
ENTRYPOINT npm start