const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { onChatConnectionHandler } = require('./services/chat');

const PORT = process.env.PORT || 5000;

io.on('connection', onChatConnectionHandler);

app.use(router);

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));