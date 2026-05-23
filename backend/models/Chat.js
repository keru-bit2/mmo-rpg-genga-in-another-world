const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{
    userId: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  chatType: { type: String, enum: ['direct', 'guild', 'global', 'team'], default: 'direct' },
  messages: [{
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    edited: Boolean
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
