FROM node:13

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install --save

COPY . /usr/src/app

CMD [ "sh", "-c", "/bin/bash ./run.sh" ]
