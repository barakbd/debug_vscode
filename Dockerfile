# Stage 1

FROM node:9-alpine
ENV NODE_ENV=$NODE_ENV
WORKDIR /server
RUN chown node -hR /server
USER node

COPY . ./
RUN npm i 

# EXPOSE - informational ony
EXPOSE 4000
ENTRYPOINT ["npm", "run"]

# Stage 2 - TBD
# FROM node:9-alpine

# leverage layers by installing node_modules in a seperate step than copying the server files.
# if no changes were made package.json - cache will be used - fatster builds

# COPY package.json package-lock.json* npm-shrinkwrap.json* tsconfig*.json ./
# COPY ./dist ./
