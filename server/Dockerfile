FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


COPY .env .env


RUN npm run build


EXPOSE 5000

CMD ["sh", "-c", "npm run initialize-db && npm start"]
