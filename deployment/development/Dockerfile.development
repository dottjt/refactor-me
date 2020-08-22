FROM node:14.4-alpine

ENV NODE_ENV=production
ENV NODE_PATH=/app/node_modules
ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app
COPY package.json /tmp/
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /app

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]
