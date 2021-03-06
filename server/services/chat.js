const { addUser, removeUser, getUser } = require('./users.js');
const { isMessageStockCommand, saveMessage } = require('./message.js');
const { putConsultStockCommand } = require('./stock');
const JOIN_EVENT = 'join';
const SEND_MESSAGE_EVENT = 'sendMessage';
const SocketAccesor = require('./socket_accesor');

class ChatConnector {
    onChatConnection = () => (socket) => {
        console.log('There is a new connection');
    
        socket.on(JOIN_EVENT, ({name, room}, callback) => {
            const {error, user} = addUser({id: socket.id, name, room});
    
            if(error) return callback(error);
    
            console.log("Added to room")
            socket.join(room);
    
            callback();
        });
    
        socket.on(SEND_MESSAGE_EVENT, (message, callback) => {
            const user = getUser(socket.id);

            if(user) {
                if(isMessageStockCommand(message)){
                    console.log("IT IS A STOCK COMMAND")
                    putConsultStockCommand(message, user);
                } else {
                    const socketAccesor = new SocketAccesor().getInstance();
                    saveMessage(message, user.name, user.room)
                    .then(() => {
                        socketAccesor.getSocktetInstance().to(user.room).emit('message', { user: user.name, text: message});
                    })
                    .catch(err => console.log(err))
                }
            }
    
            callback();
        });
        
        socket.on('disconnect', () => {
            console.log('User had left!!');
            const user = removeUser(socket.id);
        }) 
    };
}


module.exports = ChatConnector;