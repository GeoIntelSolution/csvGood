FROM node:10
WORKDIR /data/app
COPY package.json package.json
RUN npm install
COPY . .
CMD ["npm","start"]