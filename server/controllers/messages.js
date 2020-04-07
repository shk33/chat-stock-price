const { Message } = require('../database/mongo_schema');

const getMessagesByRoom = async (req, res) => {
    try {
        const room = req.params.room;
        const messages = await Message.find({ room: room }).sort({'createdAt': 'asc'}).limit(50);
        res.json(messages)
    } catch(err){
        res.json([]);
    }
}

module.exports = {
  getMessagesByRoom,
};
