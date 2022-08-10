FROM node:17.4.0-alpine3.15

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install --only=production
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
