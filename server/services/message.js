const SocketAccesor = require('./socket_accesor');
const STOCK_COMMAND = '/stock=';

const isMessageStockCommand = (message) => {
    let isCommand = false;

    if(message.startsWith(STOCK_COMMAND)){
        isCommand = true;
    }

    return isCommand;  
};

const getStockIdFromMessage = (message) => {
    const parts = message.split(STOCK_COMMAND);
    return parts[1];
}

const publishMessage = (message, user) => {
    const socketAccesor = new SocketAccesor().getInstance();
    socketAccesor.getSocktetInstance().to(user.room).emit('message', { user: user.name, text: message});
};

const publishAndSaveMessage = (message, user) => {
    const socketAccesor = new SocketAccesor().getInstance();
    socketAccesor.getSocktetInstance().to(user.room).emit('message', { user: user.name, text: message});
};

module.exports = { isMessageStockCommand, getStockIdFromMessage, publishMessage, publishAndSaveMessage }