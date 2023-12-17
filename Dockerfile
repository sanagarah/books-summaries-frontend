FROM node as build

WORKDIR /app

COPY package.json .
COPY package-lock.json* .

RUN npm install

COPY . .

RUN npx parcel build index.html

FROM node:slim

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app

# Expose the port the app runs on
EXPOSE 8080

CMD ["serve", "-s", "-l", "8080", "/app"]
