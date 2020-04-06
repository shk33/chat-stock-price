const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')
const JOIN_EVENT = 'join';
const SEND_MESSAGE_EVENT = 'sendMessage';

const onChatConnectionHandler = (socket) => {
    console.log('There is a new connection');

    socket.on(JOIN_EVENT, ({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.join(room);

        callback();
    });

    socket.on(SEND_MESSAGE_EVENT, (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});

        callback();
    });
    
    socket.on('disconnect', () => {
        console.log('User had left!!');
    }) 
};


module.exports = { onChatConnectionHandler }