const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    message: {
        type: String,
    }
})

const Messages = mongoose.model('Message', MessageSchema)

module.exports = Messages