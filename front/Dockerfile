FROM node:21.5.0

WORKDIR /app

# ここから追記
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD sh -c 'serve -s build -l tcp://0.0.0.0:$PORT'