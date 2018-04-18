# https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4
# https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/

# Stage 1

FROM node:9.10-alpine
# ENV WORKDIR AND COPY run with USER root
# If you want the server files and node_modules files to be owned by USER node:
# you need to chown to USER node after every COPY.
WORKDIR /server
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run tsc
#EXPOSE - informational ony
EXPOSE 4000
# LABEL git_commit=$GIT_COMMIT
# run as non-root. USER node is provided with node images
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
# Overwrite in runtime with --entrypoint "node" 
# docker run -it --rm --init --entrypoint "node" imagename:tag "/dist/server.js"
ENTRYPOINT ["node", "./dist/server.js"]



# Stage 2 - TBD
# FROM node:9-alpine
# ENV NODE_ENV=$NODE_ENV # for npm i to decide if to install devDependecies
# leverage layers by installing node_modules in a seperate step than copying the server files.
# if no changes were made package.json - cache will be used - fatster builds

# COPY package.json package-lock.json* npm-shrinkwrap.json* tsconfig*.json ./
# COPY ./dist ./
