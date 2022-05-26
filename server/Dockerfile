FROM node:16

WORKDIR /app
COPY . /app
COPY package*.json /app
RUN npm install
RUN npm install -g nodemon
COPY . /app
EXPOSE 4000
CMD ["npm", "start"]
