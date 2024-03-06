const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  information: {type: Object},
  created_at: { type: Date, default: Date.now }, 
  items: [Array],
  exercises: [Array]
});

const User = mongoose.model('User', userSchema);

module.exports = User;