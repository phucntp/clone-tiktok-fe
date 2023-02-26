FROM node:16-alpine


WORKDIR /home

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json

COPY src ./src
COPY public ./public

CMD ["yarn", "dev"]