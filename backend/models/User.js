const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    displayName: String,
    avatar: String,
    bio: String,
    level: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    class: { type: String, enum: ['Warrior', 'Mage', 'Rogue', 'Paladin'], default: 'Warrior' }
  },
  friends: [{
    userId: mongoose.Schema.Types.ObjectId,
    status: { type: String, enum: ['pending', 'accepted', 'blocked'], default: 'pending' }
  }],
  guildId: mongoose.Schema.Types.ObjectId,
  guildRole: { type: String, enum: ['member', 'officer', 'leader'], default: 'member' },
  stats: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
