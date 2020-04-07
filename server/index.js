const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const ChatConnector = require('./services/chat');
const SocketAccesor = require('./services/socket_accesor');
const { init:initStockWorker } = require('./worker/stock-worker');
const mongo = require('./database/mongo');

const PORT = process.env.PORT || 5000;

const chatConnector = new ChatConnector();
const socketAccesor = new SocketAccesor(io).getInstance();

mongo.connect();
io.on('connection', chatConnector.onChatConnection());
initStockWorker();

app.use(router);

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));