FROM node:18-alpine as base2

WORKDIR /src
COPY package*.json /
EXPOSE 4200

FROM base2 as production
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm install -g @angular/cli
RUN npm install
COPY . /
CMD ["ng", "build"]

FROM base2 as dev
ENV NODE_ENV=development
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm install -g @angular/cli
RUN npm install
COPY . /
CMD ["ng", "serve --host 0.0.0.0 --port 4200"]
