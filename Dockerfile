FROM node:lts

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8001

CMD ["npm", "run", "start"]