
FROM node:20.3.1

# RUN apt-get update && apt-get install -y git

# RUN git clone https://github.com/LuisCepeda/sga_mpr /usr/src/app


ARG PORT
ARG MONGODB_URI

WORKDIR /usr/src/app

ENV PORT=$PORT
ENV MONGODB_URI=$MONGODB_URI

RUN echo "PORT set to ${PORT}"
RUN echo "MONGODB_URI set to ${MONGODB_URI}"


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3003

CMD [ "npm","run","start:dev" ]