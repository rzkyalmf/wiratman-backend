FROM node:lts

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8005

CMD ["npm", "run", "start"]