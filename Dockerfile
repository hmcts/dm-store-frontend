FROM node:10.14.0-alpine

RUN mkdir -p /usr/src/app

COPY ./ /usr/src/app/

WORKDIR /usr/src/app

RUN npm install \
  && npm run setup \
  && npm cache verify

CMD [ "npm", "start" ]
