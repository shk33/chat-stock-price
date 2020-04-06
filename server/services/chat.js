const { addUser, removeUser, getUser } = require('./users.js');
const { isMessageStockCommand } = require('./message.js');
const { putConsultStockCommand } = require('./stock');
const JOIN_EVENT = 'join';
const SEND_MESSAGE_EVENT = 'sendMessage';

class ChatConnector {
    constructor(ioInstance) {
        this.io = ioInstance;
    }

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
                    this.io.to(user.room).emit('message', { user: user.name, text: message});
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