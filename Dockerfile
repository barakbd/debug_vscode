FROM node:9
ENV NODE_ENV=$NODE_ENV
WORKDIR /server
RUN chown node -hR /server
USER node

# leverage layers by installing node_modules in a seperate step than copying the server files.
# if no changes were made package.json - cache will be used - fatster builds
COPY package.json package-lock.json* npm-shrinkwrap.json* ./
RUN npm i 

COPY ./dist ./
# EXPOSE - informational ony
EXPOSE 4000
ENTRYPOINT npm start