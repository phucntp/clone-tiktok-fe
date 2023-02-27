FROM node:16-alpine


WORKDIR /home

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json

COPY src ./src
COPY public ./public

CMD ["yarn", "dev"]
RUN apk add -U subversion

USER root
RUN apt-get update -qq && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common 
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
RUN apt-get update  -qq && apt-get install docker-ce=17.12.1~ce-0~debian -y
RUN usermod -aG docker jenkins
