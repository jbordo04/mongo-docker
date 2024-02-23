# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /src
COPY package.json yarn.lock ./

RUN yarn install
COPY . /src
# COPY . .
RUN npm run build

EXPOSE 8085
CMD ["node", "dist/src/mongoose.js"]cd 