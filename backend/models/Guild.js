const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    userId: mongoose.Schema.Types.ObjectId,
    role: { type: String, enum: ['member', 'officer', 'leader'], default: 'member' },
    joinedAt: { type: Date, default: Date.now }
  }],
  level: { type: Number, default: 1 },
  treasury: { type: Number, default: 0 },
  banner: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Guild', guildSchema);
