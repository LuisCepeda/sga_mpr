
FROM node:20.3.1

# RUN apt-get update && apt-get install -y git

# RUN git clone https://github.com/LuisCepeda/sga_mpr /usr/src/app


ARG PORT
ARG MONGODB_URI

WORKDIR /usr/src/app

ENV PORT=$PORT
ENV MONGODB_URI=$MONGODB_URI
#ENV MONGODB_URI='mongodb://admin:siffusmelon@192.168.20.48:27017/'

RUN echo "PORT set to ${PORT}"
RUN echo "MONGODB_URI set to ${MONGODB_URI}"


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3003

CMD [ "npm","run","start:dev" ]