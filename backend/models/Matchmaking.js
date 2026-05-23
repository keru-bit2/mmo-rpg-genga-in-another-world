const mongoose = require('mongoose');

const matchmakingSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  queueType: { type: String, enum: ['solo', 'duo', 'squad', 'raid'], default: 'solo' },
  rating: Number,
  joinedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['waiting', 'matched', 'cancelled'], default: 'waiting' },
  matchId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Matchmaking', matchmakingSchema);
