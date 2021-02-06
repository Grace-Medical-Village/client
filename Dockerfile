FROM node:alpine

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
