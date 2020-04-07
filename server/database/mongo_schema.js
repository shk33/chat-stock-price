const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    user: { type: String, required: true },
    room: { type: String, required: true },
}, { timestamps: true });
const Message = mongoose.model('Message', messageSchema);

module.exports = {
  Message,
};
