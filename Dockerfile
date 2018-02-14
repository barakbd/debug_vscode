FROM node:8.9-alpine

ENV NODE_ENV production
WORKDIR /server
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]