FROM node:16

RUN apt-get update && apt-get install -y netcat

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
