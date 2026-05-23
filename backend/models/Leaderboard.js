const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: String,
  rank: Number,
  rating: { type: Number, default: 1000 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  winRate: Number,
  season: { type: Number, default: 1 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
