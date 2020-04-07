const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    messages: { type: [String] },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: { type: String, required: true },
    user: { type: String, required: true },
    room: { type: String, required: true },
}, { timestamps: true });
const Message = mongoose.model('Message', messageSchema);

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
}, { timestamps: true });
const Room = mongoose.model('Room', roomSchema);

module.exports = {
  User,
  Message,
  Room,
};
