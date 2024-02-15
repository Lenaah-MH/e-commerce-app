FROM node:16

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# COPY package*.json ./

COPY . .

RUN yarn install

RUN yarn prisma generate dev 

RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]

