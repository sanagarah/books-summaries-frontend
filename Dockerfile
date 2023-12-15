FROM node as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx parcel build

FROM nginx:alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
