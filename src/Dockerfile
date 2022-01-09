FROM node:14
WORKDIR /src

ADD package.json .
ADD package-lock.json .
RUN [ "npm", "ci" ]

ADD . .

ENV PORT=7443
EXPOSE 7443
CMD [ "npm", "run", "start" ]