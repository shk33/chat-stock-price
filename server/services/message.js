const SocketAccesor = require('./socket_accesor');
const { Message } = require('../database/mongo_schema');
const mongoose = require('mongoose');
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

const publishMessage = async (message, user) => {
    const socketAccesor = new SocketAccesor().getInstance();
    socketAccesor.getSocktetInstance().to(user.room).emit('message', { user: user.name, text: message});
};

const publishAndSaveMessage = async (message, user) => {
    const socketAccesor = new SocketAccesor().getInstance();
    socketAccesor.getSocktetInstance().to(user.room).emit('message', { user: user.name, text: message});
    await saveMessage(message, user.name, user.room);
};

const saveMessage = async (message, user, room) => {
    const msg = new Message({
        _id: new mongoose.Types.ObjectId(),
        text: message,
        user,
        room,
    });
    await msg.save();
    return msg;
}

module.exports = { isMessageStockCommand, getStockIdFromMessage, publishMessage, publishAndSaveMessage, saveMessage }