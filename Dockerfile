# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /src
COPY package.json yarn.lock ./

RUN yarn install
COPY . /src
# COPY . .
RUN npm run build

EXPOSE 8085
CMD ["node", "dist/src/mongoose.js"]


# FROM node:20
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# RUN yarn add ts-node
# CMD ["ts-node", "src/index.ts"]
