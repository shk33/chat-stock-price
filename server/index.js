const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const ChatConnector = require('./services/chat');

const PORT = process.env.PORT || 5000;

const chatConnector = new ChatConnector(io);
io.on('connection', chatConnector.onChatConnection());

app.use(router);

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));