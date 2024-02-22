# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /usr/src/app
COPY ./app/* ./
COPY ./docker_run_script.mjs ./
# COPY package.json yarn.lock ./

RUN curl https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz --output mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz
RUN tar -xvf mongodb-atlas-cli_1.3.0_linux_x86_64.tar.gz && mv mongodb-atlas-cli_1.3.0_linux_x86_64 atlas_cli
RUN chmod +x atlas_cli/bin/atlas
RUN mv atlas_cli/bin/atlas /usr/bin/

RUN yarn install
RUN npm install -g zx
COPY . .
RUN npm install build

# EXPOSE 3000
# CMD ["node", "dist/src/index.js"]
CMD ["./docker_run_script.mjs"]

# FROM node:20
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# RUN yarn add ts-node
# CMD ["ts-node", "src/index.ts"]
